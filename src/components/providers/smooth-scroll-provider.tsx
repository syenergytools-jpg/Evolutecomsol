"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * Wires Lenis smooth scroll into the page lifecycle.
 * - Disables itself when prefers-reduced-motion is set.
 * - Adds the .lenis class to <html> for compatible CSS.
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
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
