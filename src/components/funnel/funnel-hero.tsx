"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { StaggerWords, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { funnelAccent, accentBorder } from "./funnel-theme";
import { FunnelCtaButton } from "./funnel-cta-button";
import { useFunnelBookingModal } from "./funnel-booking-modal";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelHero — the reference site's opening beat: big promise headline,
 * a tinted callout line, subhead, THEN the proof video inline (matching
 * the reference, which plays its sales video directly inside the hero,
 * not as a separate section below it — moved here from the standalone
 * FunnelVideo section per explicit request), then the CTA + proof
 * stats — all on a dark ground (the reference runs dark start to
 * finish; this is where that departs from /consultation's light hero
 * on purpose, to keep the same structure/mood as the page we're
 * matching).
 */
export function FunnelHero({ content }: { content: FunnelContent }) {
  const { open } = useFunnelBookingModal();
  const accent = funnelAccent[content.accent];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function play() {
    videoRef.current?.play().catch(() => undefined);
  }

  return (
    <section
      id="hero"
      className="relative bg-obsidian overflow-hidden pt-14 md:pt-20 pb-16 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--canvas) 6%, transparent) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(55% 55% at 50% 0%, ${accent.glowSoft} 0%, transparent 65%)`,
        }}
      />

      <div className="container-x relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow justify-center text-canvas/55 mb-6">
              {content.hero.eyebrow}
            </p>
          </Reveal>

          <h1
            className="display text-[clamp(2rem,7vw,5.25rem)] text-canvas [--h1-lh:1.15] md:[--h1-lh:1.05]"
            style={{ lineHeight: "var(--h1-lh)", letterSpacing: "-0.01em" }}
          >
            <StaggerWords text={content.hero.headlineLead} />
            <br />
            <StaggerWords
              text={content.hero.headlineAccent}
              delayStart={0.24}
              wordClassName={`italic font-normal ${accent.fg}`}
            />
          </h1>

          <Reveal delay={0.35}>
            <p
              className="mt-7 md:mt-8 inline-block rounded-[1.25rem] border px-5 py-2.5 sm:px-6 sm:py-3 text-lg sm:text-xl font-medium italic text-canvas leading-[1.5] text-balance transition-colors duration-500"
              style={{ ...accentBorder(content.accent), background: `color-mix(in oklab, ${accent.hex} 12%, transparent)` }}
            >
              {content.hero.badge}
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <p className="mt-7 md:mt-6 text-lg sm:text-xl md:text-2xl text-canvas/70 leading-[1.7] sm:leading-[1.6] max-w-2xl mx-auto text-balance">
              {content.hero.subhead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <div className="mt-9 md:mt-10 max-w-3xl mx-auto relative aspect-video rounded-[0.875rem] overflow-hidden bg-obsidian-soft border border-canvas/10">
            <video
              ref={videoRef}
              src="/funnel-intro.mp4"
              poster="/funnel-intro-poster.jpg"
              preload="metadata"
              playsInline
              controls={started}
              onPlay={() => setStarted(true)}
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="How Evolut runs the engagement"
            />

            {!started && (
              <button
                type="button"
                onClick={play}
                aria-label="Play the intro video"
                className="group absolute inset-0 grid place-items-center cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent"
                />
                <span className="relative grid place-items-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-canvas/95 text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105">
                  <Play className="h-6 w-6 md:h-7 md:w-7 translate-x-0.5" fill="currentColor" strokeWidth={0} />
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 md:mt-12 text-center">
            <FunnelCtaButton accent={content.accent} onClick={open} size="lg">
              {content.hero.ctaLabel}
            </FunnelCtaButton>

            <p className="mt-6 max-w-xl mx-auto text-[0.8rem] leading-relaxed text-canvas/45">
              {content.hero.disclaimer}
            </p>
          </div>
        </Reveal>

        {/* Real, page-specific trust badges (content.hero.heroBadges —
            e.g. Amazon SPN Certified + Trustpilot on /amazon, the legal
            credential seals on /legal, Shopify Certified + Software
            Development on /shopify) — replaces the earlier redundant
            240+/18,000+/3.4×/9 mini-stats (those numbers are still
            shown, once, in <FunnelStatsBar/> below). `loading="eager"`
            is deliberate: these sit inside a <Reveal>, which renders its
            child at opacity:0 until its own in-view check fires — the
            browser was deprioritizing (sometimes indefinitely, in
            testing) the native lazy-load fetch for an <img> inside an
            invisible ancestor, racing the reveal animation against an
            image that hadn't started loading yet. Gap is tighter
            pre-`sm:` — Amazon's SPN wordmark + Trustpilot mark together
            wrapped to 2 lines at the old gap-8 on a 375px screen. */}
        <Reveal delay={0.2}>
          <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12">
            {content.hero.heroBadges.map((badge) => (
              <Image
                key={badge.src}
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                loading="eager"
                className={cn(badge.className ?? "h-16 md:h-20", "w-auto rounded-lg")}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
