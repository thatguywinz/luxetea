"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const layers = [
  {
    label: "Loose tea",
    note: "Fresh-steeped daily — jasmine, oolong, black, green.",
    image: "/placeholders/process-1.jpg",
    alt: "Loose dry tea leaves spread on a wooden surface",
    color: "#6F8C68",
  },
  {
    label: "Real fruit",
    note: "Hand-sliced lychee, mango, strawberry, citrus.",
    image: "/placeholders/process-3.jpg",
    alt: "Fresh fruit slices on a cutting board in a cafe kitchen",
    color: "#F7C9D4",
  },
  {
    label: "Built to order",
    note: "Your sweetness, your ice, your toppings — pearls, jellies, foam.",
    image: "/placeholders/process-2.jpg",
    alt: "Barista pouring tea into a glass with ice",
    color: "#FFC7A7",
  },
  {
    label: "Ready in minutes",
    note: "Finished, sealed and craveable. Walk-in or grab on the go.",
    image: "/placeholders/process-4.jpg",
    alt: "Finished bubble tea on a cafe counter ready to serve",
    color: "#FFF8EC",
  },
];

export default function DrinkBuilder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  // Sticky-driven scroll progress on desktop. No GSAP pin, no ScrollTrigger
  // race conditions, no fight with Lenis or overflow-hidden parents.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const desktopMql = window.matchMedia("(min-width: 768px)");
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");

    let rafId = 0;
    let lastIdx = -1;

    const onScroll = () => {
      if (!desktopMql.matches || reduceMql.matches) return;
      const el = sectionRef.current;
      if (!el) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Section height = layers.length * 100vh.
        // Sticky inner = 100vh, so the usable scrub distance =
        // (layers.length - 1) * 100vh. Map -rect.top across that range.
        const scrubDistance = (layers.length - 1) * vh;
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / scrubDistance));
        setProgress(p);
        const idx = Math.min(
          layers.length - 1,
          Math.round(p * (layers.length - 1))
        );
        if (idx !== lastIdx) {
          lastIdx = idx;
          setActive(idx);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktopMql.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktopMql.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-espresso-deep text-cream md:h-[400vh]"
    >
      {/* Decorative outlined numeral baked into the section — adds depth on
          desktop without affecting layout flow. */}
      <span
        aria-hidden
        className="hidden md:block pointer-events-none absolute right-4 top-32 font-display text-[26rem] leading-none text-cream/[0.04] select-none"
        style={{ WebkitTextStroke: "1px rgba(255,248,236,0.06)", color: "transparent" }}
      >
        03
      </span>
      <div className="noise pointer-events-none absolute inset-0" />

      {/* Sticky pane — browser-native, plays nice with Lenis and overflow. */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center">
        <div className="relative mx-auto w-full max-w-[1480px] px-5 md:px-10 py-20 md:py-0 md:pt-[7.5rem] md:pb-12">
          <div className="md:flex md:items-end md:justify-between md:gap-10 mb-10 md:mb-10">
            <div className="max-w-2xl">
              <p className="eyebrow text-peach flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-peach" />
                03 — From leaf to cup
              </p>
              <h2 className="h-display mt-4 text-[clamp(2.4rem,5vw,4.2rem)] text-cream">
                We build every drink,{" "}
                <span className="italic text-peach">one cup at a time.</span>
              </h2>
            </div>
            <p className="mt-4 md:mt-0 md:max-w-xs text-cream/85 text-sm leading-relaxed">
              No pre-mixes. No shortcuts. Scroll to watch a Luxe drink come
              together.
            </p>
          </div>

          {/* DESKTOP scrubbed track */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-10 md:items-center">
            <div className="col-span-5">
              <ol className="space-y-4">
                {layers.map((l, i) => (
                  <li
                    key={l.label}
                    className={[
                      "relative pl-14 transition-opacity duration-500 transition-transform",
                      i === active
                        ? "opacity-100 translate-x-0"
                        : "opacity-35 translate-x-0",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "absolute left-0 top-1 inline-flex h-10 w-10 rounded-full items-center justify-center text-xs font-medium text-ink transition-transform duration-500",
                        i === active ? "scale-110 shadow-cup" : "scale-100",
                      ].join(" ")}
                      style={{ background: l.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl leading-snug">
                      {l.label}
                    </h3>
                    <p className="text-cream/85 text-sm mt-1 max-w-md leading-relaxed">
                      {l.note}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-10 h-px bg-cream/15 relative overflow-hidden">
                <span
                  className="block h-full bg-peach origin-left will-change-transform"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-cream/80">
                <span>Step {String(active + 1).padStart(2, "0")} / 04</span>
                <span>Scroll to brew →</span>
              </div>
            </div>

            <div className="col-span-7 relative">
              <div className="relative aspect-[4/5] max-h-[68vh] rounded-[28px] overflow-hidden bg-ink/40 shadow-cup">
                {layers.map((l, i) => (
                  <div
                    key={l.label}
                    aria-hidden="true"
                    className={[
                      "absolute inset-0 transition-opacity duration-700 will-change-[opacity,transform]",
                      i === active ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  >
                    <Image
                      src={l.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={[
                        "object-cover transition-transform duration-[1400ms] ease-out",
                        i === active ? "scale-100" : "scale-105",
                      ].join(" ")}
                      priority={i === 0}
                      fetchPriority={i === 0 ? "high" : "auto"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/85 via-espresso-deep/15 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                      <span
                        className="font-display text-[5rem] leading-none"
                        style={{
                          WebkitTextStroke: "1px rgba(255,248,236,0.55)",
                          color: "transparent",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="bg-cream text-ink text-xs uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {l.label}
                      </span>
                    </div>
                  </div>
                ))}

                {/* corner crop accents */}
                <span aria-hidden className="absolute top-4 left-4 h-5 w-5 border-l border-t border-cream/40 rounded-tl-sm" />
                <span aria-hidden className="absolute top-4 right-4 h-5 w-5 border-r border-t border-cream/40 rounded-tr-sm" />
                <span aria-hidden className="absolute bottom-4 left-4 h-5 w-5 border-l border-b border-cream/40 rounded-bl-sm" />
                <span aria-hidden className="absolute bottom-4 right-4 h-5 w-5 border-r border-b border-cream/40 rounded-br-sm" />
              </div>
            </div>
          </div>

          {/* MOBILE stacked cards */}
          <ol className="md:hidden space-y-5">
            {layers.map((l, i) => (
              <li
                key={l.label}
                className="relative overflow-hidden rounded-3xl bg-ink/30 border border-cream/10"
              >
                <div className="relative aspect-[4/3] bg-espresso-deep">
                  <Image
                    src={l.image}
                    alt={l.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    loading={i < 2 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/85 via-transparent to-transparent" />
                  <span
                    className="absolute top-3 left-3 inline-flex h-9 w-9 rounded-full items-center justify-center text-xs font-medium text-ink"
                    style={{ background: l.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl">{l.label}</h3>
                  <p className="text-cream/85 text-sm mt-1.5 leading-relaxed">
                    {l.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
