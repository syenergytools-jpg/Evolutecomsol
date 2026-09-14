"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { funnelAccent } from "./funnel-theme";
import type { FunnelAccent } from "./funnel-theme";

/**
 * Accent-aware pill CTA — visually matches @/components/ui/pill-button
 * (same .btn-pill base, same arrow-on-hover) but adds the copper/emerald
 * fills that component doesn't have variants for yet. Kept local to
 * funnel/ rather than extending PillButton, so nothing shared changes.
 */
export function FunnelCtaButton({
  children,
  accent,
  onClick,
  size = "lg",
  className,
}: {
  children: React.ReactNode;
  accent: FunnelAccent;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const accentClasses = funnelAccent[accent];
  // `.btn-pill` in globals.css sets `padding`/`font-size` directly and is
  // UNLAYERED (not inside @layer utilities) — same trap as this file's
  // border-color/`.display` gotchas elsewhere in this codebase, so a
  // plain `px-*`/`py-*`/`text-*` class here is silently defeated
  // regardless of `size`. Custom properties + inline `style` beat it
  // (inline style always wins), same workaround already used for
  // border-color. `lg` is responsive (smaller pre-`sm:`) because its
  // longest real label ("Book Your Free Brand Protection Call") doesn't
  // fit the 375px pill on one line at the old fixed size, and a
  // 2-line pill breaks the stadium shape and the icon's centering.
  const sizing =
    size === "lg"
      ? "[--btn-pad-y:0.875rem] [--btn-pad-x:1.25rem] [--btn-font:0.9rem] sm:[--btn-pad-y:1rem] sm:[--btn-pad-x:1.75rem] sm:[--btn-font:1rem]"
      : size === "sm"
      ? "[--btn-pad-y:0.5rem] [--btn-pad-x:1rem] [--btn-font:0.85rem]"
      : "[--btn-pad-y:0.75rem] [--btn-pad-x:1.5rem] [--btn-font:0.95rem]";

  return (
    <button type="button" onClick={onClick} className="inline-flex">
      <span
        className={cn(
          "btn-pill group shadow-[0_10px_32px_-10px_rgba(0,0,0,0.5)]",
          accentClasses.solid,
          sizing,
          className
        )}
        style={{ padding: "var(--btn-pad-y) var(--btn-pad-x)", fontSize: "var(--btn-font)" }}
      >
        <span className="font-semibold">{children}</span>
        <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden">
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      </span>
    </button>
  );
}
