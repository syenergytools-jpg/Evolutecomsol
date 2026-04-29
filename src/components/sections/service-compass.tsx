"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ServiceCompass — minimal orbit diagram of the eight service lines.
 *
 * Design notes (post-redesign):
 *   • Canvas backdrop — no atmospheric blob.
 *   • Single dashed ring (was two rings + scrub-rotation).
 *   • Evolut logo (logo_1.png) sits at the center as a floating hub.
 *   • Ink/copper duotone — no electric blue or chrome.
 *   • Active service caption moved into a clean editorial slot.
 */
export function ServiceCompass() {
  const [active, setActive] = useState<number | null>(null);
  const activeService = active !== null ? services[active] : null;

  return (
    <section className="relative bg-canvas border-t border-hairline py-28 md:py-36 overflow-hidden">
      <div className="container-x relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-24 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">The compass</p>
            </Reveal>
            <h2 className="display text-[clamp(2rem,4.6vw,4rem)] text-ink leading-[1.04]">
              <StaggerWords text="Eight directions," />{" "}
              <StaggerWords
                text="one"
                delayStart={0.18}
                wordClassName="italic font-normal text-ink-soft"
              />{" "}
              <StaggerWords
                text="core."
                delayStart={0.3}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                Hover a node to see how it routes back to the center.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Compass arena */}
        <div className="relative mx-auto aspect-square w-full max-w-[40rem]">
          {/* Single dashed ring (no scroll-rotation) */}
          <svg
            aria-hidden="true"
            data-depth="1"
            className="depth-1 absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
          >
            <circle
              cx="200"
              cy="200"
              r="184"
              fill="none"
              stroke="var(--hairline-strong)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
          </svg>

          {/* Beams — drawn only for the active node */}
          <svg
            aria-hidden="true"
            data-depth="2"
            className="depth-2 absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 400"
          >
            {services.map((s, i) => {
              const angle = (i / services.length) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(angle) * 168;
              const y = 200 + Math.sin(angle) * 168;
              const isActive = active === i;
              return (
                <motion.line
                  key={s.slug}
                  x1={200}
                  y1={200}
                  x2={x}
                  y2={y}
                  stroke="var(--copper)"
                  strokeWidth={isActive ? 1.25 : 0}
                  strokeDasharray="3 5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 0.8 : 0 }}
                  transition={{ duration: 0.45, ease: PREMIUM_EASE }}
                />
              );
            })}
          </svg>

          {/* Center — Evolut logo hub (logo_1.png) */}
          <div
            data-depth="4"
            className="depth-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="relative h-[13rem] w-[13rem] md:h-[15rem] md:w-[15rem] rounded-full bg-canvas border border-hairline-strong shadow-[0_30px_70px_-30px_rgba(15,17,21,0.28)] flex items-center justify-center"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Concentric inner rings for depth */}
              <span
                aria-hidden="true"
                className="absolute inset-3 rounded-full border border-hairline"
              />
              <span
                aria-hidden="true"
                className="absolute inset-7 rounded-full border border-hairline/60"
              />

              {/* The actual logo — explicit size so flex sizing is unambiguous */}
              <Image
                src="/logo_1.png"
                alt="Evolut — The Stack"
                width={200}
                height={200}
                priority
                className="relative h-[68%] w-[68%] object-contain drop-shadow-[0_8px_24px_rgba(15,17,21,0.18)]"
              />


              {/* Tiny live indicator */}
              <span className="absolute top-3 right-3 inline-flex items-center gap-1.5">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-copper animate-ping opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-copper" />
                </span>
              </span>
            </motion.div>
          </div>

          {/* Service nodes around the ring */}
          {services.map((s, i) => {
            // Polar → cartesian. Radius is 46% of half-width (= 92% of
            // the ring's radius), placed via percentage of the
            // *container*, not the button itself.
            const angle =
              (i / services.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 0.46;
            const left = 50 + Math.cos(angle) * radius * 100;
            const top = 50 + Math.sin(angle) * radius * 100;
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <button
                key={s.slug}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={s.title}
                className="absolute z-30 group"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{
                    duration: 0.65,
                    delay: 0.25 + i * 0.05,
                    ease: PREMIUM_EASE,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span
                    className={cn(
                      "h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center border transition-all duration-300",
                      isActive
                        ? "bg-ink text-canvas border-ink shadow-[0_18px_40px_-18px_rgba(15,17,21,0.45)]"
                        : "bg-canvas text-ink-soft border-hairline-strong group-hover:border-ink/40"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span
                    className={cn(
                      "mt-2.5 font-mono text-[0.62rem] md:text-[0.66rem] uppercase tracking-[0.16em] whitespace-nowrap transition-colors duration-300",
                      isActive ? "text-ink" : "text-mute"
                    )}
                  >
                    {s.slug}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </div>

        {/* Editorial caption — fixed-height to prevent layout shift */}
        <div className="mt-16 md:mt-20 max-w-2xl mx-auto text-center min-h-[5rem]">
          {activeService ? (
            <motion.div
              key={activeService.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-copper mb-2">
                {activeService.title}
              </p>
              <p className="text-lg md:text-xl text-ink leading-[1.45]">
                {activeService.blurb}
              </p>
            </motion.div>
          ) : (
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-mute">
              · hover a node to inspect ·
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
