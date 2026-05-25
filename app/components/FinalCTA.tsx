import { BUSINESS } from "../lib/business";

export default function FinalCTA() {
  return (
    <section className="relative bg-espresso-deep text-cream overflow-hidden">
      <div
        role="presentation"
        className="absolute inset-0 opacity-60 bg-cover bg-center"
        style={{ backgroundImage: "url(/placeholders/texture-1.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-espresso-deep via-espresso-deep/85 to-espresso-deep/60" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-5 md:px-10 py-24 md:py-36 text-center">
        <p className="eyebrow text-peach">09 — Come thirsty</p>
        <h2 className="h-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] mt-6 text-cream">
          One walk.
          <br />
          <span className="italic text-peach">One perfect cup.</span>
        </h2>
        <p className="mt-7 text-cream/75 max-w-md mx-auto leading-snug">
          Drop in to 230 Merton St in Davisville. Tell us a mood, we&apos;ll
          pour the drink.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#menu" className="btn-primary bg-peach text-ink hover:bg-cream">
            {BUSINESS.primaryCta} <span aria-hidden>→</span>
          </a>
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener"
            className="btn-ghost border-cream/30 text-cream hover:bg-cream/10"
          >
            {BUSINESS.ctaSecondary}
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.22em] text-cream/55">
          <span>230 Merton St · Toronto</span>
          <span className="hidden md:inline">·</span>
          <span>{BUSINESS.hoursLine}</span>
          <span className="hidden md:inline">·</span>
          <a href={BUSINESS.phoneHref} className="hover:text-cream">
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
