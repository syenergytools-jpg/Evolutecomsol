"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * CaseCompare — drag-to-reveal before/after slider showing the result of
 * a brand engagement (catalog rebuild). The divider is mouse + touch
 * controlled; the right-side image is clipped via `clip-path: inset()`
 * tied to the divider position.
 */
export function CaseCompare() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  }, []);

  // Auto-sweep once on entry so it's discoverable
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      let p = 50;
      const tick = () => {
        p += 1.2;
        setPct((cur) => (dragging ? cur : Math.min(72, cur + 0.6)));
        if (p < 72) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      setTimeout(() => {
        if (!dragging) setPct(50);
      }, 1400);
    }, 1500);
    return () => clearTimeout(t);
  }, [reduce, dragging]);

  // Mouse + touch handlers attached at window level while dragging
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      setFromClientX(x);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, setFromClientX]);

  return (
    <section className="relative bg-canvas py-24 md:py-32 border-y border-hairline overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">
                Case study · drag to compare
              </p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-ink leading-[1.04]">
              <StaggerWords text="Same SKU." />{" "}
              <StaggerWords
                text="11 months later."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                Northpoint Co. plateaued at $80K/mo with a 38% ACoS.
                We rebuilt the catalog, reshot the photography, and
                restructured PPC into margin tiers.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Compare slider */}
        <div
          ref={trackRef}
          onMouseDown={(e) => {
            setDragging(true);
            setFromClientX(e.clientX);
          }}
          onTouchStart={(e) => {
            setDragging(true);
            if (e.touches[0]) setFromClientX(e.touches[0].clientX);
          }}
          className="relative aspect-[16/10] md:aspect-[2/1] w-full rounded-[1.75rem] overflow-hidden bg-canvas-2 border border-hairline-strong shadow-[0_40px_90px_-40px_rgba(15,17,21,0.3)] select-none"
          style={{ cursor: dragging ? "grabbing" : "ew-resize" }}
        >
          {/* BEFORE — left side, full image, label top-left */}
          <Image
            src="/images/process-listing.jpg"
            alt="Before — original Amazon listing"
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover grayscale brightness-[0.85] contrast-[0.92]"
            priority={false}
          />
          <span className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 rounded-full bg-canvas/85 backdrop-blur px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink">
            <span className="h-1 w-1 rounded-full bg-mute" />
            Before · ACoS 38%
          </span>

          {/* AFTER — right side, clipped to reveal as divider moves */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
          >
            <Image
              src="/images/capability-build.jpg"
              alt="After — rebuilt catalog with studio photography"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
              priority={false}
            />
            <span className="absolute top-5 right-5 z-10 inline-flex items-center gap-2 rounded-full bg-ink/90 backdrop-blur px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-canvas">
              <span className="h-1 w-1 rounded-full bg-copper" />
              After · ACoS 14%
            </span>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-canvas/90 pointer-events-none"
            style={{ left: `${pct}%` }}
          />

          {/* Drag handle */}
          <motion.button
            type="button"
            aria-label="Drag to compare before and after"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-20 h-12 w-12 md:h-14 md:w-14 rounded-full bg-canvas border border-hairline-strong shadow-[0_18px_40px_-12px_rgba(15,17,21,0.45)] grid place-items-center cursor-ew-resize",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-copper"
            )}
            style={{ left: `${pct}%`, x: "-50%" }}
            animate={
              dragging || reduce
                ? undefined
                : { scale: [1, 1.06, 1] }
            }
            transition={
              dragging || reduce
                ? undefined
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
            onMouseDown={(e) => {
              e.stopPropagation();
              setDragging(true);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setDragging(true);
            }}
          >
            <ArrowLeftRight
              className="h-4 w-4 md:h-5 md:w-5 text-ink"
              strokeWidth={2}
            />
          </motion.button>
        </div>

        {/* Outcome strip */}
        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 max-w-4xl">
          {[
            { v: "4.2×", l: "Revenue, 11 months" },
            { v: "−63%", l: "ACoS reduction" },
            { v: "+162%", l: "Sessions, 90 days" },
            { v: "$80K → $338K", l: "MRR" },
          ].map((s) => (
            <div key={s.l} className="border-t border-hairline-strong pt-4">
              <p className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-none text-ink mb-2 tabular-nums">
                {s.v}
              </p>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute leading-snug">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
