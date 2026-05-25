"use client";

import { motion } from "framer-motion";

export default function BigTypeBreak() {
  return (
    <section className="relative bg-cream py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-display text-ink text-[clamp(3rem,11vw,11rem)] leading-[0.88] tracking-tighter"
        >
          Fresh tea.
          <br />
          <span className="italic text-espresso">Friendly room.</span>
          <br />
          Made on Merton.
        </motion.h2>

        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-line pt-8">
          {[
            { k: "Daily steeped", v: "Tea, coffee, matcha" },
            { k: "Customizable", v: "Sweetness · ice · toppings" },
            { k: "Walk-in", v: "Quick, friendly counter" },
            { k: "Davisville", v: "230 Merton St · 4 min walk" },
          ].map((f) => (
            <div key={f.k}>
              <p className="eyebrow text-espresso">{f.k}</p>
              <p className="mt-2 text-ink/80 text-sm md:text-base leading-snug">{f.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
