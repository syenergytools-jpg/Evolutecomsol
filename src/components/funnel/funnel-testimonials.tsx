"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { FunnelHeading } from "./funnel-heading";
import { FunnelTestimonialCard } from "./funnel-testimonial-card";
import type { FunnelContent } from "./funnel-types";

const AUTO_ADVANCE_MS = 5000;

/**
 * Fan-out transforms per card count (only 1–3 are used across these 3
 * pages today — see round 18's memory on why /legal has 1 and /shopify
 * has 2, not the full 3). `frontIndex` is the slot a fresh page load
 * puts the "most relevant" card in; clicking any OTHER card swaps it
 * into that slot (framer-motion's `layout` animates the reorder).
 * Anything outside 1–3 falls back to a plain centered row instead of
 * guessing a fan for a count this design was never tuned for.
 */
const STACK_PRESETS: Record<number, { classes: string[]; frontIndex: number }> = {
  1: {
    classes: ["rotate-0 translate-x-0 translate-y-0 z-10"],
    frontIndex: 0,
  },
  2: {
    classes: [
      "rotate-[-6deg] translate-x-[-14%] sm:translate-x-[-22%] translate-y-[5%] z-0",
      "rotate-[4deg] translate-x-[10%] sm:translate-x-[16%] translate-y-[-3%] z-10",
    ],
    frontIndex: 1,
  },
  3: {
    classes: [
      "rotate-[-6deg] translate-x-[-16%] sm:translate-x-[-28%] translate-y-[5%] z-0",
      "rotate-0 translate-y-[-4%] z-20",
      "rotate-[6deg] translate-x-[16%] sm:translate-x-[28%] translate-y-[5%] z-10",
    ],
    frontIndex: 1,
  },
};

/**
 * FunnelTestimonials — a fanned, 3D-tilt card stack (adapted from a
 * client-supplied 21st.dev pattern — see funnel-testimonial-card.tsx)
 * replacing the previous big-photo alternating layout. Real
 * quote/headline/photo data unchanged, from site-config's
 * `testimonials` via each *-content.ts.
 */
export function FunnelTestimonials({ content }: { content: FunnelContent }) {
  const items = content.testimonials.items;
  const [order, setOrder] = useState(items);
  const [paused, setPaused] = useState(false);
  const preset = STACK_PRESETS[order.length];

  function bringToFront(index: number) {
    if (!preset || index === preset.frontIndex) return;
    const next = [...order];
    const [picked] = next.splice(index, 1);
    next.splice(preset.frontIndex, 0, picked);
    setOrder(next);
  }

  // Auto-loop: cycle every card through the front slot on its own, on a
  // timer, so the stack keeps moving even if nobody clicks it — clicking
  // still works too, and resets this timer (via the `order` dependency)
  // rather than fighting it. Skipped for a single card (nothing to
  // cycle to) and for prefers-reduced-motion.
  useEffect(() => {
    if (!preset || order.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [order, preset, paused]);

  return (
    <section className="relative bg-obsidian-soft py-16 md:py-32 overflow-hidden">
      <div className="container-x">
        <FunnelHeading
          accent={content.accent}
          eyebrow={content.testimonials.eyebrow}
          title={content.testimonials.title}
        />

        <Reveal delay={0.1}>
          {preset ? (
            // The front card renders in normal flow (not `absolute`), so
            // the container's height always matches its real content —
            // a fixed min-height here previously guessed too tall for
            // shorter cards (e.g. the 2-card pages) and left visible
            // empty space below the stack. Back card(s) are `absolute`,
            // positioned against that same box, peeking out behind it.
            <div
              className="relative mx-auto mt-16 md:mt-24 max-w-md sm:max-w-lg pb-6"
              style={{ perspective: "1200px" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {order.map((t, i) => {
                const isFront = i === preset.frontIndex;
                return (
                  <FunnelTestimonialCard
                    key={t.name}
                    testimonial={t}
                    accent={content.accent}
                    onClick={() => bringToFront(i)}
                    className={cn(
                      isFront ? "relative w-full" : "absolute inset-x-0 top-0 mx-auto w-full",
                      preset.classes[i]
                    )}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mt-14 md:mt-16 flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
              {order.map((t) => (
                <FunnelTestimonialCard
                  key={t.name}
                  testimonial={t}
                  accent={content.accent}
                  className="w-full max-w-sm"
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
