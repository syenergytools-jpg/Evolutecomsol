"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, AlertTriangle } from "lucide-react";
import Image from "next/image";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SESSION_KEY = "evolut_consultation_onboarding_shown";
const OPEN_DELAY_MS = 700;
const AUTO_CLOSE_MS = 1400;

/**
 * ConsultationOnboardingModal — auto-opens shortly after the page loads
 * to capture a lead's name/email early, before they've necessarily
 * decided to book. Deliberately lighter than the qualifier (2 fields,
 * not 5 steps) — the goal is capture, not qualification.
 *
 * Never a hard gate: a close button AND a text "skip" link both work,
 * and it only shows once per browser session (sessionStorage), so
 * returning visitors in the same session aren't hit with it again.
 */
export function ConsultationOnboardingModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SESSION_KEY)) return;
    const id = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(id);
  }, []);

  function close() {
    setOpen(false);
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      kind: "onboarding" as const,
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        if (Array.isArray(json.issues)) {
          setFieldErrors(
            Object.fromEntries(
              json.issues.map((i: { field: string; message: string }) => [i.field, i.message]),
            ),
          );
        }
        setLoading(false);
        return;
      }

      setSubmitted(true);
      window.sessionStorage.setItem(SESSION_KEY, "1");
      setTimeout(() => setOpen(false), AUTO_CLOSE_MS);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? `Network error: ${err.message}.`
          : "Network error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Quick intro"
          className="fixed inset-0 z-[120] bg-canvas overflow-y-auto"
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

          <div className="min-h-full flex items-center justify-center px-4 py-20">
            <motion.div
              className="w-full max-w-md text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, delay: 0.05, ease: PREMIUM_EASE }}
            >
              {!submitted ? (
                <>
                  <p className="eyebrow eyebrow-line justify-center mb-6">
                    Before we dive in
                  </p>
                  <h2 className="display text-[clamp(1.45rem,4vw,2.5rem)] text-ink leading-tight mb-3">
                    Who are we talking to?
                  </h2>
                  <p className="text-ink-soft mb-8">
                    Quick intro so we can tailor this to your business. Takes
                    10 seconds.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3.5 text-left"
                  >
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
                    />
                    <div>
                      <input
                        name="name"
                        required
                        placeholder="Your name"
                        aria-invalid={fieldErrors.name ? true : undefined}
                        className={`w-full rounded-2xl border bg-canvas-2 px-4 py-3.5 text-ink placeholder:text-mute focus:bg-canvas focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? "border-copper focus:border-copper"
                            : "border-hairline focus:border-electric"
                        }`}
                      />
                      {fieldErrors.name && (
                        <span className="mt-1.5 block text-sm text-copper">{fieldErrors.name}</span>
                      )}
                    </div>
                    <div>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@brand.com"
                        aria-invalid={fieldErrors.email ? true : undefined}
                        className={`w-full rounded-2xl border bg-canvas-2 px-4 py-3.5 text-ink placeholder:text-mute focus:bg-canvas focus:outline-none transition-colors ${
                          fieldErrors.email
                            ? "border-copper focus:border-copper"
                            : "border-hairline focus:border-electric"
                        }`}
                      />
                      {fieldErrors.email && (
                        <span className="mt-1.5 block text-sm text-copper">{fieldErrors.email}</span>
                      )}
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-2.5 rounded-2xl border border-copper/40 bg-copper/[0.08] px-4 py-3 text-sm text-ink text-left">
                        <AlertTriangle
                          className="h-4 w-4 text-copper shrink-0 mt-0.5"
                          strokeWidth={2.2}
                        />
                        <p>{errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-canvas text-[0.95rem] font-medium shadow-[0_8px_24px_-8px_rgba(15,17,21,0.4)] hover:bg-ink-soft transition-all disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="h-4 w-4 rounded-full border-2 border-canvas/30 border-t-canvas animate-spin" />
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={close}
                    className="mt-5 text-sm text-mute hover:text-ink transition-colors"
                  >
                    I&apos;ll just look around
                  </button>

                  {/* <Image
                    src="/trust-badges.png"
                    alt="Trust badges"
                    width={100}
                    height={100}
                  /> */}
                </>
              ) : (
                <div>
                  <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-emerald/10 grid place-items-center">
                    <Check className="h-6 w-6 text-emerald" strokeWidth={2.5} />
                  </div>
                  <h2 className="display text-2xl text-ink mb-2">Thanks!</h2>
                  <p className="text-ink-soft">Taking you to the page now…</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
