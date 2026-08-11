"use client";

import { Fragment } from "react";
import { StaggerWords, Reveal } from "@/components/ui/reveal";
import { PillButton } from "@/components/ui/pill-button";
import { useBookingModal } from "./consultation-booking-modal";
import { ConsultationCountdown } from "./consultation-countdown";
import { funnelProduct } from "./funnel-products";

/**
 * Hero proof figures read from ./funnel-products so this line can never
 * disagree with the portfolio section further down the same page — the
 * funnel states its own numbers, and it has to state them once.
 */
const PROOF = [
  { slug: "gloco-calm-carry-us", brand: "Glowco", tail: "YTD" },
  {
    slug: "squirtz-water-enhancer-us",
    brand: "Squirtz",
    tail: "revenue in 6 months",
  },
]
  .map((p) => ({ ...p, value: funnelProduct(p.slug)?.metric.value }))
  .filter((p): p is typeof p & { value: string } => Boolean(p.value));

/**
 * ConsultationHero — section 1. Heading -> subhead -> countdown -> CTA.
 *
 * The ask sits above the fold-ish, immediately after the promise: a
 * reader who is already sold does not have to scroll past a video to
 * find the button. The video moved out to its own section
 * (consultation-video.tsx) directly below, for anyone who needs
 * convincing first.
 */
export function ConsultationHero() {
  const { open } = useBookingModal();

  return (
    <section
      id="hero"
      className="relative bg-canvas overflow-hidden pt-28 md:pt-22 pb-20 md:pb-24"
    >
      {/* backdrop — paper grid + soft warm/cool wash, same recipe as the homepage hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.32] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--ink) 5%, transparent) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 0%, rgba(232,112,74,0.16) 0%, transparent 60%), " +
            "radial-gradient(50% 45% at 100% 100%, rgba(0,102,255,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="container-x relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Proof-led lead. Both figures are verbatim from site-config
              (deepStats "$420M total GMV under mgmt" and stats "18,000+
              ASINs optimized") — do not round them up or re-attribute
              them. "ASINs" is doing deliberate work here: it is
              Amazon-only vocabulary, so an Amazon seller clocks the fit
              in the headline without the claim overreaching into
              "$420M of AMAZON GMV", which the data does not support. */}
          {/* Three short lines, not two long ones: at display size the
              two-line version wrapped and orphaned "ASINs." on a line of
              its own. Each line here is <=20 characters so it holds
              from 375px up without a stray break. */}
          <h1 className="display text-[clamp(2rem,6.2vw,5rem)] text-ink leading-[1.02] tracking-[-0.02em]">
            <StaggerWords text="Grow Your Amazon Sales by 40%" />
            <br />
            <StaggerWords
              text="In Just 30 Days"
              delayStart={0.24}
              wordClassName="italic font-normal text-copper"
            />
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-6 md:mt-7 text-lg md:text-xl text-ink-soft leading-[1.6] max-w-2xl mx-auto">
              We run Seller Central, Vendor Central, and FBA under one roof —
              sourcing, listings, PPC, and Brand Registry included.
            </p>
          </Reveal>

          {/* The two case-study numbers as their own scannable line —
              buried inside the paragraph above, they read as prose and
              stop being proof. */}
          <Reveal delay={0.45}>
            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm text-mute">
              {PROOF.map((p, i) => (
                <Fragment key={p.slug}>
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-hairline-strong"
                    />
                  )}
                  <span>
                    {p.brand}{" "}
                    <span className="text-copper font-medium tabular-nums">
                      {p.value}
                    </span>{" "}
                    {p.tail}
                  </span>
                </Fragment>
              ))}
            </p>
          </Reveal>
        </div>

        {/* countdown → CTA, sized so the clock reads as a companion to the
            button rather than dwarfing it */}
        <Reveal delay={0.15}>
          <div className="mt-10 md:mt-12 text-center">
            <ConsultationCountdown />

            <div className="mt-8">
              <PillButton onClick={open} variant="ink" size="lg">
                Book your consultation
              </PillButton>
              <p className="mt-4 text-mute text-sm">
                Free 30-minute call · no pitch · a real operator replies within
                the hour
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
