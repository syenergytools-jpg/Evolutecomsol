"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { funnelAccent } from "./funnel-theme";
import type { FunnelAccent } from "./funnel-theme";
import type { FunnelTestimonial } from "./funnel-types";

const NUMBER_RE = /(\$[\d,]+(?:\.\d+)?\+?|\d+(?:\.\d+)?[×%]|\d+\s+(?:weeks?|months?|days?|years?))/i;

function Highlighted({ text, accentClass }: { text: string; accentClass: string }) {
  const match = text.match(NUMBER_RE);
  if (!match || match.index === undefined) return <>{text}</>;
  const before = text.slice(0, match.index);
  const hit = match[0];
  const after = text.slice(match.index + hit.length);
  return (
    <>
      {before}
      <span className={accentClass}>{hit}</span>
      {after}
    </>
  );
}

/**
 * FunnelTestimonialCard — 3D tilt-on-hover review card, adapted from a
 * client-supplied 21st.dev "AnimatedJobCard" pattern: same mouse-tracked
 * rotateX/rotateY + spring physics, restyled for real testimonial data
 * (photo/name/role/headline/quote) instead of a job listing, and for
 * this page family's dark obsidian theme instead of shadcn's
 * card/muted/primary tokens (which aren't defined in this project —
 * see funnel-theme.ts for the canvas/obsidian token system used
 * everywhere else here). The colored top border uses an inline
 * `borderTopColor` style, not a Tailwind `border-t-<color>` class —
 * globals.css has an unlayered `* { border-color }` rule that silently
 * defeats that utility site-wide (see border-color-utilities-are-dead
 * in this project's memory).
 */
export function FunnelTestimonialCard({
  testimonial,
  accent,
  className,
  onClick,
}: {
  testimonial: FunnelTestimonial;
  accent: FunnelAccent;
  className?: string;
  onClick?: () => void;
}) {
  const accentClasses = funnelAccent[accent];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // clamp: true — without it useTransform extrapolates linearly past
  // the input domain, so a mouse position beyond ±150px from the card's
  // center (easy on a wide desktop card) spins it well past the
  // intended ±8° tilt instead of holding at the max.
  const rotateX = useTransform(mouseY, [-150, 150], [8, -8], { clamp: true });
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8], { clamp: true });
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      layout
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        borderTopColor: accentClasses.hex,
      }}
      className={cn(
        "shrink-0 transform-gpu cursor-pointer overflow-hidden rounded-2xl border-t-4 bg-obsidian-soft p-6 md:p-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
      aria-label={`Review from ${testimonial.name}, ${testimonial.role}`}
      tabIndex={0}
    >
      <div style={{ transform: "translateZ(24px)" }}>
        <div className="flex items-center gap-3.5 mb-5">
          <span
            className="relative block h-14 w-14 shrink-0 rounded-full overflow-hidden"
            style={{ boxShadow: `0 0 0 3px ${accentClasses.hex}` }}
          >
            <Image src={testimonial.photo} alt={testimonial.name} fill loading="eager" className="object-cover" sizes="56px" />
          </span>
          <div>
            <p className="font-semibold text-canvas leading-snug">{testimonial.name}</p>
            <p className="text-sm text-canvas/50 leading-snug">{testimonial.role}</p>
          </div>
        </div>

        <h3 className="display text-[1.35rem] leading-[1.25] text-canvas mb-3 text-balance">
          <Highlighted text={testimonial.headline} accentClass={cn(accentClasses.fg, "italic font-normal")} />
        </h3>

        <p className="italic text-[0.95rem] text-canvas/65 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}
