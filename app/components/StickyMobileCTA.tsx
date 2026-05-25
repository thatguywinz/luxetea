import { BUSINESS } from "../lib/business";

export default function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 px-3 pb-3 pt-2 pointer-events-none">
      <div className="pointer-events-auto rounded-2xl bg-ink/95 backdrop-blur-sm shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] flex items-stretch overflow-hidden">
        <a
          href={BUSINESS.phoneHref}
          className="flex-1 flex items-center justify-center gap-2 text-cream py-3 text-sm font-medium min-h-[52px]"
          aria-label={`Call Luxe Tea at ${BUSINESS.phone}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
          </svg>
          Call
        </a>
        <div className="w-px bg-cream/15" />
        <a
          href="#menu"
          className="flex-1 flex items-center justify-center gap-2 bg-peach text-ink py-3 text-sm font-semibold min-h-[52px]"
        >
          {BUSINESS.primaryCta}
        </a>
      </div>
    </div>
  );
}
