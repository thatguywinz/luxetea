---
description: Build or polish a premium, visual-first, scroll-animated Webrivio client website from CLIENT_INFO.md using this project's AGENTS.md rules.
---

# Webrivio Visual-First Build Skill

You are building a premium, conversion-focused, visual-first website for a Webrivio local business client.

Webrivio positioning:
"We build websites that turn visitors into customers."

Your job is not to create a basic information website. Your job is to create a beautiful, premium, interactive web experience that feels custom, modern, visually rich, alive, and built to convert.

## Required Reading

Before writing code, read:
- AGENTS.md
- CLAUDE.md
- CLIENT_INFO.md
- docs/WEBRIVIO_VISUAL_SYSTEM.md if it exists
- package.json
- current app/components structure
- public/uploads if it exists
- public/placeholders if it exists
- public/inspiration if it exists
- ASSET_CREDITS.md if it exists
- .claude/skills/frontend-design/SKILL.md if it exists

Use the Webrivio standards in AGENTS.md and the client-specific details in CLIENT_INFO.md.

## Frontend Design Integration

Before building visual sections, use the frontend-design helper skill thinking.

Use it to improve:
- Aesthetic direction
- Typography
- Color palette
- Visual hierarchy
- Layout rhythm
- Image treatment
- Motion style
- Avoidance of generic AI frontend patterns

Do not let frontend-design override:
- CLIENT_INFO.md
- Webrivio conversion rules
- Truthfulness rules
- Local SEO requirements
- Asset priority rules
- Placeholder image honesty rules

The final website must combine:
- Webrivio conversion strategy
- Client-specific positioning
- Frontend-design visual taste
- Real or placeholder imagery
- Premium scroll-driven motion

## Automatic Asset Preflight

Before building, inspect:
- `/public/uploads`
- `/public/placeholders`

If `/public/uploads` has real client assets, prioritize those.

If `/public/uploads` has fewer than 4 usable images and `/public/placeholders` has fewer than 5 usable images:
1. Check if `npm run fetch-assets` exists.
2. Check if PEXELS_API_KEY is available through current `.env.local`, environment variables, or the starter `.env.local` fallback.
3. If available, run `npm run fetch-assets` before building.
4. If unavailable, ask for the API key or continue with premium coded placeholders if the user wants to proceed.

Do not stop the build only because photos are missing.
Missing images should never cause a text-heavy fallback.

## Client Info Validation

Before building, check CLIENT_INFO.md.

If any required information is missing, stop and list only the missing fields clearly.

Required fields:
- Business Name
- Industry
- City
- Service Area
- Main Services, minimum 3
- Design Direction section
- Vibe References, minimum 2
- Design Ambition
- Hero Visual Direction
- Image Style Preference
- Desired First Impression
- Primary CTA wording
- Pricing Posture

Do not build if required fields are missing.

Optional fields improve quality but do not block the build.

Never invent:
- Awards
- Reviews
- Certifications
- Licenses
- Insurance
- Years in business
- Guarantees
- Prices
- Customer names
- Real project photos
- Review claims
- Before/after proof

## Non-Negotiable Quality Standard

The first draft must already look client-presentable.

It should not feel like:
- A wireframe
- A document with buttons
- A generic template
- A stack of text blocks
- A basic local business site
- A SaaS template with swapped words
- A text-heavy AI-generated landing page

It should feel:
- Premium
- Visual
- Alive
- Custom
- Polished
- Modern
- Intentional
- Worth far more than $497

## Visual-First Rule

Every major section must have a visual anchor.

A visual anchor can be:
- Real photo
- Placeholder photo
- Image card
- Gallery grid
- Before/after frame if real assets exist
- Service image tile
- Interactive visual panel
- Icon system
- Map/service area visual
- Process timeline
- Large typographic composition
- Abstract premium background
- Motion-led layout
- Split-screen media section
- Sticky scroll visual section
- Horizontal scroll gallery
- Pinned GSAP section
- Image reveal animation

