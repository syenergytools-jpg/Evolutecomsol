"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Check, AlertTriangle } from "lucide-react";
import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import { BUDGETS, site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ *
 * Placeholder — swap for the real Calendly event link. Query params
 * are Calendly's documented inline-embed contract (embed_domain +
 * embed_type=Inline); without them the widget can render squashed.
 * ------------------------------------------------------------------ */
const CALENDLY_URL = "https://calendly.com/evolut-team/consultation";

type Option = { value: string; label: string };

const BUDGET_OPTIONS: Option[] = BUDGETS.map((b) => ({ value: b, label: b }));

const AUTHORITY_OPTIONS: Option[] = [
  { value: "solo", label: "Just me — I decide" },
  { value: "partner", label: "Me and a partner or co-founder" },
  { value: "team", label: "A team or board needs to weigh in" },
];

const NEED_OPTIONS: Option[] = [
  { value: "sourcing", label: "Sourcing & manufacturing is a mess" },
  { value: "listings", label: "Listings & content aren't converting" },
  { value: "ads", label: "Ads are burning budget with no real ROAS" },
  { value: "brand", label: "No trademark or brand protection yet" },
  { value: "exploring", label: "Just exploring — nothing urgent yet" },
];

const TIMING_OPTIONS: Option[] = [
  { value: "now", label: "Immediately — this month" },
  { value: "soon", label: "Within the next 90 days" },
  { value: "later", label: "Just researching for later" },
];

const STEP_COPY: { title: string; sub?: string }[] = [
  { title: "What's your monthly budget for growth right now?", sub: "Ballpark is fine — this just helps us tailor the call." },
  { title: "Who else needs to sign off before you move forward?" },
  { title: "What's costing you the most right now?" },
  { title: "When do you want to get started?" },
  { title: "Almost there — where should we send the confirmation?", sub: "No spam. No hard pitch. Just a plan." },
];

const TOTAL_STEPS = STEP_COPY.length;

function labelFor(options: Option[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

type Answers = { budget: string; authority: string; need: string; timing: string };

export function ConsultationForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    budget: "",
    authority: "",
    need: "",
    timing: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function selectAnswer(key: keyof Answers, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    // Small beat before advancing so the selection is visibly registered.
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

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      service: "general-consultation",
      reason: "consultation-funnel",
      budget: answers.budget,
      message: [
        `Decision authority: ${labelFor(AUTHORITY_OPTIONS, answers.authority)}`,
        `Biggest bottleneck: ${labelFor(NEED_OPTIONS, answers.need)}`,
        `Timing: ${labelFor(TIMING_OPTIONS, answers.timing)}`,
      ].join("\n"),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.error ?? `Something went wrong (HTTP ${res.status}). Please try again.`);
        setLoading(false);
        return;
      }

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

  const embedDomain = new URL(site.url).hostname;
  const calendlyEmbedUrl = `${CALENDLY_URL}?embed_domain=${embedDomain}&embed_type=Inline&hide_gdpr_banner=1`;

  return (
    <CardSpotlight className="p-7 md:p-10">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="stepper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* progress row */}
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
                  className="h-full bg-ink rounded-full transition-all duration-500 ease-out"
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
                  />
                )}
                {step === 1 && (
                  <OptionList
                    options={AUTHORITY_OPTIONS}
                    selected={answers.authority}
                    onSelect={(v) => selectAnswer("authority", v)}
                  />
                )}
                {step === 2 && (
                  <OptionList
                    options={NEED_OPTIONS}
                    selected={answers.need}
                    onSelect={(v) => selectAnswer("need", v)}
                  />
                )}
                {step === 3 && (
                  <OptionList
                    options={TIMING_OPTIONS}
                    selected={answers.timing}
                    onSelect={(v) => selectAnswer("timing", v)}
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

                    <TextField label="Name" name="name" placeholder="Your name" required />
                    <TextField label="Email" name="email" type="email" placeholder="you@brand.com" required />
                    <TextField label="Phone (optional)" name="phone" type="tel" placeholder="+1 555 000 1234" />

                    {errorMsg && (
                      <div className="flex items-start gap-3 rounded-2xl border border-copper/40 bg-copper/[0.08] px-4 py-3 text-sm text-ink">
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
            key="calendly"
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
                  You&apos;re qualified — pick a time.
                </p>
                <p className="text-sm text-mute">
                  A confirmation is on its way to your inbox.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-hairline-strong overflow-hidden h-[560px] md:h-[700px]">
              <iframe
                src={calendlyEmbedUrl}
                title="Book a consultation"
                className="w-full h-full"
                frameBorder={0}
              />
            </div>
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
}: {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
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
              ? "border-ink bg-ink text-canvas"
              : "border-hairline bg-canvas text-ink hover:border-ink/40"
          )}
        >
          <p className="text-sm md:text-base font-semibold">{opt.label}</p>
        </button>
      ))}
    </div>
  );
}

function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
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
        className="w-full rounded-2xl border border-hairline bg-canvas-2 px-4 py-3 text-ink placeholder:text-mute focus:bg-canvas focus:border-electric focus:outline-none transition-colors"
      />
    </label>
  );
}
