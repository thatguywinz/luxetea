import { BUSINESS } from "../lib/business";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/85">
      <div className="mx-auto max-w-[1480px] px-5 md:px-10 py-14 md:py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-9 w-9 rounded-full bg-cream text-ink items-center justify-center font-display text-lg">
              L
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-peach border-2 border-ink" />
            </span>
            <span className="font-display text-cream text-2xl">Luxe Tea</span>
          </div>
          <p className="mt-5 max-w-sm text-cream/65 leading-snug">
            A cozy Midtown Toronto tea and coffee shop near Davisville. Fruit
            tea, Vietnamese coffee, cold brew, matcha and milk tea — handcrafted
            daily.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-cream/45">Visit</p>
          <p className="mt-3 text-cream/85 leading-snug">
            {BUSINESS.street}
            <br />
            {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postal}
          </p>
          <p className="mt-3 text-cream/65 text-sm">{BUSINESS.hoursLine}</p>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-cream/45">Contact</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <a href={BUSINESS.phoneHref} className="hover:text-cream">
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a
                href={BUSINESS.googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="hover:text-cream"
              >
                Google Maps
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow text-cream/45">Explore</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><a href="#menu" className="hover:text-cream">Menu</a></li>
            <li><a href="#story" className="hover:text-cream">How it&apos;s made</a></li>
            <li><a href="#mood" className="hover:text-cream">Find your drink</a></li>
            <li><a href="#faq" className="hover:text-cream">Good to know</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-5 md:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-cream/45 max-w-[1480px] mx-auto">
        <p>© {new Date().getFullYear()} Luxe Tea · {BUSINESS.street}, Toronto.</p>
        <p>Site by Webrivio · Placeholder imagery for demo purposes only.</p>
      </div>
    </footer>
  );
}
