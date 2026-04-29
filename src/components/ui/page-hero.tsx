"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { GridPattern } from "@/components/ui/aceternity/grid-pattern";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Spotlight } from "@/components/ui/aceternity/spotlight";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reusable inner-page hero — dark obsidian band with title, eyebrow, sub.
 * Used as the top of /about, /services, /contact, /work.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-obsidian text-canvas pt-36 pb-24 md:pt-44 md:pb-32">
      {/* DEPTH 0 */}
      <div className="absolute inset-0 spotlight-gradient" aria-hidden="true" />
      <GridPattern
        className="text-canvas/[0.05] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
        width={56}
        height={56}
      />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" aria-hidden="true">
        <SparklesCore particleColor="#dfe3e8" particleDensity={30} speed={0.25} particleSize={{ min: 0.3, max: 0.9 }} />
      </div>

      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(216, 100%, 78%, .12) 0, hsla(216, 100%, 55%, .03) 50%, transparent 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(216, 100%, 78%, .08) 0, hsla(216, 100%, 55%, .03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(20, 100%, 70%, .06) 0, hsla(20, 100%, 55%, .02) 80%, transparent 100%)"
      />

      {/* CONTENT */}
      <div className="container-x relative z-10 max-w-4xl">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: PREMIUM_EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-canvas/15 bg-canvas/[0.04] px-3 py-1.5 backdrop-blur mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-electric" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-canvas/80">
              {eyebrow}
            </span>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: PREMIUM_EASE, delay: 0.1 }}
          className="display text-[clamp(2.25rem,6vw,5.5rem)] text-canvas leading-[1.0]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: PREMIUM_EASE, delay: 0.25 }}
            className="mt-6 max-w-2xl text-base md:text-lg text-canvas/70 leading-[1.6]"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-canvas pointer-events-none" />
    </section>
  );
}
