import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/sections/policy-page";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The agreement that governs how visitors use the Evolut website and how clients engage our services. Plain-English where we can be plain, formal where we have to be.",
};

const EFFECTIVE_DATE = "April 29, 2026";

const sections: PolicySection[] = [
  {
    id: "agreement",
    title: "The agreement",
    body: [
      `These Terms of Service ("Terms") govern your access to and use of the website at ${site.url} and any related pages (the "Site") operated by ${site.fullName} ("Evolut", "we", "us"). They do not, by themselves, govern any paid engagement between us and a client — those are governed by the separate Master Services Agreement ("MSA") and the relevant Statement of Work ("SOW") that we sign with each client.`,
      "By browsing the Site, submitting the contact form, or using any feature here, you agree to these Terms. If you do not agree, please do not use the Site.",
    ],
  },
  {
    id: "what-we-publish",
    title: "What we publish here",
    body: [
      "The Site is a marketing and information surface. The case studies, statistics, articles, and methodology descriptions reflect the work we have done for our clients in good faith, but specific results vary by brand, category, and execution. Past performance is not a guarantee of future outcomes.",
      "We update the Site regularly. We do not commit to keeping any specific page, article, or asset live forever, and we may change or remove anything at any time without notice.",
    ],
  },
  {
    id: "permitted-use",
    title: "Permitted use of the Site",
    body: [
      "You may browse, read, link to, and reference the Site in the ordinary course of evaluating Evolut as a service provider. You may share article links freely.",
      "You may not:",
      [
        "Scrape the Site at scale, except via the rate limits and methods our robots.txt permits.",
        "Reproduce or republish substantial copy or imagery from the Site without our prior written consent.",
        "Use any of our copy, illustrations, or trademarks in a way that suggests endorsement, partnership, or affiliation that does not exist.",
        "Reverse engineer, probe, or attack the Site's infrastructure, including the contact API or admin endpoints.",
        "Submit false, misleading, or impersonating information through the contact form.",
      ],
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      "All copy, layouts, illustrations, photography, code, logos, and trade dress on the Site are the property of Evolut or our licensors and are protected by copyright, trademark, and unfair-competition law in the relevant jurisdictions.",
      "Third-party brand marks shown on the Site (e.g. ecommerce platform logos, partner trademarks) belong to their respective owners and are displayed under nominative fair use for descriptive purposes — they do not imply endorsement.",
      "For client engagements, ownership of work product is transferred to the client per the terms of the relevant SOW. Nothing on this public Site varies the terms of any signed engagement.",
    ],
  },
  {
    id: "contact-submissions",
    title: "Contact form & enquiries",
    body: [
      "When you submit a brief through the contact form, you confirm that the information you provide is accurate and that you have the authority to share it. We will use the submission only as described in our Privacy Policy.",
      "Submitting a brief does not create any contractual relationship between us. We are free to decline any enquiry, and you are free to walk away at any point before signing an engagement agreement.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party services & links",
    body: [
      "The Site links to and integrates with third-party services (e.g. WhatsApp for chat, Resend for transactional email, third-party platforms in case studies). We are not responsible for the content, availability, or terms of those services. Use of them is governed by their own terms and privacy policies.",
    ],
  },
  {
    id: "warranties",
    title: "Warranties & disclaimers",
    body: [
      'The Site is provided "as is" and "as available" without warranties of any kind, express or implied, including any warranty of merchantability, fitness for a particular purpose, accuracy, or non-infringement.',
      "We work hard to keep the Site accurate and up to date, but we do not guarantee that it will be error-free, secure, uninterrupted, or that any content will be current at the moment you read it.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "To the maximum extent permitted by applicable law, Evolut, its operators, and its contractors will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Site, including loss of revenue, lost profits, lost data, or business interruption.",
      "Our total liability arising from your use of the Site (excluding any signed engagement) will not exceed one hundred US dollars (US$100).",
      "Nothing in these Terms limits any liability that cannot lawfully be limited — including liability for fraud, gross negligence, or wilful misconduct.",
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: [
      "You agree to indemnify and hold harmless Evolut and its operators from any third-party claim that arises out of (a) your misuse of the Site or breach of these Terms, or (b) any false or misleading information you submit through the contact form.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law & disputes",
    body: [
      "These Terms are governed by the laws of the Islamic Republic of Pakistan, without regard to its conflict of law principles. Any dispute arising from or relating to these Terms or your use of the Site will be resolved in the courts of Jhelum, Pakistan, except that we reserve the right to seek injunctive or equitable relief in any court of competent jurisdiction to protect our intellectual property or operational security.",
      "If you are a consumer resident in a jurisdiction whose mandatory consumer law would otherwise apply, nothing in this section limits your right to bring proceedings in your local courts under that law.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    body: [
      "We may update these Terms from time to time. The effective date at the top of the page reflects the most recent revision. Continued use of the Site after a change means you accept the updated Terms. If you do not accept them, please stop using the Site.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      `Questions about these Terms can be sent to ${site.contact.email} or via the contact form. We respond personally to every legal enquiry — usually within a few business days.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      kicker="Legal · Terms"
      title="The rules of using this site."
      intro="A short, plain-English Terms of Service for the public website. These Terms cover how you may use the Site itself — paid engagements are governed by a separate Master Services Agreement that we sign with each client."
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
      contactNote={`Anything unclear? Send a note to ${site.contact.email} or open the contact form — we answer every legal enquiry personally.`}
    />
  );
}
