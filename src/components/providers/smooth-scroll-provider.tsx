"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wires Lenis smooth scroll into the page lifecycle.
 * - Disables itself when prefers-reduced-motion is set.
 * - Adds the .lenis class to <html> for compatible CSS.
 * - Syncs with GSAP ScrollTrigger (standard Lenis+GSAP recipe): Lenis's
 *   scroll ticks call `ScrollTrigger.update()`, and `gsap.ticker` drives
 *   Lenis's `raf` (replacing `autoRaf`) so both run on the same clock.
 *   Without this, any `scrub`-linked ScrollTrigger animation reads a
 *   scroll position out of sync with what Lenis is actually rendering —
 *   Lenis intercepts wheel/touch input and animates scroll itself
 *   rather than using the browser's native instant scroll, and
 *   ScrollTrigger has no way to know about that unless told.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function driveLenis(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(driveLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(driveLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
