"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedList
 *
 * Auto-cycling vertical feed. Each tick: a new item slides in at the
 * top, every existing card shifts down one slot, and the bottom card
 * peels away with a fade. Stable per-item keys mean only the entering
 * and exiting cards animate — the cards in between glide via shared
 * layout instead of re-mounting.
 *
 * Pause: `pauseOnHover` defaults to `true`. The cycle resumes when
 * the cursor leaves the list.
 *
 * Reduced motion: renders the most-recent N items statically.
 */
export function AnimatedList({
  items,
  visibleCount = 4,
  intervalMs = 2200,
  pauseOnHover = true,
  className,
  itemClassName,
}: {
  items: ReactNode[];
  visibleCount?: number;
  intervalMs?: number;
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();
  const [head, setHead] = useState(0); // index of newest visible item
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || items.length <= visibleCount) return;
    const id = setInterval(() => {
      setHead((h) => (h + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduce, paused, intervalMs, items.length, visibleCount]);

  // Build the visible window — newest at top (pos 0), oldest at bottom.
  // Key is the source item index so framer-motion tracks the same card
  // across renders and only the entering/exiting one re-animates.
  const visible: { key: number; node: ReactNode; pos: number }[] = [];
  for (let pos = 0; pos < visibleCount; pos++) {
    const idx = (head - pos + items.length * 2) % items.length;
    visible.push({ key: idx, node: items[idx], pos });
  }

  if (reduce) {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        {visible.map((item) => (
          <div key={item.key} className={itemClassName}>
            {item.node}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      className={cn("relative flex flex-col gap-3", className)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((item) => (
          <motion.div
            key={item.key}
            layout
            initial={{ opacity: 0, y: -28, scale: 0.96 }}
            animate={{
              opacity: Math.max(0.35, 1 - item.pos * 0.16),
              y: 0,
              scale: 1 - item.pos * 0.018,
            }}
            exit={{
              opacity: 0,
              y: 24,
              scale: 0.94,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 32,
              mass: 0.85,
            }}
            className={cn("origin-top will-change-transform", itemClassName)}
            style={{ zIndex: visibleCount - item.pos }}
          >
            {item.node}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
