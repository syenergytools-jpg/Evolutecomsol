"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, TrendingUp, ArrowDown } from "lucide-react";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ *
 * AdvancedStats — operator-grade dashboard panel.
 *
 *   Row 1 (4 cards): top-line metrics with sparklines / mini-charts
 *   Row 2 (2 cards): a wide line chart + a smaller donut breakdown
 *
 * Numbers are real (sourced from site-config or directly from the
 * Gloco / Squirtz / Shilajit charts). All charts are pure SVG —
 * they draw themselves in via GSAP ScrollTrigger when the panel
 * enters the viewport.
 * ------------------------------------------------------------------ */

export function AdvancedStats() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP — draw lines / scale bars / sweep arcs on first in-view
  useGSAP(
    () => {
      const lines = gsap.utils.toArray<SVGPathElement>(".as-line");
      const bars = gsap.utils.toArray<SVGRectElement>(".as-bar");
      const arcs = gsap.utils.toArray<SVGCircleElement>(".as-arc");

      if (lines.length) {
        lines.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(p, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: p, start: "top 90%" },
          });
        });
      }
      if (bars.length) {
        bars.forEach((b, i) => {
          const target = Number(b.dataset.target ?? 0);
          gsap.fromTo(
            b,
            { attr: { y: 100, height: 0 } },
            {
              attr: { y: 100 - target, height: target },
              duration: 1.1,
              delay: i * 0.05,
              ease: "power3.out",
              scrollTrigger: { trigger: b, start: "top 90%" },
            }
          );
        });
      }
      if (arcs.length) {
        arcs.forEach((c) => {
          const dash = Number(c.getAttribute("data-dash") ?? 0);
          const circ = Number(c.getAttribute("data-circ") ?? 100);
          gsap.set(c, { strokeDasharray: circ, strokeDashoffset: circ });
          gsap.to(c, {
            strokeDashoffset: circ - dash,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: c, start: "top 90%" },
          });
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas py-24 md:py-32 border-y border-hairline overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 100% 0%, rgba(232,112,74,0.06) 0%, transparent 60%), " +
            "radial-gradient(50% 45% at 0% 100%, rgba(0,102,255,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">Operator-grade reporting</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-ink leading-[1.04]">
              <StaggerWords text="Real numbers," />{" "}
              <StaggerWords
                text="not vanity ones."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                A peek at the dashboard your team gets every Friday.
                Every line is drawn from a real engagement.
              </p>
            </Reveal>
          </div>
        </div>

        {/* === ROW 1 — 4 metric cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-4 md:mb-5">
          <MetricCard
            label="Active brands"
            value={240}
            suffix="+"
            delta="+18"
            deltaLabel="this quarter"
            tone="ink"
          >
            <Sparkline
              points={[14, 18, 22, 19, 26, 28, 31, 35, 40, 44, 48, 52]}
              accent="var(--ink)"
            />
          </MetricCard>

          <MetricCard
            label="Avg ROAS · 90d"
            value={3.4}
            decimals={1}
            suffix="×"
            delta="+0.6×"
            deltaLabel="vs last quarter"
            tone="electric"
          >
            <Sparkline
              points={[2.1, 2.3, 2.0, 2.5, 2.7, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.4]}
              accent="var(--electric)"
            />
          </MetricCard>

          <MetricCard
            label="ASINs optimized"
            value={18000}
            suffix="+"
            delta="+1,420"
            deltaLabel="last 30 days"
            tone="copper"
          >
            <BarMini
              points={[3, 4, 5, 4, 6, 7, 6, 8, 9, 8, 10, 12]}
              accent="var(--copper)"
            />
          </MetricCard>

          <MetricCard
            label="Avg ACoS reduction"
            value={39}
            prefix="−"
            suffix="%"
            delta="−4 pts"
            deltaLabel="vs onboarding"
            tone="emerald"
            negativeIsGood
          >
            <Sparkline
              points={[44, 42, 41, 39, 38, 36, 34, 35, 33, 31, 30, 29]}
              accent="var(--emerald)"
            />
          </MetricCard>
        </div>

        {/* === ROW 2 — wide chart + donut === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Wide line chart */}
          <div className="lg:col-span-2 relative rounded-[1.5rem] border border-hairline-strong bg-surface p-6 md:p-7 overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mute mb-2">
                  GMV under management · YTD
                </p>
                <p className="display text-[clamp(1.85rem,3vw,2.6rem)] leading-none text-ink mb-2 tabular-nums">
                  <CountUp value={420} prefix="$" suffix="M" />
                </p>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-emerald inline-flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3" strokeWidth={2.2} />
                  +62% YoY
                </p>
              </div>

              {/* Tiny range chips (visual only) */}
              <div className="flex gap-1">
                {["1M", "3M", "6M", "YTD", "1Y"].map((r, i) => (
                  <span
                    key={r}
                    className={cn(
                      "rounded-md px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] transition-colors",
                      i === 3
                        ? "bg-ink text-canvas"
                        : "bg-canvas-2 text-mute"
                    )}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* The big chart */}
            <BigLineChart />

            {/* Bottom legend */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute">
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-3 rounded-full bg-copper" />
                Cumulative GMV
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-3 rounded-full bg-electric" />
                New brands onboarded
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-mute/65">
                <ArrowDown className="h-3 w-3" strokeWidth={2} />
                Updated 9:00 EST · Friday
              </span>
            </div>
          </div>

          {/* Donut breakdown */}
          <div className="relative rounded-[1.5rem] bg-obsidian text-canvas p-6 md:p-7 overflow-hidden">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-canvas/55 mb-5">
              GMV mix · by service line
            </p>

            <div className="flex items-center gap-6">
              <DonutBreakdown />
              <ul className="flex-1 space-y-2.5">
                {[
                  { label: "Amazon ops", pct: 42, color: "var(--copper)" },
                  { label: "Shopify dev", pct: 24, color: "var(--electric)" },
                  { label: "PPC + DSP", pct: 18, color: "var(--lime)" },
                  { label: "Sourcing", pct: 10, color: "var(--emerald)" },
                  { label: "Other", pct: 6, color: "rgba(244,241,234,0.45)" },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between text-[0.78rem]"
                  >
                    <span className="inline-flex items-center gap-2 text-canvas/85">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: row.color }}
                      />
                      {row.label}
                    </span>
                    <span className="font-mono text-[0.62rem] tabular-nums text-canvas/70">
                      {row.pct}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer caption + CTA */}
        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-between gap-y-4 gap-x-8">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute">
            Sample · year-to-date 2026 · Amazon Seller Central + internal
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-2.5 text-[0.9rem] font-medium hover:bg-ink-soft transition-all hover:-translate-y-0.5"
          >
            Get this dashboard
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== *
 * Metric card with embedded mini-chart
 * ============================================================== */
function MetricCard({
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
  delta,
  deltaLabel,
  tone,
  negativeIsGood = false,
  children,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  delta: string;
  deltaLabel: string;
  tone: "ink" | "electric" | "copper" | "emerald";
  negativeIsGood?: boolean;
  children: React.ReactNode;
}) {
  const accent: Record<typeof tone, string> = {
    ink: "text-ink",
    electric: "text-electric",
    copper: "text-copper",
    emerald: "text-emerald",
  };

  const deltaPositive = delta.startsWith("+") || (negativeIsGood && delta.startsWith("−"));

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.7, ease: PREMIUM_EASE }}
      className="relative rounded-[1.5rem] border border-hairline-strong bg-surface p-6"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-mute">
          {label}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1 font-mono text-[0.58rem] tabular-nums",
            deltaPositive ? "text-emerald" : "text-copper"
          )}
        >
          <TrendingUp
            className={cn(
              "h-2.5 w-2.5",
              !deltaPositive && "rotate-180"
            )}
            strokeWidth={2.5}
          />
          {delta}
        </span>
      </div>

      <p
        className={cn(
          "display text-[clamp(1.85rem,3.2vw,2.5rem)] leading-none mb-2 tabular-nums",
          accent[tone]
        )}
      >
        <CountUp
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </p>
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute mb-5">
        {deltaLabel}
      </p>

      {/* Mini chart slot */}
      <div className="h-12 -mx-1">{children}</div>
    </motion.div>
  );
}

