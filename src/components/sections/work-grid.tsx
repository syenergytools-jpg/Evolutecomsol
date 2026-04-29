"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const accentText: Record<CaseStudy["accent"], string> = {
  electric: "text-electric",
  copper: "text-copper",
  obsidian: "text-ink",
  chrome: "text-chrome-4",
  lime: "text-ink",
};

const accentBg: Record<CaseStudy["accent"], string> = {
  electric: "bg-electric/8",
  copper: "bg-copper/10",
  obsidian: "bg-obsidian/5",
  chrome: "bg-chrome-2/30",
  lime: "bg-lime/15",
};

const PROMPT_BY_SLUG: Record<string, { alt: string; prompt: string }> = {
  "outdoor-dtc": {
    alt: "Outdoor brand hero — adventure photography",
    prompt:
      "Editorial outdoor adventure photography. A premium camping bottle on a moss-covered rock, golden hour light, mountain backdrop softly out of focus, hyperreal detail, cinematic color grade, no logos, no text, 4:3 ratio, magazine cover quality.",
  },
  "wellness-7fig": {
    alt: "Wellness product on stone backdrop — beauty editorial",
    prompt:
      "Wellness brand editorial. A frosted glass dropper bottle on warm beige sandstone, single soft daylight, gentle water droplets, shallow depth of field, beauty magazine quality, no labels, no text, 4:3 ratio, cinematic color.",
  },
  "beauty-dtc": {
    alt: "Beauty brand flat lay — cosmetic kit",
    prompt:
      "Overhead flat-lay beauty editorial. A monochrome cosmetic kit (compact, brush, frosted bottle) on dusty pink linen, soft afternoon window light, long gentle shadows, magazine spread aesthetic, no logos, no text, 4:3 ratio, ultra crisp.",
  },
  "tech-accessories": {
    alt: "Sleek tech device on dark seamless backdrop",
    prompt:
      "Editorial tech product photography. A minimalist matte-black wireless earbuds case floating on a deep charcoal seamless backdrop, single hard rim light, subtle blue accent reflection, cinematic crisp focus, no logos, no text, 4:3 ratio, premium gadget aesthetic.",
  },
  "home-kitchen": {
    alt: "Home & kitchen brand — warm interior still life",
    prompt:
      "Lifestyle still-life of a hand-thrown ceramic mug and walnut cutting board on a warm oak counter, soft morning daylight from the side, steam wisps rising, ASMR cozy vibe, no labels, no text, 4:3 ratio, editorial home magazine quality.",
  },
  "supplements": {
    alt: "Supplement bottle with botanical accents",
    prompt:
      "Editorial supplement photography. An amber glass capsule bottle on a smooth taupe surface with sage botanicals to one side, soft morning daylight, magazine quality, hyperreal detail, no labels, no text, 4:3 ratio, premium wellness brand mood.",
  },
};

export function WorkGrid() {
  return (
    <section id="work" className="relative bg-canvas py-24 md:py-32">
      <div className="container-x">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">Selected work · 2018 — 2026</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] text-ink leading-[1.02]">
              <StaggerWords text="We don't talk." />
              <br />
              <StaggerWords
                text="We show."
                delayStart={0.18}
                wordClassName="italic font-normal text-ink-soft"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-mute leading-[1.6] max-w-md">
                Six brands, six shapes of compounding. Hover a card to see the
                full picture; click to read the case study.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {caseStudies.map((study, i) => (
            <WorkCard key={study.slug} study={study} index={i} />
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-14 text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-6 py-3 text-sm font-medium text-ink hover:bg-canvas-2 transition-colors"
          >
            View all case studies
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ study, index }: { study: CaseStudy; index: number }) {
  const promptData = PROMPT_BY_SLUG[study.slug] ?? {
    alt: study.brand,
    prompt: "Editorial product photography, 4:3 ratio.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.85,
        ease: PREMIUM_EASE,
        delay: (index % 3) * 0.06,
      }}
    >
      <Link
        href={`/work/${study.slug}`}
        className="group block relative overflow-hidden rounded-3xl border border-hairline bg-surface"
      >
        {/* Image slot */}
        <div className="relative overflow-hidden">
          <ImagePlaceholder
            alt={promptData.alt}
            prompt={promptData.prompt}
            aspectRatio="4/3"
            variant="accent"
            className="border-0 rounded-none transition-transform duration-700 group-hover:scale-105"
          />
          {/* Hover overlay — slides up from bottom */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500",
              "bg-gradient-to-t from-obsidian via-obsidian/95 to-transparent text-canvas"
            )}
          >
            <div className="flex items-end justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/60 mb-1.5">
                  Read the case study
                </p>
                <p className="text-sm font-semibold leading-snug">
                  {study.outcome.split(",")[0]}
                </p>
              </div>
              <span className="conic-chrome h-9 w-9 rounded-full p-[2px] shrink-0">
                <span className="block h-full w-full rounded-full bg-obsidian grid place-items-center">
                  <ArrowUpRight className="h-4 w-4 text-canvas" strokeWidth={2.2} />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between mb-4">
            <span className={cn("font-mono text-[0.65rem] uppercase tracking-[0.18em]", accentText[study.accent])}>
              {study.category}
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-mute">
              0{index + 1} / 0{caseStudies.length}
            </span>
          </div>

          <h3 className="display text-[clamp(1.5rem,2.4vw,2rem)] text-ink leading-[1.1] mb-3">
            {study.brand}
          </h3>
          <p className="text-sm text-mute leading-relaxed mb-5 line-clamp-2">
            {study.challenge}
          </p>

          <div className={cn("rounded-2xl px-4 py-3 flex items-center justify-between", accentBg[study.accent])}>
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-wider text-mute mb-0.5">
                {study.metric.label}
              </p>
              <p className="text-base font-semibold text-ink">{study.metric.value}</p>
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-mute">
              {study.duration}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
