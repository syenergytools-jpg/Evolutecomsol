"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Falling meteor streaks. Pure CSS animation with seeded
 * pseudo-randomized delays/speeds.
 *
 * SSR-safe: positions are derived from each meteor's index via a
 * cheap deterministic PRNG, so the server and client render identical
 * values and React's hydration check passes. Avoids the `useEffect +
 * setState` pattern (which triggers a cascading-render lint warning).
 */
export const Meteors = ({
  number = 20,
  className,
  color = "rgba(255,255,255,0.6)",
}: {
  number?: number;
  className?: string;
  color?: string;
}) => {
  const meteors = useMemo(() => {
    // Tiny deterministic PRNG — fract(sin(i * a + salt * b) * c)
    const rand = (i: number, salt: number) => {
      const x = Math.sin(i * 9301.17 + salt * 49297.31) * 233280.13;
      return x - Math.floor(x);
    };

    return Array.from({ length: number }).map((_, i) => ({
      key: i,
      top: `${Math.floor(rand(i, 1) * 30) - 20}%`,
      left: `${Math.floor(rand(i, 2) * 100)}%`,
      delay: `${(rand(i, 3) * 4).toFixed(3)}s`,
      duration: `${(4 + rand(i, 4) * 6).toFixed(3)}s`,
    }));
  }, [number]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {meteors.map((m) => (
        <span
          key={m.key}
          className="meteor absolute h-[1px] w-[140px] rotate-[215deg] rounded-full"
          style={{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            filter: "drop-shadow(0 0 6px " + color + ")",
          }}
        />
      ))}
      <style jsx>{`
        .meteor {
          animation: meteor-fall linear infinite;
        }
        @keyframes meteor-fall {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-1400px);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .meteor { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </div>
  );
};
