"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cycles through a list of words with a clean fade+slide swap.
 * Uses AnimatePresence in `wait` mode so layout never overlaps.
 */
export const FlipWords = ({
  words,
  duration = 2400,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    const t = setTimeout(advance, duration);
    return () => clearTimeout(t);
  }, [index, duration, advance]);

  const currentWord = words[index];

  return (
    <span className={cn("relative inline-block align-baseline", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-0.4em", filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
