"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, Check, Sparkles, AlertTriangle, ArrowDown } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import { Reveal } from "@/components/ui/reveal";
import { site, contactReasons, services } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const BUDGETS = [
  "Not sure yet",
  "<$2K / month",
  "$2K – $5K / month",
  "$5K – $15K / month",
  "$15K+ / month",
  "One-time project",
] as const;

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />

        <Suspense fallback={<div className="py-32" />}>
          <ContactBody />
        </Suspense>

        <FAQTeaser />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * ContactHero — light, energetic, action-oriented hero. Replaces the
 * generic dark PageHero so /contact reads distinctly from /about and
 * /insights. Two-column: copy + channel chips on the left, mock
 * brief-receipt card on the right.
 * ------------------------------------------------------------------ */
function ContactHero() {
  const phoneDigits = site.contact.phone.replace(/[^0-9]/g, "");
  return (
    <section className="relative bg-canvas-2 pt-28 md:pt-36 pb-20 md:pb-24 border-b border-hairline overflow-hidden">
      {/* Soft paper grid + corner glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[26rem] h-[26rem] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,112,74,0.10) 0%, transparent 70%)",
          filter: "blur(36px)",
        }}
      />

      <div className="container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-7 rounded-full border border-hairline-strong bg-canvas px-3 py-1.5">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald animate-ping opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
                </span>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink">
                  Available now · &lt; 48h reply
                </p>
              </div>
            </Reveal>

            <h1 className="display text-[clamp(2.5rem,6vw,5.25rem)] text-ink leading-[1.02] mb-6">
              Brief us in five
              <br />
              <span className="italic font-normal text-copper">minutes flat.</span>
            </h1>

            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-xl mb-9">
                Pick the channel you actually use — email, phone, WhatsApp, or
                the form below. Every brief lands with a real operator within
                an hour during studio hours, and inside 24h overnight.
              </p>
            </Reveal>

            {/* Quick channel chips — instant action without scrolling */}
            <Reveal delay={0.35}>
              <div className="flex flex-wrap gap-2">
                <ChannelChip
                  href={`mailto:${site.contact.email}`}
                  Icon={Mail}
                  label="Email"
                  value={site.contact.email}
                />
                <ChannelChip
                  href={`https://wa.me/${phoneDigits}`}
                  Icon={MessageCircle}
                  label="WhatsApp"
                  value={site.contact.phone}
                  emphasize
                  external
                />
                <ChannelChip
                  href={`tel:${phoneDigits}`}
                  Icon={Phone}
                  label="Phone"
                  value={site.contact.phone}
                />
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <a
                href="#brief"
                className="mt-10 inline-flex items-center gap-2 text-sm text-mute hover:text-ink transition-colors group"
              >
                <span className="font-mono uppercase tracking-[0.18em] text-[0.65rem]">
                  Or scroll to the brief form
                </span>
                <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.2} />
              </a>
            </Reveal>
          </div>

          {/* RIGHT — receipt-style brief card mockup */}
          <Reveal delay={0.4} className="lg:col-span-5">
            <div className="relative">
              {/* Stamped corner */}
              <div className="absolute -top-3 -right-3 z-10 rotate-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald text-canvas font-mono text-[0.6rem] uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
                  <Check className="h-3 w-3" strokeWidth={2.6} />
                  Will reply
                </span>
              </div>

              <div className="rounded-[1.5rem] border border-hairline-strong bg-canvas shadow-[0_30px_70px_-30px_rgba(15,17,21,0.22)] overflow-hidden">
                {/* Header strip */}
                <div className="flex items-center justify-between bg-ink text-canvas px-5 py-3">
                  <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em]">
                    <Sparkles className="h-3 w-3 text-copper-soft" />
                    Brief receipt · sample
                  </div>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-canvas/55">
                    #04 / 26
                  </span>
                </div>

                {/* Body — fake-form preview */}
                <div className="p-5 md:p-6 space-y-4">
                  <ReceiptRow label="From" value="Sarah K., Founder" />
                  <ReceiptRow label="Brand" value="DTC Outdoor Co." />
                  <ReceiptRow label="Service" value="Amazon · Sourcing" />
                  <ReceiptRow label="Budget" value="$5K – $15K / mo" />
                  <div className="rounded-xl border border-hairline bg-canvas-2 p-4">
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute mb-2">
                      What they want to build
                    </p>
                    <p className="text-sm text-ink-soft leading-[1.55]">
                      &ldquo;Re-architecting the catalog and PPC for Q3 launch — looking
                      for an operator team, not an agency-of-record.&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-hairline">
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute">
                      Routed to
                    </span>
                    <span className="text-xs font-semibold text-ink">
                      ZK · Head of Amazon
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 bg-canvas-2 border-t border-hairline flex items-center justify-between">
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute">
                    Avg first reply
                  </span>
                  <span className="font-mono text-[0.65rem] text-emerald font-semibold">
                    47 min
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChannelChip({
  href,
  Icon,
  label,
  value,
  emphasize = false,
  external = false,
}: {
  href: string;
  Icon: typeof Mail;
  label: string;
  value: string;
  emphasize?: boolean;
  external?: boolean;
}) {
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      {...linkProps}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 transition-all hover:-translate-y-0.5",
        emphasize
          ? "bg-emerald text-canvas hover:bg-emerald/90 shadow-[0_10px_24px_-10px_rgba(16,185,129,0.55)]"
          : "bg-canvas border border-hairline-strong text-ink hover:border-ink"
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
      <span className="text-sm font-medium">{label}</span>
      <span
        className={cn(
          "font-mono text-[0.65rem] hidden sm:inline-block",
          emphasize ? "text-canvas/80" : "text-mute"
        )}
      >
        {value}
      </span>
    </a>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-hairline pb-3 last:border-b-0 last:pb-0">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute">
        {label}
      </span>
      <span className="text-sm font-medium text-ink">{value}</span>
    </div>
  );
}

