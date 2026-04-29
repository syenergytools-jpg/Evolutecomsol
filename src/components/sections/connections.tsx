"use client";

import { useRef } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { Reveal, StaggerWords } from "@/components/ui/reveal";
import { AnimatedBeam, BeamCircle } from "@/components/ui/animated-beam";

/**
 * Connections — left-to-right data flow:
 *   You (operator)  ←  Evolut (operating layer)  ←  5 platforms
 *
 * Beams flow from each platform through Evolut to the user, telling
 * the "every signal feeds one dashboard" story. Each beam has its
 * own duration + delay so the gradient sweeps don't fire in lockstep.
 */
export function Connections() {
  const containerRef = useRef<HTMLDivElement>(null);

  // The flow's three columns
  const userRef = useRef<HTMLDivElement>(null);
  const evolutRef = useRef<HTMLDivElement>(null);

  // Five platforms on the right
  const reactRef = useRef<HTMLDivElement>(null);
  const stripeRef = useRef<HTMLDivElement>(null);
  const hubspotRef = useRef<HTMLDivElement>(null);
  const mailchimpRef = useRef<HTMLDivElement>(null);
  const mongoRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative bg-canvas py-24 md:py-32 border-y border-hairline overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 paper-grid opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(232,112,74,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-end mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-line mb-6">The flow</p>
            </Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] text-ink leading-[1.04]">
              <StaggerWords text="Every signal," />{" "}
              <StaggerWords
                text="one dashboard."
                delayStart={0.18}
                wordClassName="italic font-normal text-copper"
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.25}>
              <p className="text-base md:text-lg text-ink-soft leading-[1.65] max-w-md lg:ml-auto">
                Five platforms, eight services — one operating layer
                routing every signal into the operator&apos;s view.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Beam stage */}
        <div
          ref={containerRef}
          className="relative mx-auto w-full max-w-3xl rounded-[1.75rem] border border-hairline-strong bg-surface p-8 md:p-12 lg:p-14 shadow-[0_30px_70px_-30px_rgba(15,17,21,0.18)]"
        >
          {/* Floating tag chip top-left */}
          <span className="absolute top-5 left-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/90 backdrop-blur px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-canvas">
            <span className="h-1 w-1 rounded-full bg-copper" />
            Live data flow
          </span>

          <div className="flex flex-row items-stretch justify-between gap-6 md:gap-12">
            {/* COLUMN 1 — operator (you) */}
            <div className="flex flex-col justify-center">
              <BeamCircle
                ref={userRef}
                className="h-14 w-14 md:h-16 md:w-16"
              >
                <User className="h-5 w-5 md:h-6 md:w-6 text-ink" strokeWidth={1.8} />
              </BeamCircle>
              <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute text-center">
                You
              </p>
            </div>

            {/* COLUMN 2 — Evolut hub (bigger) */}
            <div className="flex flex-col justify-center">
              <BeamCircle
                ref={evolutRef}
                className="h-20 w-20 md:h-24 md:w-24 bg-canvas border-2 border-copper/40 shadow-[0_30px_60px_-20px_rgba(232,112,74,0.45)]"
              >
                <Image
                  src="/logo_1.png"
                  alt="Evolut"
                  width={80}
                  height={80}
                  className="h-[88%] w-[88%] object-contain"
                />
              </BeamCircle>
              <p className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-copper text-center">
                Evolut · core
              </p>
            </div>

            {/* COLUMN 3 — 5 platforms stacked */}
            <div className="flex flex-col justify-center gap-3 md:gap-4">
              <BeamCircle ref={reactRef} className="h-12 w-12 p-2.5">
                <Image
                  src="/logos/React.svg"
                  alt="React"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </BeamCircle>
              <BeamCircle ref={stripeRef} className="h-12 w-12 p-2.5">
                <Image
                  src="/logos/stripe-svgrepo-com.svg"
                  alt="Stripe"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </BeamCircle>
              <BeamCircle ref={hubspotRef} className="h-12 w-12 p-2.5">
                <Image
                  src="/logos/hubspot.svg"
                  alt="HubSpot"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </BeamCircle>
              <BeamCircle ref={mailchimpRef} className="h-12 w-12 p-2.5">
                <Image
                  src="/logos/mailchimp-svgrepo-com.svg"
                  alt="Mailchimp"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </BeamCircle>
              <BeamCircle ref={mongoRef} className="h-12 w-12 p-2.5">
                <Image
                  src="/logos/mongodb.svg"
                  alt="MongoDB"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </BeamCircle>
            </div>
          </div>

          {/* Beams — platforms → Evolut */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={reactRef}
            toRef={evolutRef}
            duration={3.8}
            delay={0}
            gradientStartColor="#61DAFB"
            gradientStopColor="#0066ff"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={stripeRef}
            toRef={evolutRef}
            duration={4.2}
            delay={0.4}
            gradientStartColor="#635BFF"
            gradientStopColor="#9C8AFF"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hubspotRef}
            toRef={evolutRef}
            duration={4.6}
            delay={0.8}
            gradientStartColor="#FF7A59"
            gradientStopColor="#FFB627"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={mailchimpRef}
            toRef={evolutRef}
            duration={4}
            delay={1.2}
            gradientStartColor="#FFE01B"
            gradientStopColor="#E8704A"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={mongoRef}
            toRef={evolutRef}
            duration={4.4}
            delay={1.6}
            gradientStartColor="#10b981"
            gradientStopColor="#34d399"
          />

          {/* Beam — Evolut → user (the convergence) */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={evolutRef}
            toRef={userRef}
            duration={3.4}
            delay={0.6}
            gradientStartColor="#e8704a"
            gradientStopColor="#0a0a0b"
          />
        </div>

        {/* Caption row */}
        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-between gap-y-4 gap-x-8 text-mute">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            Five platforms · one operating layer · one operator&apos;s view
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mute/65">
            React · Stripe · HubSpot · Mailchimp · MongoDB
          </p>
        </div>
      </div>
    </section>
  );
}
