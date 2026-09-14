"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FunnelForm } from "./funnel-form";
import type { FunnelContent } from "./funnel-types";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Shared "book a call" modal for the /legal, /amazon, /shopify funnel
 * pages — same mechanism as /consultation's booking modal (one instance
 * per page, opened from any CTA on that page), kept as its own copy so
 * editing a funnel page can never change /consultation's behavior.
 */
type FunnelBookingModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const FunnelBookingModalContext =
  createContext<FunnelBookingModalContextValue | null>(null);

export function useFunnelBookingModal(): FunnelBookingModalContextValue {
  const ctx = useContext(FunnelBookingModalContext);
  if (!ctx) {
    throw new Error(
      "useFunnelBookingModal must be used within a FunnelBookingModalProvider"
    );
  }
  return ctx;
}

export function FunnelBookingModalProvider({
  content,
  children,
}: {
  content: FunnelContent;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <FunnelBookingModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book a call"
            className="fixed inset-0 z-[100] bg-canvas overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="fixed top-5 right-5 md:top-8 md:right-8 z-10 grid place-items-center h-11 w-11 rounded-full border border-hairline-strong bg-canvas hover:bg-canvas-2 transition-colors"
            >
              <X className="h-5 w-5 text-ink" strokeWidth={2.2} />
            </button>

            <div className="min-h-full flex items-center justify-center px-4 py-20 md:py-24">
              <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: 0.05, ease: PREMIUM_EASE }}
              >
                <p className="eyebrow justify-center mb-6 text-center">
                  One quick fit-check
                </p>
                <FunnelForm content={content} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FunnelBookingModalContext.Provider>
  );
}
