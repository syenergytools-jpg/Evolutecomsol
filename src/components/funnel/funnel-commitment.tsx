"use client";

import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { FunnelHeading } from "./funnel-heading";
import { FunnelCtaButton } from "./funnel-cta-button";
import { useFunnelBookingModal } from "./funnel-booking-modal";
import { funnelAccent } from "./funnel-theme";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelCommitment — the reference site's "our commitment to you"
 * guarantee beat. Deliberately NOT a copy of its literal claim ("if you
 * don't profit, we work for free") — that is a specific financial
 * guarantee tied to their capital-partnership model, and inventing an
 * equivalent for Evolut on the business owner's behalf is exactly the
 * kind of fabricated promise this codebase's honesty rules (see
 * consultation-urgency-bar.tsx, consultation-countdown.tsx) exist to
 * avoid. Instead this renders REAL, already-stated commitments from
 * site-config's `faqs` (the 30-day exit clause) plus the page's own
 * `content.commitment.points` — each page supplies points grounded in
 * its actual service features, nothing new promised here.
 */
export function FunnelCommitment({ content }: { content: FunnelContent }) {
  const { open } = useFunnelBookingModal();
  const accent = funnelAccent[content.accent];

  return (
    <section className="relative bg-obsidian py-16 md:py-32">
      <div className="container-x">
        {/* Ring badge — visual match for the reference site's circular
            "16 MONTH ASSURANCE" graphic. The value inside is always one
            already shown elsewhere on the page (hero proof / stats /
            the points below) — see funnel-types.ts's note on
            `commitment.badge`. */}
        <Reveal>
          <div className="flex justify-center mb-8 md:mb-10">
            <div
              className="relative grid place-items-center h-32 w-32 md:h-36 md:w-36 rounded-full"
              style={{ border: `2px solid ${accent.hex}` }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-2 rounded-full opacity-30 blur-lg"
                style={{ background: accent.glowSoft }}
              />
              <span className="relative text-center px-2">
                <span className={`block font-mono text-[1.15rem] md:text-[1.3rem] font-bold tabular-nums ${accent.fg}`}>
                  {content.commitment.badge.value}
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        <FunnelHeading
          accent={content.accent}
          eyebrow={content.commitment.eyebrow}
          title={content.commitment.title}
        />

        <Reveal delay={0.05}>
          <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-canvas/45">
            {content.commitment.badge.label}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl mx-auto text-center text-base md:text-lg text-canvas/65 leading-relaxed">
            {content.commitment.body}
          </p>
        </Reveal>

        <div className="mt-12 md:mt-14 max-w-4xl mx-auto grid sm:grid-cols-3 gap-5 md:gap-6">
          {content.commitment.points.map((point, i) => (
            <Reveal key={point.title} delay={0.1 + i * 0.08}>
              <div className="group h-full rounded-2xl border border-canvas/10 bg-canvas/[0.03] p-6 transition-colors duration-300 hover:bg-canvas/[0.06]">
                <span className={`grid place-items-center h-10 w-10 rounded-full ${accent.tint} ${accent.fg} mb-4 transition-transform duration-300 group-hover:scale-105`}>
                  <ShieldCheck className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-canvas/40 mb-2">
                  0{i + 1}
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-canvas mb-2">
                  {point.title}
                </h3>
                <p className="text-base text-canvas/55 leading-relaxed">{point.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 md:mt-14 text-center">
            <FunnelCtaButton accent={content.accent} onClick={open} size="lg">
              {content.commitment.ctaLabel}
            </FunnelCtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
