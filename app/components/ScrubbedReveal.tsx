"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ScrubbedReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

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
        if (!wrapRef.current || !imgRef.current) return;

        gsap.fromTo(
          imgRef.current,
          { clipPath: "inset(28% 18% 28% 18% round 28px)", scale: 1.1 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
            },
          }
        );

        gsap.fromTo(
          ".sr-word",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }, wrapRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative bg-cream">
      <div className="relative h-[180vh] md:h-[200vh]">
        <div className="sticky top-0 h-[85vh] md:h-screen overflow-hidden">
          <div ref={imgRef} className="absolute inset-0 will-change-transform bg-espresso-deep">
            <Image
              src="/placeholders/work-3.jpg"
              alt="Iced drinks styled in a pastel overhead flatlay"
              fill
              sizes="100vw"
              className="object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/75 via-espresso-deep/30 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1480px] px-5 md:px-10 h-full flex flex-col justify-end pb-12 md:pb-20">
            <p className="eyebrow text-cream/80">
              <span className="sr-word inline-block">A</span>{" "}
              <span className="sr-word inline-block">Midtown</span>{" "}
              <span className="sr-word inline-block">hideaway</span>
            </p>
            <h2 className="h-display text-cream mt-4 text-[clamp(2.2rem,6vw,5.25rem)] leading-[1.05] max-w-4xl">
              <span className="sr-word inline-block">Bright</span>{" "}
              <span className="sr-word inline-block">drinks.</span>{" "}
              <span className="sr-word inline-block italic text-peach">Warm</span>{" "}
              <span className="sr-word inline-block italic text-peach">room.</span>
              <br />
              <span className="sr-word inline-block">Five</span>{" "}
              <span className="sr-word inline-block">minutes</span>{" "}
              <span className="sr-word inline-block">from</span>{" "}
              <span className="sr-word inline-block">Davisville.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
