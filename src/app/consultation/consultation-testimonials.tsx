"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * ConsultationTestimonials â€” real client review videos, dot-paginated
 * slider. Only 2 real clips exist so far (public/reviewVideos/) â€” no
 * fabricated names/quotes are attached to them (we don't know who's in
 * the footage yet), so the label stays a generic, honest "Verified
 * client" until the real name/company is provided. Swap `REVIEWS`
 * below once more clips land; the slider mechanism already scales.
 *
 * Both source clips are portrait/phone-recorded (measured 480x672 and
 * 528x944 â€” both close to a 9:16 vertical), so cards use a tall
 * aspect ratio instead of the old 4:5 photo-card shape.
 *
 * Active-dot tracking uses a native `scroll` listener (not
 * whileInView/IntersectionObserver) â€” it only needs to react to real
 * user scroll input, so there's no viewport-detection timing to get
 * wrong.
 */
/**
 * Each clip needs an explicit `poster`, otherwise the card renders as a
 * black rectangle until the visitor presses play — which is a poor look
 * for the only social proof on the page. The posters are real frames
 * exported to public/reviewVideos/*-poster.jpg.
 *
 * To regenerate after swapping a clip: there is no ffmpeg in this
 * environment, so the frame is pulled by decoding the video to a canvas
 * in the browser and POSTing the JPEG to a throwaway dev route. Sample a
 * few timestamps first — review_1's opening second has a hand across the
 * lens, so its poster is taken at 4s rather than the start.
 */
const REVIEWS = [
  {
    src: "/reviewVideos/review_1.mp4",
    poster: "/reviewVideos/review_1-poster.jpg",
    name: "Verified client",
  },
  {
    src: "/reviewVideos/review_2.mp4",
    poster: "/reviewVideos/review_2-poster.jpg",
    name: "Verified client",
  },
];

export function ConsultationTestimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const centerX = scrollerRect.left + scrollerRect.width / 2;
    let closest = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    updateActive();
    scroller.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      scroller.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  function goTo(i: number) {
    cardRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  // Only one clip plays at a time â€” starting one pauses every other.
  function handlePlay(index: number) {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== index) v.pause();
    });
  }

  return (
    <section id="testimonials" className="relative bg-obsidian text-canvas py-16 md:py-36 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,112,74,0.16) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container-x relative z-10">
        <SectionHeader
          invert
          align="center"
          eyebrow="Client voices"
          title="Hear it from them."
          size="md"
        />

        <Reveal delay={0.15}>
          <div
            ref={scrollerRef}
            className="mt-14 md:mt-16 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:-mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {REVIEWS.map((r, i) => (
              <div
                key={r.src}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="shrink-0 snap-start w-[240px] sm:w-[270px] md:w-[290px]"
              >
                <VideoCard
                  src={r.src}
                  poster={r.poster}
                  name={r.name}
                  onPlay={() => handlePlay(i)}
                  videoRef={(el) => {
                    videoRefs.current[i] = el;
                  }}
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* dot pagination */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {REVIEWS.map((r, i) => (
            <button
              key={r.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show review ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                active === i ? "w-8 bg-copper" : "w-1.5 bg-canvas/30 hover:bg-canvas/55"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  src,
  poster,
  name,
  onPlay,
  videoRef,
}: {
  src: string;
  poster: string;
  name: string;
  onPlay: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  const [started, setStarted] = useState(false);
  const localRef = useRef<HTMLVideoElement | null>(null);

  function play() {
    localRef.current?.play().catch(() => undefined);
  }

  return (
    <div className="group relative rounded-[1.5rem] overflow-hidden aspect-[9/16] bg-obsidian-soft border border-canvas/10">
      <video
        ref={(el) => {
          localRef.current = el;
          videoRef(el);
        }}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        controls={started}
        className="w-full h-full object-cover"
        onPlay={() => {
          setStarted(true);
          onPlay();
        }}
        aria-label={`Video review from ${name}`}
      />

      {!started && (
        <>
          {/* bottom gradient + label, hidden once native controls take over */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent pointer-events-none" />

          <button
            type="button"
            onClick={play}
            aria-label={`Play video review from ${name}`}
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid place-items-center h-14 w-14 md:h-16 md:w-16 rounded-full bg-canvas/90 backdrop-blur text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
              <Play className="h-5 w-5 translate-x-[1px]" strokeWidth={2.2} fill="currentColor" />
            </span>
          </button>

          <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
            <p className="text-canvas font-semibold text-sm leading-tight">{name}</p>
          </div>
        </>
      )}
    </div>
  );
}
