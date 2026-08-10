"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * ConsultationVideo — section 2. `/Scene.mp4` is a placeholder (same clip
 * used as "See the stack run on a real engagement" in macbook-showcase.tsx)
 * — swap the `src` below for real result footage whenever it's ready.
 *
 * Deliberately NOT built on <MacbookFrame>: that component scroll-jacks
 * 200vh for its lid-open effect, which is fine on the homepage's long
 * scroll but wrong here — this page wants every scroll-inch to move
 * toward the qualifier, not spend two screens opening a laptop lid.
 */
export function ConsultationVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const hasAutoplayed = useRef(false);

  // Autoplay once, the first time the player scrolls into view — not a
  // continuous observer toggle, so it never fights with the manual button.
  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap || reduce) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoplayed.current) {
          hasAutoplayed.current = true;
          video.play().catch(() => undefined);
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, [reduce]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
  }

  return (
    <section className="relative bg-obsidian text-canvas py-28 md:py-36 overflow-hidden">
      {/* ambient glow, same recipe as Testimonials/PageHero */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,102,255,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,112,74,0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container-x relative z-10">
        <SectionHeader
          invert
          align="center"
          eyebrow="See the stack in motion"
          title="How our services actually move the needle."
          size="md"
        />

        <div
          ref={wrapRef}
          className="mt-12 md:mt-16 relative max-w-6xl mx-auto"
        >
          <div className="relative aspect-video rounded-[1.75rem] overflow-hidden border border-canvas/12 bg-obsidian-soft shadow-[0_50px_120px_-40px_rgba(0,0,0,0.6)]">
            <video
              ref={videoRef}
              src="/Scene.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              aria-label="Evolut studio operations — cinematic loop"
            />

            <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/70 backdrop-blur px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-canvas">
              <span className="h-1 w-1 rounded-full bg-copper" />
              Evolut operations · live look
            </span>

            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause video" : "Play video"}
              className="absolute bottom-4 left-4 z-10 grid place-items-center h-11 w-11 rounded-full bg-canvas/90 backdrop-blur text-ink hover:bg-canvas transition-colors"
            >
              {playing ? (
                <Pause className="h-4 w-4" strokeWidth={2.2} />
              ) : (
                <Play className="h-4 w-4" strokeWidth={2.2} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
