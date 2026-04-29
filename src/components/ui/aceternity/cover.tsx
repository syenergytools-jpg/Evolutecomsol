"use client";

import { motion } from "framer-motion";
import { ReactNode, useState, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Inline word that, on hover, reveals beams and sparkles around it —
 * the Aceternity Cover component. Useful for highlighting brand words
 * inline in long headers.
 */
export const Cover = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const id = useId();
  const beamCount = 5;

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative bg-canvas-2 group/cover inline-block rounded-md px-2 py-1 transition duration-200 hover:bg-obsidian",
        className
      )}
    >
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full w-full overflow-hidden absolute inset-0"
        >
          {Array.from({ length: beamCount }).map((_, i) => (
            <motion.div
              key={`${id}-beam-${i}`}
              animate={{ x: ["-50%", "100%"] }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
              className="w-[100px] h-[3px] absolute"
              style={{
                top: `${(100 / beamCount) * (i + 0.5)}%`,
                background:
                  "linear-gradient(90deg, rgba(38,231,231,0) 0%, rgba(38,231,231,0.6) 50%, rgba(38,231,231,0) 100%)",
                boxShadow: "0 0 12px rgba(38,231,231,0.6)",
              }}
            />
          ))}
        </motion.div>
      )}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={`spark-${i}`}
          initial={{ scale: 0 }}
          animate={hovered ? { scale: [0, 1, 0], top: `${Math.random() * 80}%`, left: `${Math.random() * 90}%` } : { scale: 0 }}
          transition={{ duration: 1, delay: Math.random() * 0.5, repeat: Infinity }}
          className="absolute h-1 w-1 rounded-full bg-canvas pointer-events-none"
        />
      ))}
      <motion.span
        animate={{ x: hovered ? [0, -2, 2, -1, 0] : 0, color: hovered ? "#fff" : undefined }}
        transition={{ duration: 0.2 }}
        className="font-semibold relative z-20 inline-block transition duration-200 group-hover/cover:text-canvas"
      >
        {children}
      </motion.span>
    </span>
  );
};
