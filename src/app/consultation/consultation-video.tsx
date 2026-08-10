import { Reveal } from "@/components/ui/reveal";

/**
 * ConsultationVideo — section 2. The proof-of-work beat, split out of
 * the hero so the hero's CTA sits directly under the promise instead of
 * behind a video. Anyone who needs convincing scrolls one section; the
 * platform badges close the section so the video lands on evidence.
 *
 * Served from youtube-nocookie.com rather than youtube.com: same
 * player, but YouTube doesn't set tracking cookies until the visitor
 * actually presses play. No reason to hand a cold ad visitor's browser
 * a tracking cookie for a video they may never watch.
 *
 * Real platforms the team operates on daily — a short list rather than
 * every logo in site-config, and kept distinct from the stats in the
 * marquee below so the two rows complement rather than repeat.
 */
const YOUTUBE_ID = "SB26MowGMDM";

const PLATFORMS = ["Amazon", "Shopify", "Walmart", "TikTok Shop", "Meta", "Google"];

const EMBED_PARAMS = new URLSearchParams({
  rel: "0", // keep end-screen suggestions inside our channel
  modestbranding: "1",
  playsinline: "1",
});

export function ConsultationVideo() {
  return (
    <section id="how-it-works" className="relative bg-canvas-2 py-16 md:py-24 scroll-mt-20">
      <div className="container-x">
        {/* explicit radius, not rounded-2xl — this project overrides the
            Tailwind radius scale (--radius-2xl is 40px here) */}
        <div className="relative max-w-6xl mx-auto aspect-video rounded-[0.875rem] overflow-hidden bg-obsidian-soft">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?${EMBED_PARAMS}`}
            title="How Evolut runs the whole ecommerce stack"
            className="absolute inset-0 h-full w-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* trust badges — real platforms, no invented awards or logos */}
        <Reveal delay={0.15}>
          <div className="mt-12 md:mt-14 max-w-4xl mx-auto">
            <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mute mb-5">
              Operating daily across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {PLATFORMS.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-hairline-strong bg-canvas/70 backdrop-blur px-4 py-1.5 text-sm text-ink-soft"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
