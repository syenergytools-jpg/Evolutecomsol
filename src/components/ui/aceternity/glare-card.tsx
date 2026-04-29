"use client";

import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Tilt card with a sweeping glare highlight on hover.
 * Combines 3D rotation, depth shadow, and a moving radial highlight.
 */
export const GlareCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  const containerStyle: React.CSSProperties = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--radius": "1.5rem",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  } as React.CSSProperties;

  const backgroundStyle: React.CSSProperties = {
    "--step": "5%",
    "--foil-svg": `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 26'><path d='M2.5 20.5C8.5 18 23 5.5 23 5.5' stroke='white' opacity='0.1'/></svg>")`,
    "--pattern": "var(--foil-svg) center/100% no-repeat",
    "--rainbow": `repeating-linear-gradient(0deg, rgb(255,119,115) calc(var(--step) * 1), rgba(255,237,95,1) calc(var(--step) * 2), rgba(168,255,95,1) calc(var(--step) * 3), rgba(131,255,247,1) calc(var(--step) * 4), rgba(120,148,255,1) calc(var(--step) * 5), rgb(216,117,255) calc(var(--step) * 6), rgb(255,119,115) calc(var(--step) * 7))`,
    "--diagonal": `repeating-linear-gradient(128deg, #0e152e 0%, hsl(180,10%,60%) 3.8%, hsl(180,10%,60%) 4.5%, hsl(180,10%,60%) 5.2%, #0e152e 10%, #0e152e 12%)`,
    "--shade": `radial-gradient(farthest-corner circle at var(--m-x) var(--m-y),rgba(255,255,255,0.1) 12%,rgba(255,255,255,0.15) 20%,rgba(255,255,255,0.25) 120%)`,
    backgroundBlendMode: "hue, hue, hue, overlay",
  } as React.CSSProperties;

  const updateStyles = () => {
    if (!refElement.current) return;
    const { background, rotate, glare } = state.current;
    refElement.current.style.setProperty("--m-x", `${glare.x}%`);
    refElement.current.style.setProperty("--m-y", `${glare.y}%`);
    refElement.current.style.setProperty("--r-x", `${rotate.x}deg`);
    refElement.current.style.setProperty("--r-y", `${rotate.y}deg`);
    refElement.current.style.setProperty("--bg-x", `${background.x}%`);
    refElement.current.style.setProperty("--bg-y", `${background.y}%`);
  };

  return (
    <div
      style={containerStyle}
      className={cn(
        "relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] will-change-transform",
        className
      )}
      ref={refElement}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        state.current = {
          glare: { x: px * 100, y: py * 100 },
          background: { x: 50 + (px - 0.5) * 20, y: 50 + (py - 0.5) * 20 },
          rotate: { x: -(py - 0.5) * 12, y: (px - 0.5) * 12 },
        };
        updateStyles();
      }}
      onPointerEnter={() => {
        if (refElement.current) refElement.current.style.setProperty("--opacity", "1");
      }}
      onPointerLeave={() => {
        if (refElement.current) refElement.current.style.setProperty("--opacity", "0");
        state.current.rotate = { x: 0, y: 0 };
        updateStyles();
      }}
    >
      <div
        className="relative h-full w-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))] overflow-hidden rounded-[var(--radius)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] transition-transform duration-[var(--duration)] ease-[var(--easing)] will-change-transform shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
      >
        <div className="grid [grid-area:1/1] mix-blend-soft-light h-full w-full">
          {children}
        </div>
        <div
          className="grid [grid-area:1/1] mix-blend-soft-light h-full w-full opacity-[var(--opacity)] transition-opacity duration-[var(--duration)] ease-[var(--easing)] will-change-background pointer-events-none"
          style={{
            background:
              "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255,255,255,0.8) 10%, rgba(255,255,255,0.65) 20%, rgba(255,255,255,0) 90%)",
          }}
        />
        <div
          className="grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity pointer-events-none"
          style={{
            background:
              "var(--rainbow), var(--shade)",
            backgroundSize:
              "var(--foil-size, 100%) var(--foil-size, 100%), 100% 100%",
            backgroundPosition: "center, var(--bg-x) var(--bg-y)",
            backgroundBlendMode: "hue, hue, hue, overlay",
            ...backgroundStyle,
          }}
        />
      </div>
    </div>
  );
};
