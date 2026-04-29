"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/site-config";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { SparklesCore } from "@/components/ui/aceternity/sparkles";
import { Meteors } from "@/components/ui/aceternity/meteors";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const next = () => setActive((i) => (i + 1) % testimonials.length);
  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative bg-obsidian text-canvas py-28 md:py-36 overflow-hidden">
      {/* sparkles dust */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden="true">
        <SparklesCore particleColor="#dfe3e8" particleDensity={30} speed={0.25} particleSize={{ min: 0.3, max: 0.9 }} />
      </div>

      {/* meteors */}
      <Meteors number={10} color="rgba(232,112,74,0.5)" />

      {/* gradient blobs */}
      <div className="gradient-blob" style={{ width: 520, height: 520, left: "-15%", top: "20%", background: "radial-gradient(circle, rgba(0,102,255,0.4), transparent 70%)", opacity: 0.4 }} />
      <div className="gradient-blob" style={{ width: 460, height: 460, right: "-12%", bottom: "10%", background: "radial-gradient(circle, rgba(232,112,74,0.4), transparent 70%)", opacity: 0.4, animationDelay: "-8s" }} />

      <div className="container-x relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 md:mb-16 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-5 text-canvas/60">We don&apos;t talk · we show</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.04]">
              <StaggerWords text="They scaled with" />{" "}
              <StaggerWords
                text="Evolut."
                delayStart={0.2}
                wordClassName="chrome-text"
              />
            </h2>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-canvas/65 leading-[1.6] max-w-md">
                Real numbers from Seller Central — not dressed up,
                not cropped, not interpreted. The receipts speak first.
              </p>
            </Reveal>
          </div>
        </div>

        {/* === SVG STAT GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-20">
          <RevenueLineCard />
          <RoasSparklineCard />
          <ConversionDonutCard />
          <SessionsBarsCard />
        </div>

        {/* === ANIMATED TESTIMONIALS — text-left, rotating image stack right === */}
        <AnimatedTestimonials active={active} setActive={setActive} prev={prev} next={next} />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- *
 * AnimatedTestimonials — text-left / image-right layout in one big
 * obsidian card. The image side renders a STACK of all testimonial
 * portraits; on each step, the active portrait rotates to 0deg/full
 * opacity while the others fan behind at small rotations. The text
 * side crossfades the quote + attribution.
 *
 * Image placeholders are brand-coloured rectangles with the
 * attribution initials — drop real portraits into the `portraits`
 * map any time and they'll swap in.
 * ---------------------------------------------------------------- */

const portraitTones = [
  "from-copper to-copper/60",
  "from-electric to-electric/60",
  "from-emerald to-emerald/60",
  "from-lime/90 to-lime/50",
  "from-chrome-3 to-chrome-2",
];

