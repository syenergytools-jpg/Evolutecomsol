"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { services } from "@/lib/site-config";
import { LottiePlayer } from "@/components/ui/lottie-player";

/**
 * ServiceMarqueeIntro — restrained kinetic break before the deck.
 *
 * Design notes (post-redesign):
 *   • Replaced the chaotic 3-row marquee with one pinned editorial slab.
 *   • Single horizontal scrub line of service names (sweeping once on
 *     scroll, no infinite loop) + one Lottie focal at the center.
 *   • Obsidian anchor — the only dark moment in the pre-deck ramp.
 *   • Typography is the visual; no decorative blobs.
 */
export function ServiceMarqueeIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Single scrub line — sweeps once across the viewport
  const lineX = useTransform(scrollYProgress, [0, 1], ["12%", "-42%"]);

  // Lottie + tagline lift into view
  const focalY = useTransform(scrollYProgress, [0.2, 0.7], [60, 0]);
  const focalOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-obsidian text-canvas overflow-hidden py-32 md:py-40"
    >
      {/* DEPTH 0 — soft grain only */}
      <div
        aria-hidden="true"
        data-depth="0"
        className="depth-0 absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* DEPTH 1 — single quiet vignette */}
      <div
        aria-hidden="true"
        data-depth="1"
        className="depth-1 absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 50%, transparent 0%, var(--obsidian) 90%)",
        }}
      />

      {/* Top eyebrow */}
      <div data-depth="4" className="depth-4 relative container-x mb-12 md:mb-16">
        <div className="flex items-center gap-3 text-canvas/55">
          <span className="h-px w-10 bg-canvas/30" />
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
            Interlude
          </p>
        </div>
      </div>

      {/* Sweep line — single row, scrub-driven */}
      <div
        data-depth="3"
        className="depth-3 relative whitespace-nowrap fade-edges mb-20 md:mb-28"
      >
        <motion.div
          className="inline-flex items-center gap-12 md:gap-16"
          style={reduce ? undefined : { x: lineX }}
        >
          {[...services, ...services].map((s, i) => (
            <span
              key={`${s.slug}-${i}`}
              className="display italic text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95]"
              style={
                i % 2 === 0
                  ? { color: "var(--canvas)" }
                  : {
                      WebkitTextStroke: "1px rgba(244,241,234,0.55)",
                      color: "transparent",
                    }
              }
            >
              {s.title}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Focal slab — Lottie on the left, tagline on the right */}
      <motion.div
        data-depth="4"
        className="depth-4 relative container-x grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        style={
          reduce
            ? undefined
            : { y: focalY, opacity: focalOpacity }
        }
      >
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-sm aspect-[3/2]">
            <LottiePlayer
              src="/lottie/dots-drift.json"
              className="w-full h-full"
              ariaLabel="Drifting dots — kinetic visual interlude"
            />
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-canvas/45 mb-5">
            Eight cards. One scroll.
          </p>
          <h3 className="display text-[clamp(2rem,4.4vw,4rem)] leading-[1.04]">
            Now,{" "}
            <span className="italic font-normal text-copper-soft">
              meet the deck.
            </span>
          </h3>
          <p className="mt-7 text-base md:text-lg text-canvas/65 leading-[1.6] max-w-md">
            Eight stacked services. Scroll once and the whole operating
            system unfolds in front of you.
          </p>
        </div>
      </motion.div>

      {/* Bottom hairline accent */}
      <div
        aria-hidden="true"
        data-depth="5"
        className="depth-5 absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(244,241,234,0.4) 50%, transparent)",
        }}
      />
    </section>
  );
}
