"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { parseMetric } from "@/lib/parse-metric";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Render a metric string as an animated CountUp when the string can be
 *  parsed as a single number; otherwise fall back to the raw text. */
function AnimatedMetric({ value, className }: { value: string; className?: string }) {
  const p = parseMetric(value);
  if (!p.animatable) return <span className={className}>{value}</span>;
  return (
    <CountUp
      value={p.value}
      prefix={p.prefix}
      suffix={p.suffix}
      decimals={p.decimals}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ *
 * CaseStudies (home) — Mintlify-style bento grid.
 *
 * Layout (desktop, 12-col):
 *   ┌──────────────────── 12 ────────────────────┐  ROW 1 (wide hero)
 *   │            Gloco · $614K · featured         │
 *   ├──────── 6 ────────┬──────── 6 ─────────────┤  ROW 2 (split)
 *   │   PawSteps · $1.2M │  Squirtz · +412%        │
 *   ├──── 4 ────┬─── 4 ──┬──────── 4 ────────────┤  ROW 3 (triplet)
 *   │ Shilajit  │ Detail │   Pacelane              │
 *   └───────────┴────────┴─────────────────────────┘
 *
 * Each card is hover-tiltable, has a per-tone surface, and animates in
 * via a GSAP ScrollTrigger batch (staggered cascade as the section
 * enters). All cards link to /work/[slug].
 * ------------------------------------------------------------------ */

export function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // GSAP — staggered batch entrance for the bento cells
  useGSAP(
    () => {
      if (reduce) return;
      const cells = gsap.utils.toArray<HTMLElement>(".bento-cell");
      if (!cells.length) return;
      gsap.set(cells, { opacity: 0, y: 24, scale: 0.985 });

      ScrollTrigger.batch(cells, {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.85,
            ease: "power3.out",
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0,
            y: 24,
            scale: 0.985,
            stagger: 0.04,
            duration: 0.4,
            ease: "power2.in",
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [reduce] }
  );

  // We assume index 0 is the wide hero (Gloco)
  const [hero, ...rest] = caseStudies;

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="relative bg-canvas py-28 md:py-36 border-y border-hairline overflow-hidden"
    >
      {/* atmospheric gradient + paper grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 100% 0%, rgba(232,112,74,0.08) 0%, transparent 60%), " +
            "radial-gradient(50% 45% at 0% 100%, rgba(0,102,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">Case studies · the receipts</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] text-ink leading-[1.02]">
              <StaggerWords text="Brands we built" />
              <br />
              <StaggerWords
                text="from zero to scale."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                Real catalogs, real Amazon screenshots, real stats —
                what running sourcing through ads as one accountable
                team looks like in a P&amp;L.
              </p>
            </Reveal>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[16rem] md:auto-rows-[18rem] lg:auto-rows-[20rem] gap-4 md:gap-5">
          {/* Row 1 — wide hero */}
          <BentoCard
            study={hero}
            className="lg:col-span-12 lg:row-span-2"
            variant="hero"
          />

          {/* Row 2 — two halves */}
          <BentoCard
            study={rest[3] /* PawSteps — tall accent */}
            className="lg:col-span-7 lg:row-span-2"
            variant="split-image"
          />
          <BentoCard
            study={rest[0] /* Squirtz */}
            className="lg:col-span-5 lg:row-span-2"
            variant="metric-stack"
          />

          {/* Row 3 — three quarters */}
          <BentoCard
            study={rest[1] /* Shilajit */}
            className="lg:col-span-4"
            variant="standard"
          />
          <BentoCard
            study={rest[2] /* Detailcraft */}
            className="lg:col-span-4"
            variant="standard"
          />
          <BentoCard
            study={rest[4] /* Pacelane */}
            className="lg:col-span-4"
            variant="standard"
          />
        </div>

        {/* Footer strip */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-y-6 gap-x-8 border-t border-hairline-strong pt-8">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute">
            All metrics from Amazon Seller Central · Year-to-date 2026
          </p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-[0.9rem] font-medium text-ink hover:bg-ink hover:text-canvas hover:border-ink transition-all justify-self-start md:justify-self-end"
          >
            Explore all case studies
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

/* ------------------------------------------------------------------ *
 * BentoCard — variants:
 *   • hero          — full-width split (image left, content right)
 *   • split-image   — vertical, image on top, content under
 *   • metric-stack  — content-first, big number + 4-stat grid
 *   • standard      — image top, brand + metric below (regular tile)
 * ------------------------------------------------------------------ */

type BentoVariant = "hero" | "split-image" | "metric-stack" | "standard";

const tones: Record<
  CaseStudy["accent"],
  {
    bg: string;
    fg: string;
    mute: string;
    border: string;
    accent: string;
    glow: string;
  }
> = {
  electric: {
    bg: "bg-obsidian",
    fg: "text-canvas",
    mute: "text-canvas/55",
    border: "border-canvas/15",
    accent: "text-electric-glow",
    glow: "rgba(0,102,255,0.18)",
  },
  copper: {
    bg: "bg-copper",
    fg: "text-canvas",
    mute: "text-canvas/75",
    border: "border-canvas/25",
    accent: "text-canvas",
    glow: "rgba(232,112,74,0.25)",
  },
  obsidian: {
    bg: "bg-obsidian",
    fg: "text-canvas",
    mute: "text-canvas/55",
    border: "border-canvas/15",
    accent: "text-copper-soft",
    glow: "rgba(15,17,21,0.45)",
  },
  chrome: {
    bg: "bg-canvas-2",
    fg: "text-ink",
    mute: "text-ink-soft",
    border: "border-hairline-strong",
    accent: "text-copper",
    glow: "rgba(192,197,202,0.3)",
  },
  lime: {
    bg: "bg-lime",
    fg: "text-ink",
    mute: "text-ink/70",
    border: "border-ink/20",
    accent: "text-ink",
    glow: "rgba(217,255,60,0.35)",
  },
};

function BentoCard({
  study,
  className,
  variant,
}: {
  study: CaseStudy;
  className?: string;
  variant: BentoVariant;
}) {
  const tone = tones[study.accent];

  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn(
        "bento-cell group relative rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden border transition-all duration-500",
        tone.bg,
        tone.fg,
        tone.border,
        "hover:shadow-[0_30px_70px_-30px_rgba(15,17,21,0.32)]",
        className
      )}
    >
      {/* Soft inner glow */}
      <span
        aria-hidden="true"
        className="absolute -top-12 -right-12 h-48 w-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${tone.glow} 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {variant === "hero" && <HeroVariant study={study} tone={tone} />}
      {variant === "split-image" && <SplitImageVariant study={study} tone={tone} />}
      {variant === "metric-stack" && <MetricStackVariant study={study} tone={tone} />}
      {variant === "standard" && <StandardVariant study={study} tone={tone} />}
    </Link>
  );
}

/* --- HERO variant — split: content left, image right --- */
function HeroVariant({
  study,
  tone,
}: {
  study: CaseStudy;
  tone: (typeof tones)[CaseStudy["accent"]];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
      {/* LEFT — content */}
      <div className="lg:col-span-6 p-8 md:p-12 flex flex-col">
        <div className="flex items-center gap-3 mb-7">
          {study.logo ? (
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-canvas/10 backdrop-blur overflow-hidden p-1.5">
              <Image
                src={study.logo}
                alt={study.brand}
                width={28}
                height={28}
                className="object-contain"
              />
            </span>
          ) : null}
          <span
            className={cn(
              "font-mono text-[0.62rem] uppercase tracking-[0.22em]",
              tone.accent
            )}
          >
            Featured · 2026
          </span>
          <span className={cn("font-mono text-[0.62rem]", tone.mute)}>
            · {study.category}
          </span>
        </div>

        <h3
          className={cn(
            "display text-[clamp(2rem,3vw,3rem)] leading-[1.05] mb-3",
            tone.fg
          )}
        >
          {study.brand}
        </h3>
        <p className={cn("text-sm md:text-base mb-8", tone.mute)}>
          {study.productName}
        </p>

        {/* Headline metric */}
        <div className="mb-7">
          <p
            className={cn(
              "display text-[clamp(2.75rem,5vw,4.5rem)] leading-none mb-2 tabular-nums",
              tone.fg
            )}
          >
            <AnimatedMetric value={study.metric.value} />
          </p>
          <p
            className={cn(
              "font-mono text-[0.65rem] uppercase tracking-[0.18em]",
              tone.mute
            )}
          >
            {study.metric.label}
          </p>
        </div>

        {/* Outcome */}
        <p className={cn("text-[0.95rem] leading-[1.6] mb-8 max-w-md", tone.mute)}>
          {study.outcome}
        </p>

        <span
          className={cn(
            "mt-auto inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors",
            tone.fg,
            "group-hover:gap-2.5"
          )}
        >
          Read the case study
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      </div>

      {/* RIGHT — product image */}
      <div className="lg:col-span-6 relative bg-[#E2EEEB] min-h-[18rem] lg:min-h-0">
        <Image
          src={study.image}
          alt={`${study.brand} ${study.productName}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />
        <span className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-ink/90 backdrop-blur px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-canvas">
          <span className="h-1 w-1 rounded-full bg-copper" />
          Featured
        </span>
      </div>
    </div>
  );
}

/* --- SPLIT-IMAGE — image on top (~60%), content below --- */
function SplitImageVariant({
  study,
  tone,
}: {
  study: CaseStudy;
  tone: (typeof tones)[CaseStudy["accent"]];
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 bg-canvas-2/40 overflow-hidden min-h-[10rem]">
        <Image
          src={study.image}
          alt={`${study.brand} ${study.productName}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/85 backdrop-blur px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-canvas">
          <TrendingUp className="h-2.5 w-2.5 text-copper" strokeWidth={2.5} />
          <AnimatedMetric value={study.metric.value} />
        </span>
      </div>
      <div className="p-7 md:p-8">
        <span
          className={cn(
            "font-mono text-[0.6rem] uppercase tracking-[0.2em]",
            tone.mute
          )}
        >
          {study.category}
        </span>
        <h3
          className={cn(
            "display text-[1.6rem] md:text-[1.85rem] leading-[1.04] mt-2 mb-2",
            tone.fg
          )}
        >
          {study.brand}
        </h3>
        <p className={cn("text-[0.85rem] leading-[1.6]", tone.mute)}>
          {study.outcome}
        </p>
      </div>
    </div>
  );
}

/* --- METRIC-STACK — content-first, big number + 4 stats --- */
function MetricStackVariant({
  study,
  tone,
}: {
  study: CaseStudy;
  tone: (typeof tones)[CaseStudy["accent"]];
}) {
  return (
    <div className="p-8 md:p-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <span
          className={cn(
            "font-mono text-[0.6rem] uppercase tracking-[0.2em]",
            tone.mute
          )}
        >
          {study.category}
        </span>
        <span className={cn("font-mono text-[0.6rem]", tone.accent)}>· case</span>
      </div>

      <h3 className={cn("display text-[1.85rem] leading-[1.04] mb-2", tone.fg)}>
        {study.brand}
      </h3>
      <p className={cn("text-sm mb-7", tone.mute)}>{study.productName}</p>

      {/* Headline metric */}
      <p
        className={cn(
          "display text-[clamp(2.5rem,4.5vw,4rem)] leading-none mb-2 tabular-nums",
          tone.fg
        )}
      >
        <AnimatedMetric value={study.metric.value} />
      </p>
      <p
        className={cn(
          "font-mono text-[0.62rem] uppercase tracking-[0.18em] mb-8",
          tone.mute
        )}
      >
        {study.metric.label}
      </p>

      {/* 4-stat grid */}
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 mt-auto">
        {study.stats.slice(0, 4).map((s) => (
          <li key={s.label}>
            <p className={cn("display text-[1.1rem] leading-none mb-1 tabular-nums", tone.fg)}>
              <AnimatedMetric value={s.value} />
            </p>
            <p
              className={cn(
                "font-mono text-[0.55rem] uppercase tracking-[0.16em]",
                tone.mute
              )}
            >
              {s.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --- STANDARD — image small at top, content under --- */
function StandardVariant({
  study,
  tone,
}: {
  study: CaseStudy;
  tone: (typeof tones)[CaseStudy["accent"]];
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative h-[55%] bg-canvas-2/40 overflow-hidden">
        <Image
          src={study.image}
          alt={`${study.brand} ${study.productName}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              "font-mono text-[0.58rem] uppercase tracking-[0.2em]",
              tone.mute
            )}
          >
            {study.category}
          </span>
          <span
            className={cn(
              "font-mono text-[0.58rem] tracking-[0.16em]",
              tone.accent
            )}
          >
            <AnimatedMetric value={study.metric.value} />
          </span>
        </div>
        <h3 className={cn("display text-[1.35rem] leading-[1.05] mb-1.5", tone.fg)}>
          {study.brand}
        </h3>
        <p className={cn("text-[0.78rem] leading-[1.55] mt-auto", tone.mute)}>
          {study.outcome.length > 100
            ? study.outcome.slice(0, 100).trim() + "…"
            : study.outcome}
        </p>
      </div>
    </div>
  );
}
