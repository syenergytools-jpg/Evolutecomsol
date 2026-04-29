import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, User } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { CTA } from "@/components/sections/cta";
import { Reveal } from "@/components/ui/reveal";
import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import { insights, type Insight } from "@/lib/site-config";

type Params = { slug: string };

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = insights.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        {/* Hero */}
        <section className="relative bg-obsidian text-canvas pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 0%, rgba(232,112,74,0.18) 0%, transparent 60%)",
            }}
          />

          <div className="container-x relative">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-canvas/60 hover:text-canvas mb-10 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
              All field notes
            </Link>

            <div className="max-w-3xl">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-copper-soft mb-6">
                {post.category}
              </p>
              <h1 className="display text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1.04] mb-8">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-canvas/70 leading-[1.6] max-w-2xl mb-10">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-canvas/60 text-sm">
                <Meta Icon={User} text={post.author} />
                <Meta Icon={Calendar} text={formatDate(post.publishedAt)} />
                <Meta Icon={Clock} text={`${post.readTime} read`} />
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="relative py-20 md:py-28 bg-canvas">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article body */}
            <article className="lg:col-span-8 lg:col-start-2">
              <Reveal>
                <ArticleBody body={post.body} />
              </Reveal>
            </article>

            {/* Sticky meta sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-6">
                <CardSpotlight className="p-6">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute mb-3">
                    Share
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        label: "X",
                        href: `https://x.com/intent/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://evolutecomsolutions.com/insights/${post.slug}`)}`,
                      },
                      {
                        label: "LinkedIn",
                        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://evolutecomsolutions.com/insights/${post.slug}`)}`,
                      },
                      {
                        label: "Email",
                        href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(post.excerpt)}`,
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-hairline px-3 py-1.5 text-xs text-ink hover:bg-ink hover:text-canvas transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </CardSpotlight>

                <CardSpotlight className="p-6">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute mb-2">
                    Need help?
                  </p>
                  <p className="text-sm text-ink leading-snug mb-4">
                    Want this run for your brand? We do the playbooks, not just write about them.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric hover:underline"
                  >
                    Brief us
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </Link>
                </CardSpotlight>
              </div>
            </aside>
          </div>
        </section>

        {/* Related */}
        {others.length > 0 && (
          <section className="relative bg-canvas-2 py-20 md:py-28 border-t border-hairline">
            <div className="container-x">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                  <Reveal>
                    <p className="eyebrow eyebrow-line mb-4">Keep reading</p>
                  </Reveal>
                  <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)] text-ink leading-[1.05]">
                    Other field notes.
                  </h2>
                </div>
                <Link
                  href="/insights"
                  className="text-sm text-ink-soft hover:text-electric inline-flex items-center gap-1.5"
                >
                  All articles
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {others.map((p) => (
                  <RelatedCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
}

function Meta({
  Icon,
  text,
}: {
  Icon: typeof User;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
      {text}
    </span>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* Lightweight markdown-ish renderer — supports paragraphs and ## headings.
 * Avoids pulling in a full MD library for three articles. */
function ArticleBody({ body }: { body: string }) {
  const blocks = body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="prose-evolut">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="display text-[clamp(1.5rem,2.6vw,2rem)] text-ink leading-[1.15] mt-12 mb-5 first:mt-0"
            >
              {block.replace(/^##\s+/, "")}
            </h2>
          );
        }
        return (
          <p
            key={i}
            className="text-ink-soft text-[1.05rem] md:text-[1.1rem] leading-[1.75] mb-5 last:mb-0"
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}

function RelatedCard({ post }: { post: Insight }) {
  return (
    <CardSpotlight className="p-6 h-full" radius={400}>
      <Link href={`/insights/${post.slug}`} className="group block h-full flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-electric">
            {post.category}
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-mute">
            {post.readTime}
          </span>
        </div>
        <h4 className="display text-[1.25rem] text-ink leading-tight mb-3">
          {post.title}
        </h4>
        <p className="text-sm text-mute leading-relaxed mb-5">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-xs text-ink font-mono uppercase tracking-wider group-hover:text-electric transition-colors">
          Read
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      </Link>
    </CardSpotlight>
  );
}
