import { BUSINESS } from "../lib/business";

const items = [
  { k: "Address", v: "230 Merton St" },
  { k: "Nearest", v: "Davisville Station · 4 min walk" },
  { k: "Built fresh", v: "Tea · Coffee · Matcha" },
  { k: "Hours", v: BUSINESS.hoursLine.replace("·", "/") },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-line bg-paper">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
        {items.map((it) => (
          <div key={it.k} className="py-5 md:py-6 px-4 md:px-6 first:pl-0 last:pr-0">
            <p className="eyebrow text-ink/70">{it.k}</p>
            <p className="mt-1.5 text-sm md:text-[0.95rem] text-ink/90 leading-snug">
              {it.v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
