"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type TooltipItem = {
  id: number;
  name: string;
  designation: string;
  initials: string;
  /** Optional portrait image — when provided, replaces the initials chip */
  image?: string;
  accent?: string;
};

/**
 * Avatar stack with a flip-up tooltip. Renders a portrait image when
 * `image` is supplied on an item, otherwise falls back to initials.
 */
export const AnimatedTooltip = ({
  items,
  className,
}: {
  items: TooltipItem[];
  className?: string;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 5 };
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = e.currentTarget.offsetWidth / 2;
    x.set(e.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn("flex flex-row items-center -space-x-3", className)}>
      {items.map((item) => (
        <div
          className="-mr-3 relative group"
          key={item.id}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence mode="popLayout">
            {hovered === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX,
                  rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center rounded-md bg-obsidian z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-electric to-transparent h-px" />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-copper to-transparent h-px" />
                <div className="font-bold text-canvas relative z-30 text-base">
                  {item.name}
                </div>
                <div className="text-canvas/60 text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onMouseMove={handleMouseMove}
            className={cn(
              "h-12 w-12 rounded-full border-2 border-canvas relative overflow-hidden",
              "transition duration-500 group-hover:scale-105 group-hover:z-30",
              "flex items-center justify-center text-sm font-mono font-semibold text-canvas"
            )}
            style={
              item.image
                ? undefined
                : {
                    background:
                      item.accent ?? "linear-gradient(135deg, #0066ff, #e8704a)",
                  }
            }
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              item.initials
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
