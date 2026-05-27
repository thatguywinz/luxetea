"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Mood = {
  id: string;
  title: string;
  prompt: string;
  pick: string;
  why: string;
  image: string;
  alt: string;
  chip: string;
  swatch: string;
  beginnerPick: boolean;
};

const moods: Mood[] = [
  {
    id: "fruity",
    title: "I want fruity & bright",
    prompt: "First-timers and fruit-tea fans",
    pick: "Berry Blossom Tea",
    why: "Layered berries, light tea, finished with real fruit. Order 50% sweet, regular ice.",
    image: "/placeholders/mood-fruity.jpg",
    alt: "Bright pink strawberry iced tea with fresh berries and ice",
    chip: "Fruit tea",
    swatch: "bg-lychee",
    beginnerPick: true,
  },
  {
    id: "creamy",
    title: "I want creamy & smooth",
    prompt: "If you love latte texture",
    pick: "Sea Salt Foam Matcha",
    why: "Stone-ground matcha topped with a salted cream foam. Ask for less sugar.",
    image: "/placeholders/mood-creamy.jpg",
    alt: "Matcha latte in a ceramic cup with foam on top, viewed from above",
    chip: "Matcha",
    swatch: "bg-matcha-deep",
    beginnerPick: true,
  },
  {
    id: "coffee",
    title: "I want coffee-forward",
    prompt: "Caffeine, but interesting",
    pick: "Vietnamese Coconut Coffee",
    why: "Rich slow-drip coffee shaken with coconut cream. Bold, smooth, slightly sweet.",
    image: "/placeholders/mood-coffee.jpg",
    alt: "Iced coffee with cream in a tall glass, close-up",
    chip: "Coffee",
    swatch: "bg-espresso",
    beginnerPick: false,
  },
  {
    id: "refresh",
    title: "I want refreshing",
    prompt: "Trail walk or post-gym",
    pick: "Spring Citrus Cold Brew",
    why: "Cold brew finished with citrus and a touch of honey. Easy on the sweetness.",
    image: "/placeholders/mood-refresh.jpg",
    alt: "Sparkling citrus drink with lemon and ice in a glass",
    chip: "Cold brew",
    swatch: "bg-cream-soft",
    beginnerPick: false,
  },
  {
    id: "kids",
    title: "Something for the kids",
    prompt: "No caffeine, fun textures",
    pick: "Honey Dew Slush",
    why: "Cold, fruity, fun. Pair it with a Chocolate Milk for younger kids.",
    image: "/placeholders/mood-kids.jpg",
    alt: "Strawberry milkshake with whipped cream in a tall glass",
    chip: "Kids",
    swatch: "bg-peach",
    beginnerPick: true,
  },
];

export default function MoodRecommender() {
  const [active, setActive] = useState(0);
  const m = moods[active];

  // Preload all mood images on mount so switching is instant — avoids the
  // ~3s blank card the audit flagged.
  useEffect(() => {
    moods.forEach((opt) => {
      const img = new window.Image();
      img.src = opt.image;
    });
  }, []);

  return (
    <section id="mood" className="relative bg-cream py-16 md:py-32">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <p className="eyebrow text-espresso">04 — Not sure what to order?</p>
            <h2 className="h-display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)] text-ink">
              Tell us the mood. <span className="italic">We&apos;ll pour the drink.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-ink/85 leading-snug">
            Pick a vibe — fruity, creamy, coffee-forward, refreshing or kid-friendly —
            and see today&apos;s easiest first order.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Options column */}
          <div className="md:col-span-5 flex flex-col gap-3">
            {moods.map((opt, i) => (
              <button
                key={opt.id}
                onClick={() => setActive(i)}
                className={[
                  "group text-left rounded-2xl border transition-all duration-300 px-5 py-4 md:px-6 md:py-5 flex items-center gap-4",
                  i === active
                    ? "border-ink bg-ink text-cream shadow-soft"
                    : "border-line bg-paper text-ink hover:bg-cream-soft",
                ].join(" ")}
                aria-pressed={i === active}
              >
                <span
                  className={[
                    "h-10 w-10 rounded-full flex items-center justify-center text-[0.7rem] font-medium",
                    i === active ? "bg-peach text-ink" : opt.swatch + " text-ink/80",
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-xl leading-tight">
                    {opt.title}
                  </span>
                  <span
                    className={[
                      "block text-xs mt-0.5",
                      i === active ? "text-cream/90" : "text-ink/75",
                    ].join(" ")}
                  >
                    {opt.prompt}
                  </span>
                </span>
                <span
                  className={[
                    "text-xl transition-transform",
                    i === active ? "translate-x-0" : "-translate-x-2 opacity-50",
                  ].join(" ")}
                  aria-hidden
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Preview column — image, chips and copy all crossfade as one unit
              keyed on the active mood so the tag/title can never desync. */}
          <div className="md:col-span-7 relative">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[560px] rounded-3xl overflow-hidden bg-cream-soft border border-line">
              <AnimatePresence mode="wait">
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {/* Uniform strong scrim so overlay text always reads */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/15" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    {m.beginnerPick ? (
                      <span className="bg-peach text-ink text-[0.7rem] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium">
                        Beginner pick
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="bg-cream text-ink text-[0.7rem] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium">
                      {m.chip}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-cream [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
                    <p className="eyebrow text-peach">Today&apos;s pick</p>
                    <h3 className="h-display text-3xl md:text-4xl mt-2">
                      {m.pick}
                    </h3>
                    <p className="mt-2 text-cream/95 text-sm max-w-md leading-snug">
                      {m.why}
                    </p>
                    <a
                      href="#visit"
                      className="mt-5 inline-flex items-center gap-2 bg-peach text-ink rounded-full px-5 py-3 text-sm font-medium hover:bg-cream transition-colors [text-shadow:none]"
                    >
                      Get directions <span aria-hidden>→</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
