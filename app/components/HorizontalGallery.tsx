"use client";

import { useEffect, useRef, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [tx, setTx] = useState(0);
  const [sectionHeight, setSectionHeight] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState(0);

  // Sticky-driven horizontal scrub on desktop. No GSAP pin = no clash with
  // Lenis or upstream pinned sections.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const desktopMql = window.matchMedia("(min-width: 768px)");
    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");

    let rafId = 0;

    const measure = () => {
      if (!desktopMql.matches || reduceMql.matches) {
        setSectionHeight(undefined);
        setTx(0);
        return;
      }
      const track = trackRef.current;
      if (!track) return;
      const distance = Math.max(0, track.scrollWidth - window.innerWidth + 80);
      // Outer height = 100vh (sticky stage) + horizontal scrub distance.
      setSectionHeight(`calc(100vh + ${distance}px)`);
    };

    const onScroll = () => {
      if (!desktopMql.matches || reduceMql.matches) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const distance = Math.max(0, track.scrollWidth - window.innerWidth + 80);
        const scrolled = Math.max(0, -rect.top);
        const p = distance > 0 ? Math.min(1, scrolled / distance) : 0;
        setProgress(p);
        setTx(-distance * p);
      });
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      onScroll();
    });
    desktopMql.addEventListener("change", () => {
      measure();
      onScroll();
    });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-paper border-y border-line"
      style={sectionHeight ? { height: sectionHeight } : undefined}
    >
      {/* Sticky stage — browser-native pinning, no ScrollTrigger needed. */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col justify-center py-16 md:py-0">
        <div className="mx-auto max-w-[1480px] px-5 md:px-10 mb-10 md:mb-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="eyebrow text-espresso flex items-center gap-3">
                <span className="inline-block w-8 h-px bg-espresso" />
                05 — In the shop
              </p>
              <h2 className="h-display mt-4 text-[clamp(2.4rem,5vw,4rem)] text-ink">
                A look around <span className="italic">Luxe.</span>
              </h2>
            </div>
            <div className="md:max-w-sm flex flex-col gap-3">
              <p className="text-ink/80 text-sm">
                Drift through the cafe — fresh fruit, warm wood, drink builds
                and the Merton St doorway.
              </p>
              <div className="hidden md:flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-ink/65">
                <span className="h-px w-10 bg-ink/30" />
                <span>
                  {String(Math.min(tiles.length, Math.round(progress * (tiles.length - 1)) + 1)).padStart(2, "0")} / {String(tiles.length).padStart(2, "0")}
                </span>
                <span className="relative flex-1 h-px bg-ink/15 overflow-hidden">
                  <span
                    className="absolute inset-y-0 left-0 bg-espresso origin-left"
                    style={{ width: `${progress * 100}%` }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop horizontal track — translated via inline transform */}
        <div
          ref={trackRef}
          className="hidden md:flex md:pl-10 md:gap-6 md:w-max md:will-change-transform"
          style={{ transform: `translate3d(${tx}px,0,0)` }}
        >
          {tiles.map((t, i) => (
            <figure
              key={t.src}
              className={[
                "relative rounded-3xl overflow-hidden flex-shrink-0 bg-espresso/30 shadow-cup",
                i % 2 === 0 ? "w-[420px] h-[540px]" : "w-[340px] h-[460px] mt-16",
              ].join(" ")}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="420px"
                className="object-cover"
                loading={i < 3 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4 text-cream flex items-end justify-between [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                <span>
                  <span className="block eyebrow text-cream/90">{t.tag}</span>
                  <span className="block font-display text-2xl mt-1">{t.label}</span>
                </span>
                <span className="text-xs uppercase tracking-widest opacity-85">
                  {String(i + 1).padStart(2, "0")} / {String(tiles.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
          <div className="w-20 flex-shrink-0" />
        </div>

        {/* Mobile native scroll fallback */}
        <div className="md:hidden flex gap-3 overflow-x-auto pl-5 pr-5 no-scrollbar snap-x snap-mandatory">
          {tiles.map((t, i) => (
            <figure
              key={t.src}
              className="relative rounded-3xl overflow-hidden flex-shrink-0 w-[78vw] h-[72vw] max-w-[420px] snap-start bg-espresso/30"
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="78vw"
                className="object-cover"
                loading={i < 2 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
              />
              <figcaption className="absolute bottom-3 left-3 right-3 text-cream [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
                <span className="block eyebrow text-cream/90">{t.tag}</span>
                <span className="block font-display text-xl">{t.label}</span>
              </figcaption>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
