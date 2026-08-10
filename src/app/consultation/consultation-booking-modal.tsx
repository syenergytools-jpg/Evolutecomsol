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
import { ConsultationForm } from "./consultation-form";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Shared "book a consultation" modal — the Hero CTA and the qualify
 * section's CTA both open the exact same full-screen modal via this
 * context, so there is only ever one instance of the form/Calendly
 * flow on the page.
 */
type BookingModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal(): BookingModalContextValue {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return ctx;
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  // Lock body scroll while the full-screen modal is up.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape closes it.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book a consultation"
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
                <p className="eyebrow eyebrow-line justify-center mb-6 text-center">
                  One quick fit-check
                </p>
                <ConsultationForm />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookingModalContext.Provider>
  );
}
