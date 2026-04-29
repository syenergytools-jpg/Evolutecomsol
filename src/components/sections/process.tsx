"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp } from "lucide-react";
import { processSteps } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CountUp } from "@/components/ui/count-up";
import { Deco } from "@/components/ui/decorations";
import { cn } from "@/lib/utils";

/**
 * Pinned vertical→horizontal scroll storytelling. Each card is fully
 * coloured with a dedicated image slot at the top + content below. The
 * Ads card overlays floating stat callouts on the real
 * /ads_dashboard.png mockup.
 */

type StepAccent = "electric" | "copper" | "obsidian" | "lime" | "emerald";

const cardSurface: Record<
  StepAccent,
  { bg: string; fg: string; soft: string; chip: string; chipText: string }
> = {
  electric: {
    bg: "bg-electric",
    fg: "text-canvas",
    soft: "text-canvas/80",
    chip: "bg-canvas/15 text-canvas",
    chipText: "text-canvas",
  },
  copper: {
    bg: "bg-copper",
    fg: "text-canvas",
    soft: "text-canvas/80",
    chip: "bg-canvas/15 text-canvas",
    chipText: "text-canvas",
  },
  obsidian: {
    bg: "bg-obsidian",
    fg: "text-canvas",
    soft: "text-canvas/70",
    chip: "bg-canvas/12 text-canvas",
    chipText: "text-canvas",
  },
  lime: {
    bg: "bg-lime",
    fg: "text-ink",
    soft: "text-ink/70",
    chip: "bg-ink/10 text-ink",
    chipText: "text-ink",
  },
  emerald: {
    bg: "bg-emerald",
    fg: "text-canvas",
    soft: "text-canvas/80",
    chip: "bg-canvas/15 text-canvas",
    chipText: "text-canvas",
  },
};

