import type { Metadata } from "next";
import { ConsultationHeader } from "./consultation-header";
import { ConsultationHero } from "./consultation-hero";
import { ConsultationVideo } from "./consultation-video";
import { ConsultationMarquee } from "./consultation-marquee";
import { ConsultationServices } from "./consultation-services";
import { ConsultationWhyUs } from "./consultation-why-us";
import { ConsultationProjects } from "./consultation-projects";
import { ConsultationTestimonials } from "./consultation-testimonials";
import { ConsultationQualifyCta } from "./consultation-qualify-cta";
import { ConsultationFooter } from "./consultation-footer";
import { BookingModalProvider } from "./consultation-booking-modal";
import { ConsultationOnboardingModal } from "./consultation-onboarding-modal";
import { site } from "@/lib/site-config";

/**
 * /consultation — standalone paid-ad landing page.
 *
 * Deliberately NOT in `navItems` and NOT listed in `sitemap.ts` — this
 * page exists only for ad traffic, not organic discovery. `robots:
 * {index:false}` below keeps it out of search entirely. Kept as a
 * Server Component (no "use client") specifically so it can export
 * `metadata` directly, same pattern as `src/app/about/page.tsx` and
 * `src/app/work/page.tsx` — the interactive pieces (video player,
 * qualifier form) are client components rendered as children.
 */
export const metadata: Metadata = {
  title: "Free Ecommerce Growth Consultation",
  description:
    "Book a free 30-minute consultation with Evolut Ecommerce Solutions. Sourcing, listings, photography, ads, freight, and trademark, run by one accountable team.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/consultation" },
  openGraph: {
    title: "Free Ecommerce Growth Consultation | Evolut Ecommerce Solutions",
    description:
      "Sourcing, listings, photography, ads, freight, and trademark, run by one accountable team. Book a free consultation.",
    url: `${site.url}/consultation`,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Evolut Ecommerce Solutions",
        type: "image/jpeg",
      },
    ],
  },
};

export default function ConsultationPage() {
  return (
    <BookingModalProvider>
      <ConsultationHeader />
      <main>
        <ConsultationHero />
        <ConsultationVideo />
        <ConsultationServices />
        <ConsultationWhyUs />
        <ConsultationProjects />
        <ConsultationTestimonials />
        <ConsultationQualifyCta />
      </main>
      <ConsultationFooter />
      <ConsultationOnboardingModal />
    </BookingModalProvider>
  );
}
