"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type ShapeKind = "circle" | "square" | "triangle" | "blob" | "ring" | "plus";

type Shape = {
  kind: ShapeKind;
  /** % from left */
  x: number;
  /** % from top */
  y: number;
  /** rem size */
  size: number;
  color: string;
  rotate?: number;
  blur?: number;
  fill?: boolean;
  /** Label rendered inside the shape (service / platform name). */
  label?: string;
  /** When true, the label sits in a pill below the shape instead of inside. */
  pill?: boolean;
};

/**
 * Magnetic 2D shape playground — shapes drift slowly, attract toward
 * the cursor when nearby, then spring back. Click a shape to send it
 * scattering. Each shape carries a service or platform label, so the
 * cursor interaction reads as "the stack moves with you".
 */
const SHAPES: Shape[] = [
  { kind: "circle",   x: 12, y: 22, size: 7,   color: "#0066ff", fill: true,  label: "Sourcing"   },
  { kind: "ring",     x: 22, y: 70, size: 8,   color: "#e8704a",              label: "Listings",   pill: true },
  { kind: "triangle", x: 78, y: 18, size: 7,   color: "#0a0a0b", fill: true,  label: "Photography" },
  { kind: "square",   x: 86, y: 64, size: 6,   color: "#d9ff3c", fill: true, rotate: 14, label: "Ads"      },
  { kind: "blob",     x: 50, y: 82, size: 7.5, color: "#0066ff", fill: true,  blur: 0.2, label: "Freight"  },
  { kind: "plus",     x: 60, y: 14, size: 4.5, color: "#e8704a",              label: "Trademark", pill: true  },
  { kind: "circle",   x: 8,  y: 50, size: 5,   color: "#10b981", fill: true,  label: "Amazon"    },
  { kind: "ring",     x: 92, y: 38, size: 5,   color: "#0a0a0b",              label: "Shopify",   pill: true },
];

