import { LogoMarquee } from "@/components/ui/logo-marquee";

/**
 * TrustedBy — endless logo marquee of platforms / tools we operate
 * inside. Uses real SVG marks from /public/logos/. Falls back to
 * grayscale by default with full color on hover.
 */

const PARTNER_LOGOS = [
  { src: "/logos/React.svg", alt: "React" },
  { src: "/logos/nextjs-icon.svg", alt: "Next.js" },
  { src: "/logos/node-js-svgrepo-com.svg", alt: "Node.js" },
  { src: "/logos/express-svgrepo-com.svg", alt: "Express" },
  { src: "/logos/mongodb.svg", alt: "MongoDB" },
  { src: "/logos/hydrogen.svg", alt: "Shopify Hydrogen" },
  { src: "/logos/stripe-svgrepo-com.svg", alt: "Stripe" },
  { src: "/logos/paypal-3-svgrepo-com.svg", alt: "PayPal" },
  { src: "/logos/hubspot.svg", alt: "HubSpot" },
  { src: "/logos/saleforce.svg", alt: "Salesforce" },
  { src: "/logos/mailchimp-svgrepo-com.svg", alt: "Mailchimp" },
];

export function TrustedBy() {
  return (
    <section className="relative bg-canvas border-y border-hairline py-10 md:py-12">
      <div className="container-x mb-5">
        <p className="eyebrow text-center mb-1">
          Operating across the platforms that matter
        </p>
      </div>
      <LogoMarquee logos={PARTNER_LOGOS} duration={48} />
    </section>
  );
}
