# Webrivio Visual System

This is the internal visual standard for every Webrivio client website. Read it before building or polishing a site.

## Core Principle

Webrivio sites are **visual-first, not text-first**. A visitor should understand the business from imagery, composition, motion, and hierarchy before they read a single sentence. Text supports the visuals. Visuals never support the text.

The first viewport must already make the visitor feel the business is premium and worth contacting. If the hero looks like a document with buttons, the site has failed before scrolling.

## How the design layer works

The `frontend-design` helper skill is the design-quality layer. Use it to decide aesthetic direction, typography pairing, color relationships, image treatment, motion style, layout rhythm, and section composition.

`frontend-design` improves visual quality. It does **not** override:
- CLIENT_INFO.md
- Webrivio conversion rules
- Truthfulness rules
- Local SEO requirements
- Asset honesty rules

If a design choice hurts conversion, conversion wins.

## Asset priority

1. **Real client assets** in `/public/uploads` — always prefer these.
2. **Pexels placeholders** in `/public/placeholders` — demo-only atmosphere, never proof.
3. **Coded visual placeholders** — premium gradients, geometric composition, typography, noise — with clear `TODO:` comments for replacement.

Placeholder images must never be presented as the client's real work, team, customers, projects, before/after results, or testimonials. `ASSET_CREDITS.md` tracks every placeholder source.

## Section anchor rule

Every major section needs a **visual anchor**. A visual anchor is any of:
- Real or placeholder photograph used as a design object
- Image card, framed media, or masked composition
- Gallery grid or mosaic
- Service area / map-inspired visual
- Process timeline with motion
- Large typographic composition treated as a visual
- Sticky scroll story panel
- Horizontal scroll gallery
- Interactive card stack
- Premium abstract background composition

Long text-only sections are not allowed. If a section is becoming a document, redesign it visually before finishing.

## Copy rule

Copy stays short, sharp, scannable.

- Hero paragraph: max 2 lines
- Section intros: max 2 sentences
- Service card descriptions: max 18 words
- Process steps: max 16 words
- FAQ answers: max 2 short sentences

A visitor must understand the site in under 10 seconds of scanning.

## First viewport rule

The first viewport must be designed, not assembled. It should:
- Communicate niche, location, and value in seconds
- Carry a real visual anchor (photo, composition, or art-directed type)
- Show the Primary CTA from CLIENT_INFO.md exactly
- Feel intentionally art-directed, not template-arranged

## Section rhythm rule

Every 1-2 sections, change visual rhythm. Sections that look identical to the one before erode the premium feeling.

Rotate between treatments such as:
- Split hero with image panel
- Pinned service story (GSAP ScrollTrigger)
- Scroll-driven image reveal
- Horizontal scroll gallery
- Gallery mosaic
- Interactive service cards
- Floating trust badges
- Large typography break
- Process timeline
- Final visual CTA on a dark or full-bleed background

## Motion rule

At least one section uses **real scroll-driven animation** when technically appropriate. Fade-in-on-scroll alone is not enough.

Prefer one of:
- GSAP ScrollTrigger pinned section
- GSAP scrubbed image or story timeline
- Sticky scroll storytelling section
- Horizontal scroll gallery controlled by vertical scroll
- Parallax tied to scroll progress
- Sequential process tied to scroll progress

Framer Motion handles entrance reveals and microinteractions. Lenis adds smooth-scroll polish where useful. Motion should support the conversion path, never compete with it.

## Conversion rule

Visual quality must not hide CTAs.

- Primary CTA wording in CLIENT_INFO.md is reused **exactly** on every primary button
- Click-to-call is always present
- Sticky mobile CTA is always present
- No more than 2 button styles total
- Navigation stays obvious even with art-direction
- Final CTA section is a visual moment, not a footer afterthought

## Premium feel calibration

A Webrivio site at $497 should make the offer feel like an obvious yes — meaning the first draft should already feel like a $2k+ build. The bar is "Awwwards-submittable demo," even when the budget is local-business.

If the first draft looks like a wireframe, a stack of cards, a Tailwind template, or a SaaS landing page with local-business words swapped in, it has missed the bar. Revise the design directly before finishing.

## Examples of strong visual treatments

- **Split hero with image panel** — type on one side, full-bleed media on the other
- **Pinned service story** — services revealed sequentially as the visitor scrolls through a pinned panel
- **Scroll-driven image reveal** — hero image scales, masks, or crops based on scroll progress
- **Horizontal gallery** — work or service tiles drift horizontally as the page scrolls vertically
- **Gallery mosaic** — asymmetric grid of work/material/atmosphere images
- **Interactive service cards** — hover-driven hover states with image, type, and motion
- **Floating trust badges** — license, insurance, certification chips arranged as design objects, not a row of logos
- **Large typography break** — a full-bleed type composition between content sections, used as visual punctuation
- **Process timeline** — vertical or horizontal step sequence with motion tied to scroll
- **Final visual CTA** — dark or full-bleed closing section with the Primary CTA as the only focal point

## Mobile rule

Mobile must feel polished, not collapsed. Visual anchors stay. Motion stays subtle. CTAs remain easy to reach. Stacked text blocks without visual break are not acceptable on mobile.
