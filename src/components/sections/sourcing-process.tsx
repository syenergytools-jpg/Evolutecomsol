"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { sourcingProcess } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 6-step sourcing process — vertical timeline with scroll-driven progress line.
 * The line draws from top to bottom as the user scrolls through it.
 */
export function SourcingProcess() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="sourcing"
      ref={ref}
      className="relative bg-canvas py-28 md:py-36 overflow-hidden"
    >
      <div className="container-x">
        <SectionHeader
          eyebrow="Sourcing process"
          title="Six steps. One sourcing agent."
          subtitle="When you source with us, you don't worry about anything. From quotation to door-to-FBA delivery — handled."
        />

        <div className="mt-20 relative max-w-4xl mx-auto">
          {/* Static spine */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-hairline -translate-x-1/2" />
          {/* Active progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-px bg-ink -translate-x-1/2"
          />

          <div className="space-y-12 md:space-y-16">
            {sourcingProcess.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.8, ease: PREMIUM_EASE }}
                  className={`relative flex items-start gap-6 md:gap-12 pl-20 md:pl-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 z-10">
                    <div className="h-12 w-12 rounded-full bg-canvas border-2 border-ink flex items-center justify-center font-mono text-sm font-semibold text-ink">
                      {step.n}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="md:w-1/2 md:px-8">
                    <div
                      className={`rounded-3xl bg-surface border border-hairline p-7 md:p-8 ${
                        isLeft ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute mb-2">
                        Step {step.n}
                      </p>
                      <h3 className="display text-2xl md:text-3xl text-ink mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-ink-soft leading-relaxed">
                        {step.blurb}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for symmetric layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.3}>
          <p className="mt-16 text-center text-mute text-sm">
            Initial response within <span className="text-ink font-medium">48 hours</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
