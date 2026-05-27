import { BUSINESS } from "../lib/business";

const items = [
  { k: "Address", v: "230 Merton St", accent: "bg-peach" },
  { k: "Nearest", v: "Davisville Station · 4 min walk", accent: "bg-matcha-deep" },
  { k: "Built fresh", v: "Tea · Coffee · Matcha", accent: "bg-lychee" },
  { k: "Hours", v: BUSINESS.hoursLine.replace("·", "/"), accent: "bg-espresso" },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-line bg-paper">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
        {items.map((it, i) => (
          <div
            key={it.k}
            className="relative py-5 md:py-7 px-4 md:px-6 first:pl-0 last:pr-0 group"
          >
            <div className="flex items-center gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full ${it.accent}`} />
              <p className="eyebrow text-ink/65">
                {String(i + 1).padStart(2, "0")} · {it.k}
              </p>
            </div>
            <p className="mt-2 text-sm md:text-[0.95rem] text-ink/90 leading-snug">
              {it.v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
