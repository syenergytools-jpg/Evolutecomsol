"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  bookedTodayLabel,
  msUntilMidnight,
  splitDuration,
  useBookedToday,
} from "./use-consultation-stats";

/**
 * ConsultationUrgencyBar — the compact version of the hero's flip clock,
 * for the final CTA where a second full-size clock would just be noise.
 *
 * Same honest mechanics: the countdown is real time left in the
 * visitor's own day, and the booked count is a real query against real
 * submissions. Deliberately no fabricated "X of N slots left" — that
 * needs an invented capacity number nothing here has a real source for.
 */
function formatCountdown(ms: number): string {
  const { hours, minutes } = splitDuration(ms);
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

export function ConsultationUrgencyBar({ className }: { className?: string }) {
  // Lazy init computes the real value immediately, so the effect below
  // only sets up the recurring tick and never has to setState
  // synchronously in its body (lint rule react-hooks/set-state-in-effect).
  const [msLeft, setMsLeft] = useState(() => msUntilMidnight());
  const bookedToday = useBookedToday();

  useEffect(() => {
    const id = setInterval(() => setMsLeft(msUntilMidnight()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border bg-copper/10 px-5 py-2.5",
        className
      )}
      // Inline, not `border-copper/30`: globals.css line 86 has an
      // UNLAYERED `* { border-color: var(--hairline) }`, and unlayered
      // CSS beats Tailwind's @layer utilities regardless of specificity,
      // so every border-<color> utility in this codebase silently falls
      // back to --hairline. Same treatment as the hero's pill.
      style={{ borderColor: "color-mix(in oklab, var(--copper) 30%, transparent)" }}
    >
      <span className="inline-flex items-center gap-2">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-copper animate-ping opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-copper" />
        </span>
        <span
          className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink tabular-nums"
          suppressHydrationWarning
        >
          {formatCountdown(msLeft)} left today
        </span>
      </span>

      {/* copper-tinted, not grey — a neutral hairline reads as dirt on
          the warm ground */}
      <span aria-hidden="true" className="h-3 w-px bg-copper/30 hidden sm:block" />

      <span className="inline-flex items-center gap-1.5">
        <Users className="h-3.5 w-3.5 text-mute" strokeWidth={2.2} />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-mute tabular-nums">
          {bookedTodayLabel(bookedToday)}
        </span>
      </span>
    </div>
  );
}
