import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site-config";

/**
 * FunnelFooter — legal-only, same minimal shape as /consultation's
 * footer, plus one extra paragraph of platform-trademark disclaimer
 * (the honest, real equivalent of the reference site's "NOT AFFILIATED
 * WITH AMAZON™" notice — true for Evolut too, and good practice to
 * keep regardless of the reference).
 */
export function FunnelFooter({ disclaimer }: { disclaimer: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian border-t border-canvas/10">
      <div className="container-x py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-canvas/10">
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

        <p className="mt-6 text-[0.75rem] leading-relaxed text-canvas/40 max-w-3xl">
          {disclaimer}
        </p>
      </div>
    </footer>
  );
}
