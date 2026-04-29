"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { philosophy } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Operating philosophy — 4 cards that reveal as you scroll past.
 * Inspired by editorial layouts where each principle gets full focus.
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      className="relative bg-obsidian text-canvas py-28 md:py-44 overflow-hidden"
    >
      {/* parallax word art behind */}
      <motion.span
        style={{ y: bgY }}
        aria-hidden="true"
        className="absolute -left-12 -top-8 display text-[18rem] leading-none text-canvas/[0.04] font-bold pointer-events-none select-none"
      >
        Evolut
      </motion.span>

      <div className="container-x relative z-10">
        <SectionHeader
          invert
          eyebrow="Operating philosophy"
          title="How we think before we act."
          subtitle="Four principles we've earned through 9 years of operating brands across Amazon, Shopify, and DTC."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {philosophy.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: PREMIUM_EASE,
              }}
              className="group rounded-3xl border border-hairline-dark bg-obsidian-soft/50 p-8 md:p-10 backdrop-blur hover:bg-obsidian-soft transition-colors duration-500"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-canvas/50">
                  Principle {p.n}
                </span>
                <span className="display text-5xl text-canvas/10 group-hover:text-canvas/20 transition-colors">
                  {p.n}
                </span>
              </div>
              <h3 className="display text-2xl md:text-3xl mb-4 leading-tight">
                {p.title}
              </h3>
              <p className="text-canvas/70 leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
