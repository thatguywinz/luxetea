<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:webrivio-rules -->
# Webrivio project rules

## What we build
Premium 5-page sites for local service businesses. Goal: more calls and form submissions. Price $497. Quality bar: Awwwards-submittable demo, $2k+ feel.

## Design philosophy
Every site commits to one designer-school direction (Editorial, Swiss, Quiet Luxury, Stripe-school, Brutalist Editorial, Active Theory–lite, Warm Confident). Pick one. Execute boldly. Blended schools = generic.

## Required gates (enforced by /webrivio-build)
1. CLIENT_INFO.md must have 2+ vibe references. Build halts otherwise.
2. DESIGN_CONCEPT.md must pass the self-reject check before any code is written.
3. Concept-library at `../concept-library/` is checked for reusable concepts before inventing new ones.
4. Shipped concepts are saved back to the library after self-audit passes.

## Hard bans (signal AI-generated)
- Centered hero with stacked text + button below
- 3-column card grid as default services
- Alternating white/gray sections
- `rounded-lg shadow-md` on everything
- Default Tailwind blue/purple brand color
- Gradient buttons (`bg-gradient-to-r`)
- Emoji as icons
- Hero headline below `clamp(3rem, 8vw, 6rem)`
- More than 2 button styles
- AI-tell copy ("in today's fast-paced world", "one-stop shop", "elevate your", "trusted partner")
- Concept names containing only "modern/clean/professional/premium" without a designer school

## Required on every build
- DESIGN_CONCEPT.md before code, passing self-reject check
- Hero pattern from skill library
- Section layouts vary — never repeat twice in a row
- 2+ full-bleed sections, 1+ dark section on home
- Signature element 4+ times
- Custom palette + real type pairing

## Stack
Next.js App Router + TypeScript + Tailwind + React Compiler. Framer Motion. GSAP only when needed. Lenis. RHF + Zod. next/image, next/font, App Router metadata.

## Agent behavior
Build directly. Short plan → code → audit → save concept. Don't over-explain. Mark placeholders `// TODO:`.

## Visual Quality Rule

Webrivio websites should be visual-first, not text-first.

Avoid text-heavy pages. Every major section should include a visual anchor such as imagery, layout composition, icon system, interactive card, timeline, gallery, media frame, or motion-led section.

If client assets are missing, create tasteful visual placeholders with clear TODO comments instead of falling back to plain text blocks.

The site should feel like a premium modern website, not a document with buttons.

## Frontend Design Rule

Use frontend-design thinking for Webrivio client websites.

Before building visual sections, decide:
- Aesthetic direction
- Typography direction
- Color palette
- Layout rhythm
- Image treatment
- Motion style
- Section rhythm

Avoid generic AI frontend patterns:
- Repetitive card grids
- Predictable SaaS layouts
- Random gradients
- Weak typography
- Flat sections with no depth
- Text-heavy blocks with buttons

Frontend-design must improve visual quality, but it must not override:
- CLIENT_INFO.md
- Conversion strategy
- Truthfulness rules
- Local SEO
- Asset honesty
- Placeholder image rules

## Text Density Rule

Keep copy short and high-impact.

Avoid long paragraphs.

Use concise headlines, short subheads, small proof points, visual cards, and strong CTAs.

The website should be easy to scan in under 10 seconds.

## Image Usage Rule

Use real client images from `/public/uploads` whenever available.

Use `/public/placeholders` only when real assets are missing.

Never invent real project photos, customer photos, testimonials, awards, certifications, or before/after proof.

## Asset Automation Rule

Real client images in `/public/uploads` are always preferred.

Auto-downloaded stock placeholders in `/public/placeholders` can be used for demos.

Placeholder images must never be described as real client work, real team photos, real customers, real projects, real results, or real testimonials.

Use ASSET_CREDITS.md to track placeholder image sources.

The site should still be visual-first even when real assets are missing.

## Real Scroll Animation Rule

For premium Webrivio sites, simple fade-in-on-scroll is not enough.

When technically appropriate, include at least one true scroll-driven interaction:
- Pinned section
- Scrubbed animation
- Scroll-controlled image reveal
- Horizontal gallery driven by vertical scroll
- Sticky service story
- Parallax tied to scroll progress

Use GSAP ScrollTrigger for this when it improves the site.

Do not add scroll animation just to show off. It must support the story, service explanation, or conversion path.

## First Draft Quality Rule

The first draft should not be treated as a rough wireframe.

It should already look client-presentable:
- Strong hero
- Premium visual composition
- Clear CTAs
- Smooth motion
- Real scroll-driven section
- Short copy
- Visual services
- Gallery or visual placeholder
- Strong mobile layout
- Local SEO structure
- Clean build-ready code

Before finishing, reduce text density and add visual anchors wherever the page feels like a document.

## Webrivio Global Quality Invariants

- Never use the same image file in more than one visible slot on a page (hover reveals count). Min ~12-14 unique images per page; expand the pool if short.
- Image captions must be truthful; stock/placeholder images are NEVER captioned as the client's own completed work. Invented proof of any kind is banned.
- Hero: priority/preloaded LCP image, no multi-second blank hero, a SCENE not a texture, readable nav over the image, and a dedicated mobile hero.
- Motion: >= 2 scrubbed scroll moments; honor `prefers-reduced-motion`; disable pin/horizontal on < 768px.
- Mobile: form inputs >= 16px; sticky tap-to-call bar; tap targets >= 44px.
- Default to multi-page routes (one per core service + a service-area page) unless `SITE_SHAPE` = single. Every build ships LocalBusiness JSON-LD, `sitemap.xml`, `robots.txt`, and non-empty alt on every image.
<!-- END:webrivio-rules -->