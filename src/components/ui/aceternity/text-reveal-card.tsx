"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hover card that reveals a second piece of text via mouse position.
 * Two stacked text blocks; the top one is clipped horizontally based on cursor X.
 */
export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: ReactNode;
  className?: string;
}) => {
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [pos, setPos] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width } = cardRef.current.getBoundingClientRect();
      setLeft(left);
      setWidth(width);
    }
  }, []);

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const relativeX = event.clientX - left;
    setPos(relativeX);
  }

  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onMouseMove={mouseMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-obsidian border border-hairline-dark w-full rounded-3xl p-8 relative overflow-hidden",
        className
      )}
    >
      {children}
      <div className="h-40 relative flex items-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
            backgroundImage:
              "linear-gradient(90deg, rgba(20,20,26,0) 0%, rgba(20,20,26,1) 100%)",
          }}
          animate={
            isMouseOver
              ? { opacity: width > 0 ? 1 : 0, clipPath: `inset(0 ${100 - (pos / width) * 100}% 0 0)` }
              : { clipPath: "inset(0 50% 0 0)" }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-canvas z-20 will-change-transform"
        >
          <p
            style={{ textShadow: "4px 4px 15px rgba(0,0,0,0.5)" }}
            className="text-base sm:text-3xl py-10 font-bold text-canvas bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300"
          >
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{ left: `${(pos / width) * 100}%`, rotate: "0deg", opacity: isMouseOver ? 1 : 0 }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-electric to-transparent absolute z-50 will-change-transform"
        />
        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="text-base sm:text-3xl py-10 font-bold bg-clip-text text-transparent bg-[#323238]">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h2 className={cn("text-canvas text-lg mb-2", className)}>{children}</h2>
);

export const TextRevealCardDescription = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("text-canvas/60 text-sm", className)}>{children}</p>
);
