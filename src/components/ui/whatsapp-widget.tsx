"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * WhatsAppWidget
 *
 * Floating action button bottom-right, shown on every page. Tap →
 * opens wa.me with a pre-filled message. Hover (desktop) reveals a
 * small tooltip card with the number and quick-CTA. Respects
 * prefers-reduced-motion via CSS transitions. Hidden on print.
 * ------------------------------------------------------------------ */

const PHONE = "923015574531"; // wa.me wants no plus, no spaces
const PHONE_DISPLAY = "+92 301 5574 531";
const DEFAULT_MESSAGE = `Hi ${site?.name ?? "Evolut"} team — I'd like to talk about an ecommerce engagement.`;

function buildWaUrl(message?: string) {
  const text = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/${PHONE}?text=${text}`;
}

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div
      aria-live="polite"
      className="fixed z-[60] right-4 bottom-4 md:right-6 md:bottom-6 print:hidden"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute right-0 bottom-[calc(100%+12px)] w-[18rem] max-w-[calc(100vw-2rem)]",
              "rounded-2xl border border-hairline-strong bg-canvas shadow-[0_20px_60px_-20px_rgba(15,17,21,0.35)]",
              "p-4 pr-3"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-2 right-2 h-7 w-7 grid place-items-center rounded-full text-mute hover:bg-canvas-2"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>

            <div className="flex items-start gap-3">
              <span className="grid place-items-center h-10 w-10 rounded-full bg-emerald text-canvas shrink-0">
                <WhatsAppGlyph className="h-5 w-5" />
              </span>
              <div className="min-w-0 pr-4">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute mb-1">
                  Chat with us
                </p>
                <p className="text-sm font-semibold text-ink leading-tight">
                  Talk to an operator
                </p>
                <p className="text-[0.78rem] text-ink-soft mt-1 leading-snug">
                  Replies within an hour during studio hours.
                </p>
              </div>
            </div>

            <a
              href={buildWaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={cn(
                "mt-3 flex items-center justify-between gap-3 rounded-xl",
                "bg-emerald hover:bg-emerald/90 text-canvas px-3.5 py-2.5",
                "transition-colors"
              )}
            >
              <span className="text-sm font-semibold">Start chat</span>
              <span className="font-mono text-[0.7rem] opacity-90">
                {PHONE_DISPLAY}
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp menu" : "Open WhatsApp chat"}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative grid place-items-center h-14 w-14 rounded-full",
          "bg-emerald text-canvas shadow-[0_18px_40px_-12px_rgba(16,185,129,0.55)]",
          "ring-2 ring-canvas",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald/40"
        )}
      >
        {/* pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-emerald/40 animate-ping"
          style={{ animationDuration: "2.4s" }}
        />
        <span className="relative inline-flex items-center justify-center">
          {open ? (
            <X className="h-6 w-6" strokeWidth={2.4} />
          ) : (
            <WhatsAppGlyph className="h-7 w-7" />
          )}
        </span>
      </motion.button>
    </div>
  );
}

/* ---------- WhatsApp glyph (inline SVG to avoid icon dependency) --- */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.669.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.371s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
