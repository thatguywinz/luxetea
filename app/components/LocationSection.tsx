"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "../lib/business";

export default function LocationSection() {
  return (
    <section id="visit" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14 items-stretch">
        <div className="md:col-span-5">
          <p className="eyebrow text-espresso">06 — Visit Luxe</p>
          <h2 className="h-display mt-4 text-[clamp(2.4rem,5vw,4.2rem)] text-ink">
            Find us in <span className="italic">Midtown.</span>
          </h2>
          <p className="mt-5 text-ink/75 leading-snug max-w-md">
            A short walk from Davisville Station and the Kay Gardner Beltline
            Trail — easy stop for commuters, students and trail walkers.
          </p>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[
              { k: "Address", v: `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.region} ${BUSINESS.postal}` },
              { k: "Hours", v: BUSINESS.hoursLine },
              { k: "Phone", v: BUSINESS.phone, href: BUSINESS.phoneHref },
              {
                k: "Neighbourhood",
                v: "Davisville · Mount Pleasant · Yonge & Eglinton · Deer Park",
              },
            ].map((row) => (
              <div key={row.k} className="grid grid-cols-3 gap-4 py-4">
                <dt className="eyebrow text-ink/70">{row.k}</dt>
                <dd className="col-span-2 text-ink/90 text-sm md:text-base leading-snug">
                  {row.href ? (
                    <a href={row.href} className="hover:text-ink underline-offset-4 hover:underline">
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noopener" className="btn-primary">
              {BUSINESS.ctaSecondary} <span aria-hidden>→</span>
            </a>
            <a href={BUSINESS.phoneHref} className="btn-ghost">
              Call · {BUSINESS.phone}
            </a>
          </div>

          <p className="mt-5 text-[0.7rem] uppercase tracking-[0.2em] text-ink/70">
            Please verify hours on Google before you visit
          </p>
        </div>

        {/* Map-inspired visual */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden border border-line aspect-[5/4] bg-matcha/40"
          >
            <svg
              viewBox="0 0 600 480"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M40 0H0V40"
                    fill="none"
                    stroke="rgba(42,39,37,0.07)"
                    strokeWidth="1"
                  />
                </pattern>
                <linearGradient id="rd" x1="0" y1="0" x2="1" y2="0.4">
                  <stop offset="0%" stopColor="#7B4B32" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7B4B32" stopOpacity="0.85" />
                </linearGradient>
              </defs>
              <rect width="600" height="480" fill="url(#grid)" />
              {/* Streets */}
              <path d="M-20,180 C 120,160 220,260 360,210 C 480,175 540,250 660,220" stroke="url(#rd)" strokeWidth="3" fill="none" />
              <path d="M80,-20 C 90,140 200,260 220,500" stroke="rgba(123,75,50,0.5)" strokeWidth="2" fill="none" />
              <path d="M420,-20 C 410,140 380,290 460,500" stroke="rgba(123,75,50,0.5)" strokeWidth="2" fill="none" />
              <path d="M-20,330 C 120,320 240,360 400,340 C 520,326 580,360 660,350" stroke="rgba(123,75,50,0.4)" strokeWidth="2" fill="none" />
              {/* Trail */}
              <path d="M0,420 C 120,400 240,440 360,400 C 480,360 600,400 720,360" stroke="#6F8C68" strokeDasharray="6 8" strokeWidth="2" fill="none" />
              {/* Park blob */}
              <path d="M40,40 C 140,30 200,80 180,160 C 160,220 70,210 30,160 Z" fill="rgba(111,140,104,0.18)" />
            </svg>

            {/* Pin */}
            <div className="absolute left-[58%] top-[44%] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-peach/60 blur-xl scale-150" aria-hidden />
                <span className="relative flex h-12 w-12 rounded-full bg-ink text-cream items-center justify-center shadow-cup">
                  <span className="font-display text-lg">L</span>
                </span>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-cream/95 text-ink text-xs font-medium px-3 py-1.5 rounded-full shadow-soft">
                  230 Merton St
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-widest text-ink/80 bg-cream/90 backdrop-blur-sm rounded-full px-4 py-2.5 w-fit">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-espresso" /> Yonge corridor
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-matcha-deep" /> Beltline trail
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-peach" /> Luxe Tea
              </span>
            </div>

            {/* Compass label */}
            <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-widest text-ink/80">
              Davisville · M4S
            </div>
          </motion.div>

          {/* TODO: Replace svg map illustration with real embedded Google Map once Maps API or static-map is set up. */}
        </div>
      </div>
    </section>
  );
}
