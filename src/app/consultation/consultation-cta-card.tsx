"use client";

import { PillButton } from "@/components/ui/pill-button";
import { cn } from "@/lib/utils";
import { useBookingModal } from "./consultation-booking-modal";
import { ConsultationCountdown } from "./consultation-countdown";
import { funnelProduct } from "./funnel-products";

/**
 * ConsultationCtaCard — proof stats, then the ask.
 *
 * No panel, no card, no background fill: the layout alone carries the
 * hierarchy. An earlier version wrapped all of this in a dark box and
 * the user was explicit that the structure should stand on its own.
 *
 * The countdown pins to the top-right corner of the button rather than
 * sitting above it as its own block — it is a modifier on the ask, not
 * a competing element, and a corner badge says that without spending a
 * separate row on it.
 *
 * Figures come from ./funnel-products so this can never disagree with
 * the portfolio section further down the same page. Only the short
 * labels live here, because they are presentation, not data.
 */
const PROOF = [
  // Company name comes from ./funnel-products so the full legal name is
  // stated identically here and in the portfolio. It sits on its own
  // line above the metric: "Glowco International LLC" plus a descriptor
  // on one line would wrap unpredictably and knock the two numbers out
  // of alignment, and the pair only works read side by side.
  { slug: "gloco-calm-carry-us", metricLabel: "Total revenue" },
  { slug: "squirtz-water-enhancer-us", metricLabel: "Revenue, 6 months" },
]
  .map((p) => {
    const fp = funnelProduct(p.slug);
    return { ...p, company: fp?.company, value: fp?.metric.value };
  })
  .filter(
    (p): p is (typeof p) & { company: string; value: string } =>
      Boolean(p.company && p.value)
  );

export function ConsultationCtaCard({ className }: { className?: string }) {
  const { open } = useBookingModal();

  return (
    <div className={cn("text-center", className)}>
      {/* fixed two-up, not flex-wrap: the pair only works as a
          side-by-side comparison, and wrapping breaks that on phones */}
      <div className="mx-auto grid max-w-md grid-cols-2 gap-x-5 sm:max-w-xl sm:gap-x-14">
        {PROOF.map((p) => (
          <div
            key={p.slug}
            // Explicit radius — this project overrides the Tailwind
            // radius scale (rounded-2xl is 40px here).
            className="flex flex-col rounded-[1.15rem] border border-hairline-strong bg-canvas px-4 py-5 sm:px-6 sm:py-6 shadow-[0_22px_45px_-28px_rgba(15,17,21,0.4)]"
          >
            <p className="font-mono text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.1em] sm:tracking-[0.16em] text-mute">
              <span className="block text-ink-soft">{p.company}</span>
              <span className="block mt-1">{p.metricLabel}</span>
            </p>
            {/* mt-auto bottom-aligns the numbers. Labels are different
                lengths ("Glowco International LLC" wraps to two lines on
                a phone, "Squirtz" does not), and without this the two
                figures sat on different baselines, which read as a bug. */}
            <p className="mt-auto pt-3 display text-[clamp(1.5rem,4.4vw,2.75rem)] leading-none tabular-nums text-copper">
              {p.value}
            </p>
          </div>
        ))}
      </div>

      {/* relative wrapper is the positioning context for the badge; it
          hugs the button so the corner it pins to is the button's, not
          the row's. On phones the button goes full width, so the badge
          tucks to its right edge instead of overhanging into the
          container padding. */}
      <div className="mt-11 md:mt-12 flex justify-center">
        <div className="relative inline-flex w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto">
          <PillButton
            onClick={open}
            variant="ink"
            size="lg"
            className="w-full justify-center"
          >
            Book your consultation
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
