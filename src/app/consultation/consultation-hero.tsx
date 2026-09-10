"use client";

import { StaggerWords, Reveal } from "@/components/ui/reveal";
import { ConsultationCtaCard } from "./consultation-cta-card";

/**
 * ConsultationHero — section 1. Heading -> subhead -> proof stats ->
 * CTA (the last two live in consultation-cta-card.tsx).
 *
 * The ask sits above the fold-ish, immediately after the promise: a
 * reader who is already sold does not have to scroll past a video to
 * find the button. The video moved out to its own section
 * (consultation-video.tsx) directly below, for anyone who needs
 * convincing first.
 */
export function ConsultationHero() {
  return (
    <section
      id="hero"
      // Tighter bottom padding on phones: at pb-20 the gap between the
      // reassurance pill and the video section below ran to ~116px once
      // that section's own top padding was added on top of it.
      className="relative bg-canvas overflow-hidden pt-28 md:pt-22 pb-12 md:pb-24"
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
          {/* Uppercase runs roughly 12% wider than sentence case, so the
              clamp is retuned from the sentence-case version: the max
              keeps "STOP GUESSING ON AMAZON." on one line inside the
              max-w-4xl column, the floor keeps it on one line at 375px.

              Line-height and letter-spacing CANNOT be set with
              `leading-*`/`tracking-*` here. `.display` (globals.css:133)
              is UNLAYERED and hard-sets line-height 0.95 and
              letter-spacing -0.04em; unlayered CSS beats Tailwind's
              @layer utilities whatever the specificity, so those classes
              are silently dead on any .display element. An inline style
              does win, fed by a custom property so the value can still
              be responsive through Tailwind variants. Caps also have no
              descenders to open up the gap between lines on their own,
              which is why mobile needs the loosest setting. */}
          <h1
            // No `text-balance`: the <br> already defines the intended
            // break, so balancing can only introduce an unwanted second
            // one inside "STOP GUESSING ON AMAZON.". The 5.5vw / 3.75rem
            // clamp is what keeps that sentence on one line from 320px
            // up — verified by measuring rendered line boxes, not by eye.
            className="display uppercase text-[clamp(1.1rem,5.5vw,3.75rem)] text-ink [--h1-lh:1.3] sm:[--h1-lh:1.18] md:[--h1-lh:1.08]"
            style={{ lineHeight: "var(--h1-lh)", letterSpacing: "-0.005em" }}
          >
            <StaggerWords text="Stop guessing on Amazon." />
            <br />
            <StaggerWords
              text="Start scaling."
              delayStart={0.24}
              wordClassName="italic font-normal text-copper"
            />
          </h1>

          <Reveal delay={0.35}>
            {/* inline-block, not a full-width block: the tinted panel has
                to hug the text, and the parent's text-center is what
                centres it (auto margins do nothing on an inline-block).
                Border set inline because globals.css line 86 has an
                UNLAYERED `* { border-color: var(--hairline) }` that beats
                every border-<color> utility in the project. */}
            <p
              className="mt-7 md:mt-8 inline-block rounded-[1.25rem] border bg-copper/10 px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg md:text-xl font-medium italic text-copper leading-[1.5] text-balance"
              style={{
                borderColor: "color-mix(in oklab, var(--copper) 30%, transparent)",
              }}
            >
              Target 40%+ growth in 90 days.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <p className="mt-7 md:mt-6 text-base sm:text-lg md:text-xl text-ink-soft leading-[1.7] sm:leading-[1.6] max-w-2xl mx-auto text-balance">
              We find the products. Build the brand. Run the PPC. Scale the
              sales.
            </p>
          </Reveal>
        </div>

        {/* Proof stats then the ask — no panel, no background, the
            layout alone carries it (consultation-cta-card.tsx). */}
        <Reveal delay={0.15}>
          <ConsultationCtaCard className="mt-7 md:mt-14" />
        </Reveal>
      </div>
    </section>
  );
}
