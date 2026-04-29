"use client";

import { motion } from "framer-motion";
import { trademarkPillars } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function TrademarkPillars() {
  return (
    <section
      id="trademark"
      className="relative bg-canvas py-28 md:py-36 border-t border-hairline"
    >
      <div className="container-x">
        <SectionHeader
          eyebrow="IP & Trademark"
          title={
            <>
              Protect your ideas.
              <br />
              <span className="italic font-normal text-ink-soft">
                Secure your brand. Scale with confidence.
              </span>
            </>
          }
          subtitle="Patent search, registration, and trademark filing — full-service IP protection for local and international clients with fast execution and dedicated support."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {trademarkPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.1,
                  ease: PREMIUM_EASE,
                }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-surface border border-hairline p-8 md:p-10 overflow-hidden transition-shadow hover:shadow-[0_24px_60px_-20px_rgba(15,17,21,0.18)]"
              >
                <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-gradient-to-br from-canvas-2 to-canvas opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-ink text-canvas flex items-center justify-center mb-6 group-hover:rotate-[6deg] transition-transform duration-500">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="display text-2xl md:text-3xl text-ink mb-4 leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{pillar.detail}</p>

                  <div className="mt-7 pt-5 border-t border-hairline flex items-center justify-between">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute">
                      Pillar 0{i + 1} / 3
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              "Expert IP & ecommerce",
              "Accurate & compliant",
              "Fast execution",
              "Local & international",
            ].map((item) => (
              <div key={item}>
                <div className="h-1 w-1 rounded-full bg-electric mx-auto mb-3" />
                <p className="text-sm text-ink-soft font-medium">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
