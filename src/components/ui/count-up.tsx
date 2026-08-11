"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { fmt } from "@/lib/utils";

// Safety net: if the viewport intersection never fires, snap straight to
// the final value instead of leaving the number stuck at 0 forever.
const COUNTUP_FALLBACK_MS = 1500;

/**
 * CountUp — number ticker that animates from 0 → target on first
 * in-view. Renders identically on server and client (SSR shows the
 * final value, client overrides with 0 → target on mount when
 * motion is allowed). Reduced-motion: shows the final value
 * immediately.
 *
 * Use:
 *   <CountUp value={614537} prefix="$" decimals={0} />
 *   <CountUp value={3.4} suffix="×" decimals={1} />
 *   <CountUp value={412} prefix="+" suffix="%" />
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  formatThousands = true,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  formatThousands?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  // Lazy init — if reduced-motion is preferred, start at the final value
  // so the effect never has to setState synchronously (lint rule
  // react-hooks/set-state-in-effect).
  const [display, setDisplay] = useState<number>(() => (reduce ? value : 0));

  useLayoutEffect(() => {
    if (reduce) return;

    if (inView) {
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        // onUpdate runs in animation-frame callbacks, not synchronously
        onUpdate: (v) => setDisplay(v),
      });
      return controls.stop;
    }

    const id = setTimeout(() => setDisplay(value), COUNTUP_FALLBACK_MS);
    return () => clearTimeout(id);
  }, [inView, value, duration, reduce]);

  const formatted = (() => {
    if (decimals > 0) {
      return formatThousands
        ? display.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : display.toFixed(decimals);
    }
    const rounded = Math.round(display);
    return formatThousands ? fmt(rounded) : String(rounded);
  })();

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
