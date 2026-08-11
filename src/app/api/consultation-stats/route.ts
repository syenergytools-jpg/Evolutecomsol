import { NextResponse } from "next/server";
import { getServiceClient, isSupabaseConfigured } from "@/lib/supabase";

/* ------------------------------------------------------------------ *
 * GET /api/consultation-stats
 *
 * Powers the funnel's "N people booked today" line with a REAL count
 * — not a fabricated number. Counts `contact_submissions` rows created
 * since UTC midnight whose `reason` came from this funnel (the main
 * qualifier or the onboarding gate). Fails soft to `{ bookedToday: 0 }`
 * on any error or missing config so the urgency bar never breaks the
 * page — worst case it just shows "be the first to book today".
 * ------------------------------------------------------------------ */

export const runtime = "nodejs";

const FUNNEL_REASONS = ["consultation-funnel", "consultation-onboarding"];

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ bookedToday: 0 });
  }

  try {
    const startOfDayUtc = new Date();
    startOfDayUtc.setUTCHours(0, 0, 0, 0);

    const sb = getServiceClient();
    const { count, error } = await sb
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfDayUtc.toISOString())
      .in("reason", FUNNEL_REASONS);

    if (error) {
      return NextResponse.json({ bookedToday: 0 });
    }

    return NextResponse.json({ bookedToday: count ?? 0 });
  } catch {
    return NextResponse.json({ bookedToday: 0 });
  }
}
