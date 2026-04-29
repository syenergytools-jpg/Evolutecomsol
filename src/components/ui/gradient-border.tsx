"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * GradientBorder — card with an animated conic-gradient border using
 * the `--beam-angle` CSS @property already registered in globals.css.
 *
 * Uses `mask-composite: xor` to punch the inner area of the gradient
 * out, leaving only a thin border ring that rotates. Body content
 * sits unaffected on top.
 *
 * Drop-in: <GradientBorder>{children}</GradientBorder>.
 */
export function GradientBorder({
  children,
  className,
  innerClassName,
  rounded = "rounded-2xl",
  /** seconds for one full rotation */
  speed = 8,
  tone = "copper",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  rounded?: string;
  speed?: number;
  tone?: "copper" | "electric" | "chrome";
}) {
  // Per-tone gradient stops — keeps the rotating beam on-brand
  const stops: Record<typeof tone, string> = {
    copper:
      "transparent 0%, var(--copper) 25%, var(--copper-soft) 35%, transparent 50%, transparent 75%, var(--copper) 90%, transparent 100%",
    electric:
      "transparent 0%, var(--electric) 25%, var(--electric-glow) 35%, transparent 50%, transparent 75%, var(--electric) 90%, transparent 100%",
    chrome:
      "transparent 0%, var(--chrome-2) 25%, var(--chrome-1) 35%, transparent 50%, transparent 75%, var(--chrome-3) 90%, transparent 100%",
  };

  return (
    <div
      className={cn(
        "relative isolate",
        rounded,
        className
      )}
    >
      {/* Animated beam ring */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-px",
          rounded,
          "[animation:beam-rotate_var(--beam-speed)_linear_infinite]"
        )}
        style={{
          padding: "1px",
          ["--beam-speed" as string]: `${speed}s`,
          background: `conic-gradient(from var(--beam-angle), ${stops[tone]})`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* Inner surface */}
      <div
        className={cn(
          "relative",
          rounded,
          "bg-canvas",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