Do not build long text-only sections.

If assets are missing, create tasteful visual placeholders and add clear comments:
- TODO: Replace with real hero photo.
- TODO: Add client service photo.
- TODO: Add real before/after project images.

Missing images should never cause a boring text fallback.

## Asset Priority

Use assets in this order:
1. Real client assets from `/public/uploads`.
2. Placeholder/demo stock assets from `/public/placeholders`.
3. Abstract coded visual placeholders with clear TODO comments.

If placeholder images are used:
- Do not describe them as real client work.
- Do not use them as proof.
- Do not imply they are the team, customers, completed projects, or before/after results.
- Prefer neutral labels like "service visual," "material detail," "design placeholder," or use them as background atmosphere.
- Keep TODO comments near image usage so they can be replaced.

## Text Density Rules

Keep copy short, sharp, and scannable.

Rules:
- Hero paragraph max 2 lines.
- Section intros max 2 sentences.
- Service card descriptions max 18 words.
- Process step descriptions max 16 words.
- FAQ answers max 2 short sentences.
- Avoid paragraphs longer than 3 lines on desktop.
- On mobile, avoid stacked text blocks with no visual break.
- Use short headlines, proof points, cards, icons, media, and CTAs instead of essays.

If a section becomes text-heavy, redesign it visually before finishing.

## Design Calibration

Use the Vibe References in CLIENT_INFO.md to calibrate the visual direction.

Match the feeling, spacing, typography, rhythm, interaction style, and design maturity.

Do not copy exact layouts, assets, branding, or protected creative work.

Use the selected Design Ambition:
- Editorial: magazine-like, refined, strong typography, narrative image layouts
- Refined: quiet luxury, whitespace, restraint, polished details
- Bold: huge type, high contrast, raw layout, memorable composition
- Trustworthy-direct: clean grid, strong CTAs, practical, urgent, conversion-first
- Warm-crafted: photography-forward, friendly, human, personal

The site must not feel like a generic local business template.

## Premium Composition Standard

Build with the level of care expected from premium design-gallery websites, without claiming awards.

Required mindset:
- The first viewport must create desire.
- The visual rhythm must change every 1-2 sections.
- The site must feel intentionally art-directed.
- Images must be treated as design objects, not dropped into cards.
- Motion must support the story, not decorate randomly.
- CTAs must be clear without ruining the design.
- No filler sections.

Avoid repetitive card grids.

Avoid stacked sections that all look the same.

Every 1-2 sections, change the rhythm:
- Split layout
- Full-bleed media
- Sticky section
- Grid mosaic
- Large typography
- Horizontal movement
- CTA strip
- Timeline
- Gallery
- Interactive cards

## Real Scroll-Driven Animation Requirement

At least one section must use real scroll-driven animation when technically appropriate.

This must be more than simple fade-in-on-scroll.

Prefer one of:
- GSAP ScrollTrigger pinned service section
- GSAP scrubbed image/story section
- Sticky scroll storytelling section
- Horizontal scroll gallery controlled by vertical scroll
- Parallax image reveal tied to scroll progress
- Sequential process section tied to scroll progress

Use GSAP ScrollTrigger only where it improves the experience.

If GSAP is not appropriate for the specific page, explain briefly and use strong Framer Motion scroll interactions instead.

Default expectation:
- Framer Motion for reveals and microinteractions
- GSAP ScrollTrigger for at least one premium scroll-driven section

## Visual Composition Requirements

The first draft should include at least 6 of these visual treatments:
- Split hero with strong media panel
- Large image mask or framed media card
- Horizontal service image cards
- Sticky scroll service/story section
- Before/after or gallery mosaic only when real assets exist
- Gallery mosaic with neutral placeholder images when real work photos are missing
- Process timeline with motion
- Interactive hover cards
- Floating trust badges
- Service area/map-inspired visual
- Testimonial or review-theme cards
- FAQ accordion with motion
- Final CTA with visual background
- Subtle parallax image movement
- Scroll-triggered section reveals
- Horizontal scroll gallery
- Large typography break section

