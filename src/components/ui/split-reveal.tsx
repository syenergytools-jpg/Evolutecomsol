"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

// Register once on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/**
 * SplitReveal — drop-in scroll-driven text animation.
 *
 * Pattern (from the codepen reference):
 *   • SplitText splits children into words+lines with `mask: "lines"`
 *     so each line clips its own overflow.
 *   • lines start at yPercent: 120 (off-screen below the mask) and
 *     animate back to 0, scrubbed against scroll position so the
 *     reveal is tied to the user's scroll velocity, not a fixed
 *     duration.
 *   • Re-splits on font load + viewport resize via `autoSplit`.
 *
 * Use as a wrapper around any heading/paragraph:
 *
 *   <SplitReveal as="h2" className="display ...">
 *     One stack. Eight services.
 *   </SplitReveal>
 *
 * Reduced-motion: bypasses the SplitText effect entirely and renders
 * children as-is.
 */
export function SplitReveal({
  children,
  as: Tag = "div",
  className,
  /** How far each line starts below the mask, in % of its own height. */
  from = 120,
  /** Stagger between lines. */
  stagger = 0.1,
  /** Where the scroll-tied reveal starts/ends. */
  start = "top 85%",
  end = "bottom 60%",
  /** When `true`, scrub against scroll. When `false`, plays once on enter. */
  scrub = true,
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  from?: number;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useRef(false);

  // Detect reduced-motion once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useGSAP(
    () => {
      if (reduce.current) return;
      const el = ref.current;
      if (!el) return;

      // Wait for fonts so SplitText doesn't measure pre-FOUT widths
      const run = () => {
        SplitText.create(el, {
          type: "words,lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (instance) => {
            return gsap.from(instance.lines, {
              yPercent: from,
              stagger,
              ease: scrub ? "none" : "power2.out",
              duration: scrub ? undefined : 0.9,
              scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub: scrub ? true : false,
                toggleActions: scrub
                  ? "play none none reverse"
                  : "play none none reverse",
              },
            });
          },
        });
      };

      if (document.fonts && typeof document.fonts.ready?.then === "function") {
        document.fonts.ready.then(run);
      } else {
        run();
      }
    },
    { scope: ref, dependencies: [from, stagger, start, end, scrub] }
  );

  // Render the chosen tag with a ref. We type-cast props because TS
  // can't narrow `keyof JSX.IntrinsicElements` to a single ref-friendly
  // signature; the runtime is fine for any HTML container element.
  const Component = Tag as unknown as React.ComponentType<
    React.HTMLAttributes<HTMLElement> & {
      ref?: React.Ref<HTMLElement>;
    }
  >;

  return (
    <Component
      ref={ref}
      className={cn(className)}
      // Pin opacity so SSR markup is visible if the script hasn't run.
      style={{ opacity: 1 }}
    >
      {children}
    </Component>
  );
}
