import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase";
import { clientIp, hashIp, rateLimit } from "@/lib/request-guard";
import {
  isEmailConfigured,
  notifyAdminOfSubmission,
  sendConsultationConfirmation,
  type ContactPayload,
} from "@/lib/email";
import { qualifierLabel, qualifierOptions } from "@/lib/site-config";

/* ------------------------------------------------------------------ *
 * POST /api/consultation
 *
 * The /consultation funnel's own endpoint. It exists because the funnel
 * was previously posting to /api/contact, whose schema is built for the
 * general contact page — it requires a 10+ character free-text
 * `message` the funnel has no equivalent of, and it has no concept of
 * the step answers. Squeezing the funnel through it is what produced
 * the opaque "Validation failed" response.
 *
 * Two shapes, discriminated on `kind`:
 *   onboarding — the auto-opening modal. Name + email only.
 *   qualifier  — the 5-step BANT form. Carries the structured answers.
 *
 * Writes each lead twice, on purpose:
 *   1. consultation_leads   — the structured record (see migration 0002)
 *   2. contact_submissions  — so it lands in the existing /admin inbox
 *                             with its status workflow and CSV export
 * Either write succeeding is enough; the response reports both.
 * ------------------------------------------------------------------ */

export const runtime = "nodejs";

const valuesOf = (field: keyof typeof qualifierOptions) =>
  qualifierOptions[field].map((o) => o.value) as [string, ...string[]];

const Contact = {
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().min(1, "Please enter your email").email("That doesn't look like a valid email"),
  // Honeypot — a real human never fills this
  website: z.string().max(0, "spam").optional().or(z.literal("")),
};

const Body = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("onboarding"),
    ...Contact,
  }),
  z.object({
    kind: z.literal("qualifier"),
    ...Contact,
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    // Deliberately NOT z.enum(BUDGETS): those strings contain en dashes,
    // and pinning the server to byte-exact display copy is how a form
    // starts rejecting its own valid output the moment anything
    // re-encodes it. The slug fields below are plain ASCII, so they can
    // safely stay strict.
    budget: z.string().trim().min(1, "Pick a budget range").max(80),
    authority: z.enum(valuesOf("authority"), { message: "Pick one option" }),
    need: z.enum(valuesOf("need"), { message: "Pick one option" }),
    timing: z.enum(valuesOf("timing"), { message: "Pick one option" }),
  }),
]);

type Body = z.infer<typeof Body>;

/** Human-readable recap, reused for the admin mirror and the email. */
function summarize(data: Body): string {
  if (data.kind === "onboarding") {
    return "Onboarding capture on page load — full qualifier not yet completed.";
  }
  return [
    `Budget: ${data.budget}`,
    `Decision authority: ${qualifierLabel("authority", data.authority)}`,
    `Biggest bottleneck: ${qualifierLabel("need", data.need)}`,
    `Timing: ${qualifierLabel("timing", data.timing)}`,
  ].join("\n");
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = Body.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
    }));
    return NextResponse.json(
      {
        ok: false,
        // Lead with the first real message rather than a bare
        // "Validation failed" — the form renders this verbatim.
        error: issues[0]?.message ?? "Please check the highlighted fields.",
        issues,
      },
      { status: 400 }
    );
  }

  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please wait a few minutes." },
      { status: 429 }
    );
  }

  const data = parsed.data;
  const isQualifier = data.kind === "qualifier";
  const sourceUrl = req.headers.get("referer") ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;
  const message = summarize(data);

  let storedLead = false;
  let storedInbox = false;
  let storeError: string | null = null;

  if (isSupabaseConfigured()) {
    const sb = getServiceClient();
    const base = {
      name: data.name,
      email: data.email,
      source_url: sourceUrl,
      user_agent: userAgent,
      ip_hash: hashIp(ip),
      status: "new" as const,
    };

    // 1. Structured record
    try {
      const { error } = await sb.from("consultation_leads").insert({
        ...base,
        kind: data.kind,
        phone: isQualifier ? data.phone || null : null,
        budget: isQualifier ? data.budget : null,
        authority: isQualifier ? data.authority : null,
        need: isQualifier ? data.need : null,
        timing: isQualifier ? data.timing : null,
        answers: isQualifier
          ? {
              budget: data.budget,
              authority: {
                value: data.authority,
                label: qualifierLabel("authority", data.authority),
              },
              need: { value: data.need, label: qualifierLabel("need", data.need) },
              timing: { value: data.timing, label: qualifierLabel("timing", data.timing) },
            }
          : {},
      });
      if (error) storeError = error.message;
      else storedLead = true;
    } catch (e) {
      storeError = e instanceof Error ? e.message : String(e);
    }

    // 2. Mirror into the admin inbox
    try {
      const { error } = await sb.from("contact_submissions").insert({
        ...base,
        company: null,
        phone: isQualifier ? data.phone || null : null,
        service: "general-consultation",
        reason: isQualifier ? "consultation-funnel" : "consultation-onboarding",
        budget: isQualifier ? data.budget : null,
        message,
      });
      if (!error) storedInbox = true;
      else if (!storeError) storeError = error.message;
    } catch (e) {
      if (!storeError) storeError = e instanceof Error ? e.message : String(e);
    }
  } else {
    storeError = "Supabase env vars are not set on the server.";
  }

  const payload: ContactPayload = {
    name: data.name,
    email: data.email,
    phone: isQualifier ? data.phone || undefined : undefined,
    service: "general-consultation",
    reason: isQualifier ? "consultation-funnel" : "consultation-onboarding",
    budget: isQualifier ? data.budget : undefined,
    message,
    sourceUrl: sourceUrl ?? undefined,
  };

  let emailedAdmin = false;
  let emailedUser = false;
  let emailError: string | null = null;
  if (isEmailConfigured()) {
    const [adminRes, userRes] = await Promise.all([
      notifyAdminOfSubmission(payload),
      sendConsultationConfirmation(payload),
    ]);
    emailedAdmin = adminRes.ok;
    emailedUser = userRes.ok;
    emailError = adminRes.error ?? userRes.error ?? null;
  } else {
    emailError = "RESEND_API_KEY is not set on the server.";
  }

  const stored = storedLead || storedInbox;

  // Nothing landed anywhere — say so honestly. The form still moves the
  // visitor on to the calendar (Cal.com captures them independently),
  // but it must not claim we saved or emailed anything.
  if (!stored && !emailedAdmin) {
    return NextResponse.json(
      { ok: false, error: "We couldn't save that just yet.", storeError, emailError },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    storedLead,
    storedInbox,
    emailedAdmin,
    emailedUser,
    storeError,
    emailError,
  });
}
