"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Star,
  ShoppingBag,
  TrendingUp,
  Boxes,
} from "lucide-react";
import { FlipWords } from "@/components/ui/aceternity/flip-words";

const FLIP_WORDS = ["Amazon", "Shopify", "Walmart", "TikTok", "DTC"];
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — elegant editorial layout (letsridethewave-style adapted to
 * our cream/obsidian/copper palette).
 *
 *   • 5/7 grid at lg+ (≈42/58 split). Items-start, generous whitespace.
 *   • LEFT — pulse-dot eyebrow → big H1 with italic-copper FlipWords
 *     accent → body → single primary CTA + secondary text link.
 *   • RIGHT — central frame card with logo_video.mp4 playing inside,
 *     three floating UI mini-cards (Live ROAS / Active brands /
 *     Services) orbiting on independent drift loops, faint hex-grid
 *     pattern behind everything.
 *   • Background — warm cream with a sophisticated multi-stop gradient
 *     (copper warmth bottom-right, electric whisper top-left, chrome
 *     glow mid-right) plus two animated drift blobs.
 *
 * Restored from a richer previous version after a flat-video iteration
 * that didn't read as well — this layout reads denser, more premium,
 * and the floating UI cards do double duty as proof points.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col bg-canvas overflow-hidden"
    >
      {/* === BACKDROP === */}
      {/* DEPTH 0 — paper grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.32] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--ink) 5%, transparent) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* DEPTH 1 — sophisticated multi-stop gradient (the "elegance") */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 100% 100%, rgba(232,112,74,0.16) 0%, transparent 60%), " +
            "radial-gradient(50% 45% at 0% 0%, rgba(0,102,255,0.08) 0%, transparent 60%), " +
            "radial-gradient(45% 60% at 75% 50%, rgba(192,197,202,0.18) 0%, transparent 70%)",
        }}
      />

      {/* DEPTH 1 — soft animated drift accents */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,102,255,0.05), transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [0, 32, 0], y: [0, 24, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,112,74,0.10), transparent 65%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -28, 0], y: [0, -18, 0] }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -8,
        }}
      />

      {/* === MAIN GRID === */}
      <div className="container-x relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-12 items-start pt-32 md:pt-36 pb-16">
        {/* ---------------- LEFT — text column (5/12) ---------------- */}
        <div className="lg:col-span-5">
          {/* Pulse-dot eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: PREMIUM_EASE }}
            className="flex items-center gap-3 mb-9 md:mb-12"
          >
            <span className="relative">
              <span className="block h-2 w-2 rounded-full bg-ink" />
              <span className="absolute inset-0 rounded-full bg-electric/35 animate-ping" />
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-mute">
              Ecommerce, engineered for scale
            </span>
          </motion.div>

          {/* MASSIVE HEADLINE — italic-copper FlipWords accent on line 3 */}
          <h1 className="display text-[clamp(2.4rem,4.6vw,4.5rem)] text-ink leading-[1.04] tracking-[-0.025em] mb-9 md:mb-10 font-medium">
            {["The full-stack", "ecommerce partner"].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  ease: PREMIUM_EASE,
                  delay: 0.15 + i * 0.12,
                }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: PREMIUM_EASE, delay: 0.42 }}
              className="block whitespace-nowrap"
            >
              <span className="text-ink-soft font-normal">for </span>
              <FlipWords
                words={FLIP_WORDS}
                duration={2200}
                className="italic font-normal text-copper"
              />
              <span className="text-ink"> brands.</span>
            </motion.span>
          </h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: PREMIUM_EASE }}
            className="text-base md:text-[1.08rem] text-ink-soft leading-[1.6] max-w-md mb-10"
          >
            Sourcing, listings, photography, ads, freight, and trademark — one
            accountable team running the whole stack as one operating system.
          </motion.p>

          {/* CTA — single primary with halo + secondary text link */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: PREMIUM_EASE }}
            className="flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            <PrimaryCTA href="/contact">Book a strategy call</PrimaryCTA>

            <Link
              href="/work"
              className="group inline-flex items-center gap-1.5 px-1 py-2 text-[0.95rem] font-medium text-ink relative"
            >
              See selected work
              <ArrowRight
                className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                strokeWidth={2}
              />
              <span className="absolute left-1 right-7 -bottom-px h-px bg-ink" />
            </Link>
          </motion.div>
        </div>

        {/* ---------------- RIGHT — visual collage (7/12) ---------------- */}
        <RightCollage />
      </div>

      {/* === TRUST STRIP === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 border-t border-hairline bg-canvas/60 backdrop-blur-sm"
      >
        <div className="container-x py-4 md:py-5 flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-sm text-ink-soft">
          <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
            <span className="font-mono uppercase tracking-[0.18em] text-[0.65rem] text-mute">
              Trusted by
            </span>
            <span className="font-medium">240+ brands</span>
            <span className="h-1 w-1 rounded-full bg-mute/40" />
            <span>$420M GMV</span>
            <span className="h-1 w-1 rounded-full bg-mute/40" />
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-copper text-copper" />
              4.9 / 5
            </span>
            <span className="h-1 w-1 rounded-full bg-mute/40" />
            <span>Avg ROAS lift 3.4×</span>
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute hidden md:inline-flex items-center gap-1.5">
            ↓ Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * Primary CTA — pill button with multi-layer halo glow + shimmer
 * sweep on hover.
 * ---------------------------------------------------------------- */
function PrimaryCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2.5 rounded-full bg-ink text-canvas pl-3 pr-6 py-2.5 text-[0.95rem] font-medium transition-transform duration-300 hover:-translate-y-0.5 overflow-hidden"
      style={{
        boxShadow:
          "0 22px 60px -18px rgba(15,17,21,0.45), 0 0 0 1px rgba(255,255,255,0.05) inset",
      }}
    >
      {/* Halo glow stack */}
      <span
        aria-hidden="true"
        className="absolute -inset-3 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(232,112,74,0.45) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Inner badge */}
      <span className="grid place-items-center h-9 w-9 rounded-full bg-canvas/15 backdrop-blur-sm">
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </span>

      <span>{children}</span>

      {/* Diagonal shimmer sweep on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
        }}
      />
    </Link>
  );
}

/* ---------------------------------------------------------------- *
 * RightCollage — central frame (logo video) + floating mini-cards
 * + hex grid background.
 * ---------------------------------------------------------------- */
function RightCollage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: PREMIUM_EASE, delay: 0.4 }}
      className="lg:col-span-7 relative w-full min-h-[28rem] md:min-h-[34rem] lg:min-h-[40rem]"
    >
      {/* Hex-grid faint background */}
      <HexGrid className="absolute inset-0 opacity-[0.55] text-chrome-3/35" />

      {/* CENTRAL FRAME — mouse-tilted static logo card. Replaces the
          autoplay video; reads quieter and is interactive instead of
          attention-stealing. */}
      <TiltedLogoCard />


      {/* FLOATING UI CARD — Live ROAS (top-left) */}
      <FloatingCard
        className="absolute top-[8%] left-[2%] md:top-[6%] md:left-[6%] z-10 w-[10rem] md:w-[11rem]"
        delay={0.7}
        drift={{ x: [0, 8, 0], y: [0, -12, 0], rotate: [-3, 0, -3] }}
        duration={11}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="h-7 w-7 rounded-lg bg-electric/10 grid place-items-center">
            <TrendingUp className="h-3.5 w-3.5 text-electric" strokeWidth={2} />
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute">
            Live ROAS
          </span>
        </div>
        <p className="display text-[1.6rem] leading-none text-ink mb-1 tabular-nums">
          3.4×
        </p>
        <p className="text-[0.7rem] text-mute">90-day average lift</p>
        <div className="mt-3 flex items-end gap-[2px] h-4">
          {[3, 4, 5, 4, 6, 7, 8, 7, 9].map((v, i) => (
            <span
              key={i}
              className="w-[3px] rounded-sm bg-electric/70"
              style={{ height: `${v * 1.4}px` }}
            />
          ))}
        </div>
      </FloatingCard>

      {/* FLOATING UI CARD — Active brands (bottom-right) */}
      <FloatingCard
        className="absolute bottom-[8%] right-[2%] md:bottom-[10%] md:right-[4%] z-10 w-[10rem] md:w-[11.5rem]"
        delay={0.85}
        drift={{ x: [0, -6, 0], y: [0, 10, 0], rotate: [2.5, -1, 2.5] }}
        duration={13}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="h-7 w-7 rounded-lg bg-copper/12 grid place-items-center">
            <ShoppingBag
              className="h-3.5 w-3.5 text-copper"
              strokeWidth={2}
            />
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute">
            Active brands
          </span>
        </div>
        <p className="display text-[1.6rem] leading-none text-ink mb-1 tabular-nums">
          240<span className="text-copper">+</span>
        </p>
        <p className="text-[0.7rem] text-mute">across 4 continents</p>
      </FloatingCard>

      {/* FLOATING UI CARD — Services (mid-right, desktop only) */}
      <FloatingCard
        className="absolute top-[40%] right-[12%] hidden md:block z-10 w-[9rem]"
        delay={1}
        drift={{ x: [0, 4, 0], y: [0, -8, 0], rotate: [-2, 1, -2] }}
        duration={10}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="h-7 w-7 rounded-lg bg-ink/8 grid place-items-center">
            <Boxes className="h-3.5 w-3.5 text-ink" strokeWidth={2} />
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute">
            Services
          </span>
        </div>
        <p className="display text-[1.6rem] leading-none text-ink mb-1 tabular-nums">
          08
        </p>
        <p className="text-[0.7rem] text-mute">one accountable team</p>
      </FloatingCard>

      {/* Tiny accent dots */}
      <span className="absolute top-[18%] right-[26%] h-1.5 w-1.5 rounded-full bg-copper hidden md:block" />
      <span className="absolute bottom-[24%] left-[30%] h-1 w-1 rounded-full bg-electric hidden md:block" />
    </motion.div>
  );
}