If real photos are available, use them.

If no real photos are available, use `/public/placeholders`.

If no placeholder photos are available, create premium coded visuals with gradients, subtle noise, geometric shapes, icons, typography, and TODO comments.

## Image Rules

Use the Next.js Image component for local or remote images when practical.

Use local images from:
- /public/uploads
- /public/placeholders

Do not rely on random broken external image URLs.

Use descriptive alt text.

Do not use images that imply fake work, fake team members, fake testimonials, fake customers, or fake results.

Do not invent before/after proof.

## Animation Rules

Use animation to make the site feel expensive and alive.

Use Framer Motion for:
- Hero entrance
- Section reveals
- Card reveals
- Hover states
- Button microinteractions
- FAQ transitions
- Testimonial transitions
- Image/card motion

Use GSAP for meaningful scroll-driven sections:
- ScrollTrigger timelines
- Sticky scroll storytelling
- Pinned sections
- Scrubbed visual transitions
- Horizontal scroll galleries
- Premium scroll-based reveals

Animation standard:
- Smooth
- Subtle
- Premium
- Fast
- Responsive
- Conversion-supporting

Avoid:
- Bouncy childish motion
- Too much movement
- Slow animations
- Scroll hijacking
- Animations that hurt mobile performance
- Animations that distract from CTAs

## Required Website Structure

Unless CLIENT_INFO.md says otherwise, build:
- Home
- Services
- About
- Work / Gallery
- Contact

If building a one-page demo, include all of these as clear sections.

## Required Sections

Include:
- Premium visual hero
- Clear headline and subheadline
- Primary CTA using exact wording from CLIENT_INFO.md
- Secondary CTA when useful
- Click-to-call CTA
- Sticky mobile CTA
- Trust section with real/provided proof only
- Visual services section
- Why choose us section
- Process section
- Work/gallery section or visual placeholder
- Testimonials or review-themes section
- FAQ section based on objections
- Contact/quote form
- Final visual CTA
- Footer

## Conversion Strategy

Use the Primary CTA wording from CLIENT_INFO.md exactly across primary buttons.

Use the Pricing Posture to shape conversion copy:
- Show prices openly: include clear pricing sections
- Starting at anchors: show soft price anchors per service
- No prices, quote-based only: emphasize quote request, inspection, consultation, or callback
- Free first something: make the free offer visible in hero, CTA sections, and final CTA

Use the #1 Customer Objection to write:
- Hero reassurance
- FAQ questions
- Trust section copy
- CTA support text
- Service section reassurance

Use the Offer or Guarantee only if provided.

Do not invent offers or guarantees.

## Trust Strategy

Use only verified or provided trust signals.

If Years in Business, certifications, licenses, insurance, real reviews, or real testimonials are provided, use them.

If review themes are provided, use them to write believable trust copy.

If actual testimonials are not provided, do not fabricate customer quotes.

Use sections like:
- What customers mention most
- Why locals choose them
- Built around trust, clarity, and follow-through

## SEO Rules

Create strong local SEO structure.

Include:
- Page metadata
- One H1 per page
- Clean H2 hierarchy
- Local service keywords naturally
- Service area content
- FAQ content
- Semantic HTML
- Image alt text
- Local business schema when enough real business info exists

Do not keyword stuff.

Do not invent business details for schema.

If Final Domain is provided, use it for canonical URLs and structured data.

## Form Rules

Build a clean lead form with fields appropriate to the niche.

Default fields:
- Name
- Phone
- Email
- Service needed
- Message

For emergency-service businesses, make phone/contact urgency clear.

For medspas, dentists, or consultation-based businesses, make the form feel appointment-oriented.

Use React Hook Form and Zod if forms are implemented.

