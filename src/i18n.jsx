/* ============================================================
   i18n — language store, UI strings, resolver, toggle
   ============================================================ */
import { useState, useEffect } from 'react';

const LANG_KEY = "portfolio-lang";

function detectLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "en" || saved === "es") return saved;
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
}

let _lang = detectLang();
const _subs = new Set();
document.documentElement.lang = _lang;

export function setLang(l) {
  if (l !== "en" && l !== "es") return;
  _lang = l;
  localStorage.setItem(LANG_KEY, l);
  document.documentElement.lang = l;
  _subs.forEach((fn) => fn(l));
}

export function useLang() {
  const [l, set] = useState(_lang);
  useEffect(() => {
    const fn = (nl) => set(nl);
    _subs.add(fn);
    return () => _subs.delete(fn);
  }, []);
  return [l, setLang];
}

/* ---------- theme store (dark default) ---------- */
const THEME_KEY = "portfolio-theme";
let _theme = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
const _themeSubs = new Set();
document.documentElement.dataset.theme = _theme;

export function setTheme(th) {
  _theme = th === "light" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, _theme);
  document.documentElement.dataset.theme = _theme;
  _themeSubs.forEach((fn) => fn(_theme));
}
export function useTheme() {
  const [th, set] = useState(_theme);
  useEffect(() => {
    const fn = (nt) => set(nt);
    _themeSubs.add(fn);
    return () => _themeSubs.delete(fn);
  }, []);
  return [th, setTheme];
}
export function getTheme() { return _theme; }
export function onTheme(fn) { _themeSubs.add(fn); return () => _themeSubs.delete(fn); }

/* resolver: deep-resolve {en,es} objects, arrays, plain values */
export function L(val, lang) {
  if (Array.isArray(val)) return val.map((v) => L(v, lang));
  if (val && typeof val === "object") {
    if ("en" in val && "es" in val) return val[lang] != null ? val[lang] : val.en;
    const out = {};
    for (const k in val) out[k] = L(val[k], lang);
    return out;
  }
  return val;
}

