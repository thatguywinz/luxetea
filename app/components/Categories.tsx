"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Cat = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  alt: string;
  swatch: string;
  picks: string[];
  // TODO: confirm exact prices with owner; current numbers are placeholders
  fromPrice: string;
  tone: "cream" | "matcha" | "peach" | "lychee" | "espresso";
};

const cats: Cat[] = [
  {
    id: "fruit-tea",
    title: "Fruit teas",
    blurb: "Fruit-forward, layered with real slices, ice and a bright finish.",
    image: "/placeholders/service-1.jpg",
    alt: "Fruit tea drink in a clear cup with fresh fruit pieces and ice",
    swatch: "bg-lychee",
    picks: ["Berry Blossom", "Lychee Grow", "Tropical Rush", "Spring Citrus"],
    fromPrice: "from $7",
    tone: "lychee",
  },
  {
    id: "viet-coffee",
    title: "Vietnamese coffee",
    blurb: "Rich, slow-drip coffee with coconut, salt foam or condensed milk.",
    image: "/placeholders/service-2.jpg",
    alt: "Vietnamese iced coffee with condensed milk layered in a glass",
    swatch: "bg-espresso",
    picks: ["Coconut Coffee", "Bac Xiu", "Salted Coffee", "Black Coconut"],
    fromPrice: "from $6",
    tone: "espresso",
  },
  {
    id: "cold-brew",
    title: "Signature cold brew",
    blurb: "Slow-steeped coffee finished with fruit, citrus or honey notes.",
    image: "/placeholders/service-3.jpg",
    alt: "Cold brew coffee in a tall glass with ice on a wooden counter",
    swatch: "bg-ink",
    picks: ["Lychee Cold Brew", "Strawberry", "Spring Citrus", "Golden Lemon"],
    fromPrice: "from $6.50",
    tone: "cream",
  },
  {
    id: "matcha",
    title: "Matcha & cloud lattes",
    blurb: "Stone-ground matcha layered with foam, fruit or sea salt cream.",
    image: "/placeholders/service-4.jpg",
    alt: "Matcha latte in a ceramic cup viewed from above",
    swatch: "bg-matcha-deep",
    picks: ["Strawberry Matcha", "Mango Matcha", "Jasmine Cloud", "Sea Salt Foam"],
    fromPrice: "from $7",
    tone: "matcha",
  },
  {
    id: "milk-tea",
    title: "Classic milk teas",
    blurb: "Hong Kong and Thai-style milk teas, hot or iced, with pearls.",
    image: "/placeholders/service-5.jpg",
    alt: "Bubble milk tea with tapioca pearls in a clear cup",
    swatch: "bg-cream-soft",
    picks: ["Black Milk Tea", "Jasmine Milk", "Oolong Milk", "Thai Red & Green"],
    fromPrice: "from $6.50",
    tone: "cream",
  },
  {
    id: "kids",
    title: "Kid-friendly",
    blurb: "Slushes, shakes and milk drinks made gentle and fun for kids.",
    image: "/placeholders/service-6.jpg",
    alt: "Colourful slush and milkshake drinks styled for kids",
    swatch: "bg-peach",
    picks: ["Honey Dew Slush", "Choco Oreo Shake", "Taro Milk", "Chocolate Milk"],
    fromPrice: "from $5",
    tone: "peach",
  },
];

const toneBg: Record<Cat["tone"], string> = {
  cream: "bg-cream",
  matcha: "bg-matcha/40",
  peach: "bg-peach/35",
  lychee: "bg-lychee/40",
  espresso: "bg-espresso/15",
};

export default function Categories() {
  return (
    <section id="menu" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <p className="eyebrow text-espresso">02 — The menu</p>
            <h2 className="h-display mt-4 text-[clamp(2.4rem,5.5vw,4.6rem)] text-ink">
              Six ways to drink at <span className="italic">Luxe</span>.
            </h2>
          </div>
          <p className="md:max-w-sm text-ink/80 leading-snug">
            Six categories, each with today&apos;s line-up. Every cup is built
            fresh in store — you pick the sweetness, ice and toppings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {cats.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={[
                "group relative overflow-hidden rounded-3xl border border-line flex flex-col",
                toneBg[c.tone],
              ].join(" ")}
            >
              <div className="relative aspect-[5/4] md:aspect-auto md:h-[260px] overflow-hidden bg-espresso/30">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                  loading={i < 3 ? "eager" : "lazy"}
                />
                {/* Strong, consistent scrim so overlay text always passes
                    contrast regardless of underlying photo brightness */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/10" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${c.swatch}`} />
                  <span className="text-cream text-xs uppercase tracking-widest [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-cream text-ink text-[0.7rem] uppercase tracking-widest px-2.5 py-1 rounded-full shadow-soft">
                  {c.fromPrice}
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-cream [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
                  <h3 className="font-display text-2xl md:text-[1.85rem] leading-tight">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-cream/95 max-w-[28ch]">
                    {c.blurb}
                  </p>
                </div>
              </div>

              <div className="px-5 py-4 md:py-5 flex flex-wrap gap-2 items-center mt-auto">
                {c.picks.map((p) => (
                  <span
                    key={p}
                    className="text-[0.78rem] text-ink/85 bg-cream/80 border border-line rounded-full px-2.5 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.22em] text-ink/65">
          Menu items shown reflect current public sources · prices subject to change
        </p>
      </div>
    </section>
  );
}
