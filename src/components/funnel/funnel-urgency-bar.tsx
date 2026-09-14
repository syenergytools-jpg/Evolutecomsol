"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import {
  bookedTodayLabel,
  bookedTodayLabelShort,
  msUntilMidnight,
  splitDuration,
  useBookedToday,
} from "./funnel-stats-hooks";
import { useFunnelBookingModal } from "./funnel-booking-modal";

function formatCountdown(ms: number): string {
  const { hours, minutes } = splitDuration(ms);
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

/**
 * FunnelUrgencyBar — top-of-page announcement strip, the reference
 * site's exact opening beat. The one-line message is page-specific
 * copy; the real-time countdown and booked-today count are the honest
 * mechanism already proven on /consultation — no invented "N of M spots
 * left" (see consultation-urgency-bar.tsx's own note on why that number
 * can't be made honest, and this project's decision to never fabricate
 * one).
 */
export function FunnelUrgencyBar({ message }: { message: string }) {
  const { open } = useFunnelBookingModal();
  const [msLeft, setMsLeft] = useState(() => msUntilMidnight());
  const bookedToday = useBookedToday();

  useEffect(() => {
    const id = setInterval(() => setMsLeft(msUntilMidnight()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      className="block w-full bg-obsidian border-b border-canvas/10 py-2.5 px-4 text-center hover:bg-obsidian-soft transition-colors"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[0.8rem] sm:text-sm">
        <span className="font-medium text-canvas">{message}</span>

        <span aria-hidden="true" className="hidden sm:inline h-3 w-px bg-canvas/20 mx-1" />

        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-canvas/55 tabular-nums" suppressHydrationWarning>
          {formatCountdown(msLeft)} left today
        </span>

        <span aria-hidden="true" className="hidden md:inline h-3 w-px bg-canvas/20 mx-1" />

        <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-canvas/55 tabular-nums">
          <Users className="h-3 w-3" strokeWidth={2.2} />
          <span className="md:hidden">{bookedTodayLabelShort(bookedToday)}</span>
          <span className="hidden md:inline">{bookedTodayLabel(bookedToday)}</span>
        </span>
      </span>
    </button>
  );
}
