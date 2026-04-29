"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * LogoMarquee — endless horizontal scroll of brand SVG marks.
 * Pure CSS animation (uses our existing `marquee-track` keyframe in
 * globals.css). The list is duplicated once for seamless looping.
 *
 * Drop-in: pass an array of `{ src, alt }`. Tone defaults to canvas;
 * pass `dark` to render on obsidian (logos auto-tinted via CSS
 * `filter: invert/brightness` for monochrome marks where helpful).
 */
type Logo = {
  src: string;
  alt: string;
  /** Render the logo with `filter: brightness(0)` so monochrome dark
   *  marks become canvas on a dark surface. Off by default. */
  invert?: boolean;
};

export function LogoMarquee({
  logos,
  duration = 40,
  className,
  itemClassName,
  dark = false,
}: {
  logos: Logo[];
  /** Seconds for one full cycle. Bigger = slower. */
  duration?: number;
  className?: string;
  itemClassName?: string;
  dark?: boolean;
}) {
  // Duplicate so the loop is seamless when translateX hits -50%
  const items = [...logos, ...logos];

  return (
    <div
      className={cn(
        "fade-edges relative overflow-hidden py-6 md:py-8",
        dark ? "bg-obsidian" : "bg-transparent",
        className
      )}
    >
      <div
        className="marquee-track flex w-max items-center gap-12 md:gap-16"
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className={cn(
              "shrink-0 h-10 md:h-12 flex items-center justify-center grayscale opacity-65 hover:opacity-100 hover:grayscale-0 transition-[opacity,filter] duration-500",
              itemClassName
            )}
            title={logo.alt}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={48}
              className={cn(
                "h-8 md:h-10 w-auto object-contain",
                dark && logo.invert && "brightness-0 invert"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
