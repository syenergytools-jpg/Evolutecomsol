"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SplitReveal } from "@/components/ui/split-reveal";
import { Reveal } from "@/components/ui/reveal";

/**
 * BrandMark — full-bleed manifesto section.
 *
 * The Evolut logo (logo_1.png) sits behind the type at low opacity,
 * stretched full-bleed with a soft drift. Foreground = a brief,
 * scroll-revealed manifesto using SplitText + ScrollTrigger.
 *
 * This is a quiet anchor section — used as a beat between busier
 * blocks (e.g. between WorkGrid and Showcase).
 */
export function BrandMark() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-canvas overflow-hidden py-32 md:py-44 border-y border-hairline">
      {/* DEPTH 0 — paper grid (very faint) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />

      {/* DEPTH 1 — logo_1.png as a giant ghost background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.18 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative w-[58vw] h-[58vw] max-w-[820px] max-h-[820px]"
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 14, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src="/logo_1.png"
            alt=""
            fill
            sizes="60vw"
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Soft vignette to fade the edges of the giant logo into canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, transparent 0%, var(--canvas) 80%)",
        }}
      />

      {/* DEPTH 4 — content */}
      <div className="relative container-x text-center">
        <Reveal>
          <p className="eyebrow eyebrow-line mx-auto mb-8 w-fit">
            · the brand promise ·
          </p>
        </Reveal>

        <SplitReveal
          as="h2"
          className="display text-[clamp(2.5rem,6vw,5.5rem)] text-ink leading-[1.04] mb-10 max-w-[22ch] mx-auto"
        >
          Built for brands that want to stop managing the agency.
        </SplitReveal>

        <SplitReveal
          as="p"
          className="text-base md:text-lg text-ink-soft leading-[1.7] max-w-2xl mx-auto"
        >
          Sourcing to shelf, photography to PPC, trademark to freight —
          eight services, one accountable team, zero handoffs. Every
          move designed to compound inside your catalog.
        </SplitReveal>

        {/* Hairline accent under the body */}
        <Reveal delay={0.4}>
          <div className="mt-14 mx-auto h-px w-16 bg-copper/60" />
        </Reveal>
      </div>
    </section>
  );
}
