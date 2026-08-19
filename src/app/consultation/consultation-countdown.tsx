"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { msUntilMidnight, splitDuration } from "./use-consultation-stats";

/**
 * ConsultationCountdown — a compact copper badge that pins to the
 * top-right corner of the CTA button.
 *
 * Was a three-card split-flap clock; at ~200px wide that could never
 * hang off a button corner, so it is a single ticking pill now. Copper
 * on purpose: it is the one thing on the page that reads against BOTH
 * the light hero behind it and the dark button underneath it.
 *
 * Honest mechanics, unchanged: it counts to the visitor's own local
 * midnight, so the deadline is literally true for everyone who loads
 * the page. No days unit, because there is no multi-day deadline to
 * count — inventing one is the dark pattern this page avoids.
 */
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function ConsultationCountdown({ className }: { className?: string }) {
  // Lazy init so the first paint already shows a real value and the
  // effect below never has to setState in its own body.
  const [ms, setMs] = useState(() => msUntilMidnight());

  useEffect(() => {
    const id = setInterval(() => setMs(msUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const { hours, minutes, seconds } = splitDuration(ms);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-copper px-3.5 py-2 sm:px-4 sm:py-2.5",
        "shadow-[0_14px_28px_-12px_rgba(232,112,74,0.95)] ring-1 ring-canvas/25",
        className
      )}
    >
      <span className="relative inline-flex h-2 w-2 shrink-0">
        <span className="absolute inset-0 rounded-full bg-canvas animate-ping opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-canvas" />
      </span>
      <span
        suppressHydrationWarning
        className="font-mono text-[0.75rem] sm:text-[0.82rem] tabular-nums tracking-[0.06em] text-canvas whitespace-nowrap"
      >
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        <span className="hidden sm:inline"> left today</span>
      </span>
    </span>
  );
}
