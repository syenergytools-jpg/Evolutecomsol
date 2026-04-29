"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { WorldMap } from "@/components/ui/aceternity/world-map";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const REGIONS = [
  { label: "North America", brands: "112" },
  { label: "Europe", brands: "68" },
  { label: "Middle East", brands: "24" },
  { label: "Asia-Pacific", brands: "36" },
];

/**
 * GlobalReach — uses the existing WorldMap (dotted continents +
 * animated arc routes from Pakistan to 5 regions) as the centrepiece.
 *
 * Sits in the page right after Operators, leaning on the
 * "Pakistan-based, globally trusted" line in our whyUs deck.
 */
export function GlobalReach() {
  return (
    <section className="relative bg-canvas border-y border-hairline py-24 md:py-32 overflow-hidden">
      <div className="container-x">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">Where we operate</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-ink leading-[1.04]">
              <StaggerWords text="Pakistan-based," />{" "}
              <StaggerWords
                text="globally trusted."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                Studio operations in Jhelum. Clients across four
                continents. Time zones aren&apos;t your problem to solve.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: PREMIUM_EASE }}
          className="rounded-3xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(15,17,21,0.25)]"
        >
          <WorldMap />
        </motion.div>

        {/* Region strip */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8 max-w-4xl">
          {REGIONS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.08,
                ease: PREMIUM_EASE,
              }}
              className="border-t border-hairline-strong pt-4"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute mb-2">
                {r.label}
              </p>
              <p className="display text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none text-ink tabular-nums">
                {r.brands}
                <span className="text-copper text-base ml-1.5 font-mono">
                  brands
                </span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
