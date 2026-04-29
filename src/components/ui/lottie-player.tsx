"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";

type LottieJSON = Record<string, unknown>;

/**
 * LottiePlayer
 * ----------------------------------------------------------------------------
 * Lazy + in-view + reduced-motion aware Lottie wrapper.
 *
 * Behavior:
 *   • Loads the JSON via fetch on mount (or accepts a pre-loaded animation).
 *   • Pauses when off-screen (IntersectionObserver) — never burns CPU when
 *     the user has scrolled past it.
 *   • If `prefers-reduced-motion` is on, freezes on the first frame.
 *   • If no `src` is provided OR the fetch fails, renders an elegant
 *     `fallback` (or a minimal CSS-only motif) instead of crashing.
 *
 * Web vs. Android note: Lottie .json files are portable across runtimes
 * (lottie-android, lottie-ios, lottie-web). Drop any animation from
 * lottiefiles.com or airbnb/lottie samples into /public/lottie/ and pass
 * the path to `src`.
 */
export function LottiePlayer({
  src,
  animationData,
  className,
  style,
  loop = true,
  autoplay = true,
  fallback,
  ariaLabel,
  speed = 1,
}: {
  /** Path to a `.json` Lottie animation, e.g. `/lottie/orbit.json`. */
  src?: string;
  /** Or pass a pre-imported animation object directly. */
  animationData?: LottieJSON;
  className?: string;
  style?: CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
  /** Rendered when no animation data is available (no src, fetch failed). */
  fallback?: ReactNode;
  /** Read by screen readers. Decorative animations should leave this empty. */
  ariaLabel?: string;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [data, setData] = useState<LottieJSON | null>(animationData ?? null);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);

  // Fetch JSON if src given
  useEffect(() => {
    if (animationData || !src) return;
    let active = true;
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`Lottie fetch failed: ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (active) setData(json);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [src, animationData]);

  // Pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (reduce) {
      inst.goToAndStop(0, true);
      return;
    }
    inst.setSpeed(speed);
    if (inView && autoplay) inst.play();
    else inst.pause();
  }, [inView, reduce, autoplay, speed, data]);

  const showFallback = !data || failed;

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={style}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {showFallback ? (
        fallback ?? <DefaultFallback />
      ) : (
        <Lottie
          lottieRef={lottieRef}
          animationData={data}
          loop={loop}
          autoplay={!reduce && autoplay}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: true,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}

/**
 * Quiet, on-brand CSS fallback — used when no Lottie file is wired up.
 * A slow concentric pulse in copper. Decorative only.
 */
function DefaultFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <span className="absolute h-32 w-32 rounded-full border border-copper/30 animate-[lottie-pulse_3s_ease-in-out_infinite]" />
      <span
        className="absolute h-20 w-20 rounded-full border border-copper/40 animate-[lottie-pulse_3s_ease-in-out_infinite]"
        style={{ animationDelay: "0.6s" }}
      />
      <span className="relative h-3 w-3 rounded-full bg-copper" />
      <style jsx>{`
        @keyframes lottie-pulse {
          0%,
          100% {
            transform: scale(0.85);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
