"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// TODO: confirm every answer with the owner before publishing.
const faqs = [
  {
    q: "Can I adjust the sweetness and ice?",
    a: "Yes — tell us how sweet you'd like it and how much ice. Most drinks can go from low sugar to extra sweet, with regular or less ice.",
  },
  {
    q: "Which drinks are caffeine-free or kid-friendly?",
    a: "Fruit teas can be made caffeine-light, and our kid-friendly menu (slushes, shakes, milk drinks) is caffeine-free. Just ask at the counter.",
  },
  {
    q: "Do you offer non-dairy milk?",
    a: "Most milk-based drinks can be made with a non-dairy option when available. Please confirm with our team in store.",
  },
  {
    q: "Where exactly are you?",
    a: "230 Merton St, Toronto — a short walk from Davisville Station and the Kay Gardner Beltline Trail.",
  },
  {
    q: "Can I order online?",
    a: "Best to walk in for now — every drink is built fresh. We'll update this site as soon as online ordering is confirmed.",
  },
  {
    q: "What does a typical visit cost?",
    a: "Drinks generally fall in the $5–$10 range per cup. Public sources list around $10–$20 per person per visit including toppings.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-cream py-16 md:py-32 overflow-hidden">
      <span
        aria-hidden
        className="hidden md:block pointer-events-none absolute -left-6 top-24 font-display text-[22rem] leading-none select-none"
        style={{ WebkitTextStroke: "1px rgba(42,39,37,0.06)", color: "transparent" }}
      >
        07
      </span>

      <div className="relative mx-auto max-w-[1480px] px-5 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="eyebrow text-espresso flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-espresso" />
            07 — Good to know
          </p>
          <h2 className="h-display mt-4 text-[clamp(2.2rem,4.5vw,3.6rem)] text-ink">
            Before you order.
          </h2>
          <p className="mt-5 text-ink/85 leading-snug max-w-sm">
            Quick answers to the questions we hear most at the counter.
          </p>
        </div>

        <div className="md:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <li key={f.q}>
                  <button
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left py-5 md:py-6 flex items-center justify-between gap-6 group"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="flex items-center gap-5">
                      <span className="eyebrow text-ink/65 w-10">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl md:text-2xl text-ink leading-snug">
                        {f.q}
                      </span>
                    </span>
                    <span
                      className={[
                        "h-9 w-9 rounded-full border flex items-center justify-center transition-colors",
                        isOpen
                          ? "bg-ink text-cream border-ink"
                          : "border-line text-ink/80",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="7" y1="2" x2="7" y2="12" className={isOpen ? "hidden" : ""} />
                        <line x1="2" y1="7" x2="12" y2="7" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pl-[3.75rem] pr-12 pb-6 text-ink/90 leading-relaxed max-w-2xl">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
