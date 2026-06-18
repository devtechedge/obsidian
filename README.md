# The Obsidian Archive

> A single-file, award-caliber creative showcase for a fictional generative digital sculpture collection. Built as a single `obsidian.html` file using React 18 (UMD), Tailwind Play CDN, Lenis smooth scroll, Three.js, and the Web Audio API — no build step, no bundler, no dependencies to install. Just open the file or push it to GitHub Pages.

**Live demo:** <https://devtechedge.github.io/obsidian/>

---

## Table of Contents

1. [Overview](#overview)
2. [Highlights](#highlights)
3. [Tech Stack](#tech-stack)
4. [File Structure](#file-structure)
5. [The 20 Complex Frontend Features](#the-20-complex-frontend-features)
   - [Phase 1 — Foundation & Cinematic Polish (Features 1–10)](#phase-1--foundation--cinematic-polish-features-110)
   - [Phase 2 — Interaction Layer (Features 11–20)](#phase-2--interaction-layer-features-1120)
6. [Design System](#design-system)
7. [Performance & Accessibility](#performance--accessibility)
8. [Mobile / Touch Adaptations](#mobile--touch-adaptations)
9. [Browser Support](#browser-support)
10. [Deployment](#deployment)
11. [Customization](#customization)
12. [Hidden Easter Eggs](#hidden-easter-eggs)
13. [Keyboard Shortcuts](#keyboard-shortcuts)
14. [Roadmap](#roadmap)
15. [License](#license)

---

## Overview

**The Obsidian Archive** is an immersive, single-page portfolio site for a fictional studio that "sculpts with code." It explores what happens when an editorial-magazine aesthetic meets a generative-art sensibility: bone-white space, ink-black typography, a single crimson accent, and six unique generative SVG sculptures that double as the portfolio.

Every interaction was hand-built — no UI kit, no template. The page weighs in at **one HTML file, ~3,650 lines, ~140 KB** (uncompressed) and ships with **20 distinct complex frontend features** layered on top of a fully responsive, accessibility-aware shell.

The project is intentionally framework-light: React is loaded via CDN UMD build, JSX is replaced with `React.createElement` (aliased to `h`), Tailwind is loaded via the Play CDN, and Three.js / Lenis / Web Audio API are all loaded from public CDNs. The result is a deployable artifact that runs anywhere a browser can fetch an HTML file.

---

## Highlights

- **One file, zero build** — `obsidian.html` is the entire project. No `package.json`, no `node_modules`, no compile step.
- **20 hand-built complex features** — see [below](#the-20-complex-frontend-features) for the full inventory.
- **Editorial Light Mode default** with one-click Dark Mode toggle (persisted in `localStorage`, no FOUC).
- **Six generative SVG sculptures** — Vortex, Grid, Waves, Facets, Rings, Hex — each rendered procedurally, no external images.
- **Three.js 3D crystal** in the hero with a custom GLSL shader, mouse-drag rotation, and ambient rotation.
- **Web Audio API ambient soundscape** — four-oscillator drone (A1/E2/A2/E3) with LFO-modulated lowpass filter and slow amplitude wobble.
- **Command palette (⌘K)** with fuzzy search, keyboard navigation, and grouped commands (Navigate / Actions / Sculptures).
- **Pinned horizontal-scroll gallery** — vertical scroll translates a horizontal track, with live progress bar.
- **Touch-device aware** — custom cursor, WebGL crystal interactions, magnetic effects, and tilt cards are all disabled on touch devices.
- **Reduced-motion aware** — all animations gracefully degrade for users with `prefers-reduced-motion: reduce`.

---

## Tech Stack

| Layer              | Choice                                                                 | Why                                                              |
| ------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| UI framework       | **React 18 (UMD production build)** from `unpkg.com`                   | Component model without a build step                             |
| Rendering          | `React.createElement` aliased to `h` (no JSX)                          | Lets the file run as plain `<script>` — no Babel                  |
| Styling            | **Tailwind CSS via Play CDN** with a custom theme extension            | Utility-first speed + custom `gallery`/`accent` color tokens     |
| Smooth scroll      | **Lenis 1.1.18**                                                        | Buttery momentum scrolling that hooks into every scroll listener |
| 3D                 | **Three.js 0.160** (UMD build)                                         | Hero crystal with custom vertex + fragment shader                |
| Audio              | Native **Web Audio API** (no library)                                  | Generates the ambient drone procedurally                          |
| Fonts              | **Inter** (100–900 variable) via Google Fonts                          | Single-family editorial discipline                               |
| Canvas             | 2D `<canvas>` for particles, burst, cursor trail                        | Decoupled from React for 60fps animation loops                   |
| SVG                | Inline procedural SVG for all six sculptures + mandala + footer logo   | Resolution-independent, theme-reactive via CSS variables         |

No bundler. No transpiler. No package manager. The file is the project.

---

## File Structure

```
.
├── obsidian.html      ← The entire project (single file, ~3,650 lines)
└── README.md          ← This document
```

### Internal layout of `obsidian.html`

```
<head>
  ├─ Google Fonts (Inter)
  ├─ Tailwind Play CDN + tailwind.config
  ├─ React 18 UMD
  ├─ Lenis 1.1.18
  ├─ Three.js 0.160
  └─ <style> — ~1,250 lines of CSS:
       ├─ Reset & base
       ├─ Theme CSS variables (light + dark)
       ├─ Hero 2D canvas particles
       ├─ Hero 3D crystal canvas
       ├─ Preloader
       ├─ Scroll progress bar + ring
       ├─ Theme toggle button
       ├─ Cursor trail + burst canvases
       ├─ Lightbox modal
       ├─ Custom cursor (dot + ring)
       ├─ Scroll reveal animations
       ├─ Magnetic buttons + grid items
       ├─ Generative SVG pattern containers
       ├─ Responsive typography (clamp-based)
       ├─ Touch device overrides
       ├─ Film-grain noise overlay
       ├─ FEATURE 11–20 styles (horizontal gallery, audio toggle, konami, text distortion, mandala, tilt-3d, word reveal, footer clock, command palette, scroll-blur)
       └─ Mobile menu full-screen overlay + small-screen rules

<body>
  ├─ Preloader overlay
  ├─ Noise overlay
  ├─ Custom cursor dot + ring
  ├─ Cursor trail canvas
  ├─ Particle burst canvas
  ├─ Scroll progress bar (top)
  ├─ Scroll progress ring (bottom-right)
  ├─ Theme toggle button (top-right)
  ├─ Audio toggle button (bottom-left)
  ├─ Command palette trigger (bottom-right)
  ├─ Command palette overlay
  ├─ Konami code overlay
  ├─ Lightbox modal
  ├─ Hero background 2D canvas
  ├─ Hero 3D crystal canvas
  ├─ <div id="root">  ← React mount point
  └─ <script> — ~2,400 lines of JS:
       ├─ Pre-React: apply saved theme to prevent FOUC
       ├─ Preloader progress counter
       ├─ Theme toggle logic + localStorage
       ├─ Scroll progress (bar + ring) updater
       ├─ Cursor trail canvas (offscreen fade)
       ├─ Particle burst canvas physics
       ├─ Three.js hero crystal + custom GLSL shader
       ├─ Generative SVG pattern string builders
       ├─ React components:
       │    ├─ PatternSVG
       │    ├─ Navigation (with full-screen mobile menu)
       │    ├─ HeroSection
       │    ├─ MarqueeSection
       │    ├─ ArchiveSection (portfolio grid)
       │    ├─ PhilosophySection (with mandala SVG + word-reveal paragraphs)
       │    ├─ ProcessSection
       │    ├─ HorizontalGallerySection (pinned horizontal scroll)
       │    ├─ FeaturedSection (with 3D tilt card)
       │    ├─ ContactSection
       │    └─ Footer (with live clock + greeting)
       ├─ App component
       │    ├─ Lenis init
       │    ├─ Scroll reveal observer
       │    ├─ Custom cursor logic
       │    ├─ Magnetic effect
       │    ├─ Active section auto-tracking in nav (Feature 5)
       │    ├─ Count-up stats animation (Feature 4)
       │    ├─ Accessible lightbox modal (Feature 6)
       │    ├─ GLSL liquid distortion hover (Feature 2 — canvas ripple fallback)
       │    ├─ Pinned horizontal-scroll gallery (Feature 11)
       │    ├─ Web Audio API ambient soundscape (Feature 12)
       │    ├─ Konami code easter egg (Feature 13)
       │    ├─ Cursor-reactive text distortion (Feature 14)
       │    ├─ Live-drawing SVG mandala (Feature 15)
       │    ├─ 3D perspective tilt card (Feature 16)
       │    ├─ Word-by-word reveal (Feature 17)
       │    ├─ Footer live clock + greeting (Feature 18)
       │    ├─ Command palette ⌘K (Feature 19)
       │    └─ Scroll-velocity motion blur (Feature 20)
       └─ ReactDOM.createRoot(...).render(h(App))
```

---

## The 20 Complex Frontend Features

Each feature is independently implemented, commented in the source with a `FEATURE N:` banner, and gracefully degrades on touch devices or when its underlying API isn't available.

### Phase 1 — Foundation & Cinematic Polish (Features 1–10)

#### Feature 1 — Three.js 3D Crystal in Hero

A faceted icosahedron-style crystal renders behind the hero copy via Three.js with a custom vertex + fragment shader. The shader deforms vertices along their normals using a sine-wave + time uniform, and the fragment shader mixes two accent colors based on view angle. The crystal auto-rotates and responds to mouse drag (pointer events) for full 3D inspection. On touch devices the drag interaction is disabled but the auto-rotation continues.

#### Feature 2 — GLSL Liquid Distortion Hover on Portfolio Items

When the user hovers over any of the six portfolio grid items, an overlay canvas paints concentric ripple rings that follow the cursor. Each ripple expands and fades over ~80 frames. The implementation uses a 2D canvas fallback for the GLSL displacement effect for performance and broad compatibility — visually it reads as a liquid distortion following the cursor.

#### Feature 3 — Animated Page Preloader with Progress %

On first load, a full-screen preloader displays the Obsidian hexagon logo (SVG), the studio wordmark, and a progress bar that fills 0→100% over ~2 seconds. The percentage counter increments live. Once complete, the preloader slides up as a curtain reveal and the hero animations begin.

#### Feature 4 — Count-Up Number Animations

The four stats in the Philosophy section (Sculptures Generated, Algorithmic Systems, Vertices Computed, Possible Variations) animate from 0 to their target value using `easeOutCubic` interpolation over 1.8 seconds. The animation triggers via `IntersectionObserver` when the stats scroll into view, and only runs once per page load. The "Possible Variations" stat correctly renders `∞` without animating.

#### Feature 5 — Active Section Auto-Tracking in Navigation

The nav bar highlights the section the user is currently reading. An `IntersectionObserver` with `threshold: 0.3` and a `-80px 0px -50% 0px` rootMargin watches every `<section id="...">` and toggles the `.active` class on the matching nav link. The active link's underline (a CSS `::after` pseudo-element) animates its width from 0 to 100% with a `cubic-bezier` easing.

#### Feature 6 — Accessible Image Lightbox Modal

Clicking any portfolio grid item opens a fullscreen lightbox with the larger version of the SVG sculpture, title, category, and description. The lightbox is fully accessible:

- `role="dialog"`, `aria-modal="true"`, `aria-label="Image viewer"`
- Focus trap: focus moves to the close button on open, returns to the originating item on close
- Keyboard: `Esc` closes, `←` / `→` navigate between items, `Enter`/`Space` opens from grid
- Touch: swipe left/right navigates between items
- Body scroll is locked (and Lenis is paused) while open
- Click on backdrop closes

#### Feature 7 — Theme Toggle Light ↔ Dark with `localStorage` Persistence

A sun/moon icon button in the top-right corner toggles between editorial Light Mode (bone/cream background, ink-black text) and Gallery Dark Mode (true-black background, off-white text). The crimson accent is preserved in both modes. The chosen theme is saved to `localStorage` and applied **before React mounts** via an inline script in `<head>` — this prevents any flash of unstyled content (FOUC).

#### Feature 8 — Particle Burst Eruption on Magnetic Button Click

When the user clicks any element with `data-burst="true"` (the "Explore Collection" button, "Commission a Piece" CTA, etc.), a global canvas overlay fires a 40-particle radial burst from the click coordinates. Each particle has randomized velocity, drag, gravity, and lifespan, and renders as a small crimson dot that fades out over ~1 second.

#### Feature 9 — Cursor Echo Motion-Blur Trail

A full-screen canvas (pointer-events: none) sits above the page content and renders a fading trail of the custom cursor. Each frame, the previous frame is drawn back at slightly reduced alpha (creating the motion-blur echo), and a small dot is painted at the current cursor position. The result is a smooth, glowing afterimage that follows the cursor on desktops. Disabled on touch devices.

#### Feature 10 — Scroll Progress Indicator (Bar + Ring)

Two complementary scroll indicators run in parallel:

- A 2px crimson bar pinned to the top of the viewport, whose width scales 0→100% with scroll progress.
- A 56px circular SVG ring pinned to the bottom-right, whose `stroke-dashoffset` decreases as the user scrolls. The ring also displays a live percentage in its center.

Both update on every scroll event (throttled to `requestAnimationFrame`) and pause correctly when modals/menus are open.

---

### Phase 2 — Interaction Layer (Features 11–20)

#### Feature 11 — Pinned Horizontal-Scroll Gallery

A new "Detail Studies" section between Process and Featured transforms vertical scroll into horizontal translation. The outer `.horizontal-section` is `400vh` tall; inside, a `.horizontal-pin` sticks to the top of the viewport, and its child `.horizontal-track` translates leftward as the user scrolls. A 12rem-wide progress bar at the bottom shows scroll progress through the section. Six panels showcase detailed close-ups of each sculpture with overlaid metadata.

#### Feature 12 — Web Audio API Ambient Soundscape

A floating button in the bottom-left corner toggles an ambient drone generated entirely with the Web Audio API:

- **Four oscillators** at A1 (55 Hz), E2 (82.5 Hz), A2 (110 Hz), and E3 (165 Hz) — root, fifth, octave, and fifth-plus-octave.
- Each oscillator is slightly detuned (+/- 4-6 cents) for a chorus effect.
- Oscillators alternate between `sine` and `triangle` waveforms.
- A **lowpass biquad filter** at 700 Hz with Q=6 sculpts the timbre.
- An **LFO at 0.07 Hz** modulates the filter cutoff by +/- 350 Hz — a slow, breathing sweep.
- A second **amplitude LFO at 0.04 Hz** adds +/- 0.02 gain wobble on the master.
- Master gain ramps to 0.08 over 1.2 seconds when toggled on (gentle fade-in).

The button displays an animated 4-bar equalizer when audio is playing.

#### Feature 13 — Konami Code Easter Egg

Typing the classic Konami sequence — **↑ ↑ ↓ ↓ ← → ← → B A** — triggers a 5-second full-screen overlay. Sixty small obsidian-hexagon SVG particles rain down from the top of the viewport with randomized horizontal velocity, rotation, and downward speed. A crimson radial gradient backdrop blurs the page behind the overlay, and a centered "You found the void." message fades in. After 5 seconds, the overlay fades out and particles are removed from the DOM. The sequence resets on any mismatched key.

#### Feature 14 — Cursor-Reactive Text Distortion

Major headings ("Where Data Meets Marble", "A universe compressed into a single point of light", "In Close-Up") are tagged with `data-distort`. On mount, the JS splits each heading into per-character `<span>` elements (preserving line breaks). On `mousemove`, the cursor's distance to each character is computed; characters within 140px are pushed outward along the vector from cursor to character, with a max displacement of 18px. Active characters also turn crimson. On mouseleave, all characters smoothly return to their resting position via CSS transitions.

#### Feature 15 — Live-Drawing SVG Mandala

The Philosophy section has a decorative mandala SVG as a background layer: 5 concentric hexagons (radii 40–180), 12 radial spokes, and an outer ring — 18 paths total. Each path's `stroke-dashoffset` is initialized to its `getTotalLength()`, making it invisible. When the section scrolls into view (via `IntersectionObserver`), the `.drawn` class is added, and each path's `stroke-dashoffset` animates to 0 with a 2.4s `cubic-bezier` transition. Each path is staggered by 80ms, creating a hypnotic drawing-in effect that takes ~4 seconds to complete.

#### Feature 16 — 3D Perspective Tilt Card

The Featured Piece ("Void Convergence") is wrapped in a `.tilt-3d-wrap` with `perspective: 1200px`. On `mousemove` over the card, the card rotates up to ±8° on Y (horizontal cursor) and ±6° on X (vertical cursor), with a slight 1.02 scale on hover. The inner image layer uses `translateZ(30px)` and the text overlay uses `translateZ(60px)` — creating parallax depth. A radial shine layer (`mix-blend-mode: overlay`) follows the cursor and illuminates the card surface. Disabled on touch devices.

#### Feature 17 — Word-by-Word Reveal

The two long paragraphs in the Philosophy section are tagged with `data-word-reveal`. On mount, the JS splits each paragraph into per-word `<span>` elements with `opacity: 0` and `translateY(8px)`. When the paragraph scrolls into view, the `.revealed` class is added, and each word transitions to `opacity: 1, translateY(0)` with a 30ms stagger per word. A typical 60-word paragraph takes ~1.8 seconds to fully reveal.

#### Feature 18 — Footer Live Clock + Time-of-Day Greeting

The footer displays a live clock updating every second in `HH:MM:SS · TimeZone` format using tabular numerals. Above the clock, a greeting changes based on the user's local hour:

| Hour range | Greeting                  |
| ---------- | ------------------------- |
| 00–04      | Burning the midnight oil  |
| 05–11      | Good morning, observer    |
| 12–16      | Good afternoon, observer  |
| 17–20      | Good evening, observer    |
| 21–23      | Good night, observer      |

The timezone is read from `Intl.DateTimeFormat().resolvedOptions().timeZone`, falling back to `"local"` if unavailable.

#### Feature 19 — Command Palette (⌘K / Ctrl+K)

A Raycast/Linear-style command palette accessible via:

- The `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) keyboard shortcut
- A floating "Search ⌘K" button in the bottom-right corner (hidden on mobile)

The palette opens with a blurred backdrop and a centered box containing a search input and a grouped, filterable list of commands. Commands are organized into three groups:

- **Navigate** — Hero, Archive, Philosophy, Process, Detail Studies, Contact (6 items)
- **Actions** — Toggle Theme, Toggle Ambient Sound, Open Featured Lightbox (3 items)
- **Sculptures** — direct links to open each of the 6 portfolio items in the lightbox

Filtering uses fuzzy substring matching — typing "vo" matches "Void Convergence" because all characters appear in order. Keyboard navigation: `↑`/`↓` to move selection, `Enter` to execute, `Esc` to close. The active item auto-scrolls into view. Body scroll is locked (and Lenis paused) while open.

#### Feature 20 — Scroll-Velocity Motion Blur

A scroll listener computes the scroll velocity in pixels-per-millisecond. When velocity exceeds 1.5 px/ms (fast scroll), all elements tagged with `data-scroll-blur` (the 6 horizontal-gallery panels) get a CSS class that applies a `blur(Npx)` filter (where N scales with velocity, capped at 5px) and a subtle `scaleY(0.985)` compression — simulating motion blur during fast scrolling. When scrolling slows (150ms after the last scroll event), the class is removed and the panels snap back to crisp focus.

---

## Design System

### Color Tokens

Light Mode (default):

| Token              | Value                  | Use                              |
| ------------------ | ---------------------- | -------------------------------- |
| `--bg-primary`     | `#f4f3ef` (bone)       | Page background                  |
| `--bg-secondary`   | `#e8e7e3`              | Card / panel backgrounds         |
| `--text-primary`   | `#171717` (ink black)  | Headlines, primary text          |
| `--text-secondary` | `#525252`              | Body copy                        |
| `--text-muted`     | `#737373`              | Captions, meta                   |
| `--text-faint`     | `#a3a3a3`              | Footer, low-priority             |
| `--accent`         | `#dc2626` (crimson)    | CTAs, hover states, accents      |
| `--accent-hover`   | `#ef4444`              | Button hover                     |
| `--border-color`   | `rgba(0,0,0,0.08)`     | Section dividers, card borders   |

Dark Mode (`body.theme-dark`):

| Token              | Value                  |
| ------------------ | ---------------------- |
| `--bg-primary`     | `#0a0a0a`              |
| `--bg-secondary`   | `#141414`              |
| `--text-primary`   | `#f5f5f5`              |
| `--text-secondary` | `#d4d4d4`              |
| `--text-muted`     | `#a3a3a3`              |
| `--text-faint`     | `#737373`              |
| `--accent`         | `#dc2626` (unchanged)  |

### Typography

- **Family:** Inter (variable, 100–900)
- **Headings:** Bold (700–800), tight tracking (`-0.02em` to `0.05em`), fluid sizing via `clamp()`
- **Body:** Regular (400), relaxed line-height (`1.7`), `--text-secondary` color
- **Eyebrows / labels:** 10–12px, uppercase, tracking `0.2em–0.3em`, crimson accent
- **Numerics:** Tabular numerals (`font-variant-numeric: tabular-nums`) on the footer clock for stable width

### Spacing

- Container max-width: `1440px`
- Horizontal padding: `1.5rem` (mobile) / `3rem` (desktop)
- Section vertical padding: `6rem` (mobile) / `10rem` (desktop)
- Grid gap: `1rem` (mobile) / `1.5rem` (desktop)

### Motion

- **Easing curves:**
  - Standard: `cubic-bezier(0.4, 0, 0.2, 1)`
  - Snappy: `cubic-bezier(0.2, 0.9, 0.3, 1.1)`
  - Bouncy: `cubic-bezier(0.2, 0.9, 0.3, 1.4)`
- **Durations:** 200ms (micro), 300ms (small), 500ms (standard), 800ms (hero), 2400ms (mandala draw)
- **Stagger:** 30ms per word (word reveal), 60–80ms per item (mobile menu, mandala paths)

---

## Performance & Accessibility

### Performance

- **Single file, no build** — zero cold-start penalty from bundlers
- **CDN-hosted libraries** — cached aggressively by the browser
- **Decoupled animation loops** — cursor, particle, audio, and crystal animations run in independent `requestAnimationFrame` loops, not in React's render cycle
- **Throttled canvas events** — ripple canvas mousemove throttled to 60ms minimum interval
- **IntersectionObserver-driven reveals** — only animate elements when visible
- **`will-change` hints** — applied to transform/opacity-animated elements
- **`prefers-reduced-motion`** — all animations short-circuit to ~0.01ms duration

### Accessibility

- **Semantic HTML** — `<nav>`, `<main>`, `<section>`, `<footer>`, `<dialog>`
- **ARIA attributes** — `role`, `aria-modal`, `aria-label`, `aria-expanded`, `aria-hidden`
- **Keyboard navigation** — Tab, Enter, Space, Esc, Arrow keys all work for interactive elements
- **Focus management** — lightbox traps focus, returns focus on close
- **Color contrast** — text/background ratios meet WCAG AA in both themes
- **Touch device detection** — custom cursor and mouse-only interactions are disabled
- **Reduced motion** — all animations respect `prefers-reduced-motion: reduce`
- **Audio toggle is opt-in** — no autoplay, requires user gesture (click) to start

---

## Mobile / Touch Adaptations

The site is fully responsive and touch-aware. Key adaptations:

- **Custom cursor** is disabled (`cursor: auto` restored) — touch devices show the native cursor
- **Magnetic button effect** is disabled (no hover state on touch)
- **3D tilt card** rotation is disabled — content displays flat
- **Text distortion** (Feature 14) is disabled — no `mousemove` to track
- **3D crystal drag** is disabled — crystal auto-rotates only
- **GLSL ripple hover** is disabled on touch (no mousemove)
- **Audio toggle button** is hidden on screens ≤640px (Web Audio requires user gesture and feels out-of-place on mobile)
- **Command palette trigger** is hidden on screens ≤640px (still accessible via ⌘K on tablets with keyboards)
- **Scroll progress ring** shrinks to 36px on screens ≤640px
- **Mobile menu** is a full-screen overlay (not a side drawer) with:
  - Body scroll locked + Lenis paused when open
  - Mirrored top bar (logo + close button) so layout doesn't jump
  - Staggered fadeIn animation per nav item (60ms apart)
  - ESC key closes
  - Auto-closes on resize to desktop
  - Social links (Instagram, Behance, Twitter) inside the menu footer
  - Generous tap targets (48px+ line height per nav item)

---

## Browser Support

Tested in:

- **Chrome / Edge** 110+ (Chromium)
- **Firefox** 110+
- **Safari** 16+ (macOS, iOS)
- **Samsung Internet** 20+

Known graceful degradations:

- **No WebGL** — Three.js crystal fails silently; hero still shows 2D particle canvas
- **No Web Audio** — audio toggle button does nothing on click; no console errors
- **No `backdrop-filter`** — overlays fall back to solid `background` color
- **No `Intl.DateTimeFormat`** — footer clock shows "local" instead of timezone name
- **No `localStorage`** — theme toggle works but doesn't persist across reloads
- **No IntersectionObserver** — reveal animations fall back to always-visible

---

## Deployment

### Option A — GitHub Pages (recommended)

1. Create a new public repository (e.g. `obsidian`).
2. Add `obsidian.html` and `README.md` to the root.
3. Rename `obsidian.html` to `index.html` if you want it to be the default landing page:

   ```bash
   mv obsidian.html index.html
   git add .
   git commit -m "feat: initial release of The Obsidian Archive"
   git push origin main
   ```

4. In GitHub → **Settings → Pages**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / root
5. Wait ~30 seconds. Your site is live at `https://<your-username>.github.io/<repo-name>/`.

### Option B — Any static host

Upload `obsidian.html` (or rename to `index.html`) to:

- **Netlify** drag-and-drop: <https://app.netlify.com/drop>
- **Vercel** — `vercel deploy`
- **Cloudflare Pages** — connect your repo
- **Surge.sh** — `surge . obsidian.surge.sh`
- **Any S3 bucket** with static website hosting enabled

### Option C — Open locally

Just double-click `obsidian.html`. All features work except those requiring a server context (none currently — the file is fully self-contained).

---

## Customization

### Change the studio name / branding

Find and replace `Obsidian` and `The Obsidian Archive` in `obsidian.html`. The logo SVG, footer copyright, and preloader text all reference these strings.

### Change the accent color

Edit `--accent` (and `--accent-hover`, `--accent-deep`) in the `:root` and `body.theme-dark` blocks. The change propagates everywhere — buttons, hover states, SVG patterns, audio wave bars, etc.

### Add a new portfolio piece

Append to the `portfolioItems` array near the top of the `<script>` block:

```javascript
const portfolioItems = [
  // ...existing items
  { id: 7, title: 'Your Title', category: 'Your Category',
    description: 'Your description.', patternType: 'vortex',
    color: '#dc2626', year: '2026', span: 'col-span-1' },
];
```

Valid `patternType` values: `'vortex'`, `'grid'`, `'waves'`, `'facets'`, `'rings'`, `'hex'`.

### Add a new command palette entry

Append to the `cmdkCommands` array inside App's `useEffect`:

```javascript
const cmdkCommands = [
  // ...existing commands
  { group: 'Actions', label: 'My New Action', meta: 'Description',
    icon: 'box', action: () => { /* do something */ } },
];
```

### Change the ambient audio tuning

Edit the `initAudio()` function in App's `useEffect`. The `freqs` array holds the oscillator frequencies (in Hz), the `filter.frequency.value` controls brightness, and the LFO frequencies control modulation rates.

### Change the Konami easter egg message

Edit the `#konamiMessage` HTML block near the top of `<body>`.

---

## Hidden Easter Eggs

1. **Konami code** (↑ ↑ ↓ ↓ ← → ← → B A) — full-screen obsidian particle rain with "You found the void." message.
2. **Command palette** (⌘K / Ctrl+K) — fuzzy-searchable overlay with all sections, theme toggle, audio toggle, and per-sculpture lightbox shortcuts.
3. **Cursor-reactive headings** — hover near any `data-distort` heading and watch the characters displace outward and turn crimson.
4. **Live SVG mandala** — scroll to the Philosophy section and watch the 18-path mandala draw itself in over ~4 seconds.

---

## Keyboard Shortcuts

| Shortcut             | Action                                |
| -------------------- | ------------------------------------- |
| `⌘K` / `Ctrl+K`      | Open / close command palette          |
| `Esc`                | Close command palette / mobile menu / lightbox |
| `↑` / `↓`            | Navigate command palette items        |
| `Enter`              | Execute selected command              |
| `←` / `→`            | Navigate lightbox prev / next         |
| `Space` / `Enter`    | Open lightbox from focused grid item  |
| `↑ ↑ ↓ ↓ ← → ← → B A` | Trigger Konami code easter egg       |

---

## Roadmap

Ideas for future iterations:

- **WebGPU shader background** — replace the 2D hero canvas with a WebGPU compute shader for fluid simulation
- **Full-text search** across sculpture descriptions in the command palette
- **Theme color presets** — let users pick from a palette of accent colors (crimson, indigo, emerald, etc.)
- **Easter-egg gallery unlock system** — discover hidden sculptures by typing certain words in the command palette
- **WebGL post-processing** on the 3D crystal (bloom, chromatic aberration)
- **Multi-language support** (i18n) — currently English-only
- **Service worker** for offline-first loading
- **Open Graph + Twitter Card meta tags** for better social sharing

---

## License

This project is released into the public domain under the **CC0 1.0 Universal** license. You are free to use, modify, distribute, and repurpose it for any purpose — commercial or otherwise — without attribution (though attribution is always appreciated).

The fictional "Obsidian Archive" studio, sculpture titles, and copy are creative writing and may be reused or replaced freely.

---

**Built with obsessive attention to detail. Enjoy.**
