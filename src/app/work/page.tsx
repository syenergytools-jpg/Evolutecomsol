import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CTA } from "@/components/sections/cta";
import { caseStudies, type CaseStudy } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { parseMetric } from "@/lib/parse-metric";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work · case studies",
  description:
    "Six brands we built from zero to scale — sourcing, listings, photography, ads, freight, and trademark, run as one accountable team.",
};

/* ------------------------------------------------------------------ *
 * /work — full bento-grid case-study index. Same surface tone as the
 * home-page CaseStudies section, but expanded so every brand has a
 * cell. Filter chip strip across the top scopes by category.
 * ------------------------------------------------------------------ */

const tones: Record<
  CaseStudy["accent"],
  { bg: string; fg: string; mute: string; border: string; accent: string }
> = {
  electric: {
    bg: "bg-obsidian",
    fg: "text-canvas",
    mute: "text-canvas/55",
    border: "border-canvas/15",
    accent: "text-electric-glow",
  },
  copper: {
    bg: "bg-copper",
    fg: "text-canvas",
    mute: "text-canvas/75",
    border: "border-canvas/25",
    accent: "text-canvas",
  },
  obsidian: {
    bg: "bg-obsidian",
    fg: "text-canvas",
    mute: "text-canvas/55",
    border: "border-canvas/15",
    accent: "text-copper-soft",
  },
  chrome: {
    bg: "bg-canvas-2",
    fg: "text-ink",
    mute: "text-ink-soft",
    border: "border-hairline-strong",
    accent: "text-copper",
  },
  lime: {
    bg: "bg-lime",
    fg: "text-ink",
    mute: "text-ink/70",
    border: "border-ink/20",
    accent: "text-ink",
  },
};

const FILTERS = [
  "All",
  "Wellness",
  "CPG",
  "Outdoor",
  "Pets",
  "Auto",
  "Supplements",
];

export default function WorkIndexPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-canvas pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden border-b border-hairline">
          {/* atmosphere */}
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-12 md:mb-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <p className="eyebrow eyebrow-line mb-6">
                    Work · {caseStudies.length} case studies
                  </p>
                </Reveal>
                <h1 className="display text-[clamp(2.5rem,6vw,5.5rem)] text-ink leading-[1.02]">
                  <StaggerWords text="Real brands." />
                  <br />
                  <StaggerWords
                    text="Real receipts."
                    delayStart={0.18}
                    wordClassName="italic font-normal text-copper"
                  />
                </h1>
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={0.25}>
                  <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                    From a prototype to a six-figure listing. From a
                    plateau to a 4× revenue run-rate. Every case is the
                    full stack — sourcing through ads — run as one
                    team.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Filter chips (visual scope only — clientless v1) */}
            <Reveal delay={0.35}>
              <div className="flex flex-wrap items-center gap-2 mb-12 md:mb-14">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mute mr-2">
                  Filter ·
                </span>
                {FILTERS.map((f, i) => (
                  <span
                    key={f}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em]",
                      i === 0
                        ? "bg-ink text-canvas border-ink"
                        : "border-hairline-strong text-ink-soft"
                    )}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* BENTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[16rem] md:auto-rows-[18rem] lg:auto-rows-[20rem] gap-4 md:gap-5">
              {caseStudies.map((study, i) => (
                <BentoCell
                  key={study.slug}
                  study={study}
                  className={sizeForIndex(i)}
                />
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

function sizeForIndex(i: number): string {
  const pattern = [
    "lg:col-span-12 lg:row-span-2", // 0 — wide hero (Gloco)
    "lg:col-span-7 lg:row-span-2", // 1 — wide tall
    "lg:col-span-5 lg:row-span-2", // 2 — narrow tall
    "lg:col-span-4", // 3
    "lg:col-span-4", // 4
    "lg:col-span-4", // 5
    "lg:col-span-6", // 6
    "lg:col-span-6", // 7
  ];
  return pattern[i] ?? "lg:col-span-4";
}

function BentoCell({
  study,
  className,
}: {
  study: CaseStudy;
  className?: string;
}) {
  const tone = tones[study.accent];
  const m = parseMetric(study.metric.value);
  return (
    <Link
      href={`/work/${study.slug}`}
      className={cn(
        "group relative rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden border transition-all duration-500",
        tone.bg,
        tone.fg,
        tone.border,
        "hover:shadow-[0_30px_70px_-30px_rgba(15,17,21,0.32)]",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Image — bigger area so the product reads */}
        <div className="relative flex-1 bg-canvas-2/40 overflow-hidden min-h-[10rem]">
          <Image
            src={study.image}
            alt={`${study.brand} ${study.productName}`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* metric chip top-left */}
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/90 backdrop-blur px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-canvas">
            <TrendingUp className="h-2.5 w-2.5 text-copper" strokeWidth={2.5} />
            {m.animatable ? (
              <CountUp
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                decimals={m.decimals}
              />
            ) : (
              study.metric.value
            )}
          </span>
          {study.logo ? (
            <span className="absolute bottom-4 left-4 grid place-items-center h-10 w-10 rounded-xl bg-canvas/95 backdrop-blur overflow-hidden p-1.5 shadow-[0_8px_18px_-8px_rgba(15,17,21,0.18)]">
              <Image
                src={study.logo}
                alt={study.brand}
                width={32}
                height={32}
                className="object-contain"
              />
            </span>
          ) : null}
        </div>

        {/* Content — richer, with the BIG metric prominent */}
        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between mb-3">
            <span className={cn("font-mono text-[0.6rem] uppercase tracking-[0.2em]", tone.mute)}>
              {study.category}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 font-mono text-[0.6rem] tracking-[0.16em] transition-all",
                tone.accent,
                "group-hover:gap-2"
              )}
            >
              Open
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            </span>
          </div>
          <h3 className={cn("display text-[1.5rem] leading-[1.05] mb-1.5", tone.fg)}>
            {study.brand}
          </h3>
          <p className={cn("text-[0.78rem] leading-[1.55] mb-4", tone.mute)}>
            {study.productName}
          </p>

          {/* big animated headline metric */}
          <p className={cn("display text-[1.6rem] leading-none mb-1 tabular-nums", tone.fg)}>
            {m.animatable ? (
              <CountUp
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                decimals={m.decimals}
              />
            ) : (
              study.metric.value
            )}
          </p>
          <p className={cn("font-mono text-[0.55rem] uppercase tracking-[0.16em]", tone.mute)}>
            {study.metric.label}
          </p>
        </div>
      </div>
    </Link>
  );
}
