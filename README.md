# Handoff: Sergio Castaño — Developer Portfolio

## Overview
A single-page, dark-first (with light mode) personal portfolio for **Sergio Castaño**, a full-stack developer and Systems & Computing Engineering student pivoting toward cybersecurity. It features an animated "terminal/decrypt" reveal, a cursor-reactive particle constellation, scroll-reveal sections, spotlight project cards, per-project detail subpages (hash-routed), a bilingual EN/ES toggle, a dark/light theme toggle, and an AirPods-style 360° image-sequence viewer for 3D renders.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS + in-browser React (Babel standalone)** — a working prototype that demonstrates the intended look, motion, and behavior. They are **not** production code to copy verbatim.

The task is to **recreate these designs in the target codebase's environment** using its established patterns. The natural target here is a real **React + Vite/Next.js** app (the prototype is already React-shaped), with the inline-Babel components promoted to real `.jsx/.tsx` modules and the CSS variables moved into the app's styling system (CSS Modules, Tailwind theme, or styled-components). If starting fresh, **React + Vite + TypeScript** is the recommended stack.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, motion timings, and interactions are all specified below and in the source files. Recreate pixel-perfectly, then wire to real data.

---

## Architecture (as prototyped)
Hash-based routing, no build step. Scripts load in this order (dependencies via `window`):
1. `fx.jsx` — animation primitives: `DecryptText`, `ParticleField`, `Reveal`, `Magnetic`, `useSpotlight`
2. `i18n.jsx` — language store (`useLang`/`setLang`), theme store (`useTheme`/`setTheme`), `STR` (all UI strings EN/ES), resolver `L()`, `LangToggle`, `ThemeToggle`
3. `turntable.jsx` — `Turntable` 360° image-sequence viewer (IndexedDB-backed)
4. `data.jsx` — `Icon` set + bilingual `EXP`, `SKILLS`, `PROJECTS` data + localized getters `getEXP/getSKILLS/getPROJECTS/getPROJECT`
5. `sections.jsx` — `Navbar`, `Hero`, `About`, `Experience`, `Projects`, `Skills`, `Contact`, `Home`
6. `project-detail.jsx` — `ProjectDetail` (hash route `#/p/<slug>`), `Gallery`, `Slot`
7. `app.jsx` — hash router mounting `Home` or `ProjectDetail`

**Recommendation for production:** replace the hash router with the framework router (e.g. React Router `/projects/:slug`), replace `window`-global wiring with real ESM imports + React Context for lang/theme, and replace IndexedDB image persistence with committed asset files (see Turntable notes).

---

## Routes / Screens

### 1. Home (`/`)
Single scroll page with a fixed navbar and these sections in order, each separated by a centered hairline divider:

**Navbar (fixed, 68px tall)**
- Left: brand `● SC / dev` — animated pulsing dot (purple, `pulse` 2.6s), mono font 700/15px.
- Center (desktop): nav links `01. About / 02. Experience / 03. Projects / 04. Skills / 05. Contact`, mono 13px, index number in purple. Active link (driven by IntersectionObserver, `rootMargin: -45% 0 -50%`) gets a purple→cyan underline. Plus a `CV ↓` outlined pill linking to the PDF.
- Right: `ThemeToggle` (sun/moon icon button, 38×34px) + `LangToggle` (EN|ES sliding pill) + hamburger (mobile only).
- Transparent at top; on `scrollY > 24` gains `rgba(13,17,23,0.72)` bg + 14px blur + bottom hairline.
- Mobile (<820px): center links collapse into a full-width dropdown panel; theme + lang toggles stay visible.

**Hero (min-height 100svh)**
- Background: `<canvas>` ParticleField (see Interactions).
- Status pill: green pulsing dot + "Open to remote roles · Based in Colombia (GMT−5)".
- Name: two lines, mono 700, `clamp(44px, 9vw, 104px)`, line-height 0.98, letter-spacing −0.03em. "Sergio" in `--fg`; "Castaño" with purple→cyan gradient text. Both use the **decrypt** reveal on load ("Castaño" delayed 260ms).
- Subtitle line (mono): decrypt "Full-Stack Developer" + middot + "Aspiring Cybersecurity Engineer" (the cyber phrase in a red-violet accent).
- Tagline: `clamp(18px,2.4vw,25px)`, max-width 620px, with "fast, scalable web experiences" in cyan and "securing" in red accent.
- CTA row: primary "View my work" (purple gradient, dark text, magnetic) + ghost "Download CV" (magnetic). Both wrapped in `Magnetic` (strength 0.25).
- Scroll hint bottom-center: "scroll" + animated dropping bar.

