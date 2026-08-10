"use client";

import { StaggerWords, Reveal } from "@/components/ui/reveal";
import { PillButton } from "@/components/ui/pill-button";
import { useBookingModal } from "./consultation-booking-modal";
import { ConsultationCountdown } from "./consultation-countdown";

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
          <h1 className="display text-[clamp(2.75rem,7.5vw,6.5rem)] text-ink leading-[0.98] tracking-[-0.02em]">
            <StaggerWords text="Stop running five agencies" />
            <br />
            <StaggerWords
              text="to grow one brand."
              delayStart={0.2}
              wordClassName="italic font-normal text-copper"
            />
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-6 md:mt-7 text-lg md:text-xl text-ink-soft leading-[1.6] max-w-2xl mx-auto">
              Sourcing, listings, photography, ads, freight, and trademark — run by
              one accountable team instead of five vendors who don&apos;t talk to
              each other.
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
                Free 30-minute call · no pitch · a real operator replies within the
                hour
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