## Technical Rules

Use:
- Next.js App Router
- Tailwind CSS
- Framer Motion
- GSAP ScrollTrigger for meaningful scroll-driven animation
- Lenis when appropriate
- Lucide React
- React Hook Form
- Zod

Keep code:
- Clean
- Componentized
- Responsive
- Accessible
- Fast
- Maintainable

Before writing Next.js-specific code, respect the Next.js agent rules in AGENTS.md and use the local Next.js docs if needed.

## Build Workflow

1. Read AGENTS.md, CLAUDE.md, CLIENT_INFO.md, docs/WEBRIVIO_VISUAL_SYSTEM.md, package.json, current project structure, public asset folders, ASSET_CREDITS.md if it exists, and frontend-design helper skill if it exists.
2. Validate required fields in CLIENT_INFO.md.
3. If required fields are missing, stop and list them.
4. Run the automatic asset preflight.
5. Use frontend-design thinking to create the design direction.
6. If required fields are present, create a short visual build plan.
7. The plan must include:
   - Visual direction
   - Typography/color direction
   - Image/asset usage
   - Animation approach
   - The real scroll-driven section planned
   - Section rhythm
   - Conversion approach
8. Build directly in code.
9. Create a visually rich first draft.
10. Audit the result yourself.
11. Reduce text density.
12. Add or improve visuals, image sections, motion, spacing, and interaction.
13. Ensure at least one real scroll-driven section exists unless there is a clear technical reason not to.
14. Improve mobile layout, CTA strength, local SEO, accessibility, performance, and code cleanliness.
15. Run lint/build checks if available and fix errors directly.
16. Keep explanations short.
17. Prioritize finished code over long explanations.

## Premium Quality Rules (hard requirements — build fails if unmet)

Hard requirements derived from a live audit of a shipped Webrivio demo. They take precedence over the softer guidance above, and the Final Quality Gate at the end of this file enforces them. A build that violates any rule here is not finished.

### Image Treatment Rule (highest priority)

- NEVER use the same image file in more than one visible slot on a page (hover-reveal previews count as visible).
- Minimum unique images per page = hero + 1 per service + 1 per visible process step + 3 gallery (typically ~12-14). If short, fetch/generate more via Pexels.
- Captions MUST match the image. Stock/placeholder images use neutral, truthful captions (e.g. "asphalt shingle detail"), NEVER "our installation" / "completed job". "Completed job" language is reserved for real `/public/uploads` assets.
- Every `<img>` needs a descriptive, service+location-aware alt. No empty alt.

### Exceptional Hero Rule

- Hero LCP image must be preloaded/priority; first meaningful paint of the hero (image + headline) within ~1.5s. Headline reveal animation <= 0.8s and MUST NOT block the image from painting. No multi-second blank/empty hero.
- Hero image = a SCENE (finished roof/home, context, light), not a material/texture close-up. Real `/public/uploads` first, then best Pexels. Never a reused placeholder.
- Any nav/text over the hero image must keep >= 4.5:1 contrast (scrim or solid bar).
- Build a SEPARATE mobile hero composition (full-height image, type >= 2.25rem, CTA + tap-to-call in the first viewport). Do not just stack/scale the desktop hero.
- Keep CTA + tap-to-call + one trust line + scroll cue above the fold.

### GSAP Motion Minimums (>= 2 scrubbed moments + 1 variety type)

- At least TWO scroll-SCRUBBED moments (e.g. a pinned step sequence AND a clip-path/scale image reveal or parallax pair). One pinned section alone fails.
- Plus one variety element (horizontal track, marquee, or scrubbed text highlight).
- Don't over-animate: cap at ~3-4 real moments; the rest are simple enter reveals.
- ALL ScrollTrigger honors `prefers-reduced-motion` and DISABLES pin/horizontal on < 768px (replace with a stacked reveal), not merely restyles it.

### Mobile Drama Rule

