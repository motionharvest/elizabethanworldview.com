# UX Strategy: elizabethanworldview.com — "Shakespeare's World" book landing page

## Project Goal
A professional, engaging landing page for *Shakespeare's World: Seeing the Plays Through Elizabethan Eyes* (Krausnick, Lubarr & Goodheart; foreword by Tina Packer; Bloomsbury, early 2026). Centerpiece: a Three.js recreation of the cover's Ptolemaic celestial-spheres ("gyroscope") artwork. Primary conversion: pre-order / learn more; secondary: workshop interest.

## 1. Audience & Research
Derived from the book's own positioning (Bloomsbury overview + workshop copy):
- **Theater practitioners** — actors, directors, teachers (Shakespeare & Company lineage, Month-Long Intensive audience). Want practical, active tools.
- **Educators & students** — need an accessible entry to Elizabethan worldview concepts.
- **General Shakespeare lovers** — drawn by the "see the plays through their eyes" promise.
Pain point: the plays feel opaque because the underlying worldview (four elements, humors, great chain of being, correspondences) is alien to modern readers.
- Status: ✅ Done (derived from source materials)

## 2. Personas
Primary: professional/aspiring classical actor or director — decides on credibility (Shakespeare & Co., Tina Packer, Bloomsbury) and practical utility ("detailed notes for each play"). Secondary: lifelong learner — decides on fascination and readability.
- Status: ✅ Done (lightweight, evidence-based)

## 3. Reference Sites
Pattern baseline: publisher book pages (Bloomsbury), author sites, theatrical program aesthetics. Key validated patterns: hero with cover motif + one-line promise; social proof (foreword, institutional lineage); concept teasers; author bios with photos; single dominant CTA.
- Status: ✅ Done (patterns applied, not separately researched)

## 4. Page Architecture
1. **Hero** — crimson field, Three.js celestial spheres, title/subtitle, authors, foreword credit, CTA (pre-order / explore).
2. **About the book** — Bloomsbury overview copy + cover image.
3. **Four Lenses** — The Cosmos, The Great Chain of Being, Human Bodies (humors), Correspondences; period woodcut imagery.
4. **Lineage** — Dennis Krausnick & Shakespeare & Company story; production stills band.
5. **Authors** — Krausnick, Lubarr (photo), Goodheart (photo); Tina Packer foreword note.
6. **Workshops** — Rebecca Goodheart's four-evening series.
7. **Footer CTA** — Bloomsbury, publication date, contact.
- Status: ✅ Done

## 5. Design Optimization
Long-scroll narrative; alternating crimson/parchment sections for rhythm; generous serif hierarchy; scroll-reveal restraint; reduced-motion respected; images lazy-loaded via next/image.
- Status: ✅ Done

## 6. Visual Identity
- Keywords: scholarly, theatrical, illuminated, warm, timeless.
- Color: deep crimson `#6e1423`–`#8a1c2e` (cover field), parchment `#f1e8d2`, aged gold `#c9a548`, ink `#2a1a16`, muted sage `#8a9471`, dusty rose `#c98f8f` (ring hues from cover art).
- Type: Cormorant Garamond (display, close to cover's transitional serif) + EB Garamond (body); letterspaced small-caps kickers (matches cover's tracking).
- Motion: slow, orbital, dignified — nothing bouncy. Ring rotation ≈ celestial patience.
- Status: ✅ Done (tokens live in globals.css)

## 7. Build
Existing Next.js 16 App Router app (`src/app`), NOT Vite (project constraint). Three.js (plain, no R3F) client component `CelestialSpheres` renders nested tilted annular rings + central earth sphere on transparent canvas over crimson gradient; per-ring rotation speeds, group precession, pointer parallax, reduced-motion & offscreen pause, DPR clamp, full cleanup. Assets resized & copied to `public/images/`.
- Status: ✅ Done — verified with `npm run build` + dev-server screenshots

## 8. A/B Testing Backlog
Not started — site not yet live. First candidates when traffic exists: hero CTA label ("Pre-order" vs "Get the book"), subtitle emphasis (practical tool vs fascination), workshop section placement.
- Status: ❌ Not started

## Copy & Messaging
All copy sourced from the marketing folder (Bloomsbury overview, short bios, Goodheart 2025 bio, workshop descriptions) — lightly edited for web. No invented endorsements or claims.

## Last Updated
2026-07-06
