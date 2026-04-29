"use client";

import { useEffect, useId, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedBeam — draws a curved SVG path between two refs inside a
 * container, with a moving gradient highlight that travels along the
 * path. Inspired by the Magic UI / ui-layouts pattern, rebuilt
 * dependency-free.
 *
 * The path is recomputed on container resize so refs stay connected
 * even when the layout reflows.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  pathColor = "color-mix(in oklab, var(--ink) 16%, transparent)",
  pathWidth = 1,
  pathOpacity = 1,
  gradientStartColor = "#0066ff",
  gradientStopColor = "#e8704a",
  delay = 0,
  duration = 4,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  dotted = false,
  className,
}: {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  dotted?: boolean;
  className?: string;
}) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!container || !from || !to) return;

      const rect = container.getBoundingClientRect();
      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();

      const w = rect.width;
      const h = rect.height;
      setSvgDimensions({ width: w, height: h });

      const startX =
        fromRect.left - rect.left + fromRect.width / 2 + startXOffset;
      const startY =
        fromRect.top - rect.top + fromRect.height / 2 + startYOffset;
      const endX = toRect.left - rect.left + toRect.width / 2 + endXOffset;
      const endY = toRect.top - rect.top + toRect.height / 2 + endYOffset;

      // Bezier control point — push perpendicular by `curvature`
      const controlY = startY - curvature;

      setPathD(
        `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
      );
    };

    update();

    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  // Gradient sweep — animate x1/x2 along the bounding box so the
  // colored stop slides across the path
  const sweep = reverse
    ? { x1: ["100%", "0%"], x2: ["110%", "10%"] }
    : { x1: ["0%", "100%"], x2: ["-10%", "90%"] };

  return (
    <svg
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`beam-${id}`}
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(0)"
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {/* Base path — the static "wire" */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        strokeDasharray={dotted ? "2 4" : undefined}
        fill="none"
      />

      {/* Animated highlight — moving gradient stroke */}
      <motion.path
        d={pathD}
        strokeWidth={pathWidth + 0.6}
        stroke={`url(#beam-${id})`}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Sliding gradient — animates the gradient coordinates */}
      <motion.linearGradient
        href={`#beam-${id}`}
        gradientUnits="userSpaceOnUse"
        animate={sweep}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- *
 * Circle — small chip that the beams connect to. Forward-ref so
 * <AnimatedBeam fromRef={...}> can read the DOM rect.
 * ---------------------------------------------------------------- */
import { forwardRef } from "react";

export const BeamCircle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border border-hairline-strong bg-canvas shadow-[0_8px_18px_-8px_rgba(15,17,21,0.18)]",
        className
      )}
    >
      {children}
    </div>
  );
});
BeamCircle.displayName = "BeamCircle";
