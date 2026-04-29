import Link from "next/link";
import { Mail, ArrowUpRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site-config";

/* ------------------------------------------------------------------ *
 * PolicyPage
 *
 * Shared layout for legal / policy pages (privacy, terms, etc.).
 * Distinct from PageHero — uses a quiet light hero so the document
 * feels formal, then renders structured sections.
 *
 * `sections`: each one becomes a numbered section in the body with
 * its own anchor for deep-linking from the TOC.
 * ------------------------------------------------------------------ */

export type PolicySection = {
  id: string;
  title: string;
  /** Each entry is a paragraph (string) or bullet list (string[]). */
  body: (string | string[])[];
};

export function PolicyPage({
  kicker,
  title,
  intro,
  effectiveDate,
  sections,
  contactNote,
}: {
  kicker: string;
  title: string;
  intro: string;
  effectiveDate: string;
  sections: PolicySection[];
  contactNote?: string;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        {/* Quiet legal hero */}
        <section className="relative bg-canvas pt-28 md:pt-36 pb-16 md:pb-20 border-b border-hairline overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 paper-grid opacity-20 pointer-events-none"
          />
          <div className="container-x relative">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-electric mb-5">
              {kicker}
            </p>
            <h1 className="display text-[clamp(2.25rem,5vw,4.25rem)] text-ink leading-[1.04] mb-7 max-w-3xl">
              {title}
            </h1>
            <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-2xl mb-8">
              {intro}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline-strong bg-canvas-2 px-3 py-1.5">
              <Calendar className="h-3 w-3 text-mute" strokeWidth={2.2} />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute">
                Effective {effectiveDate}
              </span>
            </div>
          </div>
        </section>

        {/* Body — TOC sidebar + sections */}
        <section className="relative bg-canvas py-16 md:py-24">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* TOC sidebar */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute mb-4">
                  Contents
                </p>
                <ol className="space-y-2">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-baseline gap-2.5 text-sm text-ink-soft hover:text-ink transition-colors"
                      >
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-mute shrink-0 w-6 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-snug">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 pt-6 border-t border-hairline">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute mb-3">
                    Questions?
                  </p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex items-center gap-2 text-sm text-ink hover:text-electric transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={2.2} />
                    {site.contact.email}
                  </a>
                </div>
              </div>
            </aside>

            {/* Body sections */}
            <article className="lg:col-span-9 lg:pl-4">
              <Reveal>
                <div className="space-y-12 md:space-y-14">
                  {sections.map((section, i) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24"
                    >
                      <div className="flex items-baseline gap-3 mb-5">
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-copper tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="display text-[clamp(1.5rem,2.6vw,2rem)] text-ink leading-[1.15]">
                          {section.title}
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {section.body.map((block, j) =>
                          Array.isArray(block) ? (
                            <ul
                              key={j}
                              className="space-y-2.5 pl-5 list-disc marker:text-copper"
                            >
                              {block.map((item, k) => (
                                <li
                                  key={k}
                                  className="text-[0.95rem] md:text-base text-ink-soft leading-[1.7]"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p
                              key={j}
                              className="text-[0.95rem] md:text-base text-ink-soft leading-[1.7]"
                            >
                              {block}
                            </p>
                          )
                        )}
                      </div>
                    </section>
                  ))}
                </div>

                {contactNote && (
                  <div className="mt-16 rounded-2xl border border-hairline-strong bg-canvas-2/60 p-6 md:p-7">
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mute mb-2">
                      Contact
                    </p>
                    <p className="text-ink-soft leading-[1.65] mb-4">
                      {contactNote}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric hover:underline"
                    >
                      Open the contact form
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </Link>
                  </div>
                )}
              </Reveal>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
