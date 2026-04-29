"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { MacbookFrame } from "@/components/ui/aceternity/macbook-frame";

/**
 * MacbookShowcase — wraps the existing MacbookFrame with our Scene.mp4
 * playing inside the lid. The frame already does the scroll-driven lid
 * open + scale-up; we just feed it a looping muted video as `src`.
 *
 * Plays only when in viewport so it doesn't burn battery off-screen.
 */
export function MacbookShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.1 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [reduce]);

  return (
    <section className="relative bg-canvas overflow-hidden">
      <MacbookFrame
        title={
          <>
            See the stack run
            <br />
            <span className="italic font-normal text-copper">
              on a real engagement.
            </span>
          </>
        }
        src={
          <video
            ref={videoRef}
            src="/Scene.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            aria-label="Evolut studio operations — cinematic loop"
          />
        }
      />
    </section>
  );
}
