/* ============================================================
   Home sections — Navbar, Hero, About, Experience, Projects,
   Skills, Contact
   ============================================================ */
import { useState, useEffect } from 'react';
import { DecryptText, ParticleField, Reveal, Magnetic } from './fx';
import { useLang, STR, LangToggle, ThemeToggle } from './i18n';
import { Icon, getEXP, getPROJECTS, getSKILLS, getCATEGORIES } from './data';
import CardSwap, { Card } from './CardSwap';
import StarBorder from './StarBorder';
import { scrollToId } from './utils';

const NAV_IDS = ["about", "experience", "projects", "skills", "contact"];
const goProject = (slug) => { window.location.hash = "/p/" + slug; };

/* ---------- Navbar ---------- */
export function Navbar() {
  const [lang] = useLang();
  const t = STR[lang];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV_IDS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap">
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span className="dot"></span>SC<span className="slash">/</span><span style={{ color: "var(--fg-mute)" }}>dev</span>
        </a>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {NAV_IDS.map((id, i) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={(e) => go(e, id)}>
              <span className="idx">0{i + 1}.</span>{t.nav[id]}
            </a>
          ))}
          <a className="nav-cta" href="assets/Sergio_Castano_CV.pdf" download>CV ↓</a>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <LangToggle />
          <button className={`nav-burger ${open ? "open" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
export function Hero() {
  const [lang] = useLang();
  const t = STR[lang].hero;
  return (
    <header className="hero" id="top">
      <ParticleField />
      <div className="wrap">
        <div className="hero-status">
          <span className="live"></span>{t.status}
        </div>
        <h1 className="hero-name">
          <DecryptText text="Sergio" stepMs={30} /><br />
          <DecryptText text="Castaño" className="accent" delay={260} as="span" />
        </h1>
        <p className="hero-title">
          <DecryptText key={lang} text={t.role} delay={120} revealEvery={1} />
          <span className="mid-dot">·</span>
          <span className="cyber">{t.cyber}</span>
        </p>
        <p className="hero-tagline">
          {t.tag1}<span className="hl">{t.tagHl}</span>{t.tag2}<span className="hl2">{t.tagHl2}</span>{t.tag3}
        </p>
        <div className="cta-row">
          <Magnetic strength={0.25}>
            <a className="btn btn-primary" href="#projects" onClick={(e) => { e.preventDefault(); scrollToId("projects"); }}>
              {Icon.work({})} {t.work}
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a className="btn btn-ghost" href="assets/Sergio_Castano_CV.pdf" download>
              {Icon.download({})} {t.cv}
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="scroll-hint"><span>{t.scroll}</span><span className="bar"></span></div>
    </header>
  );
}

/* ---------- About ---------- */
export function About() {
  const [lang] = useLang();
  const t = STR[lang].about;
  return (
    <section id="about" className="section-pad">
      <div className="wrap">
        <Reveal><div className="eyebrow"><span className="num">01</span> <DecryptText onView key={lang} text={t.eyebrow} /></div></Reveal>
        <div className="about-grid">
          <Reveal>
            <p className="about-lead">
              {t.lead1}<span className="hl">{t.leadHl}</span>{t.lead2}<span className="hl2">{t.leadHl2}</span>{t.lead3}
            </p>
            <div className="facts">
              {t.facts.map(([k, v], i) => (
                <div className="fact" key={i}>
                  <div className="k">{k}</div><div className="v">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="about-body">
              <p>{t.p1}</p>
              <p>{t.p2a}<strong style={{ color: "var(--fg)" }}>{t.p2b}</strong>{t.p2c}</p>
              <p>{t.p3a}<strong style={{ color: "var(--cyan-hex)" }}>{t.p3b}</strong>{t.p3c}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
export function Experience() {
  const [lang] = useLang();
  const t = STR[lang].exp;
  const exp = getEXP(lang);
  return (
    <section id="experience" className="section-pad">
      <div className="wrap">
        <Reveal><div className="eyebrow"><span className="num">02</span> <DecryptText onView key={lang} text={t.eyebrow} /></div></Reveal>
        <Reveal><h2 className="section-title"><DecryptText onView key={lang} text={t.title} /></h2></Reveal>
        <div className="timeline">
          {exp.map((x, i) => (
            <Reveal key={i} delay={Math.min(i, 4) * 60} className="tl-item">
              <div className="tl-period">
                {x.period}
                {x.now && <><br /><span className="tl-now">● {t.active}</span></>}
                {x.remote && <><br /><span className="tl-remote">{t.remote}</span></>}
              </div>
              <div>
                <div className="tl-role">{x.role}</div>
                <div className="tl-org">{x.org} <span className="arrow">↗</span></div>
                <div className="tl-desc">{x.desc}</div>
                <div className="tl-tags">
                  {x.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CardSwap — category cards ---------- */
const CAT_HUE   = { dev: '220', cyber: '150', design: '286', games: '55' };
const CAT_COLOR = {
  dev:    'oklch(0.78 0.12 220)',
  cyber:  'oklch(0.78 0.15 150)',
  design: 'oklch(0.72 0.14 286)',
  games:  'oklch(0.78 0.15 55)',
};

const CAT_DESC = {
  dev:    { en: 'Web, mobile & full-stack builds.',       es: 'Apps web, móvil y full-stack.' },
  cyber:  { en: 'CTF writeups & security research.',      es: 'Writeups de CTF e investigación.' },
  design: { en: '3D modeling, motion & visual craft.',    es: 'Modelado 3D, motion y diseño.' },
  games:  { en: 'Game dev projects & experiments.',       es: 'Videojuegos y experimentos.' },
};

function CatSwapCard({ cat, projects, lang }) {
  const hue = CAT_HUE[cat.id] || '260';
  const tags = [...new Set(projects.flatMap(p => p.stack))].slice(0, 6);
  const desc = CAT_DESC[cat.id]?.[lang] || '';
  return (
    <div className="cs-inner">
      {/* browser bar */}
      <div className="cs-bar">
        <span className="cs-dots"><span /><span /><span /></span>
        <span className="cs-bar-title">Sergio Castaño</span>
        <span className={`cs-bar-badge cat-color-${cat.id}`}>{cat.label}</span>
      </div>

      {/* visual body */}
      <div className="cs-visual" style={{ '--cs-hue': hue }}>
        {/* big watermark name */}
        <div className="cs-watermark">{cat.label}</div>
        {/* centered count */}
        <div className="cs-count-display">
          <span className="cs-count-num">{projects.length}</span>
          <span className="cs-count-label">{projects.length === 1 ? 'project' : 'projects'}</span>
        </div>
      </div>

      {/* footer */}
      <div className="cs-foot">
        <div className="cs-foot-top">
          <div className="cs-name">{cat.label}</div>
          <div className="cs-tagline">{desc}</div>
        </div>
        <div className="cs-stack">
          {tags.map(s => <span key={s} className="cs-tag">{s}</span>)}
        </div>
      </div>
    </div>
  );
}

const goCategory = (id) => { window.location.hash = '/cat/' + id; };

/* responsive card dimensions — rendered at native size, no CSS scale */
function useCardSize() {
  const [size, setSize] = useState(() => getSize(window.innerWidth));
  useEffect(() => {
    const handler = () => setSize(getSize(window.innerWidth));
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}
function getSize(w) {
  if (w < 400)  return { width: 240, height: 300, cardDistance: 28, verticalDistance: 32 };
  if (w < 560)  return { width: 290, height: 360, cardDistance: 34, verticalDistance: 38 };
  if (w < 768)  return { width: 340, height: 420, cardDistance: 40, verticalDistance: 46 };
  if (w < 1100) return { width: 380, height: 470, cardDistance: 46, verticalDistance: 54 };
  return               { width: 420, height: 520, cardDistance: 52, verticalDistance: 60 };
}

/* ---------- Projects ---------- */
export function Projects() {
  const [lang] = useLang();
  const t = STR[lang].proj;
  const allProjects = getPROJECTS(lang);
  const categories  = getCATEGORIES(lang).filter(c => c.id !== 'all');
  const cardSize    = useCardSize();

  return (
    <section id="projects" className="section-pad">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">
            <span className="num">03</span>
            <DecryptText onView key={lang} text={t.eyebrow} />
          </div>
        </Reveal>
        <Reveal delay={40}>
          <div className="proj-head">
            <h2 className="section-title"><DecryptText onView key={lang} text={t.title} /></h2>
            <p className="proj-sub">{t.sub}</p>
          </div>
        </Reveal>

        <Reveal className="proj-swap-area">
          <div className="proj-swap-wrap">
            <CardSwap
              width={cardSize.width}
              height={cardSize.height}
              cardDistance={cardSize.cardDistance}
              verticalDistance={cardSize.verticalDistance}
              delay={3800}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
            >
              {categories.map(cat => {
                const catProjects = allProjects.filter(p => p.category === cat.id);
                return (
                  <Card key={cat.id} onClick={() => goCategory(cat.id)}>
                    <StarBorder
                      as="div"
                      color={CAT_COLOR[cat.id]}
                      speed="5s"
                      thickness={2}
                    >
                      <CatSwapCard cat={cat} projects={catProjects} lang={lang} />
                    </StarBorder>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </Reveal>

        {/* category hint row */}
        <Reveal delay={80}>
          <div className="proj-cat-hint">
            {categories.map((cat, i) => {
              const count = allProjects.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  className={`pch-btn cat-color-${cat.id}`}
                  onClick={() => goCategory(cat.id)}
                >
                  <span className="pch-dot" />
                  <span className="pch-label">{cat.label}</span>
                  <span className="pch-count">{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
export function Skills() {
  const [lang] = useLang();
  const t = STR[lang].skills;
  const skills = getSKILLS(lang);
  return (
    <section id="skills" className="section-pad">
      <div className="wrap">
        <Reveal><div className="eyebrow"><span className="num">04</span> <DecryptText onView key={lang} text={t.eyebrow} /></div></Reveal>
        <Reveal><h2 className="section-title"><DecryptText onView key={lang} text={t.title} /></h2></Reveal>
        <div className="skills-grid">
          {skills.map(([title, hue, items], gi) => (
            <Reveal key={title} delay={Math.min(gi, 4) * 50} className="skill-group">
              <div className="skill-head"><span className="swatch" style={{ background: `var(${hue})` }}></span>{title}</div>
              <div className="chips">
                {items.map((s) => (
                  <span key={s} className="chip" style={{
                    color: `var(${hue})`,
                    borderColor: `color-mix(in oklch, var(${hue}) 32%, transparent)`,
                    background: `color-mix(in oklch, var(${hue}) 9%, transparent)`,
                  }}>{s}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  const [lang] = useLang();
  const t = STR[lang].contact;
  return (
    <section id="contact" className="section-pad contact">
      <div className="wrap">
        <Reveal><div className="eyebrow" style={{ justifyContent: "center" }}><span className="num">05</span> <DecryptText onView key={lang} text={t.eyebrow} /></div></Reveal>
        <Reveal><h2 className="contact-title">{t.title1}<span className="accent">{t.titleAccent}</span>{t.title2}</h2></Reveal>
        <Reveal delay={80}><p className="contact-sub">{t.sub}</p></Reveal>
        <Reveal delay={140}>
          <Magnetic strength={0.18}>
            <a className="contact-mail" href="mailto:sa.castanoa1@uniandes.edu.co">
              {Icon.mail({ style: { width: 20, height: 20, color: "var(--purple)" } })} sa.castanoa1@uniandes.edu.co
            </a>
          </Magnetic>
        </Reveal>
        <Reveal delay={200}>
          <div className="socials">
            <a className="social" href="https://github.com/5ergioC" target="_blank" rel="noopener">{Icon.github({ className: "ic" })} GitHub</a>
            <a className="social" href="https://www.linkedin.com/in/sergio-alejandro-castaño-arcila/" target="_blank" rel="noopener">{Icon.linkedin({ className: "ic" })} LinkedIn</a>
            <a className="social" href="https://www.behance.net/sergiocastao6" target="_blank" rel="noopener">{Icon.behance({ className: "ic" })} Behance</a>
          </div>
        </Reveal>
      </div>
      <footer>
        <div className="wrap">
          <div className="meta">Sergio Castaño <span className="accent">·</span> {t.foot1}</div>
          <div className="meta">{t.foot2}</div>
        </div>
      </footer>
    </section>
  );
}

/* ---------- Home ---------- */
export function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="wrap"><hr className="divider" /></div>
      <About />
      <div className="wrap"><hr className="divider" /></div>
      <Experience />
      <div className="wrap"><hr className="divider" /></div>
      <Projects />
      <div className="wrap"><hr className="divider" /></div>
      <Skills />
      <div className="wrap"><hr className="divider" /></div>
      <Contact />
    </>
  );
}
