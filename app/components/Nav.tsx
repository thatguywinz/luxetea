"use client";

import { useEffect, useState } from "react";
import { BUSINESS } from "../lib/business";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "How it's made" },
  { href: "#mood", label: "Find your drink" },
  { href: "#visit", label: "Visit" },
  { href: "#faq", label: "FAQ" },
];

// Sections rendered with a dark background — the header switches to its
// light-text variant when one of these is the dominant section under it.
const DARK_SECTION_IDS = ["story", "final-cta"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect when a dark section is crossing under the header
  useEffect(() => {
    const probe = () => {
      const probeY = 24; // px below the very top of the viewport
      for (const id of DARK_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          setOverDark(true);
          return;
        }
      }
      setOverDark(false);
    };
    probe();
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    return () => {
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const lightText = overDark; // text/links/logo light when over dark
  const barBg = scrolled
    ? overDark
      ? "bg-espresso-deep/80 backdrop-blur-md border-b border-cream/10"
      : "bg-cream/85 backdrop-blur-md border-b border-line"
    : "bg-transparent";

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-40 transition-all duration-500",
          barBg,
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1480px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <span
              className={[
                "relative inline-flex h-9 w-9 rounded-full items-center justify-center font-display text-lg leading-none transition-colors",
                lightText ? "bg-cream text-ink" : "bg-ink text-cream",
              ].join(" ")}
            >
              L
              <span
                className={[
                  "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2",
                  lightText
                    ? "bg-peach border-espresso-deep"
                    : "bg-peach border-cream",
                ].join(" ")}
              />
            </span>
            <span
              className={[
                "font-display text-[1.35rem] tracking-tight transition-colors",
                lightText ? "text-cream" : "text-ink",
              ].join(" ")}
            >
              Luxe Tea
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {links.slice(0, 4).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={[
                  "text-sm transition-colors",
                  lightText
                    ? "text-cream/80 hover:text-cream"
                    : "text-ink/80 hover:text-ink",
                ].join(" ")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BUSINESS.phoneHref}
              className={[
                "hidden md:inline-flex text-sm transition-colors",
                lightText ? "text-cream/80 hover:text-cream" : "text-ink/80 hover:text-ink",
              ].join(" ")}
            >
              {BUSINESS.phone}
            </a>
            <a
              href="#menu"
              className={[
                "hidden md:inline-flex items-center justify-center rounded-full px-5 h-10 text-sm font-medium transition-colors",
                lightText
                  ? "bg-peach text-ink hover:bg-cream"
                  : "bg-ink text-cream hover:bg-espresso-deep",
              ].join(" ")}
            >
              {BUSINESS.primaryCta}
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={[
                "md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                lightText
                  ? "border-cream/30 text-cream hover:bg-cream/10"
                  : "border-line text-ink hover:bg-ink/5",
              ].join(" ")}
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M1 1h16M1 7h16M1 13h10" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={[
          "md:hidden fixed inset-0 z-50 transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div
          className={[
            "absolute top-0 right-0 h-full w-[88%] max-w-[380px] bg-cream shadow-cup",
            "flex flex-col px-6 pt-6 pb-8",
            "transition-transform duration-400 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="relative inline-flex h-9 w-9 rounded-full bg-ink text-cream items-center justify-center font-display text-lg leading-none">
                L
              </span>
              <span className="font-display text-[1.2rem] tracking-tight text-ink">
                Luxe Tea
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          <nav className="mt-10 flex flex-col gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-between border-b border-line py-4"
              >
                <span className="flex items-baseline gap-3">
                  <span className="eyebrow text-espresso">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl text-ink">
                    {l.label}
                  </span>
                </span>
                <span className="text-ink/50 group-hover:text-ink transition-colors" aria-hidden>
                  →
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 space-y-3">
            <a
              href={BUSINESS.phoneHref}
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] rounded-full bg-ink text-cream font-medium"
            >
              Call · {BUSINESS.phone}
            </a>
            <a
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] rounded-full border border-line text-ink font-medium"
            >
              {BUSINESS.ctaSecondary}
            </a>
            <p className="pt-4 text-[0.7rem] uppercase tracking-[0.22em] text-ink/60 text-center">
              230 Merton St · {BUSINESS.hoursLine.split("·")[0].trim()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
