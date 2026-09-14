"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Check, AlertTriangle, ExternalLink, Mail } from "lucide-react";
import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import {
  BUDGETS,
  calBookingUrl,
  calEmbedUrl,
  calIsConfigured,
  qualifierOptions,
  site,
  type QualifierOption,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { funnelAccent } from "./funnel-theme";
import type { FunnelContent } from "./funnel-types";

/**
 * FunnelForm — the same 5-step qualifier as /consultation's form, and
 * posting to the exact same `/api/consultation` endpoint (unmodified —
 * see that route's file for why: it already validates against the
 * shared `qualifierOptions`/`BUDGETS` in site-config, and the referer
 * header it records is enough to tell a /legal, /amazon, or /shopify
 * lead apart in the admin inbox without any backend change).
 *
 * Only the step TITLES are page-specific (`content.stepCopy`) — the
 * underlying field values/slugs are identical across every funnel page
 * so the server's validation never has to know which page posted.
 */
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

type Option = QualifierOption;

const BUDGET_OPTIONS: Option[] = BUDGETS.map((b) => ({ value: b, label: b }));
const { authority: AUTHORITY_OPTIONS, need: NEED_OPTIONS, timing: TIMING_OPTIONS } =
  qualifierOptions;

type Answers = { budget: string; authority: string; need: string; timing: string };

export function FunnelForm({ content }: { content: FunnelContent }) {
  const STEP_COPY = content.stepCopy;
  const TOTAL_STEPS = STEP_COPY.length;
  const accent = funnelAccent[content.accent];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    budget: "",
    authority: "",
    need: "",
    timing: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [saveOk, setSaveOk] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function selectAnswer(key: keyof Answers, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)), 240);
  }

  function goBack() {
    setErrorMsg(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      kind: "qualifier" as const,
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      budget: answers.budget,
      authority: answers.authority,
      need: answers.need,
      timing: answers.timing,
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.status === 400 || res.status === 429) {
        setErrorMsg(json.error ?? "Please check the highlighted fields.");
        if (Array.isArray(json.issues)) {
          setFieldErrors(
            Object.fromEntries(
              json.issues.map((i: { field: string; message: string }) => [i.field, i.message])
            )
          );
        }
        setLoading(false);
        return;
      }

      setSaveOk(Boolean(json?.ok));
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? `Network error: ${err.message}. Please try again or email ${site.contact.email}.`
          : "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <CardSpotlight className="p-7 md:p-10" color={accent.glow}>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="stepper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <div className="flex items-center mb-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-ink transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
                    Back
                  </button>
                ) : (
                  <span />
                )}
                <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-[0.18em] text-mute">
                  Step {step + 1} of {TOTAL_STEPS}
                </span>
              </div>
              <div className="h-1 w-full rounded-full bg-hairline overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500 ease-out", accent.solid)}
                  style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: PREMIUM_EASE }}
              >
                <h3 className="display text-2xl md:text-[1.75rem] text-ink leading-tight mb-2">
                  {STEP_COPY[step].title}
                </h3>
                <p className="text-sm text-mute mb-6 min-h-[1.25rem]">
                  {STEP_COPY[step].sub ?? ""}
                </p>

                {step === 0 && (
                  <OptionList
                    options={BUDGET_OPTIONS}
                    selected={answers.budget}
                    onSelect={(v) => selectAnswer("budget", v)}
                    accentSolid={accent.solid}
                  />
                )}
                {step === 1 && (
                  <OptionList
                    options={AUTHORITY_OPTIONS}
                    selected={answers.authority}
                    onSelect={(v) => selectAnswer("authority", v)}
                    accentSolid={accent.solid}
                  />
                )}
                {step === 2 && (
                  <OptionList
                    options={NEED_OPTIONS}
                    selected={answers.need}
                    onSelect={(v) => selectAnswer("need", v)}
                    accentSolid={accent.solid}
                  />
                )}
                {step === 3 && (
                  <OptionList
                    options={TIMING_OPTIONS}
                    selected={answers.timing}
                    onSelect={(v) => selectAnswer("timing", v)}
                    accentSolid={accent.solid}
                  />
                )}
                {step === 4 && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
                    />

                    <TextField label="Name" name="name" placeholder="Your name" required error={fieldErrors.name} />
                    <TextField label="Email" name="email" type="email" placeholder="you@brand.com" required error={fieldErrors.email} />
                    <TextField label="Phone (optional)" name="phone" type="tel" placeholder="+1 555 000 1234" error={fieldErrors.phone} />

                    {errorMsg && (
                      <div
                        className="flex items-start gap-3 rounded-2xl border bg-copper/[0.08] px-4 py-3 text-sm text-ink"
                        style={{ borderColor: "color-mix(in oklab, var(--copper) 40%, transparent)" }}
                      >
                        <AlertTriangle className="h-4 w-4 text-copper shrink-0 mt-0.5" strokeWidth={2.2} />
                        <p>{errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-canvas text-[0.95rem] font-medium shadow-[0_8px_24px_-8px_rgba(15,17,21,0.4)] hover:bg-ink-soft transition-all disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-canvas/30 border-t-canvas animate-spin" />
                          Checking availability…
                        </>
                      ) : (
                        <>
                          Show me available times
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="booking"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: PREMIUM_EASE }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-emerald/10 grid place-items-center shrink-0">
                <Check className="h-5 w-5 text-emerald" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-lg font-semibold text-ink">
                  You&apos;re qualified. Pick a time.
                </p>
                <p className="text-sm text-mute">
                  {saveOk
                    ? "We've emailed you this link too, in case you'd rather choose later."
                    : "Pick a time below. That's all we need to lock it in."}
                </p>
              </div>
            </div>

            <CalEmbed />
          </motion.div>
        )}
      </AnimatePresence>
    </CardSpotlight>
  );
}

