"use client";

import { useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "@/components/ui/reveal";
import { FunnelHeading } from "./funnel-heading";
import { funnelAccent } from "./funnel-theme";
import { FunnelCtaButton } from "./funnel-cta-button";
import { useFunnelBookingModal } from "./funnel-booking-modal";
import type { FunnelContent } from "./funnel-types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const SINGLE_COLUMN_QUERY = "(max-width: 639px)";

function subscribeSingleColumn(callback: () => void) {
  const mq = window.matchMedia(SINGLE_COLUMN_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/** True below Tailwind's `sm` (640px) — where this grid is single-column. */
function useIsSingleColumn() {
  return useSyncExternalStore(
    subscribeSingleColumn,
    () => window.matchMedia(SINGLE_COLUMN_QUERY).matches,
    () => false
  );
}

/**
 * Below `sm:` (640px, where this grid drops to a single column), each
 * `[data-feature-card]` (rendered only in that branch — see FeatureCard
 * below) gets its entrance tied DIRECTLY to scroll position (`scrub`,
 * not a fixed-duration animation triggered past a threshold) —
 * alternating left/right per card index, per explicit request: "as user
 * scroll this section the cards came from left and right", not
 * something that fires on its own before the user gets there. A
 * scrub-driven transform is a continuous function of scroll offset, so
 * unlike a threshold+timer reveal it structurally cannot play before
 * the user actually scrolls a card into range. `dependencies:
 * [isSingleColumn]` re-runs (and auto-reverts the previous pass) once
 * the single-column branch has actually rendered its cards — without
 * it, this could run once on mount against a DOM that's still showing
 * the <Reveal>-wrapped desktop branch and find nothing to animate.
 */
function useMobileSlideIn(scopeRef: React.RefObject<HTMLDivElement | null>, isSingleColumn: boolean) {
  useGSAP(
    () => {
      if (!isSingleColumn) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = scopeRef.current?.querySelectorAll<HTMLElement>("[data-feature-card]");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -64 : 64, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 55%",
              scrub: 0.3,
            },
          }
        );
      });
    },
    { scope: scopeRef, dependencies: [isSingleColumn] }
  );
}

/**
 * FeatureCard — at `sm:` and up, the plain <Reveal> fade-up every other
 * card grid in this family uses (unchanged). Below that, renders
 * unwrapped with `data-feature-card` so useMobileSlideIn's GSAP
 * ScrollTrigger can find and drive it directly — deliberately NOT also
 * wrapped in <Reveal> there, since Reveal's own opacity would gate
 * visibility independently of GSAP's scroll-linked one.
 */
function FeatureCard({
  delay,
  isSingleColumn,
  children,
}: {
  delay: number;
  isSingleColumn: boolean;
  children: React.ReactNode;
}) {
  if (!isSingleColumn) {
    return <Reveal delay={delay}>{children}</Reveal>;
  }
  return <div data-feature-card>{children}</div>;
}

/**
 * FunnelFeatureGrid — "what this looks like in practice", the reference
 * site's 6-card icon grid. Content comes straight from each service's
 * real `features` (or, on /legal, `ipAccelerator.benefits`) in
 * site-config — nothing invented per page, see each *-content.ts.
 */
export function FunnelFeatureGrid({ content }: { content: FunnelContent }) {
  const { open } = useFunnelBookingModal();
  const accent = funnelAccent[content.accent];
  const gridRef = useRef<HTMLDivElement>(null);
  const isSingleColumn = useIsSingleColumn();
  useMobileSlideIn(gridRef, isSingleColumn);

  return (
    <section className="relative bg-obsidian-soft py-16 md:py-32">
      <div className="container-x">
        <FunnelHeading
          accent={content.accent}
          eyebrow={content.features.eyebrow}
          title={content.features.title}
          subtitle={content.features.subtitle}
        />

        <div ref={gridRef} className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {content.features.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <FeatureCard key={item.title} delay={(i % 3) * 0.08} isSingleColumn={isSingleColumn}>
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
              </FeatureCard>
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
