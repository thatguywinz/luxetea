"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Tile = { src: string; alt: string; label: string; tag: string };

const tiles: Tile[] = [
  {
    src: "/placeholders/work-1.jpg",
    alt: "Cozy cafe interior with warm lighting and wood tones",
    label: "The room",
    tag: "Interior",
  },
  {
    src: "/placeholders/work-2.jpg",
    alt: "Cafe counter with pastries and drinks ready to serve",
    label: "Counter",
    tag: "Service",
  },
  {
    src: "/placeholders/work-4.jpg",
    alt: "Tea cup with rising steam in soft natural light",
    label: "Steam",
    tag: "Still life",
  },
  {
    src: "/placeholders/gallery-1.jpg",
    alt: "Latte on a wooden cafe table in warm morning light",
    label: "Morning ritual",
    tag: "Table",
  },
  {
    src: "/placeholders/gallery-2.jpg",
    alt: "Milk being poured into espresso to make a latte, close up",
    label: "Pour",
    tag: "Behind the bar",
  },
  {
    src: "/placeholders/gallery-3.jpg",
    alt: "Minimal coffee shop counter with wood and plants",
    label: "The counter",
    tag: "Interior",
  },
  {
    src: "/placeholders/work-5.jpg",
    alt: "Cafe storefront with a plant in the window in soft sunlight",
    label: "On Merton",
    tag: "Storefront",
  },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduce) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!sectionRef.current || !trackRef.current) return;
        const track = trackRef.current;
        const distance = track.scrollWidth - window.innerWidth + 64;

        gsap.to(track, {
          x: () => `-${distance}px`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance + 200}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper border-y border-line overflow-hidden"
    >
      <div className="md:h-screen flex flex-col justify-center py-16 md:py-0">
        <div className="mx-auto max-w-[1480px] px-5 md:px-10 mb-10 md:mb-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="eyebrow text-espresso">05 — In the shop</p>
              <h2 className="h-display mt-4 text-[clamp(2.4rem,5vw,4rem)] text-ink">
                A look around Luxe.
              </h2>
            </div>
            <p className="md:max-w-xs text-ink/65 text-sm">
              Drift through the cafe — fresh fruit, warm wood, drink builds
              and the Merton St doorway.
            </p>
          </div>
        </div>

        {/* Desktop horizontal track */}
        <div
          ref={trackRef}
          className="hidden md:flex md:pl-10 md:gap-6 md:w-max md:will-change-transform"
        >
          {tiles.map((t, i) => (
            <figure
              key={t.src}
              className={[
                "relative rounded-3xl overflow-hidden flex-shrink-0 bg-cream-soft",
                i % 2 === 0 ? "w-[420px] h-[540px]" : "w-[340px] h-[460px] mt-16",
              ].join(" ")}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="420px"
                className="object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 text-cream flex items-end justify-between">
                <span>
                  <span className="block eyebrow text-cream/70">{t.tag}</span>
                  <span className="block font-display text-2xl mt-1">{t.label}</span>
                </span>
                <span className="text-xs uppercase tracking-widest opacity-70">
                  {String(i + 1).padStart(2, "0")} / {String(tiles.length).padStart(2, "0")}
                </span>
              </figcaption>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            </figure>
          ))}
          <div className="w-16 flex-shrink-0" />
        </div>

        {/* Mobile native scroll fallback */}
        <div className="md:hidden flex gap-3 overflow-x-auto pl-5 pr-5 no-scrollbar snap-x snap-mandatory">
          {tiles.map((t) => (
            <figure
              key={t.src}
              className="relative rounded-3xl overflow-hidden flex-shrink-0 w-[78vw] h-[72vw] max-w-[420px] snap-start bg-cream-soft"
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="78vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 right-3 text-cream">
                <span className="block eyebrow text-cream/70">{t.tag}</span>
                <span className="block font-display text-xl">{t.label}</span>
              </figcaption>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