export function ShapePlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scattered, setScattered] = useState<Set<number>>(new Set());

  const reset = () => setScattered(new Set());
  const explode = (i: number) =>
    setScattered((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });

  return (
    <section className="relative bg-canvas-2 overflow-hidden py-24 md:py-32">
      {/* Header */}
      <div className="container-x relative z-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">Manifesto · the way we work</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] text-ink leading-[1.02]">
              <StaggerWords text="Move the shapes." />
              <br />
              <StaggerWords
                text="Move the metrics."
                delayStart={0.15}
                wordClassName="italic font-normal text-ink-soft"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-mute leading-[1.6] max-w-md">
                Compounding works the same way pieces respond to your cursor —
                you nudge the right one and the rest fall into orbit. Hover the
                shapes. Click to scatter. Then keep scrolling.
              </p>
            </Reveal>
            <button
              onClick={reset}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-4 py-2 text-xs font-mono uppercase tracking-wider text-ink-soft hover:bg-surface transition-colors"
            >
              ↺ Reset playground
            </button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative h-[60vh] md:h-[64vh] w-full overflow-hidden"
      >
        {/* dotted backdrop */}
        <div
          className="absolute inset-0 opacity-[0.18] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,17,21,0.45) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* central caption that sits behind the shapes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="text-center max-w-md">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute mb-3">
              Live demo
            </p>
            <p className="display text-[clamp(1.5rem,2.6vw,2.4rem)] text-ink/40 italic">
              Hover · drag your cursor · click
            </p>
          </div>
        </div>

        {/* Shapes */}
        {SHAPES.map((shape, i) => (
          <MagneticShape
            key={i}
            shape={shape}
            container={containerRef}
            exploded={scattered.has(i)}
            onExplode={() => explode(i)}
            seed={i}
          />
        ))}
      </div>

      {/* Footer caption */}
      <div className="container-x relative z-10 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
          {[
            { n: "→", label: "Magnetic", body: "Shapes lean toward your cursor." },
            { n: "↻", label: "Springy", body: "Release and they snap back." },
            { n: "✦", label: "Scatter", body: "Click a shape to launch it." },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3">
              <span className="display text-2xl text-electric leading-none">
                {c.n}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink mb-0.5">
                  {c.label}
                </p>
                <p className="text-sm text-mute leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MagneticShape({
  shape,
  container,
  exploded,
  onExplode,
  seed,
}: {
  shape: Shape;
  container: React.RefObject<HTMLDivElement | null>;
  exploded: boolean;
  onExplode: () => void;
  seed: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  // breathing rotation for personality
  const baseRotate = shape.rotate ?? 0;
  const drift = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = (t - start) / 1000;
      drift.set(Math.sin(elapsed * 0.4 + seed) * 6);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [drift, seed]);

  const rotate = useTransform(drift, (d) => baseRotate + d);

  useEffect(() => {
    if (exploded) return;

    const onMove = (e: MouseEvent) => {
      if (!ref.current || !container.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = 220;

      if (dist < radius) {
        const force = (1 - dist / radius) * 38;
        mx.set((dx / dist) * force);
        my.set((dy / dist) * force);
      } else {
        mx.set(0);
        my.set(0);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [container, mx, my, exploded]);

  const scatterX = ((seed * 137) % 200) - 100;
  const scatterY = ((seed * 251) % 200) - 100;

  return (
    <motion.div
      ref={ref}
      onClick={onExplode}
      animate={
        exploded
          ? {
              x: scatterX * 4,
              y: scatterY * 4,
              opacity: 0,
              scale: 0.4,
              rotate: 360 + baseRotate,
            }
          : undefined
      }
      transition={
        exploded
          ? { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          : undefined
      }
      style={{
        position: "absolute",
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        width: `${shape.size}rem`,
        height: `${shape.size}rem`,
        x: exploded ? undefined : sx,
        y: exploded ? undefined : sy,
        rotate: exploded ? undefined : rotate,
        cursor: "pointer",
        filter: shape.blur ? `blur(${shape.blur}px)` : undefined,
      }}
      className="z-10 will-change-transform group"
    >
      <ShapeSvg shape={shape} />

      {/* Label */}
      {shape.label && (
        shape.pill ? (
          <span
            className="absolute left-1/2 -translate-x-1/2 -bottom-7 whitespace-nowrap rounded-full bg-canvas border border-hairline-strong px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink shadow-[0_8px_18px_-8px_rgba(15,17,21,0.18)] pointer-events-none"
            style={{ transform: "translate(-50%, 0)" }}
          >
            {shape.label}
          </span>
        ) : (
          <span
            className="absolute inset-0 grid place-items-center pointer-events-none"
            // Counter-rotate so the text stays readable as the shape drifts
            style={{ rotate: shape.rotate ? `${-shape.rotate}deg` : undefined }}
          >
            <span
              className={cn(
                "font-mono uppercase tracking-[0.14em] font-medium text-center px-1",
                // Light text on dark fills, ink on light/lime fills
                shape.fill && (shape.color === "#0066ff" || shape.color === "#0a0a0b" || shape.color === "#10b981" || shape.color === "#e8704a")
                  ? "text-canvas"
                  : "text-ink",
                shape.size > 6 ? "text-[0.65rem]" : "text-[0.55rem]"
              )}
            >
              {shape.label}
            </span>
          </span>
        )
      )}
    </motion.div>
  );
}

function ShapeSvg({ shape }: { shape: Shape }) {
  const stroke = shape.color;
  const fill = shape.fill ? shape.color : "none";
  const strokeWidth = 4;

  switch (shape.kind) {
    case "circle":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full block">
          <circle cx="50" cy="50" r="44" fill={fill} stroke={stroke} strokeWidth={shape.fill ? 0 : strokeWidth} />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full block">
          <circle cx="50" cy="50" r="42" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full block">
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="14"
            fill={fill}
            stroke={stroke}
            strokeWidth={shape.fill ? 0 : strokeWidth}
          />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full block">
          <path
            d="M50 8 L92 84 L8 84 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={shape.fill ? 0 : strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "blob":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full block">
          <path
            d="M48,8 C70,8 92,22 92,46 C92,68 76,86 54,90 C32,94 12,82 8,58 C4,34 26,8 48,8 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={shape.fill ? 0 : strokeWidth}
          />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full block">
          <path
            d="M44 6 H56 V44 H94 V56 H56 V94 H44 V56 H6 V44 H44 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={shape.fill ? 0 : strokeWidth}
          />
        </svg>
      );
  }
}