**About** — eyebrow `01 About`; two-column grid (1fr/1fr, 60px gap, stacks <820px).
- Left: lead sentence with "Systems & Computing Engineering" (cyan) and "cybersecurity" (red) highlights; then a 2×2 facts grid (bordered cards): `2027 / Expected graduation`, `8× / Semesters as a TA`, `UX/UI / Minor in Design & Creation`, `EN/ES / Bilingual · remote-ready`.
- Right: 3 body paragraphs (see copy in `i18n.jsx` → `about.p1/p2/p3`).

**Experience** — eyebrow `02`; decrypt section title "Where I've been building & teaching."; a timeline of 6 roles. Each row: 150px period column (with "● Active" green tag for current, "Remote" cyan tag where applicable) + content (role 20px/600, org in cyan with hover ↗, description, and a row of tech tags). Row hover adds a left-fading surface gradient. Rows collapse to single column <820px.

**Projects** — eyebrow `03`; decrypt title "Projects & experiments." + sub; a 2-col grid (1col <820px) of project cards. Each card:
- Striped/tinted **cover** (154px) with a faint grid, a mono kicker label chip, and a giant first-letter watermark glyph — tinted by the project's device hue (`--pa`).
- Body: badge chip + live indicator (green dot + domain) or status text; project name (25px/600); tagline; first 3 stack chips; "View project →".
- Hover: lifts 4px, border brightens, and a **cursor-following purple spotlight** (`--mx/--my` radial) appears.
- Click → navigates to `#/p/<slug>`.

**Skills** — eyebrow `04`; decrypt title "Technologies I work with."; 2-col grid of 8 grouped cards (Frontend, Backend, Data & AI, Security & Systems, Cloud, Databases, Design, Other). Each group has a colored swatch dot + mono heading + chips. Chips are colored per category hue via `color-mix` (text at full hue, border 32%, bg 9%); hover lifts 3px.

**Contact** — eyebrow `05` (centered); big title "Let's build something **secure** together." (accent gradient on "secure"); sub; a magnetic email pill `sa.castanoa1@uniandes.edu.co`; social row: GitHub (live → github.com/5ergioC), LinkedIn + Behance (marked "soon", disabled). Footer with two mono meta lines.

### 2. Project Detail (`#/p/<slug>`)
Slugs: `andeseats`, `protalker`, `spendant`, `space-invaders`, `studio`.
- Minimal sticky top bar: brand + "All projects" back link + ThemeToggle + LangToggle + CV.
- Hero: breadcrumb, kicker, **decrypt** project title (`clamp(40px,7vw,82px)` mono), tagline, a meta row (Year / Role / Status), and — for live projects — a primary "Visit <domain>" button. Hero has a device-hue radial glow.
- Body: 2-col grid — overview paragraphs (left) + sticky sidebar (right) with Stack chips and a Highlights bulleted list (gradient square bullets).
- **Turntable** (only on `studio`): a 360° image-sequence viewer above the gallery (see below).
- Gallery: device-specific layouts —
  - `web`/`game`: mixed full/half framed image slots (striped placeholder until filled).
  - `mobile` (spendant): phone-framed slots (notch, 9/19.2 aspect) in a centered flex row.
  - `cube` (studio): square grid of slots.
- "More work" grid linking to the other projects.
- Footer with back link.

---

## Interactions & Behavior

### DecryptText (terminal reveal) — `fx.jsx`
- Replaces text with random glyphs from `ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\/[]{}=+*^?#&%`, then resolves left→right.
- **Time-based**: one character resolves every `stepMs` (default **62ms**), framerate-independent. Unresolved chars keep scrambling each frame. Spaces preserved. `aria-label` carries the real text for a11y.
- `onView` prop: defers the animation until the element scrolls into view (IntersectionObserver, threshold 0.35). Used by all section titles + eyebrows + detail titles. Hero uses immediate (with `delay`).
- Respects `prefers-reduced-motion` (shows final text instantly).
- Re-runs when `text` changes (e.g., language switch) — callers pass `key={lang}`.

