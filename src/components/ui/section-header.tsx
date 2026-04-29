import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, StaggerWords } from "./reveal";

/**
 * Standardized section header — eyebrow + display heading + optional sub.
 * Used across the 20+ sections for clean rhythm.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  size = "md",
  invert = false,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  invert?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const sizeMap = {
    sm: "text-[clamp(1.75rem,3.6vw,3rem)]",
    md: "text-[clamp(2.25rem,5vw,4.5rem)]",
    lg: "text-[clamp(2.75rem,6.4vw,6rem)]",
  };
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow eyebrow-line mb-5",
              invert && "text-canvas/60"
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      <h2
        className={cn(
          "display leading-[1.02] mb-5",
          sizeMap[size],
          invert ? "text-canvas" : "text-ink"
        )}
      >
        {typeof title === "string" ? <StaggerWords text={title} /> : title}
      </h2>
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "text-lg md:text-xl leading-[1.6] max-w-2xl",
              align === "center" && "mx-auto",
              invert ? "text-canvas/70" : "text-ink-soft"
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