function AnimatedTestimonials({
  active,
  setActive,
  prev,
  next,
}: {
  active: number;
  setActive: (i: number) => void;
  prev: () => void;
  next: () => void;
}) {
  // Hand-tuned offset rotations — the stack feels alive without spinning
  const stackRotations = [-8, 6, -4, 9, -6];

  return (
    <div className="relative rounded-[2rem] md:rounded-[2.75rem] bg-obsidian border border-canvas/10 overflow-hidden">
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,112,74,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-10 p-8 md:p-12 lg:p-16">
        {/* LEFT — text + nav */}
        <div className="lg:col-span-7 flex flex-col">
          <h3 className="display text-[clamp(1.85rem,3.6vw,3rem)] leading-[1.08] text-canvas mb-8 md:mb-10 max-w-md">
            What our customers
            <br />
            <span className="italic font-normal text-copper-soft">
              have to say.
            </span>
          </h3>

          {/* Quote + attribution — crossfade between testimonials */}
          <div className="relative flex-1 min-h-[14rem] md:min-h-[18rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                className="absolute inset-0 flex flex-col"
              >
                <p className="text-lg md:text-xl lg:text-[1.4rem] leading-[1.5] text-canvas/90 mb-10 md:mb-12 max-w-xl">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <div className="mt-auto">
                  <p className="text-base md:text-lg font-medium text-canvas">
                    {testimonials[active].name}
                  </p>
                  <p className="text-sm text-canvas/55 mt-0.5">
                    {testimonials[active].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav — arrows + dots */}
          <div className="mt-10 md:mt-12 flex items-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="group h-12 w-12 grid place-items-center rounded-full bg-canvas/10 hover:bg-canvas hover:text-ink transition-colors"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                strokeWidth={2.2}
              />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="group h-12 w-12 grid place-items-center rounded-full bg-canvas/10 hover:bg-canvas hover:text-ink transition-colors"
            >
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.2}
              />
            </button>

            <div className="ml-3 flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === active
                      ? "w-8 bg-copper"
                      : "w-1.5 bg-canvas/30 hover:bg-canvas/55"
                  )}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — image stack */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[22rem] md:min-h-[26rem]">
          {/* Soft canvas blob behind the figure (per the reference) */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(244,241,234,0.10) 0%, transparent 70%)",
            }}
          />

          {/* Portrait stack — every testimonial rendered, only active is forward */}
          <div className="relative w-[78%] max-w-[22rem] aspect-[4/5]">
            {testimonials.map((t, i) => {
              const isActive = i === active;
              const offset = i - active;
              // Behind cards rotate slightly; we cycle through the
              // hand-tuned rotation set so each card has its own personality
              const rotateBehind = stackRotations[i % stackRotations.length];
              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    rotate: isActive ? 0 : rotateBehind,
                    scale: isActive ? 1 : 0.95,
                    opacity: isActive ? 1 : Math.abs(offset) <= 2 ? 0.45 : 0,
                    y: isActive ? 0 : Math.abs(offset) * 6,
                    zIndex: isActive
                      ? 30
                      : 20 - Math.abs(offset),
                  }}
                  transition={{
                    duration: 0.55,
                    ease: PREMIUM_EASE,
                  }}
                  className="absolute inset-0 rounded-[1.75rem] overflow-hidden border border-canvas/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
                >
                  <PortraitPlaceholder
                    name={t.name}
                    photo={t.photo}
                    tone={portraitTones[i % portraitTones.length]}
                  />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

/* --- Portrait — renders the testimonial photo when present, otherwise
 * falls back to a brand-tinted gradient with the initials. Aspect
 * ratio is 4:5 so layout stays stable in either case.
 * ---------------------------------------------------------------- */
function PortraitPlaceholder({
  name,
  photo,
  tone,
}: {
  name: string;
  photo?: string;
  tone: string;
}) {
  if (photo) {
    return (
      <div className="relative w-full h-full bg-obsidian">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 22rem, 78vw"
          className="object-cover"
          priority={false}
        />
        {/* Subtle bottom gradient so the name floats over a busy photo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/50 to-transparent pointer-events-none"
        />
      </div>
    );
  }

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className={cn("relative w-full h-full bg-gradient-to-br", tone)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="display text-[clamp(3rem,7vw,5.5rem)] leading-none text-canvas/90 tracking-[-0.04em] mix-blend-difference">
          {initials}
        </span>
      </div>
    </div>
  );
}


/* ================================================================== *
 * SVG STAT CARDS
 *
 * Each card is its own motion.div with a path / bars / arc that draws
 * itself in on first in-view. Numbers tick via CountUp.
 * ================================================================== */

function StatCardShell({
  eyebrow,
  caption,
  children,
  delay = 0,
  accentColor = "var(--copper)",
}: {
  eyebrow: string;
  caption: string;
  children: React.ReactNode;
  delay?: number;
  accentColor?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay, ease: PREMIUM_EASE }}
      className="relative rounded-[1.5rem] border border-canvas/12 bg-obsidian-soft/60 backdrop-blur-sm p-5 md:p-6 overflow-hidden"
    >
      {/* Soft brand-tinted glow at the bottom-right */}
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}26 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-canvas/55 mb-3 relative">
        {eyebrow}
      </p>

      {children}

      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-canvas/45 mt-4 relative">
        {caption}
      </p>
    </motion.div>
  );
}

/* --- 1. Revenue line chart — Gloco $614K YTD --- */
function RevenueLineCard() {
  const ref = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-10% 0px" });

  // Two months flat → ramp up curve. Hand-tuned.
  const points = [
    [0, 88],
    [10, 86],
    [20, 84],
    [30, 80],
    [40, 75],
    [50, 60],
    [60, 50],
    [70, 38],
    [80, 22],
    [90, 14],
    [100, 6],
  ] as const;
  const path = points
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = inView ? "0" : `${len}`;
    el.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)";
  }, [inView]);

  return (
    <div ref={wrapRef}>
      <StatCardShell
        eyebrow="Gloco · YTD revenue"
        caption="Sourcing → listing → ads · 12 months"
      >
        <p className="display text-[2rem] leading-none mb-3 tabular-nums text-canvas">
          <CountUp
            value={614537}
            prefix="$"
            decimals={0}
            duration={1.8}
          />
        </p>
        {/* Inline SVG line chart */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-16">
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(232,112,74,0.45)" />
              <stop offset="100%" stopColor="rgba(232,112,74,0)" />
            </linearGradient>
          </defs>
          {/* Area fill underneath the line */}
          <path
            d={`${path} L 100 100 L 0 100 Z`}
            fill="url(#rev-fill)"
            opacity={inView ? 1 : 0}
            style={{ transition: "opacity 0.8s 0.3s ease-out" }}
          />
          {/* Line itself — draws on scroll-in */}
          <path
            ref={ref}
            d={path}
            fill="none"
            stroke="var(--copper)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Endpoint dot */}
          <circle
            cx={100}
            cy={6}
            r="2"
            fill="var(--copper)"
            opacity={inView ? 1 : 0}
            style={{ transition: "opacity 0.4s 1.6s ease-out" }}
          />
        </svg>
      </StatCardShell>
    </div>
  );
}

