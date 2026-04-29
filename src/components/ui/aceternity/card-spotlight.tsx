"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a radial spotlight that follows the cursor inside its bounds.
 */
export const CardSpotlight = ({
  children,
  radius = 360,
  color = "rgba(0,102,255,0.18)",
  className,
}: {
  children: ReactNode;
  radius?: number;
  color?: string;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 70%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group/spotlight relative overflow-hidden rounded-3xl border border-hairline bg-surface",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
};
