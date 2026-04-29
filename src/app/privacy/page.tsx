import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/sections/policy-page";
import { site } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Evolut collects, uses, and protects information from visitors and clients. Plain-English summary plus the full policy.",
};

const EFFECTIVE_DATE = "April 29, 2026";

const sections: PolicySection[] = [
  {
    id: "summary",
    title: "Plain-English summary",
    body: [
      "We collect the minimum amount of personal information required to run the studio: what you submit through the contact form, the operational data you share when you become a client, and the standard analytics every modern site collects.",
      "We never sell or rent your personal information. We never enrich it from third-party data brokers. We use it to reply to your brief, run the engagement we agreed to, and meet our legal obligations — that's the whole list.",
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: [
      "Through the public contact form (/contact) and any reply email, we receive: your name, email address, optional company name, optional phone number, the service you're interested in, the budget band you select (if any), and the message you send. Server-side we also record the page you submitted from, your browser user-agent, and a one-way hash of your IP address (we do not store the raw IP).",
      "From normal site browsing, we collect: standard server access logs (path, status code, user agent, referrer, salted IP hash, retained no longer than 30 days), and aggregated, cookieless usage analytics (page views, navigation, performance vitals).",
      "When you become a client, we additionally process: any account credentials, brand assets, ad-platform access, and reporting data you grant us in the engagement agreement. We process this strictly for the work we have agreed to deliver.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: [
      "We use the data to:",
      [
        "Reply to your brief and route it to the right operator on our team.",
        "Send the auto-confirmation and any follow-up correspondence about your enquiry or engagement.",
        "Operate, maintain, and secure the website (rate limiting, abuse prevention, fraud detection).",
        "Improve the site's performance and content, in aggregate and without individual profiling.",
        "Meet our legal, tax, and accounting obligations.",
      ],
      "We do not use your information for behavioural advertising, retargeting, or to train any machine-learning model.",
    ],
  },
  {
    id: "third-parties",
    title: "Third parties we use",
    body: [
      "We share information with a small number of vetted infrastructure providers, only as necessary to operate the site:",
      [
        "Supabase (database hosting) — stores contact-form submissions in an EU/US region per project setup.",
        "Resend (transactional email) — delivers the brief notification to our team and the auto-reply to you.",
        "Vercel (hosting) — serves the site and stores standard server logs.",
      ],
      "We have written processing agreements with each. We do not sell or share personal information with any other third party for any purpose.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & similar technologies",
    body: [
      "The marketing site uses one cookie: a signed admin session cookie at the path /admin, used only by our internal team to access the submission inbox. It is httpOnly, SameSite-Lax, and expires after 24 hours.",
      "We do not set any tracking, advertising, or third-party cookies on public pages. We do not use Google Analytics, Meta Pixel, LinkedIn Insight Tag, or comparable trackers on the marketing surface.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "Wherever you are based, you may request that we:",
      [
        "Confirm what personal information we hold about you.",
        "Provide a copy of that information in a portable format.",
        "Correct any inaccurate or outdated information.",
        "Delete your information, subject to any legal-retention obligations.",
        "Stop processing your information for any non-essential purpose.",
      ],
      `Send any request to ${site.contact.email}. We respond within 30 days.`,
      "If you are in the EU, UK, Canada, or California, you additionally have rights under GDPR / UK GDPR / PIPEDA / CCPA respectively, and you may lodge a complaint with your local data protection authority.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep things",
    body: [
      "Contact-form submissions: retained for up to 24 months from the date of last interaction, then deleted or archived in anonymised form. Active client communications are retained for the duration of the engagement plus 7 years to meet tax and contractual record-keeping requirements.",
      "Server access logs: 30 days.",
      "Admin sessions: 24 hours from issue.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "Our database is protected by row-level security with no public read or write access — only our server-side code, holding a service-role key, can read or write submissions. Admin access is gated by a single-password challenge and a signed httpOnly session cookie.",
      "We hash IP addresses with a server-side secret before storing them, so the raw network identifier never lands in our database.",
      "Despite our best efforts, no internet-facing service is impenetrable. If we ever discover a breach affecting your data, we will notify you and the relevant authorities within the timelines required by applicable law.",
    ],
  },
  {
    id: "children",
    title: "Children",
    body: [
      "Our services are intended for businesses and the operators who run them. We do not knowingly collect personal information from anyone under 16. If you believe we have, contact us and we will delete it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The effective date at the top of the page reflects the most recent revision. Material changes (anything that broadens how we use your information) will be announced via the contact email on file before they take effect.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PolicyPage
      kicker="Legal · Privacy"
      title="A short, honest privacy policy."
      intro="We collect the minimum we need to run the studio and reply to your brief — nothing else. This page explains what we collect, why, who we share it with, and how to ask us to delete it."
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
      contactNote={`Questions, corrections, or a deletion request? Email us at ${site.contact.email} or use the contact form. We answer every privacy enquiry personally within 30 days.`}
    />
  );
}