/* ---------------------------------------------------------------- *
 * TiltedLogoCard — the central card on the right. Mouse-tracked 3D
 * tilt (≤8° each axis) + a soft chrome glare that follows the
 * cursor, plus a slow breathing scale loop so the card never feels
 * dead when the cursor isn't on it.
 *
 * Replaces the previous autoplay logo video: same footprint, no
 * attention-stealing motion.
 * ---------------------------------------------------------------- */
function TiltedLogoCard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Raw mouse position, normalised to [-0.5, 0.5] across the card
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring-smoothed for a premium feel
  const sx = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 150, damping: 18, mass: 0.8 });

  // Map normalised cursor → rotation degrees (max ±8°)
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  // Glare position — % within the card, follows cursor
  const glareX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="absolute left-1/2 top-1/2 z-20 w-[58%] max-w-[26rem] aspect-square rounded-[2rem] bg-canvas border border-hairline-strong shadow-[0_50px_120px_-40px_rgba(15,17,21,0.28),0_24px_48px_-24px_rgba(232,112,74,0.18)] overflow-hidden [transform-style:preserve-3d]"
      style={{
        x: "-50%",
        y: "-50%",
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        perspective: 900,
      }}
      // Slow breath-loop so the card never sits dead
      animate={
        reduce
          ? undefined
          : { scale: [1, 1.02, 1] }
      }
      transition={
        reduce
          ? undefined
          : { duration: 9, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {/* Static Evolut chrome icon */}
      <div className="absolute inset-[10%] flex items-center justify-center [transform:translateZ(30px)]">
        <Image
          src="/logo_1.png"
          alt="Evolut — The Stack"
          fill
          sizes="(max-width: 1024px) 60vw, 26rem"
          className="object-contain drop-shadow-[0_24px_50px_rgba(15,17,21,0.22)]"
          priority
        />
      </div>

      {/* Cursor-tracked chrome glare overlay */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(220px circle at ${x} ${y}, rgba(255,255,255,0.55), transparent 55%)`
          ),
          opacity: reduce ? 0 : 0.6,
        }}
      />

      {/* Quiet copper bottom wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 100%, rgba(232,112,74,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Top-left status badge */}
      <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/85 backdrop-blur px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-canvas">
        <span className="h-1 w-1 rounded-full bg-copper" />
        The Stack
      </span>

      {/* Bottom-right meta */}
      <span className="absolute bottom-4 right-4 z-10 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute">
        v.2026
      </span>

      {/* Tiny "tilt me" hint, fades on hover */}
      <span className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-canvas/85 backdrop-blur px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-mute opacity-70 transition-opacity duration-300 hover:opacity-0">
        ↺ tilt
      </span>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- *
 * Reusable floating mini-card with drift loop.
 * ---------------------------------------------------------------- */
function FloatingCard({
  children,
  className,
  delay = 0,
  drift,
  duration = 12,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  drift: {
    x: number[];
    y: number[];
    rotate: number[];
  };
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: drift.x,
        y: drift.y,
        rotate: drift.rotate,
      }}
      transition={{
        opacity: { duration: 0.7, delay, ease: PREMIUM_EASE },
        scale: { duration: 0.7, delay, ease: PREMIUM_EASE },
        x: { duration, repeat: Infinity, ease: "easeInOut", delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={
        "rounded-2xl bg-canvas border border-hairline-strong p-4 shadow-[0_24px_50px_-20px_rgba(15,17,21,0.18)] backdrop-blur " +
        (className ?? "")
      }
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- *
 * Hex-grid background pattern.
 * ---------------------------------------------------------------- */
function HexGrid({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="100%"
      height="100%"
      className={className}
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <pattern
          id="hex"
          width="60"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M30 0 L60 17 L60 35 L30 52 L0 35 L0 17 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}
