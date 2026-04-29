"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { fmt } from "@/lib/utils";

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

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      // onUpdate runs in animation-frame callbacks, not synchronously
      onUpdate: (v) => setDisplay(v),
    });
    return controls.stop;
  }, [inView, value, duration, reduce]);

  const formatted = (() => {
    if (decimals > 0) return display.toFixed(decimals);
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
