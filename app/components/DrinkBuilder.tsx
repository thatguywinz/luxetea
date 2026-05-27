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
      <div className="noise pointer-events-none absolute inset-0" />

      {/* Sticky pane — browser-native, plays nice with Lenis and overflow. */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center">
        <div className="relative w-full px-5 md:px-12 lg:px-16 xl:px-24 py-20 md:py-0 md:pt-36 md:pb-12 lg:pt-48">
          <div className="md:flex md:items-end md:justify-between md:gap-16 mb-10 md:mb-14">
            <div className="max-w-[44rem]">
              <p className="eyebrow text-peach flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-peach" />
                03 — From leaf to cup
              </p>
              <h2 className="h-display mt-3 text-[clamp(2.2rem,4.5vw,4rem)] text-cream leading-[1.05]">
                We build every drink,{" "}
                <span className="italic text-peach">one cup at a time.</span>
              </h2>
            </div>
            <p className="mt-4 md:mt-0 md:max-w-[22rem] text-cream/75 text-sm leading-relaxed md:text-right">
              No pre-mixes. No shortcuts.<br />
              Scroll to watch a Luxe drink come together.
            </p>
          </div>

          {/* DESKTOP scrubbed track — full-width fluid grid */}
          <div className="hidden md:grid md:grid-cols-[minmax(320px,400px)_1fr] lg:grid-cols-[minmax(380px,460px)_1fr] md:gap-12 lg:gap-20 md:items-center">
            <div className="relative">
              <ol className="space-y-5 relative">
                {layers.map((l, i) => {
                  const isLast = i === layers.length - 1;
                  const segProgress = isLast
                    ? 0
                    : Math.max(
                        0,
                        Math.min(1, progress * (layers.length - 1) - i)
                      );
                  return (
                    <li
                      key={l.label}
                      className={[
                        "relative pl-14 transition-all duration-500",
                        i === active
                          ? "opacity-100"
                          : "opacity-55 hover:opacity-80",
                      ].join(" ")}
                    >
                      {/* connector segment to the NEXT dot — never overlaps any dot */}
                      {!isLast && (
                        <>
                          <span
                            aria-hidden
                            className="absolute left-[19.5px] top-12 w-px bg-cream/12"
                            style={{ bottom: "-1.5rem" }}
                          />
                          <span
                            aria-hidden
                            className="absolute left-[19.5px] top-12 w-px bg-peach origin-top will-change-transform"
                            style={{
                              bottom: "-1.5rem",
                              transform: `scaleY(${segProgress})`,
                            }}
                          />
                        </>
                      )}

                      <span
                        className={[
                          "absolute left-0 top-1 inline-flex h-10 w-10 rounded-full items-center justify-center text-[0.7rem] font-medium transition-all duration-500 ring-4 ring-espresso-deep z-10",
                          i === active ? "scale-110 shadow-cup" : "scale-95",
                          i > active
                            ? "bg-espresso-deep border border-cream/25 text-cream/60"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={
                          i <= active
                            ? { background: l.color, color: "#231915" }
                            : undefined
                        }
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={[
                          "font-display leading-tight transition-all duration-500",
                          i === active ? "text-[1.65rem]" : "text-[1.4rem]",
                        ].join(" ")}
                      >
                        {l.label}
                      </h3>
                      <p
                        className={[
                          "text-sm mt-1 max-w-md leading-relaxed transition-colors duration-500",
                          i === active ? "text-cream/90" : "text-cream/60",
                        ].join(" ")}
                      >
                        {l.note}
                      </p>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-cream/70">
                <span className="text-peach">
                  Step {String(active + 1).padStart(2, "0")}
                  <span className="text-cream/40"> / 04</span>
                </span>
                <span>Scroll to brew →</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-[min(64vh,620px)] rounded-[28px] overflow-hidden bg-ink/40 shadow-cup">
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
                      sizes="(min-width: 1024px) 65vw, (min-width: 768px) 55vw, 100vw"
                      className={[
                        "object-cover transition-transform duration-[1400ms] ease-out",
                        i === active ? "scale-100" : "scale-105",
                      ].join(" ")}
                      priority={i === 0}
                      fetchPriority={i === 0 ? "high" : "auto"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/90 via-espresso-deep/20 to-espresso-deep/30" />
                    <div className="absolute bottom-7 left-7 right-7 lg:bottom-9 lg:left-9 lg:right-9 flex items-end justify-between gap-4">
                      <span
                        className="font-display text-[clamp(4rem,7vw,6.5rem)] leading-none"
                        style={{
                          WebkitTextStroke: "1px rgba(255,248,236,0.55)",
                          color: "transparent",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full"
                        style={{ background: l.color, color: "#231915" }}
                      >
                        {l.label}
                      </span>
                    </div>
                  </div>
                ))}

                {/* corner crop accents */}
                <span aria-hidden className="absolute top-5 left-5 h-5 w-5 border-l border-t border-cream/40 rounded-tl-sm" />
                <span aria-hidden className="absolute top-5 right-5 h-5 w-5 border-r border-t border-cream/40 rounded-tr-sm" />
                <span aria-hidden className="absolute bottom-5 left-5 h-5 w-5 border-l border-b border-cream/40 rounded-bl-sm" />
                <span aria-hidden className="absolute bottom-5 right-5 h-5 w-5 border-r border-b border-cream/40 rounded-br-sm" />

                {/* outer top-right step counter chip — premium editorial touch */}
                <span
                  aria-hidden
                  className="absolute top-6 right-6 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-cream/80 bg-espresso-deep/40 backdrop-blur-sm border border-cream/15 rounded-full px-3 py-1"
                >
                  {String(active + 1).padStart(2, "0")} / {String(layers.length).padStart(2, "0")}
                </span>
              </div>

              {/* scrub progress bar lives under the image, tied to the visual */}
              <div className="mt-6 h-px bg-cream/12 relative overflow-hidden">
                <span
                  className="block h-full bg-peach origin-left will-change-transform"
                  style={{ transform: `scaleX(${progress})` }}
                />
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
