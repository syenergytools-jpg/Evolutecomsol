"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type NavLink = {
  name: string;
  link: string;
  icon?: React.ReactNode;
};

/**
 * Floating navbar that hides on scroll-down and reveals on scroll-up.
 * Pill-shaped, frosted, with optional CTA on the right.
 */
export const FloatingNav = ({
  navItems,
  className,
  cta,
}: {
  navItems: NavLink[];
  className?: string;
  cta?: { label: string; href: string };
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current !== "number") return;
    const previous = scrollY.getPrevious() ?? 0;
    const direction = current - previous;
    if (current < 80) {
      setVisible(true);
    } else {
      setVisible(direction < 0);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "fixed top-6 inset-x-0 mx-auto max-w-fit z-[5000] px-3 py-2 rounded-full border border-hairline bg-canvas/80 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(15,17,21,0.18)] flex items-center gap-1",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`nav-${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-ink-soft hover:text-ink rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-canvas-2"
            )}
          >
            {navItem.icon && <span className="block sm:hidden">{navItem.icon}</span>}
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {cta && (
          <Link
            href={cta.href}
            className="ml-2 border text-sm font-medium relative border-hairline-dark text-canvas bg-obsidian px-4 py-1.5 rounded-full"
          >
            <span>{cta.label}</span>
            <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