function ContactBody() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") ?? "";
  const initialReason = searchParams.get("reason") ?? contactReasons[0].value;

  const [reason, setReason] = useState<string>(initialReason);
  const [service, setService] = useState<string>(initialService);
  const [budget, setBudget] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Sync state when query params change (e.g. user navigates between services)
  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      service,
      reason,
      budget,
      message: String(fd.get("message") ?? "").trim(),
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
        if (json.issues && Array.isArray(json.issues)) {
          const map: Record<string, string> = {};
          for (const i of json.issues) map[i.path] = i.message;
          setFieldErrors(map);
          setErrorMsg(json.error ?? "Please fix the issues above.");
        } else {
          setErrorMsg(json.error ?? `Submission failed (HTTP ${res.status})`);
        }
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

  const selectedServiceLabel =
    services.find((s) => s.slug === service)?.title ?? null;

  return (
    <section id="brief" className="relative bg-canvas py-24 md:py-32 scroll-mt-24">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT — channels */}
        <aside className="lg:col-span-5 space-y-4">
          <Reveal>
            <p className="eyebrow eyebrow-line mb-4">Reach us at</p>
          </Reveal>
          {[
            { Icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
            { Icon: Phone, label: "Phone", value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s+/g, "")}` },
            { Icon: MessageCircle, label: "WhatsApp", value: "Same number, instant reply", href: `https://wa.me/${site.contact.phone.replace(/[^0-9]/g, "")}` },
            { Icon: MapPin, label: "Studio", value: site.contact.address, href: undefined as string | undefined },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              {(() => {
                const Wrapper = c.href
                  ? ((p: { children: React.ReactNode }) => (
                      <a href={c.href} className="block">
                        {p.children}
                      </a>
                    ))
                  : ((p: { children: React.ReactNode }) => <div>{p.children}</div>);
                return (
                  <Wrapper>
                    <CardSpotlight className="p-5 flex items-center gap-4 hover:border-electric/30 transition-colors">
                      <div className="conic-chrome h-11 w-11 rounded-full p-[2px] shrink-0">
                        <span className="block h-full w-full rounded-full bg-canvas grid place-items-center">
                          <c.Icon className="h-4 w-4 text-ink" strokeWidth={2.2} />
                        </span>
                      </div>
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute">{c.label}</p>
                        <p className="text-sm font-semibold text-ink mt-1 break-all">{c.value}</p>
                      </div>
                    </CardSpotlight>
                  </Wrapper>
                );
              })()}
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <div className="rounded-3xl bg-obsidian text-canvas p-7 mt-8">
              <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-canvas/20 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-copper" />
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-canvas/80">
                  Available 24/7
                </span>
              </div>
              <p className="text-base md:text-lg leading-relaxed">
                Email, phone, WhatsApp, or live chat — pick the channel that suits you. Time zones are not your problem to solve.
              </p>
            </div>
          </Reveal>
        </aside>

        {/* RIGHT — form */}
        <div className="lg:col-span-7">
          <CardSpotlight className="p-7 md:p-10">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  {/* Service context — shown if pre-filled from query param */}
                  {selectedServiceLabel && (
                    <div className="rounded-2xl border border-electric/30 bg-electric/[0.06] px-4 py-3 flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-electric shrink-0" />
                      <p className="text-sm text-ink">
                        Briefing about{" "}
                        <span className="font-semibold">{selectedServiceLabel}</span>.
                        We&rsquo;ll route this to the right operator.
                      </p>
                    </div>
                  )}

                  {/* Honeypot — must stay empty */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute mb-3">
                      What brings you here?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {contactReasons.map((r) => (
                        <button
                          type="button"
                          key={r.value}
                          onClick={() => setReason(r.value)}
                          className={cn(
                            "text-left rounded-2xl border p-4 transition-all",
                            reason === r.value
                              ? "border-ink bg-ink text-canvas"
                              : "border-hairline bg-canvas-2 text-ink hover:border-ink/40"
                          )}
                        >
                          <p className="text-sm font-semibold">{r.label}</p>
                          <p className={cn("text-xs mt-1", reason === r.value ? "text-canvas/70" : "text-mute")}>
                            {r.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      label="Name"
                      name="name"
                      placeholder="Your name"
                      required
                      error={fieldErrors.name}
                    />
                    <Field
                      label="Brand"
                      name="company"
                      placeholder="Brand or company"
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@brand.com"
                      required
                      error={fieldErrors.email}
                    />
                    <Field
                      label="Phone (optional)"
                      name="phone"
                      type="tel"
                      placeholder="+1 555 000 1234"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Which service?"
                      value={service}
                      onChange={setService}
                      options={[
                        { value: "", label: "I'm not sure yet" },
                        ...services.map((s) => ({ value: s.slug, label: s.title })),
                      ]}
                    />
                    <SelectField
                      label="Budget"
                      value={budget}
                      onChange={setBudget}
                      options={[
                        { value: "", label: "Pick a range" },
                        ...BUDGETS.map((b) => ({ value: b, label: b })),
                      ]}
                    />
                  </div>

                  <Field
                    label="What do you want to build?"
                    name="message"
                    placeholder="A short note works — we'll reply within a business day."
                    textarea
                    required
                    error={fieldErrors.message}
                  />

                  {errorMsg && (
                    <div className="flex items-start gap-3 rounded-2xl border border-copper/40 bg-copper/[0.08] px-4 py-3 text-sm text-ink">
                      <AlertTriangle className="h-4 w-4 text-copper shrink-0 mt-0.5" strokeWidth={2.2} />
                      <p>{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-canvas text-[0.95rem] font-medium shadow-[0_8px_24px_-8px_rgba(15,17,21,0.4)] hover:bg-ink-soft transition-all disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-canvas/30 border-t-canvas animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send brief
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-mute mt-2">
                    We don&apos;t pitch — we propose. Audit, scope, and delivery, in that order.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                  className="py-16 text-center"
                >
                  <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-emerald/10 grid place-items-center">
                    <Check className="h-7 w-7 text-emerald" strokeWidth={2.5} />
                  </div>
                  <h3 className="display text-3xl text-ink mb-3">Brief received.</h3>
                  <p className="text-mute max-w-md mx-auto">
                    Check your inbox for a confirmation. We&apos;ll reply within a business day. If
                    it&apos;s urgent, ping us on WhatsApp at {site.contact.phone}.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
  textarea,
  error,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute mb-2 block">
        {label}
        {required && <span className="text-copper ml-1">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            "w-full rounded-2xl border bg-canvas-2 px-4 py-3 text-ink placeholder:text-mute focus:bg-canvas focus:outline-none transition-colors resize-y",
            error ? "border-copper focus:border-copper" : "border-hairline focus:border-electric"
          )}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            "w-full rounded-2xl border bg-canvas-2 px-4 py-3 text-ink placeholder:text-mute focus:bg-canvas focus:outline-none transition-colors",
            error ? "border-copper focus:border-copper" : "border-hairline focus:border-electric"
          )}
        />
      )}
      {error && (
        <span className="block mt-1.5 text-xs text-copper">{error}</span>
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-mute mb-2 block">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-hairline bg-canvas-2 px-4 py-3 text-ink focus:bg-canvas focus:border-electric focus:outline-none transition-colors appearance-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function FAQTeaser() {
  return (
    <section className="relative bg-canvas-2 py-20">
      <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Reveal>
            <p className="eyebrow eyebrow-line mb-5">Common first questions</p>
          </Reveal>
          <h2 className="display text-[clamp(1.75rem,3.5vw,2.75rem)] text-ink leading-[1.05]">
            What we&apos;ll likely cover on the first call.
          </h2>
        </div>
        <ul className="space-y-3">
          {[
            "Where are you in the catalog lifecycle?",
            "What's holding back compounding right now?",
            "What's the margin profile and runway?",
            "Which channels are priority — and why?",
            "Who are the operators on your side?",
          ].map((q) => (
            <li key={q} className="flex items-start gap-3 rounded-2xl border border-hairline bg-canvas px-5 py-4">
              <span className="mt-1 h-2 w-2 rounded-full bg-electric shrink-0" />
              <span className="text-ink-soft">{q}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
