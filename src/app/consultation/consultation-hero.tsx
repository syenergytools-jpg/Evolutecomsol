"use client";

import { PillButton } from "@/components/ui/pill-button";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { Deco } from "@/components/ui/decorations";
import { useBookingModal } from "./consultation-booking-modal";

/**
 * ConsultationHero — section 1. Centered "billboard" layout on purpose:
 * one focal message, two CTAs. No competing right-column visual like
 * the homepage hero — this page's only job is to move a paid visitor
 * down to the qualifier, fast. Kept text-minimal by design; the visual
 * interest comes from scale, whitespace, and a few decorative accents
 * rather than more copy.
 */
export function ConsultationHero() {
  const { open } = useBookingModal();

  return (
    <section
      id="hero"
      className="relative bg-canvas overflow-hidden min-h-[80vh] md:min-h-[88vh] flex items-center"
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

      {/* decorative accents — visual interest without more copy */}

      <div className="container-narrow relative z-10 text-center w-full">
        <h1 className="display text-[clamp(2.75rem,7.5vw,6.5rem)] text-ink leading-[0.98] tracking-[-0.02em] mb-10">
          <StaggerWords text="Stop running five agencies" />
          <br />
          <StaggerWords
            text="to grow one brand."
            delayStart={0.2}
            wordClassName="italic font-normal text-copper"
          />
        </h1>

        <Reveal delay={0.42}>
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute -inset-6 rounded-full opacity-70 pointer-events-none"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(232,112,74,0.16) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div className="relative flex flex-wrap items-center justify-center gap-3">
              <PillButton onClick={open} variant="ink" size="lg">
                Book your free consultation
              </PillButton>
              <PillButton
                href="#case-studies"
                variant="ghost"
                size="lg"
                showArrow={false}
              >
                See our portfolio
              </PillButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
