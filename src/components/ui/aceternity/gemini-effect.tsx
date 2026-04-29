"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated SVG paths inspired by Google Gemini's effect — five curves
 * that "draw" themselves as the user scrolls into view.
 */
const transition = { duration: 0, ease: [0.16, 1, 0.3, 1] as const };

export const GoogleGeminiEffect = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue<number>[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("sticky top-0 h-[200vh] w-full flex items-center justify-center overflow-hidden", className)}>
      <div className="absolute inset-x-0 top-12 z-20 text-center">
        <p className="display text-3xl md:text-7xl text-ink leading-tight">{title || "Build with Aceternity UI"}</p>
        <p className="text-base md:text-lg text-mute mt-4 normal-case max-w-md mx-auto">
          {description || "Scroll this component and see the lines draw themselves around you."}
        </p>
      </div>
      <svg
        width="100%"
        height="890"
        viewBox="0 0 1440 890"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 -top-40 md:-top-20 w-full"
        aria-hidden="true"
      >
        <motion.path
          d="M0 663C145.5 663 191 666.265 269 627.5C346.224 589.117 413 470 528 470C638 470 698.5 663 808.5 663C918.5 663 994.5 470 1071.5 470C1156 470 1187 631 1292 626.5C1352.5 624.5 1397 615.5 1440 597"
          stroke="#FFB7C5"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[0] }}
          transition={transition as never}
        />
        <motion.path
          d="M0 587.5C145.5 587.5 191 567.481 269 528.715C346.224 490.333 392.45 446.852 514.5 446.852C572 446.852 668 535 759 535C850 535 905.776 446.852 989.5 446.852C1071.5 446.852 1186 549 1289.5 549C1392.5 549 1440 526 1440 526"
          stroke="#FF8FAB"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[1] }}
          transition={transition as never}
        />
        <motion.path
          d="M0 514C147 514 213 467 295 467C406 467 446.5 444 533 444C594 444 612 480 705 480C803.5 480 829.5 442.5 945.5 442.5C1037 442.5 1077.5 458.882 1149 458.882C1215 458.882 1305 412 1392.5 412C1429 412 1440 412 1440 412"
          stroke="#FF6B9D"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[2] }}
          transition={transition as never}
        />
        <motion.path
          d="M0 438.5C147 438.5 191 401.5 269 401.5C347 401.5 365 380 437 380C485 380 543 405.16 605 405.16C770 405.16 829.5 218 945.5 218C1037 218 1058.5 295 1148.5 295C1238.5 295 1296 245.5 1361 245.5C1413 245.5 1440 252.5 1440 252.5"
          stroke="#FF477E"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[3] }}
          transition={transition as never}
        />
        <motion.path
          d="M0 364C147 364 219.5 364 297.5 364C375.5 364 392.572 358.961 487 358.961C557 358.961 543.5 309 660 309C764 309 781.554 372 891.5 372C962.5 372 1054.5 251.5 1144.5 251.5C1234.5 251.5 1294 297 1364 297C1420 297 1440 285 1440 285"
          stroke="#FF2364"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{ pathLength: pathLengths[4] }}
          transition={transition as never}
        />
        <path
          d="M0 663C145.5 663 191 666.265 269 627.5C346.224 589.117 413 470 528 470C638 470 698.5 663 808.5 663C918.5 663 994.5 470 1071.5 470C1156 470 1187 631 1292 626.5C1352.5 624.5 1397 615.5 1440 597"
          stroke="#FFB7C5"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 587.5C145.5 587.5 191 567.481 269 528.715C346.224 490.333 392.45 446.852 514.5 446.852C572 446.852 668 535 759 535C850 535 905.776 446.852 989.5 446.852C1071.5 446.852 1186 549 1289.5 549C1392.5 549 1440 526 1440 526"
          stroke="#FF8FAB"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 514C147 514 213 467 295 467C406 467 446.5 444 533 444C594 444 612 480 705 480C803.5 480 829.5 442.5 945.5 442.5C1037 442.5 1077.5 458.882 1149 458.882C1215 458.882 1305 412 1392.5 412C1429 412 1440 412 1440 412"
          stroke="#FF6B9D"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 438.5C147 438.5 191 401.5 269 401.5C347 401.5 365 380 437 380C485 380 543 405.16 605 405.16C770 405.16 829.5 218 945.5 218C1037 218 1058.5 295 1148.5 295C1238.5 295 1296 245.5 1361 245.5C1413 245.5 1440 252.5 1440 252.5"
          stroke="#FF477E"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 364C147 364 219.5 364 297.5 364C375.5 364 392.572 358.961 487 358.961C557 358.961 543.5 309 660 309C764 309 781.554 372 891.5 372C962.5 372 1054.5 251.5 1144.5 251.5C1234.5 251.5 1294 297 1364 297C1420 297 1440 285 1440 285"
          stroke="#FF2364"
          strokeOpacity="0.2"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

/**
 * Self-contained variant that wires up scroll progress internally.
 * Drop into any section — no need to manage MotionValues by hand.
 */
export const GeminiSection = ({ title, description }: { title?: string; description?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const pl1 = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  const pl2 = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  const pl3 = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  const pl4 = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  const pl5 = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  return (
    <div ref={ref} className="h-[300vh] bg-canvas w-full relative overflow-clip">
      <GoogleGeminiEffect title={title} description={description} pathLengths={[pl1, pl2, pl3, pl4, pl5]} />
    </div>
  );
};
