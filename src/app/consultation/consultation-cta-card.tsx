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
  // 89+ and $25.2M have no source anywhere in the codebase; both are
  // client-supplied. Nothing else on the site corroborates them, so
  // don't "fix" them against site-config and don't reuse them elsewhere
  // without asking. NOTE: $25.2M "sales managed" sits awkwardly beside
  // $5.28M+ "revenue managed" — revenue and sales read as the same
  // thing to a visitor. Flagged to the client; likely one should
  // replace the other rather than both running.
  { value: "89+", label: "Launches" },
  { value: "$25.2M", label: "Sales managed" },
  { value: "Up to 412%", label: "Client growth" },
];

export function ConsultationCtaCard({ className }: { className?: string }) {
  const { open } = useBookingModal();

  return (
    <div className={cn("text-center", className)}>
      {/* A fixed 2x2 grid from sm up, not a wrapping flex row. With four
          claims, free wrapping put three on the first line and left
          "Up to 412% Client growth" orphaned on the second; a grid makes
          the arrangement deterministic at every width. Single column on
          phones. */}
      <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-3.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
        {PROOF.map((p) => (
          <span key={p.label} className="text-base sm:text-lg text-ink whitespace-nowrap">
            <span className="font-semibold text-copper tabular-nums">{p.value}</span>{" "}
            {p.label}
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
