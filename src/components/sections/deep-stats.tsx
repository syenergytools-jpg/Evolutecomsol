"use client";

import { motion } from "framer-motion";
import { deepStats } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function DeepStats() {
  return (
    <section className="relative bg-canvas py-28 md:py-36 border-t border-hairline">
      <div className="container-x">
        <div className="max-w-3xl mb-14">
          <SectionHeader
            eyebrow="Real numbers, real engagements"
            title="What outcomes look like."
            size="md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {deepStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.85,
                delay: i * 0.08,
                ease: PREMIUM_EASE,
              }}
              className="group relative rounded-3xl bg-surface border border-hairline p-7 md:p-8 overflow-hidden hover:bg-canvas-2 transition-colors duration-500"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute mb-4">
                {stat.label}
              </p>
              <p className="display text-[clamp(2.5rem,4.5vw,4rem)] text-ink leading-none mb-3">
                {stat.value}
              </p>
              <p className="text-sm text-ink-soft">{stat.note}</p>

              {/* hover indicator */}
              <span className="absolute right-6 top-6 h-2 w-2 rounded-full bg-emerald opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
