"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * A custom cursor pointer that follows the mouse over a container.
 * Renders an arrow + label children; hides system cursor inside the area.
 */
export const FollowerPointerCard = ({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setRect(r);
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handleMouseMove}
      style={{ cursor: isInside ? "none" : "auto" }}
      className={className}
    >
      <AnimatePresence>
        {isInside && rect && <FollowPointer x={pos.x} y={pos.y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

const FollowPointer = ({
  x,
  y,
  title,
}: {
  x: number;
  y: number;
  title?: ReactNode;
}) => {
  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full pointer-events-none"
      style={{ top: y, left: x, pointerEvents: "none" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] stroke-electric text-electric"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>
      <motion.div
        style={{ backgroundColor: "var(--electric)" }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="px-2 py-2 bg-electric text-white whitespace-nowrap min-w-max text-xs rounded-full"
      >
        {title || "Hover"}
      </motion.div>
    </motion.div>
  );
};
