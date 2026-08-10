"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Fragment, ReactNode, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

// Safety net: if the viewport IntersectionObserver never reports an
// intersection (backgrounded tab on load, a missed edge case -- whatever
// the cause), force the content visible rather than leaving it stuck at
// its pre-reveal (invisible) state forever. This is marketing copy; it
// must never be permanently hidden just because a scroll-in animation
// didn't get a chance to fire.
const REVEAL_FALLBACK_MS = 1500;

/** Generic in-view reveal with translate + fade. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const [fallback, setFallback] = useState(false);

  useLayoutEffect(() => {
    if (reduce || inView) return;
    const id = setTimeout(() => setFallback(true), REVEAL_FALLBACK_MS);
    return () => clearTimeout(id);
  }, [reduce, inView]);

  const shown = reduce || inView || fallback;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: PREMIUM_EASE, delay },
    },
  };
  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={shown ? "show" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word stagger reveal — the headline mask effect. */
export function StaggerWords({
  text,
  className,
  delayStart = 0,
  wordClassName,
}: {
  text: string;
  className?: string;
  delayStart?: number;
  wordClassName?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [fallback, setFallback] = useState(false);

  useLayoutEffect(() => {
    if (reduce || inView) return;
    const id = setTimeout(() => setFallback(true), REVEAL_FALLBACK_MS);
    return () => clearTimeout(id);
  }, [reduce, inView]);

  const shown = reduce || inView || fallback;
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* pr-[0.1em] gives slanted (italic) glyphs room so their
              trailing edge isn't clipped by this box's overflow-hidden
              mask — without it, the last letter of an italic word gets
              cut off on the right. */}
          <span className="inline-block overflow-hidden align-baseline pr-[0.1em] -mr-[0.1em]">
            <motion.span
              className={cn("inline-block", wordClassName)}
              initial={{ y: reduce ? 0 : "110%" }}
              animate={{ y: shown ? 0 : reduce ? 0 : "110%" }}
              transition={{
                duration: 0.9,
                ease: PREMIUM_EASE,
                delay: delayStart + i * 0.06,
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* Separator space lives OUTSIDE the word's inline-block box —
              a trailing space as the LAST character inside an
              inline-block gets collapsed by CSS end-of-line whitespace
              rules, which was silently swallowing the gaps between
              words in every heading on the site. */}
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
