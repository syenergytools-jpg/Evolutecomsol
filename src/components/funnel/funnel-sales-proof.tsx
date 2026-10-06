"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Play, X } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { FunnelHeading } from "./funnel-heading";
import { funnelAccent } from "./funnel-theme";
import type { FunnelAccent } from "./funnel-theme";
import type { FunnelContent, FunnelSalesProof, FunnelSalesSnapshot } from "./funnel-types";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const AUTO_ADVANCE_MS = 5000;

/** Inline because `border-<color>` utilities are dead here — see funnel-theme.ts. */
const OVERLAY_BORDER = { borderColor: "color-mix(in oklab, var(--canvas) 22%, transparent)" };

/**
 * Shared card shell for the screenshot cards and the video card — the same
 * look as funnel-testimonial-card.tsx (dark card, thick accent top border
 * set inline via `borderTopColor`, soft drop shadow), with a hairline ring
 * added so overlapping cards stay distinguishable on this near-black page.
 */
const CARD_SHELL =
  "overflow-hidden rounded-2xl border-t-4 bg-obsidian-soft p-3 sm:p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] ring-1 ring-canvas/10";

/**
 * Fan-out transforms per card count — the same idea as STACK_PRESETS in
 * funnel-testimonials.tsx (kept as a separate copy on purpose, so tuning
 * this stack for wide screenshots can never move the review stack on
 * /shopify and /legal). Screenshots are far wider than review cards, so
 * the horizontal offsets step up with the breakpoint instead of jumping
 * once, and are paired with the container widths in SalesProofSection so
 * the whole fan (front card + both offsets) always fits inside the
 * viewport instead of its back cards being sliced off at the screen
 * edge. `frontIndex` is the slot the card that should face the visitor
 * on load sits in.
 */
const STACK_PRESETS: Record<number, { classes: string[]; frontIndex: number }> = {
  1: {
    classes: ["rotate-0 translate-x-0 translate-y-0 z-10"],
    frontIndex: 0,
  },
  2: {
    classes: [
      "rotate-[-5deg] translate-x-[-8%] min-[480px]:translate-x-[-12%] sm:translate-x-[-16%] md:translate-x-[-18%] lg:translate-x-[-16%] translate-y-[5%] z-0",
      "rotate-[3deg] translate-x-[4%] min-[480px]:translate-x-[6%] sm:translate-x-[8%] md:translate-x-[9%] lg:translate-x-[8%] translate-y-[-3%] z-10",
    ],
    frontIndex: 1,
  },
  3: {
    classes: [
      "rotate-[-5deg] translate-x-[-10%] min-[480px]:translate-x-[-14%] sm:translate-x-[-20%] md:translate-x-[-22%] lg:translate-x-[-20%] translate-y-[5%] z-0",
      "rotate-0 translate-y-[-3%] z-20",
      "rotate-[5deg] translate-x-[10%] min-[480px]:translate-x-[14%] sm:translate-x-[20%] md:translate-x-[22%] lg:translate-x-[20%] translate-y-[5%] z-10",
    ],
    frontIndex: 1,
  },
};

/**
 * One screenshot card — the testimonial card's mouse-tracked 3D tilt and
 * spring reorder (`layout`), minus the translateZ content layer: that
 * layer renders ~2% oversized and resamples its pixels, which would blur
 * the dashboard's thin small print. The tilt is also normalised to the
 * card's own size (not a fixed 150px) because these cards are ~700px wide.
 */
