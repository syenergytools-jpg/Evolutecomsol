"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Word-by-word fade & blur reveal — Aceternity's signature header animation.
 */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
}) => {
  const wordsArray = words.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className={cn("font-bold", className)}>
      <div className="leading-tight">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
            animate={
              inView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: filter ? "blur(10px)" : "none" }
            }
            transition={{
              duration,
              delay: delay + idx * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
};
