"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Stylised laptop frame whose lid opens and content scales up on scroll.
 * Lighter take on Aceternity's MacbookScroll — pure SVG/CSS.
 */
export const MacbookFrame = ({
  title,
  src,
  className,
}: {
  title?: ReactNode;
  src?: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, 1.5]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative min-h-[200vh] flex flex-col items-center py-24 md:py-40 justify-start flex-shrink-0 [perspective:800px] scale-[0.6] sm:scale-100",
        className
      )}
    >
      <motion.h2
        style={{ translateY: textTransform, opacity: textOpacity }}
        className="display text-ink text-3xl md:text-5xl text-center mb-16"
      >
        {title}
      </motion.h2>

      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX as unknown as MotionValue<unknown>}
        scaleY={scaleY as unknown as MotionValue<unknown>}
        rotate={rotate as unknown as MotionValue<unknown>}
        translate={translate as unknown as MotionValue<unknown>}
      />
      {/* Base */}
      <div className="h-[18rem] w-[28rem] md:h-[22rem] md:w-[36rem] bg-gradient-to-b from-[#272729] via-[#272729] to-[#1a1a1c] rounded-2xl overflow-hidden relative -z-10">
        <div className="h-10 w-full relative">
          <div className="absolute inset-x-0 top-1 h-4 mx-auto w-[80%] bg-[#050505]" />
        </div>
        <div className="flex items-center justify-center h-full -translate-y-12 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <Speaker />
          <KeyPad />
          <Speaker />
        </div>
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-2 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-2xl rounded-tl-2xl" />
      </div>
    </div>
  );
};

const Lid = ({
  src,
  scaleX,
  scaleY,
  rotate,
  translate,
}: {
  src?: ReactNode;
  scaleX: MotionValue<unknown>;
  scaleY: MotionValue<unknown>;
  rotate: MotionValue<unknown>;
  translate: MotionValue<unknown>;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{ transform: "perspective(800px) rotateX(-25deg) translateZ(0)" }}
        className="h-[12rem] w-[32rem] bg-[#272729] rounded-2xl p-2 relative"
      >
        <div className="absolute inset-0 bg-[#272729] rounded-lg flex items-center justify-center">
          <span className="text-canvas/50 text-sm font-mono">evolut.app</span>
        </div>
      </div>
      <motion.div
        style={{ scaleX, scaleY, rotateX: rotate, translateY: translate, transformStyle: "preserve-3d", transformOrigin: "top" }}
        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        <div className="absolute inset-0 bg-[#272729] rounded-lg" />
        <div className="absolute inset-2 bg-canvas rounded-lg overflow-hidden">{src}</div>
      </motion.div>
    </div>
  );
};

const KeyPad = () => (
  <div className="h-full rounded-md bg-[#050505] mx-1 p-1 grid grid-cols-12 gap-[2px] mt-12">
    {Array.from({ length: 84 }).map((_, i) => (
      <div key={i} className="bg-[#0d0d0f] rounded-[3px] aspect-square" />
    ))}
  </div>
);
const Speaker = () => (
  <div className="h-40 w-px mx-2 bg-gradient-to-b from-[#272729] via-[#3a3a3c] to-[#272729] [box-shadow:inset_0_0_2px_rgba(0,0,0,.6)]" />
);
