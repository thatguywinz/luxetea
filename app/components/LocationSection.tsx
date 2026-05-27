"use client";

import { motion } from "framer-motion";
import { BUSINESS } from "../lib/business";

export default function LocationSection() {
  return (
    <section id="visit" className="relative bg-paper py-16 md:py-32 overflow-hidden">
      {/* Decorative outlined numeral */}
      <span
        aria-hidden
        className="hidden md:block pointer-events-none absolute -right-6 top-24 font-display text-[22rem] leading-none select-none"
        style={{ WebkitTextStroke: "1px rgba(42,39,37,0.06)", color: "transparent" }}
      >
        06
      </span>

      <div className="relative mx-auto max-w-[1480px] px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14 items-stretch">
        <div className="md:col-span-5">
          <p className="eyebrow text-espresso flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-espresso" />
            06 — Visit Luxe
          </p>
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

        {/* Real Google Maps embed (no API key required) */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden border border-line aspect-[5/4] bg-cream-soft shadow-soft"
          >
            <iframe
              title="Map showing Luxe Tea at 230 Merton St, Toronto"
              src="https://www.google.com/maps?q=230+Merton+St,+Toronto,+ON&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />

            {/* Pin label badge over the map */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-cream/95 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 shadow-soft border border-line">
              <span className="inline-flex h-7 w-7 rounded-full bg-ink text-cream items-center justify-center font-display text-sm">
                L
              </span>
              <span className="text-xs font-medium text-ink">230 Merton St</span>
            </div>

            {/* Open in maps overlay button */}
            <a
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              rel="noopener"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ink text-cream text-xs font-medium px-4 py-2.5 rounded-full shadow-cup hover:bg-espresso-deep transition-colors"
            >
              Open in Maps <span aria-hidden>→</span>
            </a>

            {/* Neighbourhood legend */}
            <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-widest text-ink bg-cream/95 backdrop-blur-sm rounded-full px-3.5 py-2 shadow-soft border border-line">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-espresso" /> Yonge corridor
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-matcha-deep" /> Beltline trail
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
