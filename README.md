# Sergio Castaño — Portfolio

Single-page personal portfolio for **Sergio Castaño**, full-stack developer and Systems &
Computing Engineering student (Universidad de los Andes) moving toward cybersecurity.

Dark-first with light mode, bilingual **EN/ES**, hash-routed project detail pages, animated
hero (decrypt text + particle field), category carousel (CardSwap), and a 360° turntable viewer.

## Stack
- **React 18** + **Vite 5**
- **GSAP** for animation
- Plain CSS (CSS variables, `src/styles.css`)
- Deployed to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`)

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the built dist/ locally
```

## Structure
```
index.html            # Vite entry → src/main.jsx
src/
  main.jsx            # hash router (home / #/p/<slug> / #/cat/<id>)
  sections.jsx        # Navbar, Hero, About, Experience, Projects, Skills, Contact
  project-detail.jsx  # per-project subpage + gallery
  category-page.jsx   # per-category project listing
  fx.jsx              # DecryptText, ParticleField, Reveal, Magnetic
  i18n.jsx            # lang + theme stores, STR strings, L() resolver
  turntable.jsx       # 360° image-sequence viewer
  CardSwap / StarBorder / StickerPeel  # UI effect components
  data/
    index.jsx         # localized getters (getEXP/getSKILLS/getPROJECTS/...)
    categories.js, experience.js, skills.js, icons.jsx
    projects/         # one file per project + index.js registry
public/
  favicon.svg, assets/ (CV), stickers/
```

## Adding a project
1. Create `src/data/projects/<name>.js` (copy an existing one — bilingual `{ en, es }` fields).
2. Import it and add to the array in `src/data/projects/index.js`.
3. Set its `category` to one of `dev | cyber | design | games`.

## Gallery images
Project galleries and the turntable read static assets from `public/`. Drop the real
screenshots there and reference them per project — they ship with the build to GitHub Pages.

## Deploy
Push to `main`; the Actions workflow runs `npm ci && npm run build` and publishes `dist/`
to GitHub Pages at <https://5ergioc.github.io/>.