/* ---------- UI strings ---------- */
export const STR = {
  en: {
    nav: { about: "About", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    hero: {
      status: "Open to remote roles · Based in Colombia (GMT−5)",
      role: "Full-Stack Developer",
      cyber: "Aspiring Cybersecurity Engineer",
      tag1: "I build ", tagHl: "fast, scalable web experiences",
      tag2: ", and I'm going deep on ", tagHl2: "securing", tag3: " them. Open to remote opportunities worldwide.",
      work: "View my work", cv: "Download CV", scroll: "scroll",
    },
    about: {
      eyebrow: "About",
      lead1: "Full-stack developer based in Colombia, studying ", leadHl: "Systems & Computing Engineering",
      lead2: " at one of Latin America's top universities, now turning toward ", leadHl2: "cybersecurity", lead3: ".",
      facts: [
        ["2027", "Expected graduation"],
        ["8×", "Semesters as a TA"],
        ["UX/UI", "Minor in Design & Creation"],
        ["EN/ES", "Bilingual · remote-ready"],
      ],
      p1: "I've been a teaching assistant eight times over, changing course and section almost every semester. Guiding that many students sharpened the skills I value most: explaining complex ideas simply, reviewing and debugging other people's code, giving clear feedback and leading a room. It's also what pulled me toward security.",
      p2a: "My background in design (Minor in Design & Creation) means I think about ", p2b: "UX as much as I think about code", p2c: ", and about systems as much as interfaces.",
      p3a: "Right now I'm focused on ", p3b: "cybersecurity", p3c: ": secure architecture, authentication, and the systems layer beneath the apps I build.",
    },
    exp: { eyebrow: "Experience", title: "Where I've been building & teaching.", active: "Active", remote: "Remote" },
    proj: {
      eyebrow: "Selected Work", title: "Explore by area.",
      sub: "Four areas, one stack. Click a card to dive into the work behind each one.",
      view: "View project",
      featured: "Featured",
      more: "More projects",
    },
    skills: { eyebrow: "Toolkit", title: "Technologies I work with." },
    contact: {
      eyebrow: "Contact", title1: "Let's build something ", titleAccent: "secure", title2: " together.",
      sub: "Open to remote roles, collaborations and interesting problems. The fastest way to reach me is email.",
      soon: "soon", foot1: "Systems & Computing Engineering, Uniandes", foot2: "Designed & built with care · 2026",
    },
    detail: {
      all: "All projects", crumb: "Projects", year: "Year", role: "Role", status: "Status",
      visit: "Visit", overview: "Overview", stack: "Stack", highlights: "Highlights", demo: "Demo", gallery: "Gallery",
      hint: "Drag an image onto any frame, it saves automatically.", more: "More work", back: "Back to portfolio",
      tt: "360° turntable", ttHint: "Drag to spin", ttDrop: "Drop a sequence of frames here, or click to choose.", ttNote: "Tip: export ~24 to 36 frames of one full rotation, named in order (001 to 036).", ttClear: "Clear", ttPlay: "Play", ttPause: "Pause", ttLoading: "Processing frames…",
    },
  },
  es: {
    nav: { about: "Sobre mí", experience: "Experiencia", projects: "Proyectos", skills: "Habilidades", contact: "Contacto" },
    hero: {
      status: "Abierto a roles remotos · En Colombia (GMT−5)",
      role: "Desarrollador Full-Stack",
      cyber: "Aspirante a Ingeniero de Ciberseguridad",
      tag1: "Construyo ", tagHl: "experiencias web rápidas y escalables",
      tag2: ", y ahora me especializo en ", tagHl2: "asegurarlas", tag3: ". Abierto a oportunidades remotas en todo el mundo.",
      work: "Ver mi trabajo", cv: "Descargar CV", scroll: "scroll",
    },
    about: {
      eyebrow: "Sobre mí",
      lead1: "Desarrollador full-stack en Colombia, estudiando ", leadHl: "Ingeniería de Sistemas y Computación",
      lead2: " en una de las mejores universidades de Latinoamérica, ahora con la mirada puesta en la ", leadHl2: "ciberseguridad", lead3: ".",
      facts: [
        ["2027", "Grado esperado"],
        ["8×", "Semestres como monitor"],
        ["UX/UI", "Minor en Diseño y Creación"],
        ["EN/ES", "Bilingüe · listo para remoto"],
      ],
      p1: "He sido monitor ocho veces, cambiando de curso y sección casi cada semestre. Acompañar a tantos estudiantes afinó las habilidades que más valoro: explicar ideas complejas de forma simple, revisar y depurar el código de otros, dar retroalimentación clara y liderar un grupo. También fue lo que me acercó a la seguridad.",
      p2a: "Mi formación en diseño (Minor en Diseño y Creación) hace que piense en la ", p2b: "UX tanto como en el código", p2c: ", y en los sistemas tanto como en las interfaces.",
      p3a: "Ahora estoy enfocado en la ", p3b: "ciberseguridad", p3c: ": arquitectura segura, autenticación y la capa de sistemas debajo de las apps que construyo.",
    },
    exp: { eyebrow: "Experiencia", title: "Dónde he construido y enseñado.", active: "Activo", remote: "Remoto" },
    proj: {
      eyebrow: "Trabajo Seleccionado", title: "Explora por área.",
      sub: "Cuatro áreas, un mismo stack. Haz clic en una card para ver el trabajo detrás de cada una.",
      view: "Ver proyecto",
      featured: "Destacado",
      more: "Más proyectos",
    },
    skills: { eyebrow: "Herramientas", title: "Tecnologías con las que trabajo." },
    contact: {
      eyebrow: "Contacto", title1: "Construyamos algo ", titleAccent: "seguro", title2: " juntos.",
      sub: "Abierto a roles remotos, colaboraciones y problemas interesantes. La forma más rápida de contactarme es el correo.",
      soon: "pronto", foot1: "Ingeniería de Sistemas y Computación, Uniandes", foot2: "Diseñado y construido con dedicación · 2026",
    },
    detail: {
      all: "Todos los proyectos", crumb: "Proyectos", year: "Año", role: "Rol", status: "Estado",
      visit: "Visitar", overview: "Resumen", stack: "Stack", highlights: "Destacados", demo: "Demo", gallery: "Galería",
      hint: "Arrastra una imagen a cualquier marco, se guarda automáticamente.", more: "Más trabajo", back: "Volver al portafolio",
      tt: "Vista 360°", ttHint: "Arrastra para girar", ttDrop: "Suelta aquí una secuencia de frames, o haz clic para elegir.", ttNote: "Tip: exporta ~24 a 36 frames de una vuelta completa, nombrados en orden (001 a 036).", ttClear: "Quitar", ttPlay: "Reproducir", ttPause: "Pausar", ttLoading: "Procesando frames…",
    },
  },
};

/* ---------- Language toggle ---------- */
export function LangToggle() {
  const [lang, set] = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button className={lang === "en" ? "on" : ""} onClick={() => set("en")} aria-pressed={lang === "en"}>EN</button>
      <button className={lang === "es" ? "on" : ""} onClick={() => set("es")} aria-pressed={lang === "es"}>ES</button>
      <span className="lang-pill" style={{ transform: `translateX(${lang === "es" ? "100%" : "0"})` }}></span>
    </div>
  );
}

/* ---------- Theme toggle (sun / moon) ---------- */
export function ThemeToggle() {
  const [theme, set] = useTheme();
  const light = theme === "light";
  return (
    <button className="theme-toggle" onClick={() => set(light ? "dark" : "light")}
            aria-label={light ? "Switch to dark mode" : "Switch to light mode"} title={light ? "Dark" : "Light"}>
      <span className="theme-ico" key={theme}>
        {light ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </span>
    </button>
  );
}
