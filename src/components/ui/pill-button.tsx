"use client";

import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "ink" | "ivory" | "electric" | "ghost";

const variantClasses: Record<Variant, string> = {
  ink: "bg-ink text-canvas hover:bg-ink-soft shadow-[0_8px_24px_-8px_rgba(15,17,21,0.4)]",
  ivory:
    "bg-canvas text-ink hover:bg-surface shadow-[0_8px_24px_-8px_rgba(255,255,255,0.2)]",
  electric:
    "bg-electric text-white hover:bg-electric-glow shadow-[0_8px_28px_-8px_rgba(0,102,255,0.6)]",
  ghost:
    "bg-transparent text-ink border border-hairline hover:bg-surface/70 backdrop-blur",
};

export function PillButton({
  children,
  variant = "ink",
  href,
  onClick,
  className,
  showArrow = true,
  size = "md",
}: {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizing =
    size === "lg"
      ? "px-7 py-4 text-[1rem]"
      : size === "sm"
      ? "px-4 py-2 text-[0.85rem]"
      : "px-6 py-3 text-[0.95rem]";

  const inner = (
    <span
      className={cn(
        "btn-pill group",
        variantClasses[variant],
        sizing,
        className
      )}
    >
      <span className="font-medium">{children}</span>
      {showArrow && (
        <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden">
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex">
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="inline-flex">
      {inner}
    </button>
  );
}
