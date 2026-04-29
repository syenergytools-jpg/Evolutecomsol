"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import {
  SwapyLayout,
  SwapySlot,
  SwapyItem,
  DragHandle,
} from "@/components/ui/swapy";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ *
 * BentoBrand — 9-cell bento, Evolut-themed, with drag-to-rearrange.
 *
 * Each cell is wrapped in a SwapySlot+SwapyItem pair. The DragHandle
 * pill in the top-right of every card is the only spot that initiates
 * a drag — that keeps card hover, links and clicks intact. Cards
 * support free swapping; sizes are fixed per slot, so dropping a
 * different card into a slot inherits that slot's footprint.
 * ------------------------------------------------------------------ */

type BentoSlot = {
  id: string;
  className: string;
  render: () => React.ReactNode;
};

const BENTO_GRID =
  "grid grid-cols-1 sm:grid-cols-12 lg:auto-rows-[clamp(11rem,15vw,14rem)] gap-3 md:gap-4";

const SLOTS: BentoSlot[] = [
  { id: "active-brands", className: "sm:col-span-7 lg:col-span-4 lg:row-span-1", render: () => <ActiveBrandsCard /> },
  { id: "roas",          className: "sm:col-span-5 lg:col-span-3 lg:row-span-1", render: () => <RoasCard /> },
  { id: "manifesto",     className: "sm:col-span-5 lg:col-span-5 lg:row-span-1", render: () => <ManifestoCard /> },
  { id: "team",          className: "sm:col-span-7 lg:col-span-5 lg:row-span-1", render: () => <TeamCard /> },
  { id: "logo",          className: "sm:col-span-6 lg:col-span-4 lg:row-span-1", render: () => <LogoCard /> },
  { id: "font",          className: "sm:col-span-6 lg:col-span-3 lg:row-span-1", render: () => <FontCard /> },
  { id: "partner",       className: "sm:col-span-5 lg:col-span-4 lg:row-span-1", render: () => <PartnerCard /> },
  { id: "trusted",       className: "sm:col-span-7 lg:col-span-4 lg:row-span-1", render: () => <TrustedCard /> },
  { id: "gmv",           className: "sm:col-span-12 lg:col-span-4 lg:row-span-1", render: () => <GmvCard /> },
];

export function BentoBrand() {
  return (
    <section className="relative bg-canvas py-24 md:py-32 border-y border-hairline overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">The bento</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-ink leading-[1.04]">
              <StaggerWords text="One stack." />{" "}
              <StaggerWords
                text="Nine moves."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                A snapshot of how Evolut runs — what we measure, who
                runs it, and the scoreboard we share with you every
                Friday.{" "}
                <span className="text-mute">
                  Drag any card&rsquo;s grip to rearrange.
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* The bento — Swapy layout. Each slot keeps a fixed footprint;
            items move between them on drag. */}
        <SwapyLayout
          id="bento-swapy"
          className={BENTO_GRID}
          config={{ animation: "dynamic", swapMode: "hover" }}
        >
          {SLOTS.map((slot) => (
            <SwapySlot
              key={slot.id}
              slotId={`slot-${slot.id}`}
              className={slot.className}
            >
              <SwapyItem itemId={`item-${slot.id}`}>
                <BentoCell>
                  <DragHandle />
                  {slot.render()}
                </BentoCell>
              </SwapyItem>
            </SwapySlot>
          ))}
        </SwapyLayout>
      </div>
    </section>
  );
}

/* ============================================================== *
 * Cell wrapper — staggered fade-up + hover lift. Lives INSIDE the
 * SwapyItem so framer-motion's transforms don't fight swapy's drag
 * transforms (those run on the SwapyItem's div).
 * ============================================================== */
function BentoCell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.7, ease: PREMIUM_EASE }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative h-full rounded-2xl overflow-hidden transition-shadow duration-500",
        "hover:shadow-[0_22px_45px_-20px_rgba(15,17,21,0.22)]"
      )}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================== *
 * Card 01 — Active brands (electric)
 * ============================================================== */
