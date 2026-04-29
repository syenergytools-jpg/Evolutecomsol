import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";
import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase";
import {
  isEmailConfigured,
  notifyAdminOfSubmission,
  sendUserAutoReply,
  type ContactPayload,
} from "@/lib/email";

/* ------------------------------------------------------------------ *
 * POST /api/contact
 *
 * 1. Validates the body with Zod.
 * 2. Inserts into Supabase `contact_submissions` (if configured).
 * 3. Sends two Resend emails: admin notification + user auto-reply.
 *
 * Returns 200 on success even if email sending fails — the row is
 * already in the DB and the admin will see it. We return per-channel
 * status flags so the client can show a useful confirmation.
 *
 * Spam guard: simple honeypot field + per-IP rate limit (in-memory).
 * Move the rate limit to Upstash/Redis if you scale beyond one host.
 * ------------------------------------------------------------------ */

export const runtime = "nodejs";

const Body = z.object({
  name: z.string().trim().min(2, "Please share your name").max(120),
  email: z.string().trim().email("That doesn't look like a valid email"),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  reason: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more — at least 10 characters").max(5000),
  // Honeypot — should always be empty when filled by a real human
  website: z.string().max(0, "spam").optional().or(z.literal("")),
});

// Per-IP rate limit: 5 submissions / 10 min. Purges entries older than 10 min on each call.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const submissionLog = new Map<string, number[]>();

function rateLimit(key: string): boolean {
  const now = Date.now();
  const arr = submissionLog.get(key) ?? [];
  const recent = arr.filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    submissionLog.set(key, recent);
    return false;
  }
  recent.push(now);
  submissionLog.set(key, recent);
  return true;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function hashIp(ip: string): string {
  const secret = process.env.ADMIN_COOKIE_SECRET ?? "evolut-default-salt-rotate-in-prod";
  return createHash("sha256").update(`${ip}:${secret}`).digest("hex").slice(0, 32);
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
      path: i.path.join("."),
      message: i.message,
    }));
    return NextResponse.json({ ok: false, error: "Validation failed", issues }, { status: 400 });
  }

  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please wait a few minutes." },
      { status: 429 }
    );
  }

  const data = parsed.data;
  const sourceUrl = req.headers.get("referer") ?? null;
  const userAgent = req.headers.get("user-agent") ?? null;

  // Persist — only if Supabase is configured. If not configured we still
  // attempt the email send so the admin isn't blind during the 5 minutes
  // before keys are set in prod.
  let stored = false;
  let storeError: string | null = null;
  if (isSupabaseConfigured()) {
    try {
      const sb = getServiceClient();
      const { error } = await sb.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        service: data.service || null,
        reason: data.reason || null,
        budget: data.budget || null,
        message: data.message,
        source_url: sourceUrl,
        user_agent: userAgent,
        ip_hash: hashIp(ip),
        status: "new",
      });
      if (error) {
        storeError = error.message;
      } else {
        stored = true;
      }
    } catch (e) {
      storeError = e instanceof Error ? e.message : String(e);
    }
  }

  const payload: ContactPayload = {
    name: data.name,
    email: data.email,
    company: data.company || undefined,
    phone: data.phone || undefined,
    service: data.service || undefined,
    reason: data.reason || undefined,
    budget: data.budget || undefined,
    message: data.message,
    sourceUrl: sourceUrl ?? undefined,
  };

  let emailedAdmin = false;
  let emailedUser = false;
  let emailError: string | null = null;
  if (isEmailConfigured()) {
    const [adminRes, userRes] = await Promise.all([
      notifyAdminOfSubmission(payload),
      sendUserAutoReply(payload),
    ]);
    emailedAdmin = adminRes.ok;
    emailedUser = userRes.ok;
    if (!adminRes.ok || !userRes.ok) {
      emailError = adminRes.error || userRes.error || "Email failure";
    }
  }

  // Hard fail only if neither channel worked AND nothing was stored.
  if (!stored && !emailedAdmin) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We received your brief but couldn't deliver it yet. Please email support@evolutecomsolutions.com directly while we investigate.",
        debug: { storeError, emailError },
      },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    stored,
    emailedAdmin,
    emailedUser,
  });
}
