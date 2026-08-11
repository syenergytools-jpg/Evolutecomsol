import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site-config";

/**
 * ConsultationFooter — legal-only. No sitemap columns, no social icons,
 * no giant wordmark close. Privacy/Terms stay because we're collecting
 * PII on this page, not because we want visitors browsing away.
 */
export function ConsultationFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian">
      <div className="container-x py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo variant="mark" size="sm" alt="Evolut" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/55">
            © {year} {site.fullName}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/privacy"
            className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/55 hover:text-canvas transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-canvas/55 hover:text-canvas transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