const stepImages = [
  {
    src: "/images/process-source.jpg",
    alt: "Sourcing — manufacturer factory line",
    prompt:
      "Editorial photo from a clean modern factory floor, soft window light, a row of products on a conveyor with a quality inspector's hand checking one — premium ecommerce sourcing mood, hyperreal detail, no logos, no text, 16:9 ratio.",
  },
  {
    src: "/images/process-listing.jpg",
    alt: "Listing architecture — catalog spread",
    prompt:
      "Overhead flat-lay editorial of a printed Amazon listing layout (mockup): hero image swatch, bullet copy, A+ modules, color swatches, on a charcoal linen surface, soft daylight, magazine quality, no readable text, 16:9 ratio.",
  },
  {
    src: "/images/process-photography.jpg",
    alt: "Photography studio — softbox setup",
    prompt:
      "Editorial behind-the-scenes shot of a product photographer adjusting a softbox over a styled flat-lay of a beauty product on a cream backdrop, hands and lighting in focus, warm tones, magazine quality, no logos, 16:9 ratio.",
  },
  {
    src: "/ads_dashboard.png",
    alt: "Ads dashboard — sponsored campaigns",
    /** When set, the image renders inside an `<AdsImageSlot>` that
     *  overlays floating stat callouts (ROAS, spend, sessions). */
    overlayStats: true,
    prompt:
      "Cinematic 3/4 angle of a glassmorphism analytics dashboard showing rising charts in copper and electric blue accents, dark obsidian background, Apple-style minimal interface, monospace numbers, depth of field bokeh, 16:9 ratio, no readable text.",
  },
  {
    src: undefined as string | undefined, // process-scale.jpg — pending
    alt: "Scale — global expansion map",
    prompt:
      "Stylized vector world map render with glowing route arcs in copper and electric blue connecting cities, deep obsidian background, premium dashboard aesthetic, 3D depth, no labels, no text, 16:9 ratio.",
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Translate horizontally as user scrolls (5 panels → -80%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-canvas-2"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* decorative scatter */}
        <span className="absolute top-20 right-12 z-20 opacity-50">
          <Deco name="asterisk" className="h-6 w-6 text-copper" spin />
        </span>
        <span className="absolute bottom-32 left-12 z-20 opacity-40">
          <Deco name="ring-dashed" className="h-12 w-12 text-electric" spin />
        </span>

        {/* Heading */}
        <div className="container-x pt-16 pb-6 shrink-0 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow eyebrow-line mb-4">The Evolut process</p>
              </Reveal>
              <h2 className="display text-[clamp(2rem,4.6vw,4rem)] text-ink leading-[1.04]">
                <StaggerWords text="From sourcing the SKU" />
                <br />
                <StaggerWords
                  text="to scaling the brand."
                  delayStart={0.2}
                  wordClassName="text-ink-soft italic font-normal"
                />
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-center gap-3">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute">
                Scroll right
              </span>
              <span className="h-[1px] w-16 bg-gradient-to-r from-mute to-transparent" />
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex items-stretch gap-6 px-[clamp(1.25rem,4vw,3rem)] will-change-transform pb-6"
        >
          {processSteps.map((step, i) => {
            const tone = cardSurface[step.accent as StepAccent];
            const img = stepImages[i % stepImages.length];
            return (
              <motion.article
                key={step.n}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative shrink-0 w-[80vw] md:w-[60vw] lg:w-[44vw] aspect-[4/3] md:aspect-[5/4]",
                  "rounded-[2rem] overflow-hidden flex flex-col",
                  "shadow-[0_30px_70px_-20px_rgba(15,17,21,0.25)]",
                  tone.bg,
                  tone.fg
                )}
              >
                {/* IMAGE SLOT — top half */}
                <div className="relative h-[55%] overflow-hidden border-b border-canvas/10">
                  {img.overlayStats && img.src ? (
                    <AdsImageSlot src={img.src} alt={img.alt} />
                  ) : (
                    <ImagePlaceholder
                      src={img.src}
                      alt={img.alt}
                      prompt={img.prompt}
                      aspectRatio="16/9"
                      variant={tone.fg === "text-canvas" ? "dark" : "light"}
                      className="w-full h-full border-0 rounded-none"
                      showPrompt={false}
                      caption={img.alt}
                    />
                  )}
                  {/* number chip top-right */}
                  <span className={cn("absolute top-4 right-4 inline-flex h-9 px-3 items-center rounded-full font-mono text-xs font-semibold backdrop-blur z-10", tone.chip)}>
                    Step {step.n}
                  </span>
                </div>

                {/* CONTENT — bottom half */}
                <div className="flex-1 p-7 md:p-9 flex flex-col justify-end relative">
                  {/* big watermark number */}
                  <span
                    className={cn(
                      "absolute -right-2 -bottom-6 display text-[14rem] leading-none select-none pointer-events-none",
                      tone.soft,
                      "opacity-15"
                    )}
                    aria-hidden="true"
                  >
                    {step.n}
                  </span>

                  <h3 className="display text-[clamp(2rem,4vw,3.5rem)] mb-3 leading-[1.05] relative">
                    {step.title}
                  </h3>
                  <p className={cn("text-base md:text-lg leading-[1.55] max-w-md relative", tone.soft)}>
                    {step.blurb}
                  </p>
                </div>
              </motion.article>
            );
          })}
          {/* spacer at end so last card has breathing room */}
          <div className="shrink-0 w-[20vw]" aria-hidden="true" />
        </motion.div>

        {/* Progress bar */}
        <div className="container-x pb-8 shrink-0 z-10 relative">
          <div className="h-[2px] w-full bg-hairline relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-ink"
              style={{
                width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * AdsImageSlot — the ads_dashboard.png with three floating stat
 * callouts (ROAS, spend, sessions) layered on top, each on its own
 * drift loop. Numbers tick via CountUp on first in-view.
 * ---------------------------------------------------------------- */
function AdsImageSlot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-obsidian">
      {/* The dashboard mockup */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 80vw, 44vw"
        className="object-cover object-top"
      />

      {/* Soft vignette so chips read on busy areas of the dashboard */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 0%, rgba(10,10,11,0.32) 100%)",
        }}
      />

      {/* Live indicator — top-left */}
      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-canvas/90 backdrop-blur px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink z-10">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-electric animate-ping opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
        </span>
        Live · 30 days
      </span>

      {/* Floating stat — ROAS (mid-left). Outer = entrance fade-in,
          inner = continuous drift loop so the two animations don't fight. */}
      <motion.div
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="rounded-xl bg-canvas/95 backdrop-blur px-3 py-2 shadow-[0_18px_40px_-12px_rgba(15,17,21,0.45)]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-mute mb-0.5">
            ROAS
          </p>
          <p className="display text-[1.1rem] leading-none text-ink tabular-nums">
            <CountUp value={3.4} suffix="×" decimals={1} />
          </p>
        </motion.div>
      </motion.div>

      {/* Floating stat — Spend (top-right) */}
      <motion.div
        className="absolute right-3 md:right-5 top-4 rounded-xl bg-ink/90 backdrop-blur px-3 py-2 text-canvas shadow-[0_18px_40px_-12px_rgba(15,17,21,0.55)] z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-canvas/55 mb-0.5">
          Spend · 30d
        </p>
        <p className="display text-[1.05rem] leading-none tabular-nums">
          <CountUp value={12450} prefix="$" />
        </p>
      </motion.div>

      {/* Floating stat — Sessions lift (bottom-right) */}
      <motion.div
        className="absolute right-3 md:right-5 bottom-3 md:bottom-4 rounded-xl bg-canvas/95 backdrop-blur px-3 py-2 shadow-[0_18px_40px_-12px_rgba(15,17,21,0.45)] z-10 inline-flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="grid place-items-center h-7 w-7 rounded-full bg-electric/10">
          <TrendingUp className="h-3.5 w-3.5 text-electric" strokeWidth={2.4} />
        </span>
        <div className="leading-tight">
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-mute">
            Sessions
          </p>
          <p className="font-mono text-[0.78rem] tabular-nums text-ink">
            <CountUp value={162} prefix="+" suffix="%" />
          </p>
        </div>
      </motion.div>
    </div>
  );
}