### ParticleField — `fx.jsx`
- Canvas constellation. Particle count `min(72, w*h/17000)`, slow drift, wall-bounce.
- Cursor attraction within radius (d² < 26000) and a cyan "glow link" from cursor to nearby particles; particles link to each other within 120px with fading opacity.
- **Theme-aware colors**: dark → dots `rgba(180,176,235,.55)`, links `127,119,221`, cursor `92,198,230`; light → dots `rgba(108,98,196,.55)`, links `92,84,196`, cursor `26,140,170`. Re-inits on theme change.
- `prefers-reduced-motion`: renders a single static frame.

### Reveal (scroll-in) — `fx.jsx`
- Wraps content; IntersectionObserver (threshold 0.12, `rootMargin: 0 0 -8%`) toggles `.in`. Transition: opacity + `translateY(26px)→0`, 0.7s `cubic-bezier(0.22,1,0.36,1)`. Optional `delay` for stagger. Disabled under reduced-motion.

### Magnetic — `fx.jsx`
- Element translates toward cursor by `offset × strength` on mousemove, resets on leave. Used on hero CTAs, email pill, "Visit" button.

### Spotlight — `useSpotlight` (`fx.jsx`)
- On mousemove over a project card, writes cursor position into CSS vars `--mx/--my`; CSS draws a 420px radial purple glow (`.card::before`, opacity 0→1 on hover).

### Turntable (360° image sequence) — `turntable.jsx`
- AirPods-style product spin from a user-supplied frame sequence (recommended 24–36 frames of one rotation, named in order).
- **Empty state**: dropzone (drag-drop or click) accepting multiple images; sorts by filename (natural sort); downscales each to ≤760px WebP (q0.82) via canvas; shows a progress bar while processing.
- **Viewer**: cross-fades frames; **drag horizontally** to spin (px-per-frame = stageWidth/n, min 6), a **range slider** to scrub, and **Play/Pause** auto-advance (~55ms/frame, loops). Frame counter overlay `NN / NN`.
- **Persistence (prototype)**: frames stored in IndexedDB (`portfolio-turntable` → `frames` store, key = slot id). **For production: replace with committed image files** — accept a `frames` prop of URLs (already supported; when provided it skips IndexedDB and the Clear button). Bake the real frames as assets and pass their URLs.
- Tint follows the project device hue and theme.

### i18n — `i18n.jsx`
- `useLang()` returns `[lang, setLang]`; persists to `localStorage['portfolio-lang']`; auto-detects `es`/`en` from `navigator.language` on first load; sets `<html lang>`.
- All copy lives in `STR.en` / `STR.es`; data strings are `{en, es}` objects resolved by `L(value, lang)` (deep-resolves arrays/objects; leaves plain strings, tech names, slugs, urls untouched).
- `LangToggle`: segmented EN|ES with a sliding gradient pill.

### Theme — `i18n.jsx`
- `useTheme()` returns `[theme, setTheme]`; persists to `localStorage['portfolio-theme']`; default **dark**; sets `document.documentElement.dataset.theme`.
- `ThemeToggle`: icon button (moon in dark, sun in light) with a small `themePop` rotate-in animation on change.
- Light theme = a `[data-theme="light"]` override block (see Design Tokens). Default (no attribute / `dark`) uses `:root`.

### Routing — `app.jsx`
- Parses `window.location.hash`; `#/p/<slug>` → ProjectDetail, else Home. Listens to `hashchange`, scrolls to top on project view. In-page nav uses `scrollToId(id)` (smooth scroll with −60px offset).

---

## State Management
- **lang** (`'en'|'es'`) — global store + `localStorage`; subscribers re-render via `useLang`.
- **theme** (`'dark'|'light'`) — global store + `localStorage`; subscribers via `useTheme`.
- **route** — derived from `location.hash`.
- **Navbar**: `scrolled` (bool), `active` section id (IntersectionObserver), `open` (mobile menu).
- **Turntable**: `frames` (string[] | null), `idx`, `playing`, `busy`, `progress`, `over` (drag-hover); drag ref.
- No data fetching in the prototype — `EXP/SKILLS/PROJECTS` are static. In production, source these from CMS/JSON/MDX as desired.

---

## Design Tokens

### Type
- **Mono**: `JetBrains Mono` (400/500/700) — brand, nav, eyebrows, titles, code-like UI.
- **Sans**: `Space Grotesk` (400/500/600/700) — body, taglines, descriptions.
- Section title: `clamp(28px,4vw,44px)`/600/−0.02em. Hero name: `clamp(44px,9vw,104px)`/700/−0.03em. Detail title: `clamp(40px,7vw,82px)`/700.