function SalesCard({
  snapshot,
  accentKey,
  isFront,
  className,
  onActivate,
}: {
  snapshot: FunnelSalesSnapshot;
  accentKey: FunnelAccent;
  isFront: boolean;
  className?: string;
  onActivate: () => void;
}) {
  const accent = funnelAccent[accentKey];
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  }

  // clamp: true so a pointer near a corner holds at the max tilt instead
  // of extrapolating past it.
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5], { clamp: true });
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5], { clamp: true });
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      layout
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${snapshot.image.alt} ${isFront ? "Press to enlarge." : "Press to bring it to the front."}`}
      onClick={onActivate}
      onKeyDown={onKeyDown}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        borderTopColor: accent.hex,
      }}
      className={cn(
        "shrink-0 transform-gpu",
        CARD_SHELL,
        isFront ? "cursor-zoom-in" : "cursor-pointer",
        className
      )}
    >
      {/* Depth shading: a bright white screenshot behind the front card
          would out-shout it (review cards are mostly dark, these aren't),
          so every card that isn't in front is dimmed, and clears as it
          moves forward. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-10 bg-obsidian transition-opacity duration-500",
          isFront ? "opacity-0" : "opacity-55"
        )}
      />

      <div className="mb-3 flex items-start justify-between gap-3 px-1 pt-1 md:mb-4">
        <div className="min-w-0">
          <p className="font-semibold leading-snug text-canvas">{snapshot.label}</p>
          <p className="text-[0.8rem] leading-snug text-canvas/50 md:text-sm">{snapshot.range}</p>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 pt-0.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-canvas/50 transition-opacity duration-300",
            isFront ? "opacity-100" : "opacity-0"
          )}
        >
          <Maximize2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Enlarge</span>
        </span>
      </div>

      {/* `loading="eager"` for the same reason as the hero badges: the
          stack sits inside a <Reveal>, and lazy images under an invisible
          ancestor can stall. `unoptimized` serves the original JPEG byte
          for byte — re-encoding would soften the dashboard's thin print. */}
      <div className="relative aspect-[1439/734] overflow-hidden rounded-lg bg-white">
        <Image
          src={snapshot.image.src}
          alt=""
          fill
          unoptimized
          loading="eager"
          className="select-none object-contain"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

/**
 * Full-screen viewer for the dashboard screenshots. On a phone the image
 * is laid out at a fixed ~1000px width inside a scroll container, so the
 * dashboard's small print is actually readable by panning (a 343px-wide
 * fit-to-screen copy would not be). `data-lenis-prevent` keeps Lenis's
 * smooth-scroll from swallowing wheel/touch events meant for this
 * container instead of the page behind it.
 */
function SalesLightbox({
  proof,
  index,
  onIndexChange,
  onClose,
}: {
  proof: FunnelSalesProof;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { snapshots } = proof;
  const current = snapshots[index];

  const step = useCallback(
    (dir: 1 | -1) => onIndexChange((index + dir + snapshots.length) % snapshots.length),
    [index, onIndexChange, snapshots.length]
  );

  // Page scroll lock + focus handoff (in on open, back to the opener on close).
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  // Root vs scroller are deliberately two elements: `backdrop-blur` makes
  // the root the containing block for its positioned children, so if the
  // root itself scrolled, the close button / pager / hint would scroll
  // away with the image while panning on a phone. The root stays put and
  // only the inner scroller moves.
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Sales dashboard screenshot"
      data-lenis-prevent
      className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: PREMIUM_EASE }}
    >
      {/* `m-auto` on the child (not `justify-center` on the parent) so a
          wider-than-viewport image still scrolls from its left edge
          instead of being centered with its left half unreachable. */}
      <div
        className="absolute inset-0 flex overflow-auto overscroll-contain px-4 pt-16 pb-28 md:px-10"
        onClick={onClose}
      >
        <motion.div
          key={index}
          className="m-auto"
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: PREMIUM_EASE }}
        >
          <Image
            src={current.image.src}
            alt={current.image.alt}
            width={current.image.width}
            height={current.image.height}
            unoptimized
            onClick={(e) => e.stopPropagation()}
            className="mx-auto block h-auto w-[1000px] max-w-none rounded-xl md:w-auto md:max-w-full md:max-h-[calc(100dvh-11rem)]"
          />
        </motion.div>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 grid h-11 w-11 place-items-center rounded-full border bg-obsidian/80 text-canvas backdrop-blur-md transition-colors hover:bg-canvas/15"
        style={OVERLAY_BORDER}
      >
        <X className="h-5 w-5" strokeWidth={2.2} />
      </button>

      <p className="pointer-events-none absolute inset-x-0 bottom-[5.25rem] z-10 px-4 text-center text-[0.8rem] text-canvas/50 md:hidden">
        Swipe to pan across the dashboard
      </p>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 md:bottom-6 z-10 flex justify-center px-4">
        <div
          className="pointer-events-auto flex items-center gap-1 rounded-full border bg-obsidian/80 p-1.5 backdrop-blur-md"
          style={OVERLAY_BORDER}
        >
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous screenshot"
            className="grid h-11 w-11 place-items-center rounded-full text-canvas/80 transition-colors hover:bg-canvas/10 hover:text-canvas"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p className="min-w-[9rem] px-2 text-center font-mono text-[0.72rem] uppercase tracking-[0.12em] text-canvas/80">
            {current.label}
            <span className="text-canvas/40">
              {" "}
              · {index + 1}/{snapshots.length}
            </span>
          </p>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next screenshot"
            className="grid h-11 w-11 place-items-center rounded-full text-canvas/80 transition-colors hover:bg-canvas/10 hover:text-canvas"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * The screen recording, in the same card as the screenshots above it, with
 * the same play-overlay pattern as the hero video. `#t=1` makes the
 * browser paint the frame at 1s as the still (the very first frame is a
 * blank page-load state on some browsers, and there's no poster file to
 * fall back on). Silent: no audio track.
 */
