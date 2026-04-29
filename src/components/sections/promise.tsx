"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Deco } from "@/components/ui/decorations";
import { site } from "@/lib/site-config";

/**
 * The brand promise — a single bold statement, scroll-driven word lighting.
 * Section 02 between hero and trusted-by.
 */
export function Promise() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  const words = site.promise.split(" ");

  return (
    <section
      ref={ref}
      className="relative bg-canvas py-32 md:py-44 overflow-hidden"
    >
      {/* decorative shapes — like the lime stars in 2D Shape Interaction */}
      <span className="absolute top-20 left-12 opacity-60">
        <Deco name="asterisk" className="h-6 w-6 text-lime" spin />
      </span>
      <span className="absolute top-20 right-12 opacity-60">
        <Deco name="asterisk" className="h-6 w-6 text-lime" spin />
      </span>
      <span className="absolute bottom-24 left-12 opacity-50">
        <Deco name="spark" className="h-5 w-5 text-copper" pulse />
      </span>
      <span className="absolute bottom-24 right-12 opacity-50">
        <Deco name="spark" className="h-5 w-5 text-copper" pulse />
      </span>

      <div className="container-narrow relative z-10">
        <Reveal>
          <p className="eyebrow eyebrow-line mb-10 text-center">
            The Evolut promise
          </p>
        </Reveal>
        <p className="display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.18] text-center max-w-4xl mx-auto">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            const opacity = useTransform(
              scrollYProgress,
              [start, end],
              [0.18, 1]
            );
            return (
              <motion.span
                key={i}
                style={{ opacity }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
