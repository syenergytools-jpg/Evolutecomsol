"use client";

import { motion } from "framer-motion";
import { type ReactElement } from "react";
import { cn } from "@/lib/utils";

/**
 * 12 inline animated SVG decorations for accent placement across the site.
 * Cheap (no Lottie runtime), reduced-motion safe, fully tinted via CSS.
 *
 * Usage:
 *   <Deco name="asterisk" className="h-6 w-6 text-electric" />
 *   <Deco name="squiggle" className="h-12 w-32 text-copper" spin />
 */
export type DecoName =
  | "asterisk"
  | "plus"
  | "spark"
  | "ring"
  | "ring-dashed"
  | "spiral"
  | "squiggle"
  | "wave"
  | "zigzag"
  | "arrow-circle"
  | "burst"
  | "blob";

const PATHS: Record<DecoName, ReactElement> = {
  asterisk: (
    <path d="M50 8 V92 M14 26 L86 74 M86 26 L14 74 M8 50 H92" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
  ),
  plus: (
    <path d="M50 14 V86 M14 50 H86" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
  ),
  spark: (
    <path
      d="M50 8 C52 36 64 48 92 50 C64 52 52 64 50 92 C48 64 36 52 8 50 C36 48 48 36 50 8 Z"
      fill="currentColor"
    />
  ),
  ring: (
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" />
  ),
  "ring-dashed": (
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeDasharray="6 8"
      strokeLinecap="round"
    />
  ),
  spiral: (
    <path
      d="M50 50 m-2,0 a2,2 0 1,1 4,0 a4,4 0 1,1 -8,0 a8,8 0 1,1 16,0 a16,16 0 1,1 -32,0 a32,32 0 1,1 64,0"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  ),
  squiggle: (
    <path
      d="M5 50 Q15 25, 25 50 T 45 50 T 65 50 T 85 50 T 95 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    />
  ),
  wave: (
    <path
      d="M5 60 C20 30 35 30 50 60 S80 90 95 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    />
  ),
  zigzag: (
    <path
      d="M10 70 L 30 30 L 50 70 L 70 30 L 90 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "arrow-circle": (
    <>
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M40 35 L60 50 L40 65" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  burst: (
    <>
      <line x1="50" y1="6" x2="50" y2="22" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="50" y1="78" x2="50" y2="94" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="6" y1="50" x2="22" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="78" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="20" y1="20" x2="32" y2="32" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="68" y1="68" x2="80" y2="80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="20" y1="80" x2="32" y2="68" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="68" y1="32" x2="80" y2="20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="50" r="10" fill="currentColor" />
    </>
  ),
  blob: (
    <path
      d="M48 8 C70 8 92 22 92 46 C92 68 76 86 54 90 C32 94 12 82 8 58 C4 34 26 8 48 8 Z"
      fill="currentColor"
    />
  ),
};

export function Deco({
  name,
  className,
  spin = false,
  pulse = false,
  drift = false,
}: {
  name: DecoName;
  className?: string;
  /** Slow rotation loop */
  spin?: boolean;
  /** Subtle scale pulse */
  pulse?: boolean;
  /** Lazy floating drift */
  drift?: boolean;
}) {
  const animation =
    spin
      ? { rotate: 360 }
      : pulse
      ? { scale: [1, 1.1, 1] }
      : drift
      ? { y: [0, -8, 0], x: [0, 4, 0] }
      : undefined;

  const transition =
    spin
      ? { duration: 18, repeat: Infinity, ease: "linear" as const }
      : pulse
      ? { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
      : drift
      ? { duration: 6, repeat: Infinity, ease: "easeInOut" as const }
      : undefined;

  return (
    <motion.svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("inline-block shrink-0", className)}
      animate={animation}
      transition={transition}
    >
      {PATHS[name]}
    </motion.svg>
  );
}

/**
 * Pre-positioned scatter of decorations — drop into any section as `aria-hidden`
 * accent. Each shape sits absolute and animates lightly.
 */
export function DecoScatter({
  density = "normal",
  palette = "brand",
  className,
}: {
  density?: "sparse" | "normal" | "dense";
  palette?: "brand" | "muted" | "lime";
  className?: string;
}) {
  const colors =
    palette === "lime"
      ? ["text-lime", "text-ink", "text-electric"]
      : palette === "muted"
      ? ["text-mute/40", "text-ink/30", "text-mute/30"]
      : ["text-electric", "text-copper", "text-ink", "text-emerald"];

  const shapes: Array<{
    name: DecoName;
    top: string;
    left?: string;
    right?: string;
    size: string;
    spin?: boolean;
    pulse?: boolean;
    drift?: boolean;
  }> = [
    { name: "asterisk", top: "8%", left: "4%", size: "h-6 w-6", spin: true },
    { name: "asterisk", top: "12%", right: "6%", size: "h-7 w-7", drift: true },
    { name: "spark", top: "30%", right: "3%", size: "h-5 w-5", pulse: true },
    { name: "ring", top: "55%", left: "3%", size: "h-10 w-10", drift: true },
    { name: "plus", top: "70%", right: "5%", size: "h-5 w-5", spin: true },
    { name: "ring-dashed", top: "82%", left: "8%", size: "h-12 w-12", spin: true },
    { name: "burst", top: "20%", left: "48%", size: "h-4 w-4", drift: true },
    { name: "blob", top: "78%", right: "12%", size: "h-7 w-7", pulse: true },
  ];

  const visible =
    density === "sparse" ? shapes.slice(0, 4) : density === "dense" ? shapes : shapes.slice(0, 6);

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
    >
      {visible.map((s, i) => (
        <span
          key={`${s.name}-${i}`}
          className="absolute"
          style={{ top: s.top, left: s.left, right: s.right }}
        >
          <Deco
            name={s.name}
            className={cn(s.size, colors[i % colors.length])}
            spin={s.spin}
            pulse={s.pulse}
            drift={s.drift}
          />
        </span>
      ))}
    </div>
  );
}
