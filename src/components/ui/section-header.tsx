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
  // Only the clamp FLOORS were lowered for mobile. Above roughly a
  // 720px viewport the vw term already exceeds the old floor, so every
  // size here renders identically to before on desktop — the change is
  // confined to phones, where a 36px/44px heading was eating three
  // lines of a 335px column.
  const sizeMap = {
    sm: "text-[clamp(1.5rem,3.6vw,3rem)]",
    md: "text-[clamp(1.75rem,5vw,4.5rem)]",
    lg: "text-[clamp(2rem,6.4vw,6rem)]",
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
      {/* text-balance so a heading that wraps splits evenly instead of
          dropping one orphan word onto the last line — the thing that
          actually makes a wrapped heading look broken on a phone.
          `leading-*` is deliberately absent: it does nothing on a
          .display element (see the note in globals.css). */}
      <h2
        className={cn(
          "display text-balance mb-5",
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
