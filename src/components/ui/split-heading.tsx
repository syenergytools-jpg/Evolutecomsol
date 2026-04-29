"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

/**
 * SplitHeading — scroll-driven word-by-word reveal.
 *
 * Uses GSAP SplitText with `mask: "lines"` so each line clips its own
 * overflow, then animates word `yPercent` from 110 → 0 staggered.
 * `scrub: true` ties the reveal to scroll position; otherwise it
 * fires once on enter.
 */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  scrub = false,
  start = "top 85%",
  end = "top 35%",
}: {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  scrub?: boolean;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      reduceRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  useGSAP(
    () => {
      if (reduceRef.current) return;
      const el = ref.current;
      if (!el) return;

      const run = () => {
        SplitText.create(el, {
          type: "words,lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (instance) => {
            return gsap.from(instance.words, {
              yPercent: 110,
              opacity: 0,
              stagger: 0.04,
              ease: scrub ? "none" : "power3.out",
              duration: scrub ? undefined : 0.9,
              scrollTrigger: {
                trigger: el,
                start,
                end,
                scrub,
                toggleActions: scrub
                  ? "play none none reverse"
                  : "play none none reverse",
              },
            });
          },
        });
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }
    },
    { scope: ref, dependencies: [scrub, start, end] }
  );

  const Component = Tag as unknown as React.ComponentType<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
  return (
    <Component ref={ref} className={cn(className)} style={{ opacity: 1 }}>
      {children}
    </Component>
  );
}
