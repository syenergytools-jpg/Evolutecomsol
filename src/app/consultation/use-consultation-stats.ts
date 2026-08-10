"use client";

import { useEffect, useState } from "react";

/**
 * Shared "how many people actually booked today" hook.
 *
 * Both the big flip-clock (hero) and the compact urgency pill (final
 * CTA) show this number, so the fetch lives here once. It is a REAL
 * count from /api/consultation-stats — never a seeded or incrementing
 * fake. Fails soft to 0, which renders as "Be the first to book today"
 * rather than a broken or invented figure.
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

export function bookedTodayLabel(count: number | null): string {
  if (count === null) return "···";
  if (count === 0) return "Be the first to book today";
  if (count === 1) return "1 person booked today";
  return `${count} people booked today`;
}

/**
 * Milliseconds until the visitor's own local midnight. Local, not UTC —
 * "left today" should mean the reader's today, not a server's.
 */
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
