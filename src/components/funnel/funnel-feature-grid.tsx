"use client";

import { Reveal } from "@/components/ui/reveal";
import { FunnelHeading } from "./funnel-heading";
import { funnelAccent } from "./funnel-theme";
import { FunnelCtaButton } from "./funnel-cta-button";
import { useFunnelBookingModal } from "./funnel-booking-modal";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelFeatureGrid — "what this looks like in practice", the reference
 * site's 6-card icon grid. Content comes straight from each service's
 * real `features` (or, on /legal, `ipAccelerator.benefits`) in
 * site-config — nothing invented per page, see each *-content.ts.
 */
export function FunnelFeatureGrid({ content }: { content: FunnelContent }) {
  const { open } = useFunnelBookingModal();
  const accent = funnelAccent[content.accent];

  return (
    <section className="relative bg-obsidian-soft py-16 md:py-32">
      <div className="container-x">
        <FunnelHeading
          accent={content.accent}
          eyebrow={content.features.eyebrow}
          title={content.features.title}
          subtitle={content.features.subtitle}
        />

        <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {content.features.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-[1.5rem] border border-canvas/10 bg-canvas/[0.03] p-6 md:p-7 transition-colors duration-300 hover:bg-canvas/[0.06]">
                  <div className="flex items-center gap-4 mb-4">
                    <span
                      className={`shrink-0 grid place-items-center h-12 w-12 md:h-14 md:w-14 rounded-2xl ${accent.tint} ${accent.fg} transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.8} />
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold text-canvas leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-[1.05rem] text-canvas/60 leading-relaxed transition-colors duration-300">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-16 text-center">
            <FunnelCtaButton accent={content.accent} onClick={open} size="lg">
              {content.features.ctaLabel}
            </FunnelCtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
