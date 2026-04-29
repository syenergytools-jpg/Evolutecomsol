"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { PillButton } from "@/components/ui/pill-button";

/**
 * Photography showcase — 6-shot Amazon listing pack rendered from real
 * imagery in /public/PHOTOGRAPHY/. Layout is a masonry-feel grid with
 * the lifestyle frame as the big anchor (col-span-2, row-span-2) and
 * the other five tiles flowing around it. Each tile gets a small
 * scroll-driven y-shift for parallax depth and an in-view scale-fade
 * on first reveal.
 */
export function PhotographyShowcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Three different scroll-tied y motions so neighbouring tiles
  // don't drift in lock-step (gives the masonry a touch of life)
  const yA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yB = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yC = useTransform(scrollYProgress, [0, 1], [40, -40]);

  /* Grid layout (lg+):
   *   ┌───────┬─────────────────┐
   *   │ MAIN  │                 │   row 1
   *   ├───────┤    LIFESTYLE    ├
   *   │ HERO  │     (2 × 2)     │   row 2
   *   ├───────┼────────┬────────┤
   *   │ INFO  │ DETAIL │  SPIN  │   row 3
   *   └───────┴────────┴────────┘
   *
   * Every cell is filled — no orphan gaps. On md it falls back to a
   * simple 2-col grid; on mobile it stacks.
   */
  const cards = [
    {
      title: "Main Image",
      label: "Amazon main · pure-white BG",
      src: "/PHOTOGRAPHY/MAIN.png",
      area: "lg:col-start-1 lg:row-start-1",
      y: yA,
      big: false,
    },
    {
      title: "Lifestyle",
      label: "In-context · shopper view",
      src: "/PHOTOGRAPHY/LIFESTYLE.png",
      area: "lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2",
      y: yB,
      big: true,
    },
    {
      title: "Hero shot",
      label: "Editorial · gallery slot 2",
      src: "/PHOTOGRAPHY/HERO_SHOT.png",
      area: "lg:col-start-1 lg:row-start-2",
      y: yC,
      big: false,
    },
    {
      title: "Infographic",
      label: "Feature callouts · A+ ready",
      src: "/PHOTOGRAPHY/INFOGRAPHICS.png",
      area: "lg:col-start-1 lg:row-start-3",
      y: yA,
      big: false,
    },
    {
      title: "Detail",
      label: "Macro · materiality",
      src: "/PHOTOGRAPHY/DETAIL.png",
      area: "lg:col-start-2 lg:row-start-3",
      y: yB,
      big: false,
    },
    {
      title: "360° spin",
      label: "Turnaround frame",
      src: "/PHOTOGRAPHY/360SPIN.png",
      area: "lg:col-start-3 lg:row-start-3",
      y: yC,
      big: false,
    },
  ];

  return (
    <section
      id="photography"
      ref={ref}
      className="relative bg-canvas py-28 md:py-36 border-t border-hairline overflow-hidden"
    >
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Product Photography"
              title="The first impression. Engineered."
              subtitle="Your Amazon listing image is the first impression every customer gets. High-quality photos build brand trust, recognition, and boost sales — get the whole package for coherent aesthetics."
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <PillButton href="#contact" variant="ink">
              Book a shoot
            </PillButton>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:auto-rows-[clamp(13rem,18vw,18rem)]">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              style={{ y: c.y }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.85,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative aspect-square lg:aspect-auto ${c.area} rounded-2xl md:rounded-3xl overflow-hidden bg-canvas-2 border border-hairline-strong`}
            >
              {/* Real image */}
              <Image
                src={c.src}
                alt={`${c.title} — ${c.label}`}
                fill
                sizes={
                  c.big
                    ? "(max-width: 1024px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                // Big anchor frame loads eager; the rest lazy
                priority={c.big}
              />

              {/* Tone-aware bottom gradient so labels stay legible
                  even on bright shots */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(15,17,21,0.55) 100%)",
                }}
              />

              {/* Frame number stamp top-left (only on hover) */}
              <span
                className={`absolute top-3 left-3 inline-flex items-center rounded-full bg-canvas/95 backdrop-blur px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  c.big ? "" : ""
                }`}
              >
                Frame 0{i + 1}
              </span>

              {/* Bottom label row — title + index */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between text-canvas">
                <div className="leading-tight">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] mb-0.5">
                    {c.title}
                  </p>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] opacity-65">
                    {c.label}
                  </p>
                </div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] opacity-70">
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
