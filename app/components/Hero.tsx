"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BUSINESS } from "../lib/business";

const FADE_UP = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-20 overflow-hidden"
    >
      <h1 className="sr-only">
        Luxe Tea — fresh fruit tea, Vietnamese coffee, cold brew and matcha in
        Midtown Toronto near Davisville
      </h1>

      {/* DESKTOP / TABLET HERO --------------------------------------------- */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1480px] px-10 grid grid-cols-12 gap-10 items-end">
          <div className="col-span-7 relative z-10">
            <motion.p
              initial="hidden"
              animate="show"
              variants={FADE_UP}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="eyebrow text-espresso flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-espresso" />
              Davisville · 230 Merton St
            </motion.p>

            <motion.p
              aria-hidden="true"
              initial="hidden"
              animate="show"
              variants={FADE_UP}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="h-display mt-6 text-[clamp(3.4rem,8vw,7.2rem)] text-ink"
            >
              Fresh tea,
              <br />
              coffee &amp; matcha,
              <br />
              <span className="italic text-espresso">made by hand.</span>
            </motion.p>

            <motion.p
              initial="hidden"
              animate="show"
              variants={FADE_UP}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-7 max-w-md text-lg leading-snug text-ink/75"
            >
              A cozy Midtown cafe near Davisville Station. Fruit teas,
              Vietnamese coffee, cold brew and matcha &mdash; built daily, one cup
              at a time.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={FADE_UP}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-9 flex items-center gap-3"
            >
              <a href="#menu" className="btn-primary">
                {BUSINESS.primaryCta}
                <span aria-hidden>→</span>
              </a>
              <a href="#visit" className="btn-ghost">
                {BUSINESS.ctaSecondary}
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={FADE_UP}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-10 flex items-center gap-6 text-sm text-ink/60"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-matcha-deep animate-pulse" />
                Open today · {BUSINESS.hoursLine.split("·")[0].trim()}
              </span>
              <span className="hidden lg:inline">·</span>
              <span className="hidden lg:inline">
                Beltline Trail · Yonge &amp; Eglinton · Mount Pleasant
              </span>
            </motion.div>
          </div>

          {/* Hero image cluster */}
          <div className="col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 1.06, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-cup bg-cream-soft"
            >
              <Image
                src="/placeholders/hero.jpg"
                alt="Signature fruit tea with fresh fruit, ice and condensation on a warm cafe counter"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1280px) 540px, 40vw"
                className="object-cover"
              />
              {/* warm wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/30 via-transparent to-transparent" />
            </motion.div>

            {/* Floating chip - drink name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute -left-8 top-10 bg-cream rounded-2xl shadow-soft border border-line px-4 py-3 flex items-center gap-3"
            >
              <span className="h-9 w-9 rounded-full bg-lychee" />
              <div className="leading-tight">
                <p className="text-[0.7rem] uppercase tracking-widest text-ink/50">
                  Today
                </p>
                <p className="text-sm font-medium text-ink">Berry Blossom Tea</p>
              </div>
            </motion.div>

            {/* Floating price tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="absolute -right-6 bottom-12 bg-ink text-cream rounded-2xl shadow-cup px-4 py-3 flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-peach" />
              <div className="leading-tight">
                <p className="text-[0.65rem] uppercase tracking-widest text-cream/55">
                  Price range
                </p>
                <p className="text-sm font-medium">$10–20 per visit</p>
              </div>
            </motion.div>

            {/* Floating sweetness card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="absolute -right-2 -top-2 bg-matcha rounded-full px-4 py-2 text-xs font-medium text-ink/80"
            >
              50% sweet · less ice
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mx-auto max-w-[1480px] px-10 mt-14 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-ink/45"
        >
          <span>Scroll for today&apos;s menu</span>
          <span className="flex items-center gap-2">
            <span className="h-px w-12 bg-ink/30" />
            01 / 09
          </span>
        </motion.div>
      </div>

      {/* MOBILE HERO ------------------------------------------------------- */}
      <div className="md:hidden">
        <div className="relative px-4">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-cup"
          >
            <Image
              src="/placeholders/hero.jpg"
              alt="Signature fruit tea with fresh fruit and ice on a warm cafe counter"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/75 via-espresso-deep/10 to-transparent" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="bg-cream/90 text-ink text-[0.65rem] uppercase tracking-widest px-3 py-1.5 rounded-full">
                230 Merton St · Davisville
              </span>
              <span className="bg-matcha text-ink text-[0.65rem] uppercase tracking-widest px-3 py-1.5 rounded-full">
                Open today
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <p className="eyebrow text-cream/80">Today&apos;s signature</p>
              <p
                aria-hidden="true"
                className="h-display text-cream text-[2.6rem] leading-[0.95] mt-2"
              >
                Fresh tea,
                <br />
                made by hand.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-5 flex flex-col gap-2"
          >
            <a href="#menu" className="btn-primary w-full">
              {BUSINESS.primaryCta} <span aria-hidden>→</span>
            </a>
            <a
              href={BUSINESS.phoneHref}
              className="btn-ghost w-full"
              aria-label={`Call ${BUSINESS.phone}`}
            >
              Call · {BUSINESS.phone}
            </a>
          </motion.div>

          <p className="mt-4 text-sm text-ink/70 leading-snug">
            Cozy Midtown cafe near Davisville. Fruit teas, Vietnamese coffee,
            cold brew &amp; matcha — handcrafted daily.
          </p>
        </div>
      </div>
    </section>
  );
}
