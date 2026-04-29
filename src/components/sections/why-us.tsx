"use client";

import { motion } from "framer-motion";
import { whyUs } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function WhyUs() {
  return (
    <section className="relative bg-canvas py-28 md:py-36 border-t border-hairline">
      <div className="container-x">
        <SectionHeader
          eyebrow="Why Evolut"
          title="Six reasons brands stop agency-shopping."
          subtitle="The difference between an agency that runs your account and an operator that owns your outcome."
          size="md"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline rounded-3xl overflow-hidden border border-hairline">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.06,
                ease: PREMIUM_EASE,
              }}
              className="bg-canvas p-8 md:p-10 group hover:bg-surface transition-colors duration-500"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute pt-1.5">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="display text-2xl text-ink mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
