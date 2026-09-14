"use client";

import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { funnelAccent } from "./funnel-theme";
import type { FunnelAccent } from "./funnel-theme";

export type FunnelHeadingText = { lead: string; accent: string };

/**
 * FunnelHeading — the shared two-tone section title for every funnel
 * section: the `lead` half in canvas white, the `accent` half in the
 * page's own accent color and italic, flowing as one sentence (not
 * forced onto separate lines — only <FunnelHero>'s H1 does that, since
 * it's a genuinely two-line headline). Sized larger than the shared
 * `SectionHeader` (`@/components/ui/section-header`) on purpose — that
 * component is used site-wide and wasn't touched, this is a funnel-only
 * replacement for it so the bigger type scale can't leak into the main
 * site.
 */
export function FunnelHeading({
  eyebrow,
  title,
  subtitle,
  accent,
  size = "lg",
  className,
}: {
  eyebrow?: string;
  title: FunnelHeadingText;
  subtitle?: string;
  accent: FunnelAccent;
  size?: "md" | "lg";
  className?: string;
}) {
  const accentClasses = funnelAccent[accent];
  const sizeClass =
    size === "lg"
      ? "text-[clamp(2.1rem,5.8vw,4.75rem)]"
      : "text-[clamp(1.85rem,4.6vw,3.5rem)]";

  return (
    <div className={cn("max-w-3xl mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow justify-center mb-5 text-canvas/55">
            {eyebrow}
          </p>
        </Reveal>
      )}

      <h2 className={cn("display text-balance mb-5 text-canvas", sizeClass)}>
        <StaggerWords text={title.lead} />
        {" "}
        <StaggerWords
          text={title.accent}
          delayStart={0.2}
          wordClassName={cn("italic font-normal transition-colors duration-500", accentClasses.fg)}
        />
      </h2>

      {subtitle && (
        <Reveal delay={0.25}>
          <p className="text-lg md:text-xl leading-[1.6] max-w-2xl mx-auto text-canvas/70">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