### Colors — Dark (`:root`)
- `--bg #0d1117` · `--bg-2 #11161f` · `--bg-3 #161c27`
- `--surface rgba(255,255,255,.025)` · `--surface-2 rgba(255,255,255,.04)`
- `--line rgba(255,255,255,.08)` · `--line-2 rgba(255,255,255,.14)`
- `--fg #e7ebf2` · `--fg-soft #aab3c2` · `--fg-mute #6b7585`
- `--purple #7f77dd` · `--purple-2 oklch(0.68 0.14 286)` · `--cyan oklch(0.78 0.12 220)` · `--cyan-hex #5cc6e6`
- Category hues (oklch, ~0.78–0.80 L): frontend 286 · backend 150 · ai 95 · security 18 · cloud 220 · db 55 · design 330 · other (0.80 0.05 250)

### Colors — Light (`[data-theme="light"]`)
- `--bg #f5f6fb` · `--bg-2 #ffffff` · `--bg-3 #eceef6`
- `--surface rgba(22,24,44,.03)` · `--surface-2 rgba(22,24,44,.055)`
- `--line rgba(22,24,44,.10)` · `--line-2 rgba(22,24,44,.17)`
- `--fg #191e2a` · `--fg-soft #4a5263` · `--fg-mute #868ea0`
- `--purple oklch(0.52 0.18 286)` · `--purple-2 oklch(0.46 0.17 286)` · `--cyan oklch(0.58 0.13 220)` · `--cyan-hex #1d83ab`
- Category hues recalibrated to ~0.50–0.53 L for contrast on white (same hue angles).
- Plus targeted overrides for backdrop glows, navbar bg, scrollbars, card covers, turntable surfaces, timeline tags (see end of `styles.css`).

### Spacing / Radius / Motion
- Content max-width `--maxw 1080px`; section padding 120px (84px <820px); wrap padding 28px (20px <520px).
- Radii: chips 6–8px, cards 16px, side blocks/turntable 14–18px, pills 100px.
- Easing `--ease cubic-bezier(0.22,1,0.36,1)`. Reveal 0.7s; hover lifts 0.15–0.3s; lang pill 0.32s.
- Nav height `--nav-h 68px`.

### Shadows
- Primary button: `0 8px 30px oklch(0.6 0.13 286/.35)` → hover `0 12px 40px …/.5`.
- Phone frame: `0 24px 60px rgba(0,0,0,.4)`.

---

## Assets
- **CV PDF**: `assets/Sergio_Castano_CV.pdf` (wired to all "Download CV" / "CV ↓" links). Replace with the real file.
- **Icons**: inline SVG set in `data.jsx` (`Icon.*`) + `i18n.jsx` (sun/moon) + `turntable.jsx`. No icon library dependency.
- **Fonts**: Google Fonts (JetBrains Mono, Space Grotesk).
- **Project imagery**: none committed — galleries use drag-and-drop `<image-slot>` placeholders (`image-slot.js`, persists via a sidecar) and the studio Turntable uses IndexedDB frames. **For production, commit real screenshots/renders and pass them as `src`/`frames` URLs.**
- **No tracking/analytics**, no backend.

### Real content to plug in
- Project copy for Spendant / Space Invaders / 3D is placeholder-quality (editable). Confirm with Sergio.
- LinkedIn + Behance URLs are placeholders ("soon") — wire when provided.
- Turntable + gallery images are user-supplied.

---

## Files (in this bundle)
- `Sergio Castaño - Portfolio.html` — entry point + script/load order + font links + `<div id="root">`.
- `styles.css` — all styles + design tokens + light-theme block.
- `fx.jsx` — DecryptText, ParticleField, Reveal, Magnetic, useSpotlight.
- `i18n.jsx` — lang store, theme store, STR (EN/ES), resolver, LangToggle, ThemeToggle.
- `data.jsx` — Icon set, bilingual EXP/SKILLS/PROJECTS, localized getters.
- `sections.jsx` — Navbar + all home sections + Home.
- `project-detail.jsx` — ProjectDetail, Gallery, Slot.
- `turntable.jsx` — 360° image-sequence viewer (IndexedDB).
- `app.jsx` — hash router + mount.
- `image-slot.js` — drag-drop image placeholder web component (third-party-style helper used by galleries).
- `assets/Sergio_Castano_CV.pdf` — CV.

> React/Babel are loaded from CDN in the prototype (`react@18.3.1`, `react-dom@18.3.1`, `@babel/standalone`). In production, drop Babel-standalone and compile normally.
