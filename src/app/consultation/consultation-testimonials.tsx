import Image from "next/image";
import { Play, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/site-config";

/**
 * ConsultationTestimonials — page-specific, video-card wall. Portraits
 * are the same assets the homepage carousel uses; the "highlight" line
 * is pulled verbatim from each person's own quote (not a new claim).
 *
 * No real testimonial video files exist yet — these are styled as
 * video cards (thumbnail + play affordance) so the section is ready to
 * wire up the moment real clips land; the play button is decorative
 * until then, not a broken control pretending to work.
 */
const HIGHLIGHTS: Record<string, string> = {
  "Sarah K.": "4× revenue in 11 months",
  "Marcus T.": "+38% conversion overnight",
  "Priya R.": "Fired 3 agencies for us",
  "James L.": "Zero downtime migration",
  "Olivia D.": "22% cheaper sourcing",
};

export function ConsultationTestimonials() {
  return (
    <section id="testimonials" className="relative bg-obsidian text-canvas py-28 md:py-36 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[32rem] h-[32rem] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,112,74,0.16) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container-x relative z-10">
        <SectionHeader
          invert
          align="center"
          eyebrow="Client voices"
          title="Hear it from them."
          size="md"
        />

        <Reveal delay={0.15}>
          <div
            className="mt-14 md:mt-16 flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:-mx-0 md:px-0 fade-edges [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map((t) => (
              <div key={t.name} className="shrink-0 snap-start w-[168px] sm:w-[200px] md:w-[220px]">
                <VideoCard
                  name={t.name}
                  role={t.role}
                  photo={t.photo}
                  highlight={HIGHLIGHTS[t.name]}
                />
              </div>
            ))}
          </div>
        </Reveal>

        <p className="mt-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.18em] text-canvas/40 md:hidden">
          ← swipe for more →
        </p>
      </div>
    </section>
  );
}

function VideoCard({
  name,
  role,
  photo,
  highlight,
}: {
  name: string;
  role: string;
  photo?: string;
  highlight?: string;
}) {
  return (
    <div className="group relative rounded-[1.25rem] overflow-hidden aspect-[4/5] bg-obsidian-soft border border-canvas/10">
      {photo && (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="220px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      )}

      {/* bottom gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/70 to-transparent pointer-events-none" />

      {/* play affordance */}
      <button
        type="button"
        aria-label={`Video testimonial from ${name} — coming soon`}
        className="absolute inset-0 grid place-items-center"
      >
        <span className="grid place-items-center h-11 w-11 md:h-12 md:w-12 rounded-full bg-canvas/90 backdrop-blur text-ink shadow-[0_16px_40px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
          <Play className="h-4 w-4 translate-x-[1px]" strokeWidth={2.2} fill="currentColor" />
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-0 p-3.5">
        {highlight && (
          <p className="flex items-start gap-1 mb-1.5 font-mono text-[0.55rem] uppercase tracking-[0.08em] leading-tight text-copper-soft">
            <Quote className="h-2.5 w-2.5 shrink-0 mt-[1px]" strokeWidth={2.5} />
            {highlight}
          </p>
        )}
        <p className="text-canvas font-semibold text-sm leading-tight truncate">{name}</p>
        <p className="text-canvas/60 text-[0.7rem] mt-0.5 truncate">{role}</p>
      </div>
    </div>
  );
}