function OptionList({
  options,
  selected,
  onSelect,
  accentSolid,
}: {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
  accentSolid: string;
}) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSelect(opt.value)}
          className={cn(
            "w-full text-left rounded-2xl border p-4 md:p-5 transition-all",
            selected === opt.value
              ? cn("border-transparent", accentSolid)
              : "border-hairline bg-canvas text-ink hover:border-ink/40"
          )}
        >
          <p className="text-sm md:text-base font-semibold">{opt.label}</p>
        </button>
      ))}
    </div>
  );
}

function CalEmbed() {
  const configured = calIsConfigured();
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!configured) {
      console.warn(
        "[funnel] NEXT_PUBLIC_CAL_LINK is not set, so the Cal.com embed is disabled."
      );
      return;
    }
    const id = setTimeout(() => setTimedOut(true), 8000);
    return () => clearTimeout(id);
  }, [configured]);

  if (!configured) {
    return (
      <div className="rounded-2xl border border-hairline-strong bg-canvas-2 p-8 text-center">
        <p className="text-ink font-medium mb-2">
          Our online calendar is being connected.
        </p>
        <p className="text-sm text-ink-soft mb-6 max-w-md mx-auto leading-relaxed">
          Your answers are already with us. Send us a line and we&apos;ll come back
          with a couple of times that suit you, usually within the hour.
        </p>
        <a
          href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Consultation booking")}`}
          className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 text-[0.95rem] font-medium hover:bg-ink-soft transition-colors"
        >
          <Mail className="h-4 w-4" strokeWidth={2} />
          Email {site.contact.email}
        </a>
      </div>
    );
  }

  const failed = timedOut && !loaded;

  return (
    <>
      <div className="relative rounded-2xl border border-hairline-strong overflow-hidden h-[560px] md:h-[700px] bg-canvas">
        <iframe
          src={calEmbedUrl()}
          title="Book a consultation"
          className="w-full h-full"
          frameBorder={0}
          onLoad={() => setLoaded(true)}
          allow="camera; microphone; fullscreen; payment"
        />
        {!loaded && !failed && (
          <div className="absolute inset-0 grid place-items-center bg-canvas pointer-events-none">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mute">
              Loading available times…
            </span>
          </div>
        )}
      </div>

      {failed ? (
        <div
          className="mt-4 rounded-2xl border bg-copper/5 p-5 text-center"
          style={{ borderColor: "color-mix(in oklab, var(--copper) 40%, transparent)" }}
        >
          <p className="text-sm text-ink mb-4">
            The calendar didn&apos;t load. A browser extension or privacy setting
            may be blocking it.
          </p>
          <a
            href={calBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3 text-[0.95rem] font-medium hover:bg-ink-soft transition-colors"
          >
            Open the booking page
            <ExternalLink className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      ) : (
        <p className="mt-4 text-sm text-mute">
          Calendar not loading?{" "}
          <a
            href={calBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline underline-offset-4 hover:text-copper transition-colors"
          >
            Open the booking page in a new tab
          </a>
          .
        </p>
      )}
    </>
  );
}

function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute mb-2 block">
        {label}
        {required && <span className="text-copper ml-1">*</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        className={cn(
          "w-full rounded-2xl border bg-canvas-2 px-4 py-3 text-ink placeholder:text-mute focus:bg-canvas focus:outline-none transition-colors",
          error ? "border-copper focus:border-copper" : "border-hairline focus:border-electric"
        )}
      />
      {error && <span className="mt-1.5 block text-sm text-copper">{error}</span>}
    </label>
  );
}