function ActiveBrandsCard() {
  return (
    <div className="bg-electric text-canvas h-full p-6 md:p-7 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <Heart className="h-4 w-4 fill-canvas text-canvas" />
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] opacity-75">
          Active brands managed
        </span>
      </div>
      <div>
        <p className="display text-[clamp(2.5rem,5vw,4rem)] leading-none mb-2 tabular-nums">
          <CountUp value={240} suffix="+" />
        </p>
        <p className="text-sm opacity-80">across 4 continents</p>
      </div>
    </div>
  );
}

/* ============================================================== *
 * Card 02 — ROAS (obsidian)
 * ============================================================== */
function RoasCard() {
  return (
    <div className="bg-obsidian text-canvas h-full p-6 md:p-7 flex flex-col justify-between">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-canvas/55">
        Avg ROAS · 90 days
      </p>
      <div>
        <p className="display text-[clamp(2.5rem,5vw,4rem)] leading-none tabular-nums">
          <CountUp value={3.4} suffix="×" decimals={1} />
        </p>
        <p className="text-emerald font-medium mt-2 inline-flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.2} />
          +0.6× vs last quarter
        </p>
      </div>
    </div>
  );
}

/* ============================================================== *
 * Card 03 — Manifesto / "Operators on your side" (cream + ink)
 * ============================================================== */
