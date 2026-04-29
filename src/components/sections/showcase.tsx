"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { PillButton } from "@/components/ui/pill-button";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Pinned scroll showcase with a copper color block (mirrors the
 * orange "Pallet Ross" reference). Mockup zooms + UI cards fly in.
 */
export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mockupScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.9, 1.05, 1]);
  const mockupY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const cardLeftX = useTransform(scrollYProgress, [0.1, 0.6], ["-30%", "0%"]);
  const cardLeftOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const cardRightX = useTransform(scrollYProgress, [0.1, 0.6], ["30%", "0%"]);
  const cardRightOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative bg-canvas py-20 md:py-28"
    >
      <div className="container-x">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-5">We don&apos;t talk. We show.</p>
            </Reveal>
            <h2 className="display text-[clamp(2rem,4.6vw,4rem)] text-ink leading-[1.04]">
              <StaggerWords text="Listings, storefronts," />
              <br />
              <StaggerWords
                text="and brand systems"
                delayStart={0.18}
                wordClassName="text-ink-soft italic font-normal"
              />
              <br />
              <StaggerWords text="that ship revenue." delayStart={0.36} />
            </h2>
          </div>
        </div>

        {/* Copper showcase block */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-copper p-8 md:p-14 min-h-[640px] md:min-h-[720px]">
          {/* texture / noise overlay */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* concentric ring */}
          <div className="absolute -right-20 -bottom-20 w-[640px] h-[640px] rounded-full border border-white/15" />
          <div className="absolute -right-10 -bottom-10 w-[480px] h-[480px] rounded-full border border-white/10" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[560px] md:min-h-[640px]">
            {/* Left badge */}
            <motion.div
              style={{ x: cardLeftX, opacity: cardLeftOpacity }}
              className="lg:col-span-3 space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-canvas/90 px-3 py-1.5 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
                Live ASIN
              </div>
              <p className="text-canvas/95 text-sm leading-relaxed max-w-xs">
                A+ content, brand store, and PPC engineered around a single,
                ranked search term.
              </p>
              <div className="space-y-2">
                {[
                  { k: "Conversion", v: "+38%" },
                  { k: "Sessions", v: "+162%" },
                  { k: "Brand search", v: "+4.1×" },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="flex items-center justify-between rounded-xl bg-canvas/95 px-3 py-2"
                  >
                    <span className="text-xs text-mute font-mono uppercase tracking-wider">
                      {item.k}
                    </span>
                    <span className="text-sm font-semibold text-electric">
                      {item.v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Center: device mockup */}
            <motion.div
              style={{ scale: mockupScale, y: mockupY }}
              className="lg:col-span-6 relative aspect-[4/5] max-w-md mx-auto w-full"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-obsidian shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] p-3">
                <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden bg-canvas">
                  {/* fake browser chrome */}
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-hairline bg-surface">
                    <span className="h-2.5 w-2.5 rounded-full bg-copper/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/40" />
                    <div className="ml-3 h-5 flex-1 rounded-md bg-canvas border border-hairline" />
                  </div>
                  {/* fake product hero */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-electric/30 to-electric" />
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-copper/40 to-copper" />
                      <div className="aspect-square rounded-lg bg-gradient-to-br from-obsidian to-obsidian-soft" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-3/4 rounded bg-ink" />
                      <div className="h-2 w-1/2 rounded bg-mute/50" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-full rounded bg-hairline" />
                      <div className="h-2 w-[92%] rounded bg-hairline" />
                      <div className="h-2 w-[78%] rounded bg-hairline" />
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <div className="h-9 w-32 rounded-full bg-ink" />
                      <div className="h-9 w-24 rounded-full border border-hairline" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating annotation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4, ease: PREMIUM_EASE }}
                className="absolute -top-4 -right-4 rounded-full bg-canvas px-3 py-1.5 shadow-lg text-xs font-mono uppercase tracking-wider"
              >
                <span className="text-electric">●</span>
                <span className="ml-2 text-ink">Optimized</span>
              </motion.div>
            </motion.div>

            {/* Right column: stat callouts */}
            <motion.div
              style={{ x: cardRightX, opacity: cardRightOpacity }}
              className="lg:col-span-3 space-y-4"
            >
              <div className="rounded-2xl bg-obsidian p-5 text-canvas">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-canvas/60 mb-2">
                  90-day result
                </p>
                <p className="display text-4xl mb-2">$2.4M</p>
                <p className="text-sm text-canvas/70 leading-snug">
                  in net new revenue from a single optimized catalog
                </p>
              </div>

              <div className="rounded-2xl bg-canvas p-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute mb-2">
                  Search rank
                </p>
                <p className="display text-4xl text-ink mb-2">#3</p>
                <p className="text-sm text-ink-soft leading-snug">
                  organic position for primary keyword in 47 days
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA at bottom */}
          <div className="relative mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-7">
            <p className="text-canvas/85 text-base md:text-lg max-w-md">
              Want this for your store? It starts with a 30-min audit call.
            </p>
            <PillButton href="#contact" variant="ivory">
              Book audit
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
