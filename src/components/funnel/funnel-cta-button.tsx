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
  const sizing =
    size === "lg"
      ? "px-7 py-4 text-[1rem]"
      : size === "sm"
      ? "px-4 py-2 text-[0.85rem]"
      : "px-6 py-3 text-[0.95rem]";

  return (
    <button type="button" onClick={onClick} className="inline-flex">
      <span
        className={cn(
          "btn-pill group shadow-[0_10px_32px_-10px_rgba(0,0,0,0.5)]",
          accentClasses.solid,
          sizing,
          className
        )}
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
