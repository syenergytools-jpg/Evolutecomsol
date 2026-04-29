"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

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
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
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
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: reduce ? 0 : "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              duration: 0.9,
              ease: PREMIUM_EASE,
              delay: delayStart + i * 0.06,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