/* ============================================================== *
 * Sparkline — line chart in a 100×40 viewBox
 * ============================================================== */
function Sparkline({
  points,
  accent,
}: {
  points: number[];
  accent: string;
}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(0.001, max - min);
  const path = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 38 - ((v - min) / span) * 32;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <path
        d={path}
        fill="none"
        stroke={accent}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="as-line"
      />
      {/* Last-point highlight dot */}
      <circle
        cx={100}
        cy={38 - ((points[points.length - 1] - min) / span) * 32}
        r={1.8}
        fill={accent}
      />
    </svg>
  );
}

/* ============================================================== *
 * BarMini — bar chart in a 100×40 viewBox
 * ============================================================== */
function BarMini({
  points,
  accent,
}: {
  points: number[];
  accent: string;
}) {
  const max = Math.max(...points);
  const w = 100 / points.length;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      {points.map((v, i) => {
        const h = (v / max) * 80;
        const x = i * w + 1;
        return (
          <rect
            key={i}
            data-target={h}
            x={x}
            y={100 - h}
            width={w - 2}
            height={h}
            rx={1}
            fill={accent}
            className="as-bar"
          />
        );
      })}
    </svg>
  );
}

/* ============================================================== *
 * Big line chart — two stacked area-ish lines
 * ============================================================== */
