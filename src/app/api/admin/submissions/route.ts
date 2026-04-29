import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentSession } from "@/lib/admin-auth";
import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

/* ------------------------------------------------------------------ *
 * Admin Submissions API — Full CRUD
 *
 * GET    /api/admin/submissions         — list + optional search/filter
 * PATCH  /api/admin/submissions         — update status / notes
 * DELETE /api/admin/submissions         — single or bulk delete
 * ------------------------------------------------------------------ */

// ── Schemas ──────────────────────────────────────────────────

const PatchBody = z.object({
  id: z.string().uuid(),
  status: z
    .enum(["new", "in_progress", "responded", "archived", "spam"])
    .optional(),
  notes: z.string().max(5000).optional(),
});

const DeleteBody = z.union([
  z.object({ id: z.string().uuid() }),
  z.object({ ids: z.array(z.string().uuid()).min(1).max(100) }),
]);

// ── Helpers ──────────────────────────────────────────────────

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: "Unauthorized" },
    { status: 401 }
  );
}

function notConfigured() {
  return NextResponse.json(
    { ok: false, error: "Supabase not configured" },
    { status: 503 }
  );
}

// ── GET ──────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (!(await getCurrentSession())) return unauthorized();
  if (!isSupabaseConfigured()) return notConfigured();

  const url = new URL(req.url);
  const status = url.searchParams.get("status") ?? "all";
  const service = url.searchParams.get("service") ?? "all";
  const q = url.searchParams.get("q")?.trim() ?? "";
  const sort = url.searchParams.get("sort") ?? "newest";
  const limit = Math.min(
    Math.max(Number(url.searchParams.get("limit") ?? "500"), 1),
    1000
  );

  try {
    const sb = getServiceClient();
    let query = sb.from("contact_submissions").select("*");

    // Filters
    if (status !== "all") query = query.eq("status", status);
    if (service !== "all") query = query.eq("service", service);

    // Text search across name, email, company, message
    if (q.length >= 2) {
      query = query.or(
        `name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%,message.ilike.%${q}%`
      );
    }

    // Sort
    if (sort === "oldest") {
      query = query.order("created_at", { ascending: true });
    } else if (sort === "name-asc") {
      query = query.order("name", { ascending: true });
    } else if (sort === "name-desc") {
      query = query.order("name", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    query = query.limit(limit);

    const { data, error } = await query;
    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data: data ?? [] });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

// ── PATCH ────────────────────────────────────────────────────

export async function PATCH(req: NextRequest) {
  if (!(await getCurrentSession())) return unauthorized();
  if (!isSupabaseConfigured()) return notConfigured();

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = PatchBody.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { id, status, notes } = parsed.data;
  const sb = getServiceClient();
  const update: Record<string, unknown> = {};
  if (status !== undefined) {
    update.status = status;
    if (status === "responded") update.responded_at = new Date().toISOString();
  }
  if (notes !== undefined) update.notes = notes;

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { ok: false, error: "Nothing to update" },
      { status: 400 }
    );
  }

  const { error } = await sb
    .from("contact_submissions")
    .update(update)
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}

// ── DELETE ───────────────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  if (!(await getCurrentSession())) return unauthorized();
  if (!isSupabaseConfigured()) return notConfigured();

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = DeleteBody.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Provide { id } or { ids: [...] }" },
      { status: 400 }
    );
  }

  const sb = getServiceClient();
  const ids = "ids" in parsed.data ? parsed.data.ids : [parsed.data.id];

  const { error } = await sb
    .from("contact_submissions")
    .delete()
    .in("id", ids);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, deleted: ids.length });
}
