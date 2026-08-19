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
  // Short labels on purpose — long ones force the two stats onto
  // separate rows on a phone, and the pair reads as one comparison.
  { slug: "gloco-calm-carry-us", label: "Glowco YTD revenue" },
  { slug: "squirtz-water-enhancer-us", label: "Squirtz, 6 months" },
]
  .map((p) => ({ ...p, value: funnelProduct(p.slug)?.metric.value }))
  .filter((p): p is (typeof p) & { value: string } => Boolean(p.value));

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
            className="rounded-[1.15rem] border border-hairline-strong bg-canvas px-4 py-5 sm:px-6 sm:py-6 shadow-[0_22px_45px_-28px_rgba(15,17,21,0.4)]"
          >
            <p className="font-mono text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-mute mb-2.5">
              {p.label}
            </p>
            <p className="display text-[clamp(1.5rem,4.4vw,2.75rem)] leading-none tabular-nums text-copper">
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

      <p className="mt-5 text-mute text-sm">
        Free 30-minute call · no pitch · a real operator replies within the hour
      </p>
    </div>
  );
}
