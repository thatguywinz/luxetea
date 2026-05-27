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

const HEADER_OFFSET_PX = 80;

export default function DrinkBuilder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const sectionEl = sectionRef.current;
      const pinEl = pinRef.current;
      if (!sectionEl || !pinEl) return;

      ctx = gsap.context(() => {
        const total = layers.length;
        // Give each step a full viewport of scroll, so coast/momentum can't
        // skip past one. Snap to step boundaries so the sequence settles on
        // a step instead of between two.
        const stepDistance = () => window.innerHeight;
        const snapPoints = Array.from({ length: total }, (_, i) =>
          i / (total - 1)
        );

        ScrollTrigger.create({
          trigger: sectionEl,
          start: `top top+=${HEADER_OFFSET_PX - 80}`,
          end: () => `+=${stepDistance() * total}`,
          pin: pinEl,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const idx = Math.min(
              total - 1,
              Math.round(self.progress * (total - 1))
            );
            setActive(idx);
          },
        });

        gsap.fromTo(
          ".db-progress-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top top",
              end: () => `+=${stepDistance() * total}`,
              scrub: true,
            },
          }
        );
      }, sectionEl);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [isDesktop]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-espresso-deep text-cream overflow-hidden"
    >
      <div className="noise absolute inset-0" />

      {/* Pinned wrapper — height reserved minus the sticky header so the
          heading is never clipped while pinned. */}
      <div
        ref={pinRef}
        className="relative mx-auto max-w-[1480px] px-5 md:px-10 py-20 md:py-12 md:flex md:flex-col md:justify-center"
        style={
          isDesktop
            ? {
                minHeight: `calc(100vh - ${HEADER_OFFSET_PX}px)`,
                paddingTop: `${HEADER_OFFSET_PX}px`,
              }
            : undefined
        }
      >
        <div className="md:flex md:items-end md:justify-between md:gap-10 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="eyebrow text-peach">03 — From leaf to cup</p>
            <h2 className="h-display mt-4 text-[clamp(2.4rem,5vw,4.2rem)] text-cream">
              We build every drink,{" "}
              <span className="italic text-peach">one cup at a time.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 md:max-w-xs text-cream/90 text-sm leading-relaxed">
            No pre-mixes. No shortcuts. Scroll to watch a Luxe drink come
            together.
          </p>
        </div>

        {/* DESKTOP scrubbed track */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-10 md:items-stretch">
          <div className="col-span-5 self-center">
            <ol className="space-y-4">
              {layers.map((l, i) => (
                <li
                  key={l.label}
                  className={[
                    "relative pl-12 transition-opacity duration-500",
                    i === active ? "opacity-100" : "opacity-40",
                  ].join(" ")}
                >
                  <span
                    className="absolute left-0 top-1 inline-flex h-8 w-8 rounded-full items-center justify-center text-xs font-medium text-ink"
                    style={{ background: l.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl leading-snug">
                    {l.label}
                  </h3>
                  <p className="text-cream/90 text-sm mt-1 max-w-md leading-relaxed">
                    {l.note}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-10 h-px bg-cream/15 relative overflow-hidden">
              <span
                className="db-progress-fill block h-full bg-peach origin-left"
                style={{ width: "100%" }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-cream/85">
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
                    "absolute inset-0 transition-opacity duration-700",
                    i === active ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                >
                  <Image
                    src={l.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    loading={i === 0 ? "eager" : "eager"}
                  />
                  {/* Solid scrim band so overlay text always reads */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/85 via-espresso-deep/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                    <span
                      className="font-display text-[5rem] leading-none text-cream/90"
                      style={{
                        WebkitTextStroke: "1px rgba(255,248,236,0.5)",
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
            </div>
          </div>
        </div>

        {/* MOBILE: stacked cards (no pin) */}
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
                  className="absolute top-3 left-3 inline-flex h-8 w-8 rounded-full items-center justify-center text-xs font-medium text-ink"
                  style={{ background: l.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl">{l.label}</h3>
                <p className="text-cream/90 text-sm mt-1.5 leading-relaxed">
                  {l.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
