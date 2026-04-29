"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight + SpotlightItem
 *
 * Pointer-tracked radial glow effect for bento grids. The parent
 * `<Spotlight>` listens to mousemove and writes the cursor position
 * into a CSS variable on its own element. Each `<SpotlightItem>`
 * renders an absolute overlay that reads the parent's cursor
 * position via the same variable space, subtracting the item's own
 * offset so the highlight follows the cursor across the grid as if
 * it were one continuous surface.
 *
 * Pure CSS / DOM mutation (no React state on every mousemove) so it
 * stays smooth at 60fps without re-renders.
 */

export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={cn("relative", className)}>
      {children}
    </div>
  );
}

/**
 * SpotlightItem — child cell that lights up when the cursor is inside
 * the parent Spotlight area near it. The overlay uses the parent's
 * `--spotlight-x/y` variables, offset by the item's own top-left so
 * the radial gradient appears in the right place inside this cell.
 *
 * On hover (`group-hover`) the item also nudges its border accent up
 * for a clearer "the cursor is here" cue.
 */
export function SpotlightItem({
  children,
  className,
  /** Spotlight tint — defaults to a soft copper. */
  color = "rgba(232,112,74,0.18)",
  /** Spotlight radius in px. */
  radius = 320,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Track this item's own offset so the overlay knows where to draw
  // the radial centre in its local coords. We update it on mousemove
  // (the parent's onMove fires the same event up here through bubbling).
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--local-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--local-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative rounded-[1.25rem] overflow-hidden",
        className
      )}
    >
      {/* Hover spotlight — fades in only when this item is hovered */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
        style={{
          background: `radial-gradient(${radius}px circle at var(--local-x, 50%) var(--local-y, 50%), ${color}, transparent 60%)`,
        }}
      />
      {/* Inner border lift on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-canvas/0 group-hover:ring-canvas/15 transition-all duration-500"
      />
      {children}
    </div>
  );
}
