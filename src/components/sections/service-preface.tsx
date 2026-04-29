"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { LottiePlayer } from "@/components/ui/lottie-player";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ServicePreface — quiet editorial intro to the deck.
 *
 * Design notes (post-redesign):
 *   • One palette: warm canvas, deep ink, single copper accent.
 *   • Two-column rhythm — left reads, right breathes.
 *   • Lottie pulse-grid replaces the big static numeral & blobs.
 *   • No bottom marquee rail (the next section handles motion).
 */
export function ServicePreface() {
  return (
    <section className="relative bg-canvas border-t border-hairline py-28 md:py-36 overflow-hidden">
      {/* DEPTH 0 — quiet paper grid, no blobs */}
      <div
        aria-hidden="true"
        data-depth="0"
        className="depth-0 absolute inset-0 paper-grid opacity-40 pointer-events-none"
      />

      <div className="container-x relative grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-12 items-center">
        {/* LEFT — read column */}
        <div data-depth="4" className="depth-4 lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mute">
                Chapter 09
              </span>
              <span className="h-px w-12 bg-hairline-strong" />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper">
                What we do
              </span>
            </div>
          </Reveal>

          <h2 className="display text-[clamp(2.5rem,5.6vw,5rem)] text-ink leading-[0.98] mb-10">
            <StaggerWords text="Eight services." />
            <br />
            <StaggerWords
              text="Built as one"
              delayStart={0.16}
              wordClassName="text-ink-soft italic font-normal"
            />
            <br />
            <StaggerWords
              text="operating system."
              delayStart={0.34}
              wordClassName="text-copper italic font-normal"
            />
          </h2>

          <Reveal delay={0.45}>
            <p className="text-lg md:text-xl text-ink-soft leading-[1.65] max-w-xl">
              Most brands stitch together five vendors. Evolut runs the
              entire ecommerce stack as one accountable team — so every
              move compounds inside your catalog.
            </p>
          </Reveal>

          {/* Stat row */}
          <div className="mt-14 grid grid-cols-3 gap-6 md:gap-10 max-w-xl">
            {[
              { v: "08", l: "Service lines" },
              { v: "01", l: "Accountable team" },
              { v: "240+", l: "Active brands" },
            ].map((stat, i) => (
              <motion.div
                key={stat.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + i * 0.1,
                  ease: PREMIUM_EASE,
                }}
                className="border-t border-hairline-strong pt-4"
              >
                <p className="display text-[clamp(1.6rem,3vw,2.5rem)] leading-none text-ink mb-2">
                  {stat.v}
                </p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute leading-snug">
                  {stat.l}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT — breathing column with the Lottie ornament */}
        <div
          data-depth="3"
          className="depth-3 lg:col-span-5 flex flex-col items-center lg:items-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: PREMIUM_EASE, delay: 0.2 }}
            className="relative w-full max-w-[26rem] aspect-square"
          >
            {/* Subtle frame */}
            <div className="absolute inset-0 rounded-full border border-hairline-strong" />
            <div className="absolute inset-6 rounded-full border border-hairline" />

            {/* Lottie center — work / operations animation */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <LottiePlayer
                src="/lottie/work.json"
                className="w-full h-full"
                ariaLabel="Animated operations motif — the operating system at work"
              />
            </div>

            {/* Corner labels — tiny editorial flourishes */}
            <span className="absolute -top-2 left-0 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute">
              · live
            </span>
            <span className="absolute -bottom-2 right-0 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute">
              compounding
            </span>
          </motion.div>

          {/* Quiet caption */}
          <Reveal delay={0.7}>
            <p className="mt-8 max-w-xs text-sm text-mute leading-[1.6] text-center lg:text-right">
              One stack. One team. Every signal in one room.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
