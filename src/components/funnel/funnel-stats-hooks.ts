"use client";

import { useEffect, useState } from "react";

/**
 * Same honest mechanics as /consultation/use-consultation-stats.ts,
 * duplicated (not imported) so editing a funnel page can never change
 * that page's behavior, and vice versa. `bookedToday` is a REAL count
 * from /api/consultation-stats — that endpoint counts every
 * `contact_submissions` row tagged with either funnel reason, so it is
 * an honest sitewide "people booked today" figure, not fabricated and
 * not falsely scoped to just this one page.
 */
export function useBookedToday(): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/consultation-stats")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setCount(typeof data?.bookedToday === "number" ? data.bookedToday : 0);
        }
      })
      .catch(() => {
        if (!cancelled) setCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return count;
}

export function bookedTodayLabelShort(count: number | null): string {
  if (count === null) return "···";
  if (count === 0) return "Booking open";
  if (count === 1) return "1 booked";
  return `${count} booked`;
}

export function bookedTodayLabel(count: number | null): string {
  if (count === null) return "···";
  if (count === 0) return "Booking open today";
  if (count === 1) return "1 person booked today";
  return `${count} people booked today`;
}

/** Milliseconds until the visitor's own local midnight. */
export function msUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, midnight.getTime() - now.getTime());
}

export function splitDuration(ms: number) {
  const total = Math.floor(ms / 1000);
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
