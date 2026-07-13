"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { navItems, services } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Services shown in the navbar. Shopify & MERN is intentionally excluded
// from nav (it still lives on the homepage Services grid + its detail page).
const NAV_SERVICES = services.filter((s) => s.slug !== "shopify");

/**
 * Navbar — wordmark left, "Services" hover-dropdown + Menu + Talk to us
 * pill on the right. The Services dropdown lists all 8 services in a
 * clean 2-column grid. Drawer (full-screen) still handles all top-level
 * nav items.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current !== "number") return;
    setScrolled(current > 24);
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  // Click outside / Escape closes the services dropdown
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!servicesRef.current) return;
      if (!servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Hover with a small delay so the dropdown doesn't twitch when the
  // cursor briefly leaves the trigger / panel boundary
  const handleEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setServicesOpen(true);
  };
  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 120);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || servicesOpen
            ? "bg-canvas/85 backdrop-blur-xl border-b border-hairline"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container-x flex items-center justify-between h-16 md:h-20">
          {/* Left — wordmark */}
          <Link href="/" className="relative shrink-0 -ml-1">
            <Logo />
          </Link>

          {/* Right — Services dropdown + Menu + Talk to us */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* SERVICES dropdown trigger */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                className={cn(
                  "group hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-[0.85rem] font-medium transition-colors rounded-full",
                  servicesOpen
                    ? "text-ink bg-ink/[0.04]"
                    : "text-ink hover:text-ink-soft"
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-300",
                    servicesOpen && "rotate-180"
                  )}
                  strokeWidth={2.2}
                />
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.985 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    role="menu"
                    aria-label="Services"
                    className="absolute right-0 top-[calc(100%+8px)] z-[60] w-[min(38rem,90vw)] origin-top-right rounded-[1.25rem] border border-hairline-strong bg-canvas/95 backdrop-blur-xl shadow-[0_30px_70px_-25px_rgba(15,17,21,0.28)] overflow-hidden"
                  >
                    {/* Top eyebrow row */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-hairline">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mute">
                        · {NAV_SERVICES.length} services · one team ·
                      </p>
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="group inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink hover:text-copper transition-colors"
                      >
                        View all
                        <ArrowUpRight
                          className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={2.2}
                        />
                      </Link>
                    </div>

                    {/* Services grid */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline">
                      {NAV_SERVICES.map((s, i) => {
                        const Icon = s.icon;
                        return (
                          <li key={s.slug} role="none">
                            <Link
                              href={`/services/${s.slug}`}
                              onClick={() => setServicesOpen(false)}
                              role="menuitem"
                              className="group flex items-start gap-3 bg-canvas px-4 py-3.5 hover:bg-surface transition-colors"
                            >
                              <span
                                className={cn(
                                  "grid place-items-center h-9 w-9 rounded-lg shrink-0 transition-colors",
                                  accentChip(s.accent)
                                )}
                              >
                                <Icon className="h-4 w-4" strokeWidth={1.8} />
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between gap-3 mb-1">
                                  <p className="text-[0.92rem] font-medium text-ink truncate">
                                    {s.title}
                                  </p>
                                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mute shrink-0">
                                    {String(i + 1).padStart(2, "0")}
                                  </span>
                                </div>
                                <p className="text-[0.78rem] text-mute leading-snug line-clamp-1 group-hover:text-ink-soft transition-colors">
                                  {s.blurb}
                                </p>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Footer CTA */}
                    <div className="px-5 py-3 bg-canvas-2/60 border-t border-hairline flex items-center justify-between">
                      <p className="text-[0.78rem] text-ink-soft">
                        Not sure where to start?
                      </p>
                      <Link
                        href="/contact"
                        onClick={() => setServicesOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink text-canvas px-3.5 py-1.5 text-[0.78rem] font-medium hover:bg-ink-soft transition-colors"
                      >
                        Talk to us
                        <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TESTIMONIALS — anchors to the homepage testimonials section */}
            <Link
              href="/#testimonials"
              className="hidden md:inline-flex items-center px-3 py-2 text-[0.85rem] font-medium text-ink hover:text-ink-soft transition-colors rounded-full"
            >
              Testimonials
            </Link>

            {/* Menu trigger */}
            <button
              onClick={() => setOpen(true)}
              className="group inline-flex items-center gap-2 px-3 py-2 text-[0.85rem] font-medium text-ink hover:text-ink-soft transition-colors"
              aria-label="Open menu"
            >
              <span className="relative inline-flex flex-col gap-[3px]">
                <span className="block h-[1.5px] w-4 bg-current transition-all" />
                <span className="block h-[1.5px] w-4 bg-current transition-all" />
              </span>
              <span className="hidden sm:inline">Menu</span>
            </button>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-ink text-canvas px-5 py-2.5 text-[0.85rem] font-medium hover:bg-ink-soft transition-colors"
            >
              Talk to us
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </header>

      {/* === Full-screen drawer === */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-canvas"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[70] flex flex-col overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container-x flex items-center justify-between h-16 md:h-20 shrink-0">
                <Link href="/" onClick={() => setOpen(false)}>
                  <Logo />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 px-3 py-2 text-[0.85rem] font-medium text-ink hover:text-ink-soft transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" strokeWidth={2.2} />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>

              {/* Big nav links */}
              <nav className="container-x flex-1 flex flex-col justify-center pb-12 pt-4">
                {navItems.map((item, i) => (
                  <DrawerNavItem
                    key={item.href}
                    item={item}
                    index={i}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </nav>

              {/* Footer row in drawer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="container-x pb-8 md:pb-10 flex flex-wrap items-end justify-between gap-4 text-sm text-mute shrink-0"
              >
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] mb-1">
                    Studio
                  </p>
                  <p className="text-ink">Citi Housing Society, Jhelum</p>
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] mb-1">
                    Contact
                  </p>
                  <a
                    href="mailto:support@evolutecomsolutions.com"
                    className="text-ink hover:text-electric transition-colors"
                  >
                    support@evolutecomsolutions.com
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] mb-1">
                    Available
                  </p>
                  <p className="text-ink">24 / 7 across time zones</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------------------------------------------------------- *
 * DrawerNavItem — top-level link, with the Services row expanded
 * inline to show all 8 service sub-links.
 * ---------------------------------------------------------------- */
function DrawerNavItem({
  item,
  index,
  onNavigate,
}: {
  item: { label: string; href: string };
  index: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isServices = item.label === "Services";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="border-b border-hairline"
    >
      {/* Top-level row */}
      <div className="group flex items-center justify-between py-5 md:py-7">
        <Link
          href={item.href}
          onClick={onNavigate}
          className="display flex-1 text-[clamp(2rem,6vw,5rem)] text-ink leading-[1.05] tracking-tight transition-colors hover:text-mute flex items-baseline gap-4"
        >
          <span className="font-mono text-[0.85rem] text-mute">
            0{index + 1}
          </span>
          {item.label}
        </Link>

        {isServices ? (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse services" : "Expand services"}
            className="ml-3 grid place-items-center h-12 w-12 rounded-full border border-hairline-strong text-ink hover:bg-ink hover:text-canvas hover:border-ink transition-colors"
          >
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-300",
                expanded && "rotate-180"
              )}
              strokeWidth={2}
            />
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-hidden="true"
            tabIndex={-1}
            className="ml-3 grid place-items-center h-10 w-10 md:h-12 md:w-12"
          >
            <ArrowUpRight
              className="h-7 w-7 md:h-10 md:w-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        )}
      </div>

      {/* Services expansion — sub-grid of 8 sub-links */}
      {isServices && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="services-sub"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 pb-6 md:pb-8 pt-0">
                {services.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        onClick={onNavigate}
                        className="group flex items-center gap-4 py-2.5 md:py-3 transition-colors hover:text-copper"
                      >
                        <span
                          className={cn(
                            "grid place-items-center h-9 w-9 rounded-lg shrink-0 transition-colors",
                            accentChip(s.accent)
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <span className="flex-1 min-w-0 text-[1.05rem] md:text-[1.15rem] text-ink-soft group-hover:text-ink transition-colors">
                          {s.title}
                        </span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute">
                          0{i + 1}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- *
 * accentChip — per-service accent coloring for the icon tile.
 * Mirrors the palette used elsewhere on the site.
 * ---------------------------------------------------------------- */
function accentChip(accent: string): string {
  switch (accent) {
    case "electric":
      return "bg-electric/10 text-electric group-hover:bg-electric/15";
    case "copper":
      return "bg-copper/12 text-copper group-hover:bg-copper/20";
    case "obsidian":
      return "bg-obsidian/8 text-obsidian group-hover:bg-obsidian/12";
    case "lime":
      return "bg-lime/30 text-ink group-hover:bg-lime/40";
    case "chrome":
      return "bg-canvas-2 text-ink group-hover:bg-chrome-2/40";
    default:
      return "bg-canvas-2 text-ink";
  }
}
