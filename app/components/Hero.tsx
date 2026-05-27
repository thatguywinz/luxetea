"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BUSINESS } from "../lib/business";

const RISE = {
  hidden: { opacity: 1, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  // Subtle parallax: image cluster drifts up; floating chips drift differently
  // to create depth as you start scrolling.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const chipY1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const chipY2 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-20 overflow-hidden"
    >
      {/* Decorative outlined numeral — editorial accent behind the headline */}
      <span
        aria-hidden
        className="hidden md:block pointer-events-none absolute -left-4 top-10 font-display text-[26rem] leading-none select-none"
        style={{ WebkitTextStroke: "1px rgba(42,39,37,0.05)", color: "transparent" }}
      >
        01
      </span>
      {/* DESKTOP / TABLET HERO --------------------------------------------- */}
      <div className="hidden md:block relative">
        <div className="mx-auto max-w-[1480px] px-10 grid grid-cols-12 gap-10 items-end">
          <motion.div className="col-span-7 relative z-10" style={{ y: headlineY }}>
            <motion.p
              initial="hidden"
              animate="show"
              variants={RISE}
              transition={{ duration: 0.5, delay: 0.02, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow text-espresso flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-espresso" />
              01 · Davisville · 230 Merton St
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={RISE}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="h-display mt-6 text-[clamp(3.4rem,8vw,7.2rem)] text-ink"
            >
              Fresh tea,
              <br />
              coffee &amp; matcha,
              <br />
              <span className="italic text-espresso">made by hand.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={RISE}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-md text-lg leading-snug text-ink/80"
            >
              A cozy Midtown cafe near Davisville Station. Fruit teas,
              Vietnamese coffee, cold brew and matcha &mdash; built daily, one cup
              at a time.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={RISE}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
              variants={RISE}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex items-center gap-6 text-sm text-ink/75"
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
          </motion.div>

          {/* Hero image cluster */}
          <motion.div className="col-span-5 relative" style={{ y: imgY }}>
            <motion.div
              initial={{ opacity: 1, scale: 1.03, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
              initial={{ opacity: 1, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: chipY1 }}
              className="absolute -left-8 top-10 bg-cream rounded-2xl shadow-soft border border-line px-4 py-3 flex items-center gap-3"
            >
              <span className="h-9 w-9 rounded-full bg-lychee" />
              <div className="leading-tight">
                <p className="text-[0.7rem] uppercase tracking-widest text-ink/65">
                  Today
                </p>
                <p className="text-sm font-medium text-ink">Berry Blossom Tea</p>
              </div>
            </motion.div>

            {/* Floating price tag */}
            <motion.div
              initial={{ opacity: 1, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ y: chipY2 }}
              className="absolute -right-6 bottom-12 bg-ink text-cream rounded-2xl shadow-cup px-4 py-3 flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-peach" />
              <div className="leading-tight">
                <p className="text-[0.65rem] uppercase tracking-widest text-cream/85">
                  Price range
                </p>
                <p className="text-sm font-medium">$10–20 per visit</p>
              </div>
            </motion.div>

            {/* Floating sweetness card */}
            <motion.div
              initial={{ opacity: 1, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -right-2 -top-2 bg-matcha rounded-full px-4 py-2 text-xs font-medium text-ink shadow-soft"
            >
              50% sweet · less ice
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="mx-auto max-w-[1480px] px-10 mt-14 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-ink/65">
          <span>Scroll for today&apos;s menu</span>
          <span className="flex items-center gap-2">
            <span className="h-px w-12 bg-ink/40" />
            01 / 09
          </span>
        </div>
      </div>

      {/* MOBILE HERO ------------------------------------------------------- */}
      <div className="md:hidden">
        <div className="relative px-4">
          <motion.div
            initial={{ opacity: 1, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
              <p className="eyebrow text-cream">Today&apos;s signature</p>
              <h1 className="h-display text-cream text-[2.6rem] leading-[0.95] mt-2">
                Fresh tea,
                <br />
                made by hand.
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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

          <p className="mt-4 text-sm text-ink/75 leading-snug">
            Cozy Midtown cafe near Davisville. Fruit teas, Vietnamese coffee,
            cold brew &amp; matcha — handcrafted daily.
          </p>
        </div>
      </div>
    </section>
  );
}
