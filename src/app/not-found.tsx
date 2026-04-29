import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center py-32 bg-canvas">
        <div className="container-x text-center max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-electric mb-6">
            Error 404
          </p>
          <h1 className="display text-5xl md:text-7xl text-ink leading-[1.1] mb-6">
            Page not found.
          </h1>
          <p className="text-lg text-ink-soft mb-10 max-w-md mx-auto">
            The link you clicked may be broken, or the page may have been removed.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-canvas hover:bg-ink-soft transition-colors"
          >
            Back to Home
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.2} />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
