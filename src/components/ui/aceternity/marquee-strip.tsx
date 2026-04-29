"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  /** sep between items — default ✦ */
  separator?: ReactNode;
  /** seconds for one full loop. Lower = faster. */
  duration?: number;
  /** scroll direction */
  direction?: "left" | "right";
  /** display size */
  size?: "sm" | "md" | "lg" | "xl";
  /** color theme */
  variant?: "ink" | "canvas" | "obsidian" | "lime" | "copper" | "electric";
  /** mask edges so it fades into bg */
  fadeEdges?: boolean;
  /** pause animation when hovering */
  pauseOnHover?: boolean;
  className?: string;
};

const sizeMap = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-6xl",
  lg: "text-5xl md:text-7xl lg:text-8xl",
  xl: "text-6xl md:text-8xl lg:text-9xl",
};

const variantMap: Record<NonNullable<MarqueeProps["variant"]>, { bg: string; text: string; sep: string; border: string }> = {
  ink: { bg: "bg-canvas", text: "text-ink", sep: "text-ink/30", border: "border-hairline" },
  canvas: { bg: "bg-canvas-2", text: "text-ink", sep: "text-ink/30", border: "border-hairline" },
  obsidian: { bg: "bg-obsidian", text: "text-canvas", sep: "text-canvas/30", border: "border-hairline-dark" },
  lime: { bg: "bg-lime", text: "text-ink", sep: "text-ink/30", border: "border-ink/10" },
  copper: { bg: "bg-copper", text: "text-canvas", sep: "text-canvas/40", border: "border-canvas/15" },
  electric: { bg: "bg-electric", text: "text-canvas", sep: "text-canvas/40", border: "border-canvas/15" },
};

/**
 * Big bold rotating text strip — Flow Party / Awwwards style section divider.
 * Two cloned tracks for seamless infinite scroll. GPU-accelerated.
 */
export function MarqueeStrip({
  items,
  separator = "✦",
  duration = 32,
  direction = "left",
  size = "lg",
  variant = "ink",
  fadeEdges = false,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const v = variantMap[variant];
  // Duplicate enough to ensure no visible gap during loop
  const duplicated = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y py-7 md:py-10",
        v.bg,
        v.border,
        className
      )}
    >
      <div className={cn("flex w-max", fadeEdges && "fade-edges")}>
        <div
          className={cn(
            "marquee-x flex items-center gap-10 md:gap-16 whitespace-nowrap pr-10 md:pr-16",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animationDuration: `${duration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {duplicated.map((w, i) => (
            <span
              key={`a-${w}-${i}`}
              className={cn("display leading-none flex items-center gap-10 md:gap-16", sizeMap[size], v.text)}
            >
              {w}
              <span className={cn("text-[0.7em]", v.sep)}>{separator}</span>
            </span>
          ))}
        </div>
        <div
          className={cn(
            "marquee-x flex items-center gap-10 md:gap-16 whitespace-nowrap pr-10 md:pr-16",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animationDuration: `${duration}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
          aria-hidden="true"
        >
          {duplicated.map((w, i) => (
            <span
              key={`b-${w}-${i}`}
              className={cn("display leading-none flex items-center gap-10 md:gap-16", sizeMap[size], v.text)}
            >
              {w}
              <span className={cn("text-[0.7em]", v.sep)}>{separator}</span>
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        .marquee-x {
          animation: marquee-x linear infinite;
          will-change: transform;
        }
        @keyframes marquee-x {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-x { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
