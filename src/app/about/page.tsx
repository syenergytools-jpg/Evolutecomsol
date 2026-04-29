import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/ui/reveal";
import { CTA } from "@/components/sections/cta";
import { Stats } from "@/components/sections/stats";
import { philosophy, milestones, valueDeck, site } from "@/lib/site-config";
import { Timeline } from "@/components/ui/aceternity/timeline";
import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import { WorldMap } from "@/components/ui/aceternity/world-map";

export const metadata: Metadata = {
  title: "About",
  description:
    "Evolut is a full-service ecommerce team built by founders who've scaled brands past 8 figures. Studio in Jhelum, clients across 4 continents.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />

        {/* Mission + visual */}
        <section className="relative bg-canvas py-24 md:py-32">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow eyebrow-line mb-6">Mission</p>
              </Reveal>
              <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-ink mb-7 leading-[1.05]">
                Help your business succeed online
                <span className="text-ink-soft italic font-normal"> with results-driven strategies and expert execution.</span>
              </h2>
              <Reveal delay={0.15}>
                <div className="space-y-5 text-lg text-ink-soft leading-[1.65] max-w-xl">
                  <p>
                    At Evolut, we&apos;re passionate about empowering businesses to thrive in the digital world.
                    With years of experience in ecommerce, web development, branding, and digital marketing,
                    our team offers a comprehensive suite of services designed to support every aspect of your
                    online business journey.
                  </p>
                  <p>
                    Whether you&apos;re an Amazon seller, a Shopify store owner, or a business needing
                    professional web development, photography, and graphic design — solutions are tailored
                    to fit your stage, your category, and your margin profile.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-hairline shadow-[0_40px_100px_-40px_rgba(15,17,21,0.3)]">
                <Image
                  src="/images/about-studio.jpg"
                  alt="Evolut studio"
                  fill
                  sizes="(max-width: 1024px) 80vw, 480px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                <div className="absolute left-5 right-5 bottom-5 rounded-2xl bg-canvas/95 backdrop-blur p-4 flex items-center gap-3">
                  <span className="conic-chrome h-10 w-10 rounded-full p-[2px]">
                    <span className="block h-full w-full rounded-full bg-canvas grid place-items-center">
                      <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
                    </span>
                  </span>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-mute">Studio</p>
                    <p className="text-sm font-semibold text-ink">Jhelum, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <Stats />

        {/* Values */}
        <section className="relative bg-canvas-2 py-24 md:py-32">
          <div className="container-x">
            <div className="max-w-3xl mb-14">
              <Reveal>
                <p className="eyebrow eyebrow-line mb-6">How we operate</p>
              </Reveal>
              <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] text-ink leading-[1.05]">
                Four operating principles, one accountable team.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {valueDeck.map((v) => (
                <CardSpotlight key={v.n} className="h-full p-7" radius={320}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-mute mb-4">{v.n}</p>
                  <h3 className="text-[1.1rem] font-semibold text-ink mb-3">{v.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{v.body}</p>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline / Story */}
        <section className="relative bg-canvas">
          <div className="container-x pt-20 pb-4">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-5">The Evolut story</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] text-ink leading-[1.05] max-w-3xl">
              Eight years of operating, one playbook.
            </h2>
          </div>
          <Timeline
            data={milestones.map((m) => ({
              title: m.year,
              content: (
                <div className="rounded-3xl border border-hairline bg-surface p-6 md:p-8">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-electric mb-3">
                    {m.year}
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold text-ink mb-3">{m.title}</h3>
                  <p className="text-mute leading-relaxed">{m.body}</p>
                </div>
              ),
            }))}
          />
        </section>

        {/* World map — global reach */}
        <section className="relative bg-canvas py-24 md:py-32">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <Reveal>
                <p className="eyebrow eyebrow-line mb-6">Global reach</p>
              </Reveal>
              <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] text-ink leading-[1.05]">
                One studio. Four continents. 240+ brands.
              </h2>
              <p className="mt-5 text-lg text-mute max-w-xl">
                Studio operations in Jhelum, Pakistan. Clients across North America,
                Europe, the Middle East, and Australia. Available 24/7 across time zones.
              </p>
            </div>
            <WorldMap />
          </div>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="relative bg-obsidian text-canvas py-24 md:py-32">
          <div className="container-x">
            <div className="max-w-3xl mb-14">
              <Reveal>
                <p className="eyebrow eyebrow-line mb-5 text-canvas/60">Philosophy</p>
              </Reveal>
              <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] text-canvas leading-[1.05]">
                The brand is the moat. Everything else is plumbing.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {philosophy.map((p) => (
                <article key={p.n} className="rounded-3xl border border-hairline-dark bg-obsidian-soft p-7">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-canvas/50 mb-4">{p.n}</p>
                  <h3 className="text-[1.25rem] font-semibold text-canvas mb-3">{p.title}</h3>
                  <p className="text-canvas/70 leading-relaxed">{p.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * AboutHero — brand-forward, full-bleed studio image with overlay
 * copy + a brand-mark badge. Distinct from /contact (light, action)
 * and /insights (editorial light). This one feels cinematic and
 * residential.
 * ------------------------------------------------------------------ */
function AboutHero() {
  return (
    <section className="relative bg-obsidian text-canvas overflow-hidden">
      {/* Full-bleed studio backdrop */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-studio.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        {/* Gradient veil so the type stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/55 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/40 to-transparent" />
      </div>

      <div className="relative container-x pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 items-end">
          {/* LEFT — masthead */}
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-copper-soft mb-6 inline-flex items-center gap-2">
                <span className="h-px w-8 bg-copper-soft" />
                The studio · est. 2018
              </p>
            </Reveal>

            <h1 className="display text-[clamp(2.75rem,7vw,6rem)] leading-[0.96] mb-7">
              When your ideas
              <br />
              take shape,
              <br />
              <span className="italic font-normal text-canvas/65">
                we take over.
              </span>
            </h1>

            <Reveal delay={0.2}>
              <p className="text-base md:text-xl text-canvas/75 leading-[1.55] max-w-2xl">
                {site.name} is a full-service ecommerce team built by operators
                who got tired of agencies that talked. Sourcing, listings,
                photography, ads — one accountable function. Studio in Jhelum,
                clients across four continents.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/55">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3 w-3" strokeWidth={2.2} />
                  Jhelum, Pakistan
                </span>
                <span>240+ active brands</span>
                <span>4 continents</span>
                <span className="hidden md:inline">8 years operating</span>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — brand-mark badge */}
          <Reveal delay={0.4} className="lg:col-span-4">
            <div className="rounded-[1.75rem] border border-canvas/12 bg-canvas/[0.04] backdrop-blur-sm p-6 md:p-7">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative h-14 w-14 shrink-0">
                  <Image
                    src="/logo_1.png"
                    alt="Evolut"
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="display text-2xl text-canvas leading-none">
                    {site.name}
                  </p>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-canvas/55 mt-1.5">
                    Ecommerce Solutions
                  </p>
                </div>
              </div>
              <p className="text-sm text-canvas/70 leading-[1.55] mb-5">
                Built for founders who&rsquo;d rather ship than supervise. We
                run the playbook so you can run the brand.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="#philosophy"
                  className="inline-flex items-center gap-2 rounded-full bg-canvas text-ink px-4 py-2 text-sm font-medium hover:bg-canvas/90 transition-colors"
                >
                  Read the principles
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-canvas/25 px-4 py-2 text-sm text-canvas hover:bg-canvas/5 transition-colors"
                >
                  Brief us
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20 flex items-center gap-3 text-canvas/45 font-mono text-[0.6rem] uppercase tracking-[0.2em]">
          <ArrowDown className="h-3 w-3 animate-bounce" strokeWidth={2.2} />
          Scroll for the long story
        </div>
      </div>
    </section>
  );
}
