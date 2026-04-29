"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

type Point = { x: number; y: number; label?: string };
type Connection = { from: Point; to: Point };

const points: Point[] = [
  { x: 200, y: 180, label: "USA" },
  { x: 470, y: 150, label: "EU" },
  { x: 540, y: 230, label: "Pakistan" },
  { x: 720, y: 250, label: "Australia" },
  { x: 580, y: 170, label: "Middle East" },
  { x: 340, y: 320, label: "Brazil" },
];

const connections: Connection[] = [
  { from: points[2], to: points[0] },
  { from: points[2], to: points[1] },
  { from: points[2], to: points[3] },
  { from: points[2], to: points[4] },
  { from: points[2], to: points[5] },
];

/**
 * Stylised world map (dotted continents + animated arc routes) — pure SVG.
 * Inspired by Aceternity's WorldMap but without external dotted-map data.
 */
export const WorldMap = () => {
  const ref = useRef<SVGSVGElement>(null);

  const arcPath = (a: Point, b: Point) => {
    const mx = (a.x + b.x) / 2;
    const my = Math.min(a.y, b.y) - 80;
    return `M ${a.x},${a.y} Q ${mx},${my} ${b.x},${b.y}`;
  };

  return (
    <div className="relative w-full aspect-[2/1] bg-gradient-to-b from-obsidian to-obsidian-soft rounded-2xl overflow-hidden border border-hairline-dark">
      <svg
        ref={ref}
        viewBox="0 0 900 450"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="arcGradient" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3d8bff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#e8704a" />
            <stop offset="1" stopColor="#3d8bff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="#e8704a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e8704a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Stylised continent shapes (dot grid) */}
        {Array.from({ length: 36 }).map((_, row) =>
          Array.from({ length: 60 }).map((_, col) => {
            const x = col * 15 + 10;
            const y = row * 12 + 30;
            // Crude continental noise — chooses dots that fall in plausible bands
            const onLand =
              (x > 70 && x < 280 && y > 130 && y < 280 && Math.sin(x * 0.05 + y * 0.07) > -0.2) ||
              (x > 380 && x < 520 && y > 100 && y < 240) ||
              (x > 540 && x < 760 && y > 130 && y < 320) ||
              (x > 280 && x < 380 && y > 280 && y < 380);
            if (!onLand) return null;
            return (
              <circle
                key={`d-${row}-${col}`}
                cx={x}
                cy={y}
                r={1.1}
                fill="rgba(220,225,235,0.35)"
              />
            );
          })
        )}

        {/* Connections */}
        {connections.map((c, i) => (
          <g key={`c-${i}`}>
            <motion.path
              d={arcPath(c.from, c.to)}
              stroke="url(#arcGradient)"
              strokeWidth={1.4}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2.4,
                delay: i * 0.35,
                ease: [0.16, 1, 0.3, 1],
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          </g>
        ))}

        {/* Points + glow */}
        {points.map((p, i) => (
          <g key={`p-${i}`}>
            <circle cx={p.x} cy={p.y} r={20} fill="url(#dotGlow)" />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={4}
              fill="#e8704a"
              animate={{ r: [4, 7, 4], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
            {p.label && (
              <text
                x={p.x + 10}
                y={p.y - 8}
                fontSize={11}
                fill="rgba(220,225,235,0.85)"
                fontFamily="ui-monospace"
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
