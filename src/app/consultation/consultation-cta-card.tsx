"use client";

import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";
import { useBookingModal } from "./consultation-booking-modal";
import { ConsultationCountdown } from "./consultation-countdown";

/**
 * ConsultationCtaCard — proof line, then the ask.
 *
 * No panel, no card, no background fill: the layout alone carries the
 * hierarchy. An earlier version wrapped all of this in a dark box and
 * the user was explicit that the structure should stand on its own.
 *
 * The countdown pins to the top-right corner of the button rather than
 * sitting above it as its own block — it is a modifier on the ask, not
 * a competing element, and a corner badge says that without spending a
 * separate row on it.
 */
const PROOF = [
  // $5.28M+ is Glowco's $5,287,932 rounded down, and 412% is Squirtz's
  // figure — both traceable to ./funnel-products and to the portfolio
  // section further down this page.
  { value: "$5.28M+", label: "Revenue managed" },
  // 89+ has no source anywhere in the codebase; it is a client-supplied
  // number. Nothing else on the site corroborates it, so don't "fix" it
  // against site-config and don't reuse it elsewhere without asking.
  { value: "89+", label: "Launches" },
  { value: "Up to 412%", label: "Client growth" },
];

export function ConsultationCtaCard({ className }: { className?: string }) {
  const { open } = useBookingModal();

  return (
    <div className={cn("text-center", className)}>
      {/* One credential line rather than the stat cards this replaced:
          three claims read as a single sentence of proof, and three
          cards side by side would be unreadably narrow on a phone. It
          wraps to its own rows below sm, with the rules hidden there so
          no separator is ever left dangling at the end of a line. */}
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4">
        {PROOF.map((p, i) => (
          <span key={p.label} className="flex items-center gap-4">
            {i > 0 && (
              <span aria-hidden="true" className="hidden sm:block h-4 w-px bg-hairline-strong" />
            )}
            <span className="text-base sm:text-lg text-ink whitespace-nowrap">
              <span className="font-semibold text-copper tabular-nums">{p.value}</span>{" "}
              {p.label}
            </span>
          </span>
        ))}
      </div>

      {/* relative wrapper is the positioning context for the badge; it
          hugs the button so the corner it pins to is the button's, not
          the row's. On phones the button goes full width, so the badge
          tucks to its right edge instead of overhanging into the
          container padding. */}
      <div className="mt-9 md:mt-11 flex justify-center">
        <div className="relative inline-flex w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto">
          <PillButton
            onClick={open}
            variant="ink"
            size="lg"
            className="w-full justify-center"
          >
            Show me how to scale
          </PillButton>
          {/* -top-7 leaves the badge sitting just above the button with
              a few pixels of overlap on the corner. At -top-3.5 it sat
              across the button's top edge and covered the label. */}
          <ConsultationCountdown className="absolute -top-7 right-0 sm:-right-6 z-10" />
        </div>
      </div>

      {/* Reassurance pill. Written as one sentence rather than three
          middot-separated fragments — the telegraphic version reads as
          UI chrome, a sentence reads as a promise. Radius is 1.25rem
          against a ~40px single-line height, so it renders as a true
          pill on one line and as a tidy rounded block when it wraps to
          two on a phone. */}
      <p
        className="mt-6 inline-block rounded-[1.25rem] border bg-copper/10 px-5 py-2.5 text-sm leading-relaxed text-ink-soft"
        // Inline, not `border-copper/25`: globals.css line 86 has an
        // UNLAYERED `* { border-color: var(--hairline) }`, and unlayered
        // CSS beats Tailwind's @layer utilities no matter the
        // specificity — so every border-<color> utility in this codebase
        // silently renders as --hairline. An inline style is the only
        // thing that wins without changing that global rule.
        style={{ borderColor: "color-mix(in oklab, var(--copper) 30%, transparent)" }}
      >
        A free 30-minute call with a real operator, no pitch, and a reply
        within the hour.
      </p>
    </div>
  );
}
