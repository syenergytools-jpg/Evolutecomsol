import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class lists with shadcn-style precedence.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a large number with thin spaces (US locale-ish).
 */
export function fmt(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

/**
 * requestAnimationFrame with cleanup helper for stagger animations.
 */
export function nextFrame(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const id = requestAnimationFrame(cb);
  return () => cancelAnimationFrame(id);
}
