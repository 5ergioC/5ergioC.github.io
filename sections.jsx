/* ============================================================
   Home sections — Navbar, Hero, About, Experience, Projects,
   Skills, Contact
   ============================================================ */
const { useState: useS, useEffect: useE } = React;
const { DecryptText, ParticleField, Reveal, Magnetic, useSpotlight, useLang, STR, LangToggle, ThemeToggle } = window;

const NAV_IDS = ["about", "experience", "projects", "skills", "contact"];
const goProject = (slug) => { window.location.hash = "/p/" + slug; };

/* ---------- Navbar ---------- */
function Navbar() {
  const [lang] = useLang();
  const t = STR[lang];
  const [scrolled, setScrolled] = useS(false);
  const [active, setActive] = useS("");
  const [open, setOpen] = useS(false);

  useE(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useE(() => {
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
    window.scrollToId(id);
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
function Hero() {
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
          <DecryptText text="Sergio" speed={30} /><br />
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
            <a className="btn btn-primary" href="#projects" onClick={(e) => { e.preventDefault(); window.scrollToId("projects"); }}>
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
function About() {
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
function Experience() {
  const [lang] = useLang();
  const t = STR[lang].exp;
  const exp = window.getEXP(lang);
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

/* ---------- Project card cover (striped placeholder) ---------- */
function CardCover({ p }) {
  return (
    <div className={`card-cover dev-${p.device}`}>
      <div className="cover-grid"></div>
      <div className="cover-label">{p.kicker}</div>
      <div className="cover-glyph">{p.name.charAt(0)}</div>
    </div>
  );
}

/* ---------- Projects grid ---------- */
function Projects() {
  const [lang] = useLang();
  const t = STR[lang].proj;
  const projects = window.getPROJECTS(lang);
  const spot = useSpotlight();
  return (
    <section id="projects" className="section-pad">
      <div className="wrap">
        <Reveal><div className="eyebrow"><span className="num">03</span> <DecryptText onView key={lang} text={t.eyebrow} /></div></Reveal>
        <Reveal>
          <div className="proj-head">
            <h2 className="section-title"><DecryptText onView key={lang} text={t.title} /></h2>
            <p className="proj-sub">{t.sub}</p>
          </div>
        </Reveal>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 3) * 80}>
              <a className="card" href={`#/p/${p.slug}`} onMouseMove={spot}
                 onClick={(e) => { e.preventDefault(); goProject(p.slug); }}>
                <CardCover p={p} />
                <div className="card-body">
                  <div className="card-top">
                    <span className="card-badge">{p.badge}</span>
                    {p.live
                      ? <span className="card-live"><span className="d"></span>{p.live.label}</span>
                      : <span className="card-status">{p.status}</span>}
                  </div>
                  <div className="card-name">{p.name}</div>
                  <div className="card-desc">{p.tagline}</div>
                  <div className="card-stack">{p.stack.slice(0, 3).map((s) => <span key={s}>{s}</span>)}</div>
                  <span className="card-link">{t.view} <span className="arrow">→</span></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const [lang] = useLang();
  const t = STR[lang].skills;
  const skills = window.getSKILLS(lang);
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
function Contact() {
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
            <a className="social soon" href="#" onClick={(e) => e.preventDefault()}>{Icon.linkedin({ className: "ic" })} LinkedIn <span className="tag">{t.soon}</span></a>
            <a className="social soon" href="#" onClick={(e) => e.preventDefault()}>{Icon.behance({ className: "ic" })} Behance <span className="tag">{t.soon}</span></a>
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
function Home() {
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

Object.assign(window, { Home });
