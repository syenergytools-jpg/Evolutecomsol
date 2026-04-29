"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { Spotlight, SpotlightItem } from "@/components/ui/spotlight";
import { ArrowUpRight, TrendingUp } from "lucide-react";

/**
 * SpotlightStats — bento grid of real Amazon Seller Central
 * screenshots from `/public/stats/results/`. Center-bottom cell is a
 * 2×2 anchor with a manifesto-style copy block. Cursor-tracked
 * spotlight lights the cell underneath via the Spotlight primitive.
 *
 * No fabricated numbers — every chart is a real screenshot from a
 * brand we built (Gloco $614K, Squirtz, Shilajit AU, etc.).
 */

type Box = {
  id: string;
  src: string;
  alt: string;
  label: string;
  /** grid placement — drives layout */
  className: string;
};

const BOXES: Box[] = [
  {
    id: "gloco",
    src: "/stats/results/gloco_stats.png",
    alt: "Gloco · Amazon sales snapshot",
    label: "Gloco · $614K YTD",
    className:
      "lg:col-start-1 lg:col-span-2 lg:row-start-1",
  },
  {
    id: "squirtz",
    src: "/stats/results/squirtz-sales.jpeg",
    alt: "Squirtz · sales chart",
    label: "Squirtz · +412%",
    className:
      "lg:col-start-3 lg:col-span-3 lg:row-start-1",
  },
  {
    id: "shilajit",
    src: "/stats/results/shilajit-au-sales.jpeg",
    alt: "Shilajit Co. · Australia sales",
    label: "Shilajit · 5.2× GMV",
    className:
      "lg:col-start-1 lg:col-span-2 lg:row-start-2",
  },
  {
    id: "lovixa",
    src: "/stats/results/lovixa-uk-sales.jpeg",
    alt: "Lovixa · UK sales",
    label: "Lovixa · UK launch",
    className:
      "lg:col-start-3 lg:col-span-3 lg:row-start-2",
  },
  // Center-bottom anchor — manifesto card spanning two columns + two rows
  {
    id: "anchor",
    src: "",
    alt: "",
    label: "Anchor",
    className:
      "lg:col-start-1 lg:col-span-5 lg:row-start-3 lg:row-span-2",
  },
];

export function SpotlightStats() {
  return (
    <section className="relative bg-obsidian text-canvas py-24 md:py-32 border-y border-canvas/10 overflow-hidden">
      {/* Quiet grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(232,112,74,0.16) 0%, transparent 65%)",
        }}
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-copper-soft mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-canvas/30" />
                Real receipts · real screenshots
              </p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.04]">
              <StaggerWords text="Stats we" />{" "}
              <StaggerWords
                text="actually shipped."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper-soft"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-canvas/65 leading-[1.65] max-w-md lg:ml-auto">
                Pulled directly from Seller Central. No synthetic
                charts dressed up in our colors — these are the real
                dashboards from brands we built.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Bento grid */}
        <Spotlight className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:auto-rows-[clamp(11rem,16vw,15rem)] gap-3 md:gap-4">
          {BOXES.map((box, i) => {
            const isAnchor = box.id === "anchor";
            return (
              <SpotlightItem
                key={box.id}
                className={`${box.className} rounded-[1.25rem] border border-canvas/10 bg-gradient-to-br from-[#0c0c0c] to-[#1f1f24]`}
                color="rgba(232,112,74,0.22)"
              >
                {isAnchor ? <AnchorCard /> : <ChartCard box={box} index={i} />}
              </SpotlightItem>
            );
          })}
        </Spotlight>

        {/* Caption strip below */}
        <div className="mt-10 md:mt-12 flex items-center justify-between">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/45">
            Year-to-date 2026 · Amazon Seller Central
          </p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/70 hover:text-copper transition-colors"
          >
            All case studies
            <ArrowUpRight
              className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * Single chart cell — image fills, label chip top-left.
 * ---------------------------------------------------------------- */
function ChartCard({ box, index }: { box: Box; index: number }) {
  return (
    <div className="relative h-full w-full">
      {/* Chart screenshot */}
      <Image
        src={box.src}
        alt={box.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-contain p-4 md:p-6"
      />

      {/* Top-left metric chip */}
      <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-canvas/95 backdrop-blur px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink shadow-[0_8px_18px_-8px_rgba(15,17,21,0.45)]">
        <TrendingUp className="h-2.5 w-2.5 text-copper" strokeWidth={2.5} />
        {box.label}
      </span>

      {/* Index stamp bottom-right */}
      <span className="absolute bottom-4 right-5 z-10 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-canvas/40">
        0{index + 1} / 0{BOXES.length - 1}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Anchor manifesto card — sits at the bottom spanning the grid.
 * ---------------------------------------------------------------- */
function AnchorCard() {
  return (
    <div className="relative h-full w-full p-7 md:p-10 flex flex-col justify-between">
      {/* Decorative concentric rings — quiet copper */}
      <svg
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] opacity-30 pointer-events-none"
        viewBox="0 0 600 600"
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(232,112,74,0.45)" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="300" cy="300" r="220" fill="none" stroke="rgba(232,112,74,0.30)" strokeWidth="1" strokeDasharray="2 5" />
        <circle cx="300" cy="300" r="160" fill="none" stroke="rgba(232,112,74,0.20)" strokeWidth="1" />
      </svg>

      <div className="relative max-w-2xl">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-copper-soft mb-5">
          The flywheel
        </p>
        <h3 className="display text-[clamp(1.85rem,4vw,3.4rem)] leading-[1.05] mb-5">
          Same product, different trajectory.
        </h3>
        <p className="text-base md:text-lg text-canvas/70 leading-[1.6] max-w-xl">
          Sourcing → photography → listing → ads → freight, run as one
          team. Every move feeds the next, and the dashboard tells you
          which lever moved the number.
        </p>
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-5 py-2.5 text-[0.9rem] font-medium hover:bg-canvas/90 transition-all hover:-translate-y-0.5"
        >
          Brief our team
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-canvas/45">
          240+ brands · $420M GMV · ROAS 3.4×
        </span>
      </div>
    </div>
  );
}
