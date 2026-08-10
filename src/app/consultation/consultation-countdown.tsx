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
 * ConsultationCountdown — the split-flap clock above the hero's CTA.
 *
 * Honest mechanics: it counts down to the visitor's own local midnight,
 * so the deadline it shows is literally true for everyone who ever
 * loads the page. No DAYS unit on purpose — a days digit would require
 * a multi-day deadline this offer does not actually have, and inventing
 * one is the exact dark pattern this page avoids (see the compact
 * ConsultationUrgencyBar for the same reasoning).
 *
 * Sized deliberately small: it sits directly above the "Book your
 * consultation" button, and a clock taller than the button it is meant
 * to support just competes with it.
 */
const UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export function ConsultationCountdown({ className }: { className?: string }) {
  // Lazy init so the first paint already shows a real value and the
  // effect below never has to setState in its own body.
  const [ms, setMs] = useState(() => msUntilMidnight());
  const bookedToday = useBookedToday();

  useEffect(() => {
    const id = setInterval(() => setMs(msUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = splitDuration(ms);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mute mb-4">
        Time left to book today
      </p>

      <div className="flex items-start gap-2">
        {UNITS.map(({ key, label }) => (
          <FlipUnit key={key} value={parts[key]} label={label} />
        ))}
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5">
        <Users className="h-3.5 w-3.5 text-mute" strokeWidth={2.2} />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mute tabular-nums">
          {bookedTodayLabel(bookedToday)}
        </span>
      </span>
    </div>
  );
}

function FlipUnit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      {/* explicit radius — this project's Tailwind radius scale is
          overridden (rounded-xl is 32px here, which would swallow a card
          this small) */}
      <div
        className="relative w-[clamp(3rem,5.5vw,3.5rem)] h-[clamp(3.25rem,6vw,3.9rem)] rounded-[0.7rem] bg-obsidian overflow-hidden [perspective:400px]"
        suppressHydrationWarning
      >
        {/* upper half catches the light, lower half falls away — the
            two-tone is what reads as a physical split-flap card */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-canvas/[0.09] to-transparent"
        />
        {/* the hinge */}
        <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
        <span aria-hidden="true" className="absolute inset-x-0 top-1/2 mt-px h-px bg-canvas/[0.07]" />

        {/* keyed on the value so React swaps the node outright — the old
            digit is gone the instant the new one mounts, and .flap-digit
            animates the arrival */}
        <span
          key={text}
          suppressHydrationWarning
          className="flap-digit absolute inset-0 grid place-items-center display leading-none tabular-nums text-canvas text-[clamp(1.3rem,2.6vw,1.65rem)]"
        >
          {text}
        </span>
      </div>

      <span className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-copper">
        {label}
      </span>
    </div>
  );
}