- Form inputs and selects font-size >= 16px (prevents iOS zoom-on-focus).
- Sticky bottom call/quote bar on < 768px; phone is `tel:`-linked everywhere.
- Dedicated mobile hero (see Exceptional Hero Rule). Tap targets >= 44px.
- Verify pinned/horizontal GSAP is disabled on phones.

### Conversion Without Clutter Rule

- CTA in: hero, after services, after process/work, final section, and the sticky mobile bar.
- Form: <= 5 fields, only Name + Phone required (and actually enforce required via the Zod schema), service as a `<select>`, inline validation, in-page success state.
- Proof must be REAL and verifiable only: live Google rating/count, license #, years, insured amount, service-area map. NEVER invent quotes, ratings, names, awards, or before/after results.

### Visual Rhythm Rule (light — starter already does this; keep it true)

- Alternate dark/light section backgrounds at least twice.
- Max 2 consecutive sections that share the same layout pattern.
- At least one full-bleed media moment and one oversized-type/number moment.
- One industry-specific SIGNATURE MOMENT per build (see `SIGNATURE_MOMENT` in CLIENT_INFO.md) using REAL assets only.

### SEO & Structure Rule

- Add LocalBusiness JSON-LD (NAP + areaServed + telephone), `sitemap.xml`, and `robots.txt`.
- Default to multi-page (one page per core service + a service-area page) unless `SITE_SHAPE` in CLIENT_INFO.md is `single`.

## Final Quality Gate

The build is not done until it passes this gate. Run all three steps in order, and fix problems in code rather than just reporting them.

### Step 1 — Re-scroll pass

Re-scroll the whole page at desktop width AND at a 390px mobile viewport. For every section, note its motion, its media treatment, and any image that appears more than once.

### Step 2 — Hard-fail checklist

Every item must pass. If any fails, fix it before continuing.

**Images & assets**
- No image file appears in more than one visible slot (hover-reveal previews count).
- Every image has descriptive, non-empty alt text.
- No caption presents a stock or placeholder image as the client's real or completed work.
- Missing real assets are marked with TODO comments, never shown as proof.

**Hero**
- The hero paints within ~1.5s — no multi-second blank or empty hero.
- The hero image is a real scene, not a material or texture close-up.
- Nav and text over the hero stay readable (>= 4.5:1 contrast).
- A dedicated mobile hero exists — not a stacked or scaled desktop hero.

**Motion**
- At least 2 scroll-scrubbed moments exist.
- `prefers-reduced-motion` is honored; pinned/horizontal GSAP is disabled (not just restyled) below 768px.
- Only one responsive variant of each section renders at a time.

**Mobile & conversion**
- Form inputs and selects are >= 16px; tap targets are >= 44px.
- A sticky call/quote bar is present below 768px.
- The exact Primary CTA wording from CLIENT_INFO.md is used on every primary button.
- The form has <= 5 fields, with Name + Phone required and enforced in the Zod schema.

**Trust & SEO**
- Trust and testimonial sections contain only real, verifiable proof — no invented quotes, ratings, names, awards, or before/after results.
- LocalBusiness JSON-LD, `sitemap.xml`, and `robots.txt` are present.
- One H1 per page, a clean H2 hierarchy, and local keywords used naturally.

**Craft**
- The site is visual-first, not text-heavy; every major section has a visual anchor.
- Layout rhythm varies — no more than 2 consecutive sections share a pattern.
- The design matches the selected Design Ambition and reflects the Vibe References.
- Copy sounds human and specific, with no AI-tell phrasing.
- The code is componentized and the project builds (or is build-ready).

### Step 3 — Score gate

Score these 6 axes from 1-10:
- Hero (composition + load speed)
- Motion meaningfulness
- Visual richness
- Image uniqueness
- Mobile polish
- Conversion clarity

Ship only if the total is >= 42/60 AND no single axis is below 6. Otherwise iterate on the code and re-run the gate — do not just report the score.
