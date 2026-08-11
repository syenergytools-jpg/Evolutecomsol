"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

/**
 * ConsultationVideo — section 2. The proof-of-work beat, split out of
 * the hero so the hero's CTA sits directly under the promise instead of
 * behind a video. Anyone who needs convincing scrolls one section; the
 * platform badges close the section so the video lands on evidence.
 *
 * Self-hosted /funnel-intro.mp4 (1920x1080, so the 16:9 box below is
 * exact) rather than a YouTube embed: no third-party player chrome, no
 * "watch on YouTube" escape hatch out of a paid-traffic funnel, and no
 * cookie or consent surface from another origin.
 *
 * Click to play WITH sound, deliberately not muted autoplay. This is a
 * spoken pitch, and muted autoplay would run the opening line past
 * everyone who scrolls in. `preload="metadata"` keeps that choice cheap:
 * the browser fetches the header, not the 42MB body, until someone
 * actually presses play. The `#t=0.1` fragment makes the browser seek to
 * the first frame and paint it, which gives us a poster image without
 * shipping a separate one.
 *
 * Real platforms the team operates on daily — a short list rather than
 * every logo in site-config, and kept distinct from the stats in the
 * marquee below so the two rows complement rather than repeat.
 */
const PLATFORMS = ["Amazon", "Shopify", "Walmart", "TikTok Shop", "Meta", "Google"];

export function ConsultationVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function play() {
    videoRef.current?.play().catch(() => undefined);
  }

  return (
    <section id="how-it-works" className="relative bg-canvas-2 py-16 md:py-24 scroll-mt-20">
      <div className="container-x">
        {/* explicit radius, not rounded-2xl — this project overrides the
            Tailwind radius scale (--radius-2xl is 40px here) */}
        <div className="relative max-w-6xl mx-auto aspect-video rounded-[0.875rem] overflow-hidden bg-obsidian-soft">
          <video
            ref={videoRef}
            src="/funnel-intro.mp4#t=0.1"
            preload="metadata"
            playsInline
            controls={started}
            onPlay={() => setStarted(true)}
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="How Evolut runs the whole ecommerce stack"
          />

          {/* Overlay unmounts on first play so it can never sit on top of
              the native scrubber and swallow clicks. */}
          {!started && (
            <button
              type="button"
              onClick={play}
              aria-label="Play the intro video"
              className="group absolute inset-0 grid place-items-center cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent"
              />
              <span className="relative grid place-items-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-canvas/95 text-ink shadow-[0_18px_40px_-12px_rgba(15,17,21,0.5)] transition-transform duration-300 group-hover:scale-105">
                <Play
                  className="h-6 w-6 md:h-7 md:w-7 translate-x-0.5"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            </button>
          )}
        </div>

        {/* trust badges — real platforms, no invented awards or logos */}
        <Reveal delay={0.15}>
          <div className="mt-12 md:mt-14 max-w-4xl mx-auto">
            <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mute mb-5">
              Operating daily across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {PLATFORMS.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-hairline-strong bg-canvas/70 backdrop-blur px-4 py-1.5 text-sm text-ink-soft"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