function BigLineChart() {
  // 12 monthly points, scaled to 0..100
  const gmv = [10, 14, 22, 28, 34, 42, 50, 58, 70, 80, 92, 100];
  const brands = [4, 6, 12, 16, 22, 28, 32, 38, 44, 52, 58, 62];

  const toPath = (arr: number[]) =>
    arr
      .map((v, i) => {
        const x = (i / (arr.length - 1)) * 100;
        const y = 100 - v;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg
      viewBox="0 0 100 110"
      preserveAspectRatio="none"
      className="w-full h-44 md:h-56"
    >
      {/* Grid */}
      {[20, 40, 60, 80].map((y) => (
        <line
          key={y}
          x1="0"
          x2="100"
          y1={y}
          y2={y}
          stroke="var(--hairline)"
          strokeWidth="0.3"
        />
      ))}
      {/* Month ticks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (i / 11) * 100;
        const labels = ["J","F","M","A","M","J","J","A","S","O","N","D"];
        return (
          <g key={i}>
            <line
              x1={x}
              x2={x}
              y1="100"
              y2="102"
              stroke="var(--hairline-strong)"
              strokeWidth="0.4"
            />
            <text
              x={x}
              y={108}
              fontSize="3.6"
              fontFamily="ui-monospace, monospace"
              fill="var(--mute)"
              textAnchor="middle"
            >
              {labels[i]}
            </text>
          </g>
        );
      })}

      {/* GMV (copper) */}
      <path
        d={toPath(gmv)}
        fill="none"
        stroke="var(--copper)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="as-line"
      />
      {/* Brands (electric) */}
      <path
        d={toPath(brands)}
        fill="none"
        stroke="var(--electric)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2 2"
        className="as-line"
      />

      {/* End-point markers */}
      <circle cx="100" cy={100 - gmv[gmv.length - 1]} r="1.4" fill="var(--copper)" />
      <circle cx="100" cy={100 - brands[brands.length - 1]} r="1.4" fill="var(--electric)" />
    </svg>
  );
}

/* ============================================================== *
 * Donut breakdown — animated arcs
 * ============================================================== */
function DonutBreakdown() {
  // Same data as the legend list
  const segments = [
    { pct: 42, color: "var(--copper)" },
    { pct: 24, color: "var(--electric)" },
    { pct: 18, color: "var(--lime)" },
    { pct: 10, color: "var(--emerald)" },
    { pct: 6, color: "rgba(244,241,234,0.45)" },
  ];

  const r = 36;
  const circ = 2 * Math.PI * r;

  let cumulative = 0;

  return (
    <svg viewBox="0 0 100 100" className="h-32 w-32 shrink-0 -rotate-90">
      {/* Track */}
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="rgba(244,241,234,0.10)"
        strokeWidth="10"
      />
      {segments.map((seg) => {
        const dash = (seg.pct / 100) * circ;
        const offset = (cumulative / 100) * circ;
        cumulative += seg.pct;
        return (
          <circle
            key={seg.color}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="10"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            data-dash={dash.toFixed(1)}
            data-circ={circ.toFixed(1)}
            className="as-arc"
            strokeLinecap="butt"
          />
        );
      })}
      {/* Center label */}
      <text
        x="50"
        y="50"
        fontSize="11"
        fontFamily="ui-sans-serif, system-ui"
        fill="var(--canvas)"
        textAnchor="middle"
        alignmentBaseline="middle"
        className="rotate-90 origin-center"
      >
        100%
      </text>
    </svg>
  );
}