function SalesVideo({
  video,
  accentKey,
}: {
  video: FunnelSalesProof["video"];
  accentKey: FunnelAccent;
}) {
  const accent = funnelAccent[accentKey];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <div className="mt-20 md:mt-32">
      <FunnelHeading
        accent={accentKey}
        eyebrow={video.eyebrow}
        title={video.title}
        size="md"
      />

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 md:mt-14 max-w-[46rem]">
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] opacity-30 blur-2xl md:-inset-6"
              style={{ background: accent.glowSoft }}
            />
            <div className={cn("relative", CARD_SHELL)} style={{ borderTopColor: accent.hex }}>
              <div
                className="relative overflow-hidden rounded-lg bg-obsidian"
                style={{ aspectRatio: `${video.width} / ${video.height}` }}
              >
                <video
                  ref={videoRef}
                  src={`${video.src}#t=1`}
                  preload="metadata"
                  playsInline
                  controls={started}
                  onPlay={() => setStarted(true)}
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label={video.caption}
                />

                {!started && (
                  <button
                    type="button"
                    onClick={() => videoRef.current?.play().catch(() => undefined)}
                    aria-label="Play the dashboard screen recording"
                    className="group absolute inset-0 grid place-items-center cursor-pointer"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent"
                    />
                    <span className="relative grid h-16 w-16 md:h-20 md:w-20 place-items-center rounded-full bg-canvas/95 text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105">
                      <Play className="h-6 w-6 md:h-7 md:w-7 translate-x-0.5" fill="currentColor" strokeWidth={0} />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[0.8rem] md:text-sm text-canvas/50">
            <span>{video.caption}</span>
            <span aria-hidden="true" className="hidden text-canvas/25 sm:inline">·</span>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em]">{video.meta}</span>
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/**
 * FunnelSalesProof — real Seller Central "Sales Dashboard" proof for
 * /amazon, built to behave exactly like the testimonial stack it stands
 * in for (funnel-testimonials.tsx): the screenshots sit in a fanned,
 * tilting card stack that auto-loops every few seconds, pauses on hover,
 * and brings a clicked back card to the front. Clicking the FRONT card
 * opens it full screen instead (nothing to "bring forward"), and closing
 * that viewer puts whichever screenshot was last on screen at the front.
 * The screen recording follows in a matching card. All data comes from
 * `content.salesProof` (see FunnelSalesProof).
 */
export function FunnelSalesProof({ content }: { content: FunnelContent }) {
  const proof = content.salesProof;
  if (!proof) return null;
  return <SalesProofSection accentKey={content.accent} proof={proof} />;
}

function SalesProofSection({
  accentKey,
  proof,
}: {
  accentKey: FunnelAccent;
  proof: FunnelSalesProof;
}) {
  const accent = funnelAccent[accentKey];
  const { snapshots } = proof;
  const preset = STACK_PRESETS[snapshots.length];

  // `order[slot]` is the snapshot index sitting in that slot of the fan.
  // Seeded so snapshot 0 starts in the front slot and the auto-loop then
  // walks 0 → 1 → 2 → 0 …, because each tick rotates the array left and
  // so promotes the card from the slot after the front one.
  const [order, setOrder] = useState<number[]>(() => {
    const front = preset?.frontIndex ?? 0;
    return snapshots.map((_, slot) => (slot - front + snapshots.length) % snapshots.length);
  });
  const [hovered, setHovered] = useState(false);
  const [viewer, setViewer] = useState<number | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stackInView = useInView(stackRef, { amount: 0.35 });
  const paused = hovered || viewer !== null || !stackInView;

  const bringToFront = useCallback(
    (snapshotIndex: number) => {
      if (!preset) return;
      setOrder((prev) => {
        const at = prev.indexOf(snapshotIndex);
        if (at === -1 || at === preset.frontIndex) return prev;
        const next = [...prev];
        next.splice(at, 1);
        next.splice(preset.frontIndex, 0, snapshotIndex);
        return next;
      });
    },
    [preset]
  );

  const closeViewer = useCallback(() => {
    if (viewer !== null) bringToFront(viewer);
    setViewer(null);
  }, [viewer, bringToFront]);

  // Auto-loop, same rules as funnel-testimonials.tsx: any change to
  // `order` (a tick OR a click) restarts the countdown, so a manual click
  // is never immediately undone; skipped for a single card, while hovered
  // or while the full-screen viewer is open, and for reduced-motion. One
  // addition: it only runs while the stack is actually on screen, so a
  // visitor who scrolls down always meets the first screenshot (the
  // 12-month one) in front, not whichever card a background timer had
  // already cycled to.
  useEffect(() => {
    if (!preset || order.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [order, preset, paused]);

  return (
    <section id="sales-proof" className="relative bg-obsidian-soft py-16 md:py-32 overflow-hidden">
      <div className="container-x">
        <FunnelHeading
          accent={accentKey}
          eyebrow={proof.eyebrow}
          title={proof.title}
          subtitle={proof.subtitle}
        />

        <Reveal delay={0.1}>
          {preset ? (
            // Same construction as the testimonial stack: the front card
            // renders in normal flow (so the container's height always
            // matches it) and the back cards are `absolute`, positioned
            // against that same box and peeking out behind it. The extra
            // bottom padding makes room for the wider cards' rotated
            // corners, which drop further than a review card's would.
            <div
              ref={stackRef}
              className="relative mx-auto mt-14 w-full max-w-[19rem] pb-10 min-[480px]:max-w-[22rem] sm:max-w-[26rem] md:mt-20 md:max-w-[32rem] md:pb-14 lg:max-w-[44rem] xl:max-w-[48rem]"
              style={{ perspective: "1600px" }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-4 -inset-y-2 -z-10 rounded-[3rem] opacity-30 blur-2xl md:-inset-x-10 md:-inset-y-6"
                style={{ background: accent.glowSoft }}
              />
              {order.map((snapshotIndex, slot) => {
                const isFront = slot === preset.frontIndex;
                return (
                  <SalesCard
                    key={snapshots[snapshotIndex].image.src}
                    snapshot={snapshots[snapshotIndex]}
                    accentKey={accentKey}
                    isFront={isFront}
                    onActivate={() =>
                      isFront ? setViewer(snapshotIndex) : bringToFront(snapshotIndex)
                    }
                    className={cn(
                      isFront ? "relative w-full" : "absolute inset-x-0 top-0 mx-auto w-full",
                      preset.classes[slot]
                    )}
                  />
                );
              })}
            </div>
          ) : (
            // Counts the fan presets don't cover (only 1–3 are tuned) fall
            // back to a plain column instead of guessing a fan.
            <div className="mx-auto mt-14 flex max-w-[44rem] flex-col gap-6 md:mt-20">
              {order.map((snapshotIndex) => (
                <SalesCard
                  key={snapshots[snapshotIndex].image.src}
                  snapshot={snapshots[snapshotIndex]}
                  accentKey={accentKey}
                  isFront
                  onActivate={() => setViewer(snapshotIndex)}
                  className="relative"
                />
              ))}
            </div>
          )}

          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[0.8rem] text-canvas/50 md:mt-6 md:text-sm">
            <span>{proof.account}</span>
            <span aria-hidden="true" className="hidden text-canvas/25 sm:inline">·</span>
            <span>
              <span className="md:hidden">Tap</span>
              <span className="hidden md:inline">Click</span> the front screenshot to enlarge
            </span>
          </p>
        </Reveal>

        <SalesVideo video={proof.video} accentKey={accentKey} />
      </div>

      <AnimatePresence>
        {viewer !== null && (
          <SalesLightbox
            proof={proof}
            index={viewer}
            onIndexChange={setViewer}
            onClose={closeViewer}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
