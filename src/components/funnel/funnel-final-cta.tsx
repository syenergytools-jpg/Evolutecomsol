"use client";

import { Reveal } from "@/components/ui/reveal";
import { FunnelHeading } from "./funnel-heading";
import { FunnelCtaButton } from "./funnel-cta-button";
import { useFunnelBookingModal } from "./funnel-booking-modal";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelFinalCta — last beat before the footer, mirrors the reference
 * site's closing "Ready to build a real business asset?" panel.
 */
export function FunnelFinalCta({ content }: { content: FunnelContent }) {
  const { open } = useFunnelBookingModal();

  return (
    <section className="relative bg-obsidian-soft py-16 md:py-28 border-t border-canvas/10">
      <div className="container-narrow text-center">
        <FunnelHeading accent={content.accent} title={content.finalCta.title} className="mx-auto" />
        <Reveal delay={0.1}>
          <p className="text-lg md:text-xl text-canvas/65 max-w-xl mx-auto mb-9 leading-relaxed">
            {content.finalCta.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <FunnelCtaButton accent={content.accent} onClick={open} size="lg">
            {content.finalCta.ctaLabel}
          </FunnelCtaButton>
          <p className="mt-6 text-sm text-canvas/45 max-w-md mx-auto">
            {content.finalCta.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
