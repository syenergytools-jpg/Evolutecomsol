"use client";

import { PillButton } from "@/components/ui/pill-button";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { useBookingModal } from "./consultation-booking-modal";
import { ConsultationUrgencyBar } from "./consultation-urgency-bar";

/**
 * ConsultationQualifyCta — section 6. The actual qualifier (budget /
 * authority / need / timing / contact info) now lives in a full-screen
 * modal shared with the hero's CTA — this section is just the on-page
 * teaser that opens it, so the multi-step form only ever exists once.
 */
export function ConsultationQualifyCta() {
  const { open } = useBookingModal();

  return (
    <section
      id="qualify"
      className="relative bg-canvas-2 py-28 md:py-36 scroll-mt-20"
    >
      <div className="container-narrow text-center">
        <SectionHeader
          align="center"
          eyebrow="One quick fit-check"
          title="Let's see if we're the right fit."
          size="md"
        />

        <Reveal delay={0.15}>
          <div className="mt-10">
            <div className="mb-5 flex justify-center">
              <ConsultationUrgencyBar />
            </div>
            <PillButton onClick={open} variant="ink" size="lg">
              Book your consultation
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
