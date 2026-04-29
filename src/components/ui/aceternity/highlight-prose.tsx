"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type HighlightTone = "yellow" | "lime" | "electric" | "copper" | "mint" | "lilac";

const TONE_BG: Record<HighlightTone, string> = {
  yellow: "bg-[#fde047]",
  lime: "bg-lime",
  electric: "bg-electric/20",
  copper: "bg-copper/30",
  mint: "bg-emerald/25",
  lilac: "bg-[#d8b4fe]",
};

/**
 * Editorial serif paragraph with inline word "highlight pills" — lifted from
 * the Text Hover Animation reference (Flowmania). Pills draw on as the block
 * scrolls into view with a left-to-right wipe.
 */
export function HighlightProse({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-serif text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.32] text-ink tracking-tight",
        className
      )}
      style={{ fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif" }}
    >
      {children}
    </p>
  );
}

/**
 * Single inline highlight pill. Animates a colored background sliding in
 * from left when its parent enters the viewport.
 */
export function Highlight({
  children,
  tone = "yellow",
  className,
}: {
  children: ReactNode;
  tone?: HighlightTone;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-block px-2 py-0.5 mx-0.5 rounded-md whitespace-nowrap",
        className
      )}
    >
      <motion.span
        className={cn("absolute inset-0 rounded-md origin-left", TONE_BG[tone])}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

/**
 * Inline italic accent — different font, no background. For variety inside
 * a serif paragraph.
 */
export function Italic({ children }: { children: ReactNode }) {
  return (
    <em className="italic font-light text-ink-soft">{children}</em>
  );
}

/**
 * Inline circular badge — used to drop a small avatar/coin into running text.
 * Children can be a numeric label, an icon, or initials.
 */
export function InlineBadge({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "electric" | "copper" | "lime";
  className?: string;
}) {
  const toneCls =
    tone === "electric"
      ? "bg-electric text-canvas"
      : tone === "copper"
      ? "bg-copper text-canvas"
      : tone === "lime"
      ? "bg-lime text-ink"
      : "bg-ink text-canvas";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center align-middle rounded-full",
        "h-[1em] w-[1em] mx-1 text-[0.55em] font-mono font-bold",
        toneCls,
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Inline avatar stack — tucks a tight overlapping cluster of mini avatars into
 * the body of a sentence (mirrors the Flowmania pattern at the end of the para).
 */
export function InlineAvatarStack({
  initials,
  className,
}: {
  initials: string[];
  className?: string;
}) {
  const tones = [
    "linear-gradient(135deg,#0066ff,#3d8bff)",
    "linear-gradient(135deg,#e8704a,#f4a585)",
    "linear-gradient(135deg,#10b981,#34d399)",
    "linear-gradient(135deg,#0a0a0b,#2a2d35)",
  ];

  return (
    <span className={cn("inline-flex align-middle -space-x-2 mx-1", className)}>
      {initials.map((it, i) => (
        <span
          key={`${it}-${i}`}
          className="inline-flex h-[1em] w-[1em] items-center justify-center rounded-full ring-2 ring-canvas text-[0.45em] font-mono font-bold text-canvas"
          style={{ background: tones[i % tones.length] }}
        >
          {it}
        </span>
      ))}
    </span>
  );
}
