"use client";

import { X, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { FunnelHeading } from "./funnel-heading";
import { FunnelCtaButton } from "./funnel-cta-button";
import { useFunnelBookingModal } from "./funnel-booking-modal";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelQualify — the reference site's "who this is NOT / IS for" two
 * column self-selection block. Criteria are written around real budget
 * bands (site-config's BUDGETS, via the booking form) rather than the
 * reference's "$30K–$100K to invest" capital-partnership framing —
 * Evolut runs a management retainer, not an equity/capital-partner
 * model, so the qualifying bar has to describe that business honestly.
 */
export function FunnelQualify({ content }: { content: FunnelContent }) {
  const { open } = useFunnelBookingModal();

  return (
    <section id="qualify" className="relative bg-obsidian py-16 md:py-32 scroll-mt-20">
      <div className="container-x">
        <FunnelHeading
          accent={content.accent}
          eyebrow={content.qualify.eyebrow}
          title={content.qualify.title}
        />

        <div className="mt-14 md:mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-5 md:gap-6">
          <Reveal>
            <div className="h-full rounded-[1.5rem] border border-canvas/10 bg-canvas/[0.03] p-7 md:p-8 transition-colors duration-300 hover:bg-canvas/[0.05]">
              <h3 className="text-xl md:text-2xl font-semibold text-canvas mb-5">
                {content.qualify.not.heading}
              </h3>
              <ul className="space-y-4">
                {content.qualify.not.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-canvas/10 text-canvas/50 shrink-0">
                      <X className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span className="text-base md:text-[1.05rem] text-canvas/60 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="h-full rounded-[1.5rem] border p-7 md:p-8 transition-colors duration-300"
              style={{ borderColor: "color-mix(in oklab, var(--emerald) 30%, transparent)", background: "color-mix(in oklab, var(--emerald) 8%, transparent)" }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-canvas mb-5">
                {content.qualify.is.heading}
              </h3>
              <ul className="space-y-4">
                {content.qualify.is.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-emerald/15 text-emerald shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-base md:text-[1.05rem] text-canvas/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 md:mt-14 text-center">
            <FunnelCtaButton accent={content.accent} onClick={open} size="lg">
              {content.qualify.ctaLabel}
            </FunnelCtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
