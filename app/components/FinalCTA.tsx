import { BUSINESS } from "../lib/business";

export default function FinalCTA() {
  return (
    <section id="final-cta" className="relative bg-espresso-deep text-cream overflow-hidden">
      <div
        role="presentation"
        className="absolute inset-0 opacity-60 bg-cover bg-center"
        style={{ backgroundImage: "url(/placeholders/texture-1.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-espresso-deep via-espresso-deep/85 to-espresso-deep/60" />
      </div>

      {/* Decorative outlined numeral */}
      <span
        aria-hidden
        className="hidden md:block pointer-events-none absolute right-0 top-0 font-display text-[28rem] leading-none select-none"
        style={{ WebkitTextStroke: "1px rgba(255,248,236,0.05)", color: "transparent" }}
      >
        09
      </span>

      <div className="relative mx-auto max-w-[1480px] px-5 md:px-10 py-20 md:py-36 text-center">
        <p className="eyebrow text-peach flex items-center justify-center gap-3">
          <span className="inline-block w-8 h-px bg-peach" />
          09 — Come thirsty
          <span className="inline-block w-8 h-px bg-peach" />
        </p>
        <h2 className="h-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] mt-6 text-cream">
          One walk.
          <br />
          <span className="italic text-peach">One perfect cup.</span>
        </h2>
        <p className="mt-7 text-cream/85 max-w-md mx-auto leading-snug">
          Drop in to 230 Merton St in Davisville. Tell us a mood, we&apos;ll
          pour the drink.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#menu"
            className="inline-flex items-center justify-center gap-2 min-h-[56px] px-7 rounded-full bg-peach text-ink font-medium transition-all duration-200 hover:bg-cream hover:-translate-y-0.5"
          >
            {BUSINESS.primaryCta} <span aria-hidden>→</span>
          </a>
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 min-h-[56px] px-6 rounded-full border border-cream/70 text-cream font-medium transition-all duration-200 hover:bg-cream hover:text-ink"
          >
            {BUSINESS.ctaSecondary}
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.22em] text-cream/65">
          <span>230 Merton St · Toronto</span>
          <span className="hidden md:inline">·</span>
          <span>{BUSINESS.hoursLine}</span>
          <span className="hidden md:inline">·</span>
          <a href={BUSINESS.phoneHref} className="hover:text-cream text-peach">
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
