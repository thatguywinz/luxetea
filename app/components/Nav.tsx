"use client";

import { useEffect, useState } from "react";
import { BUSINESS } from "../lib/business";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "How it's made" },
  { href: "#mood", label: "Find your drink" },
  { href: "#visit", label: "Visit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-line"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1480px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 rounded-full bg-ink text-cream items-center justify-center font-display text-lg leading-none">
            L
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-peach border-2 border-cream" />
          </span>
          <span className="font-display text-[1.35rem] tracking-tight">
            Luxe Tea
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink/80 hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="hidden md:inline-flex text-sm text-ink/80 hover:text-ink"
          >
            {BUSINESS.phone}
          </a>
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded-full bg-ink text-cream px-4 md:px-5 h-10 text-sm font-medium hover:bg-espresso-deep transition-colors"
          >
            {BUSINESS.primaryCta}
          </a>
        </div>
      </div>
    </header>
  );
}
