"use client";

import { motion } from "framer-motion";
import { Plane, Ship, Truck, FileCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const modes = [
  { icon: Plane, name: "Air freight", note: "5–8 days" },
  { icon: Ship, name: "Sea freight", note: "20–35 days" },
  { icon: Truck, name: "Road freight", note: "Regional" },
  { icon: FileCheck, name: "Customs clearance", note: "Door to FBA" },
];

export function Freight() {
  return (
    <section
      id="freight"
      className="relative bg-canvas-2 py-28 md:py-36 overflow-hidden"
    >
      {/* moving SVG route lines as decorative element */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="route-grad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="var(--electric)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--electric)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--electric)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 200 Q 300 100 600 250 T 1200 180"
          stroke="url(#route-grad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: PREMIUM_EASE }}
        />
        <motion.path
          d="M0 600 Q 400 480 800 580 T 1200 520"
          stroke="url(#route-grad)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, delay: 0.4, ease: PREMIUM_EASE }}
        />
      </svg>

      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <SectionHeader
              eyebrow="Freight forwarding"
              title="Origin to destination. End to end."
              subtitle="We understand the complexities of international shipping. Air, sea, road — plus customs clearance — coordinated through an extensive partner and carrier network."
            />
          </div>

          <div className="lg:col-span-6 lg:pl-8 grid grid-cols-2 gap-4 self-end">
            {modes.map((mode, i) => {
              const Icon = mode.icon;
              return (
                <motion.div
                  key={mode.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.85,
                    delay: i * 0.08,
                    ease: PREMIUM_EASE,
                  }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-surface border border-hairline p-5 md:p-6 group transition-shadow hover:shadow-[0_18px_40px_-16px_rgba(15,17,21,0.15)]"
                >
                  <Icon
                    className="h-6 w-6 text-ink mb-4 group-hover:text-electric transition-colors"
                    strokeWidth={1.6}
                  />
                  <p className="font-semibold text-ink">{mode.name}</p>
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider text-mute mt-1">
                    {mode.note}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 rounded-3xl bg-ink text-canvas p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-canvas/60 mb-2">
                Coverage
              </p>
              <p className="display text-2xl md:text-3xl">
                Resources and expertise to manage every aspect of your cargo's
                journey.
              </p>
            </div>
            <a
              href="/contact?service=freight"
              className="font-mono text-sm uppercase tracking-wider hover:text-copper-soft transition-colors whitespace-nowrap"
            >
              Quote a shipment →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