/* --- 2. ROAS sparkline — 3.4× --- */
function RoasSparklineCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-10% 0px" });

  // 12 months of ROAS, ascending with realistic noise
  const values = [1.6, 1.4, 1.7, 2.0, 1.9, 2.3, 2.6, 2.5, 2.9, 3.1, 3.3, 3.4];
  const max = Math.max(...values);

  return (
    <div ref={wrapRef}>
      <StatCardShell
        eyebrow="Avg ROAS lift · 90 days"
        caption="240+ active brands"
        accentColor="var(--electric)"
        delay={0.1}
      >
        <p className="display text-[2rem] leading-none mb-3 tabular-nums text-canvas">
          <CountUp value={3.4} suffix="×" decimals={1} duration={1.6} />
        </p>
        {/* Vertical bar sparkline */}
        <div className="flex items-end gap-1 h-16">
          {values.map((v, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: inView ? `${(v / max) * 100}%` : "0%",
                backgroundColor: i === values.length - 1 ? "var(--electric)" : "rgba(0,102,255,0.45)",
                transition: `height 0.9s ${i * 0.04}s cubic-bezier(0.16,1,0.3,1)`,
              }}
            />
          ))}
        </div>
      </StatCardShell>
    </div>
  );
}

/* --- 3. Conversion donut — +38% --- */
function ConversionDonutCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-10% 0px" });

  const target = 38;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  // We're filling 38% of the ring
  const filled = (target / 100) * circumference;
  const offset = inView ? circumference - filled : circumference;

  return (
    <div ref={wrapRef}>
      <StatCardShell
        eyebrow="Top-SKU conversion lift"
        caption="14 days post-relaunch"
        accentColor="var(--lime)"
        delay={0.2}
      >
        <div className="flex items-center gap-4">
          <p className="display text-[2rem] leading-none tabular-nums text-canvas">
            <CountUp value={target} prefix="+" suffix="%" duration={1.4} />
          </p>
          <svg viewBox="0 0 80 80" className="w-16 h-16 -rotate-90 shrink-0">
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="rgba(244,241,234,0.12)"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="var(--lime)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition:
                  "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </svg>
        </div>
        <p className="text-canvas/65 text-[0.78rem] mt-3 leading-[1.45]">
          Same product. Better photography + cleaner A+ content.
        </p>
      </StatCardShell>
    </div>
  );
}

/* --- 4. Sessions bar chart — +162% --- */
function SessionsBarsCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-10% 0px" });

  // Two clusters: before / after
  const before = [42, 38, 45, 40, 44];
  const after = [98, 105, 112, 108, 116];
  const max = Math.max(...after);

  return (
    <div ref={wrapRef}>
      <StatCardShell
        eyebrow="Sessions · 90-day"
        caption="Before vs. after listing rebuild"
        accentColor="var(--copper)"
        delay={0.3}
      >
        <p className="display text-[2rem] leading-none mb-3 tabular-nums text-canvas">
          <CountUp value={162} prefix="+" suffix="%" duration={1.5} />
        </p>
        {/* Two bar columns */}
        <div className="flex items-end gap-3 h-16">
          {/* Before cluster */}
          <div className="flex-1 flex items-end gap-1 h-full">
            {before.map((v, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-canvas/15"
                style={{
                  height: inView ? `${(v / max) * 100}%` : "0%",
                  transition: `height 0.7s ${i * 0.04}s cubic-bezier(0.16,1,0.3,1)`,
                }}
              />
            ))}
          </div>
          <span aria-hidden="true" className="text-canvas/30 font-mono text-xs">
            →
          </span>
          {/* After cluster */}
          <div className="flex-1 flex items-end gap-1 h-full">
            {after.map((v, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-copper"
                style={{
                  height: inView ? `${(v / max) * 100}%` : "0%",
                  transition: `height 0.9s ${0.3 + i * 0.05}s cubic-bezier(0.16,1,0.3,1)`,
                }}
              />
            ))}
          </div>
        </div>
      </StatCardShell>
    </div>
  );
}