function ManifestoCard() {
  return (
    <div className="bg-canvas-2 h-full p-6 md:p-7 flex flex-col justify-between">
      <span className="rounded-xl bg-ink text-canvas font-mono text-[0.6rem] uppercase tracking-[0.18em] px-3 py-2 inline-block max-w-fit">
        Operators · not account managers
      </span>
      <div>
        <p className="font-medium text-ink-soft mb-1">
          Daily new briefs
        </p>
        <div className="flex items-end gap-3">
          <span className="display text-[clamp(2.5rem,5vw,4rem)] leading-none text-ink tabular-nums">
            <CountUp value={54} />
          </span>
          <span className="text-emerald font-medium mb-1.5 inline-flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.2} />
            +40%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================== *
 * Card 04 — Team / "Smart ecommerce stack" (copper)
 * ============================================================== */
function TeamCard() {
  return (
    <div className="bg-copper text-canvas h-full p-5 md:p-6 flex flex-col">
      <div className="bg-ink text-canvas rounded-xl p-4 mb-4">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-canvas/55 mb-1">
          The pitch
        </p>
        <p className="display text-[1.1rem] leading-tight">
          Smart ecommerce
          <br />
          stack for your brand.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1">
        <div className="rounded-xl bg-canvas/15 backdrop-blur" />
        <div className="rounded-xl bg-canvas/30" />
      </div>
    </div>
  );
}

/* ============================================================== *
 * Card 05 — Logo (cream paper)
 * ============================================================== */
function LogoCard() {
  return (
    <div className="bg-canvas border border-hairline-strong h-full p-6 md:p-7 flex flex-col items-center justify-center">
      <div className="relative h-16 w-16 md:h-20 md:w-20 mb-4">
        <Image
          src="/logo_1.png"
          alt="Evolut"
          fill
          sizes="80px"
          className="object-contain"
        />
      </div>
      <p className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-none text-ink mb-1">
        Evolut
      </p>
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute">
        Ecommerce Solutions
      </p>
    </div>
  );
}

/* ============================================================== *
 * Card 06 — Font / Voice (lime)
 * ============================================================== */
function FontCard() {
  return (
    <div className="bg-lime text-ink h-full p-6 md:p-7 flex flex-col">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink/65 mb-1">
        Voice
      </p>
      <p className="display text-[clamp(1.85rem,3.4vw,2.4rem)] leading-none mb-1.5 text-ink">
        Geist
      </p>
      <p className="text-[0.78rem] text-ink/65 mb-auto">
        Operator-grade type
      </p>
      <div className="flex gap-2 mt-4">
        <div className="h-9 w-9 bg-ink rounded-md" />
        <div className="h-9 w-9 bg-ink/40 rounded-md" />
        <div className="h-9 w-9 bg-copper rounded-md" />
        <div className="h-9 w-9 bg-canvas rounded-md border border-ink/15" />
      </div>
    </div>
  );
}

/* ============================================================== *
 * Card 07 — Education partner (BJK) — purple-ish via copper-soft
 * ============================================================== */
function PartnerCard() {
  return (
    <Link
      href="https://bjkuniversity.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <div className="bg-copper-soft text-ink h-full p-5 md:p-6 flex flex-col relative overflow-hidden">
        {/* Watermark logo — soft, large, sits behind the copy */}
        <Image
          src="/bjk1_logo.png"
          alt=""
          aria-hidden="true"
          width={180}
          height={180}
          className="absolute -right-6 -bottom-6 h-40 w-40 md:h-44 md:w-44 object-contain opacity-15 pointer-events-none select-none"
        />

        <div className="relative bg-ink text-canvas rounded-lg font-mono text-[0.6rem] uppercase tracking-[0.18em] px-3 py-2 inline-block max-w-fit mb-3">
          Education partner
        </div>
        <p className="relative display text-[clamp(1.4rem,2.4vw,2rem)] leading-none mb-2 text-ink">
          BJK University
        </p>
        <p className="relative text-[0.85rem] text-ink/70 mb-auto">
          Curriculum partner for ecommerce operations
        </p>
        <div className="relative mt-4 flex items-center gap-3">
          <span className="grid place-items-center h-11 w-11 rounded-xl bg-ink p-1.5 shadow-sm">
            <Image
              src="/bjk1_logo.png"
              alt="BJK University"
              width={36}
              height={36}
              className="object-contain invert"
            />
          </span>
          <ArrowUpRight className="h-4 w-4 text-ink ml-auto" strokeWidth={2} />
        </div>
      </div>
    </Link>
  );
}

/* ============================================================== *
 * Card 08 — Trusted by (electric → emerald)
 * ============================================================== */
function TrustedCard() {
  return (
    <div className="bg-electric/[0.92] text-canvas h-full p-5 md:p-6 flex flex-col items-center justify-center text-center">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] mb-2 text-canvas/70">
        Trusted by
      </p>
      <p className="display text-[clamp(1.85rem,3.2vw,2.4rem)] leading-none mb-4">
        240+ brands
      </p>

      <div className="flex -space-x-2 mb-3">
        {[
          "from-copper to-copper-soft",
          "from-emerald to-lime",
          "from-canvas-2 to-canvas",
          "from-obsidian to-obsidian-soft",
        ].map((g, i) => (
          <span
            key={i}
            className={cn(
              "h-8 w-8 md:h-9 md:w-9 rounded-xl border-2 border-electric bg-gradient-to-br",
              g
            )}
          />
        ))}
        <span className="grid place-items-center h-8 w-8 md:h-9 md:w-9 rounded-xl bg-canvas border-2 border-electric">
          <PlusCircle className="h-4 w-4 text-electric" strokeWidth={2} />
        </span>
      </div>

      <p className="text-[0.78rem] text-canvas/75">
        Don&apos;t take our word for it.
      </p>
    </div>
  );
}

/* ============================================================== *
 * Card 09 — GMV under management (cream + obsidian inset)
 * ============================================================== */
function GmvCard() {
  return (
    <div className="bg-canvas border border-hairline-strong h-full p-5 md:p-6 flex flex-col">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute mb-3">
        GMV under management
      </p>
      <p className="display text-[clamp(2rem,4vw,3rem)] leading-none mb-5 text-ink tabular-nums">
        <CountUp value={150} prefix="$" suffix="M+" />
      </p>

      <div className="bg-ink text-canvas rounded-xl p-4 mt-auto">
        <div className="flex justify-between text-[0.6rem] mb-2 text-canvas/60 font-mono uppercase tracking-[0.16em]">
          <span>Operator</span>
          <span>Updated</span>
        </div>
        <div className="flex justify-between text-[0.85rem] font-medium">
          <span>Evolut · ops</span>
          <span className="font-mono">04 / 26</span>
        </div>
      </div>
    </div>
  );
}
