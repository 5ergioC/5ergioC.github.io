/* ============================================================
   Project detail subpage (hash route #/p/<slug>)
   ============================================================ */
const { useEffect: useDE } = React;
const { Reveal: Rv, Magnetic: Mg, useLang: useDLang, STR: DSTR, DecryptText: Dx } = window;

function scrollToId(id, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
}

function Slot({ g, shape = "rounded", radius = 14 }) {
  return React.createElement("image-slot", {
    id: g.id,
    shape,
    radius: String(radius),
    placeholder: g.cap,
    style: { width: "100%", height: "100%", display: "block" },
  });
}

function Gallery({ p }) {
  if (p.device === "mobile") {
    return (
      <div className="gallery-phones">
        {p.gallery.map((g) => (
          <figure className="phone" key={g.id}>
            <div className="phone-frame"><div className="phone-notch"></div><Slot g={g} radius={26} /></div>
            <figcaption>{g.cap}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  if (p.device === "cube") {
    return (
      <div className="gallery-cubes">
        {p.gallery.map((g) => (
          <figure key={g.id} className="shot">
            <div className="shot-frame" style={{ aspectRatio: g.ratio }}><Slot g={g} /></div>
            <figcaption>{g.cap}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  return (
    <div className="gallery">
      {p.gallery.map((g) => (
        <figure key={g.id} className={`shot ${g.span === "full" ? "full" : "half"}`}>
          <div className="shot-frame" style={{ aspectRatio: g.ratio }}><Slot g={g} /></div>
          <figcaption>{g.cap}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function ProjectDetail({ slug }) {
  const [lang] = useDLang();
  const t = DSTR[lang].detail;
  const p = window.getPROJECT(slug, lang);
  useDE(() => { window.scrollTo(0, 0); }, [slug]);

  const goHome = (e) => {
    e.preventDefault();
    window.location.hash = "";
    setTimeout(() => scrollToId("projects", false), 40);
  };
  const others = window.getPROJECTS(lang).filter((x) => x.slug !== slug);

  return (
    <div className="detail">
      {/* minimal top bar */}
      <nav className="nav scrolled detail-nav">
        <div className="wrap">
          <a href="#" className="brand" onClick={goHome}>
            <span className="dot"></span>SC<span className="slash">/</span><span style={{ color: "var(--fg-mute)" }}>dev</span>
          </a>
          <div className="detail-nav-right">
            <a href="#" className="back-link" onClick={goHome}>{Icon.back({ style: { width: 15, height: 15 } })} {t.all}</a>
            <window.ThemeToggle />
            <window.LangToggle />
            <a className="nav-cta" href="assets/Sergio_Castano_CV.pdf" download>CV ↓</a>
          </div>
        </div>
      </nav>

      {/* hero */}
      <header className={`detail-hero dev-${p.device}`}>
        <div className="wrap">
          <a href="#" className="crumb" onClick={goHome}>{Icon.back({ style: { width: 14, height: 14 } })} {t.crumb}</a>
          <div className="detail-kicker">{p.kicker}</div>
          <h1 className="detail-title"><Dx onView key={lang + slug} text={p.name} /></h1>
          <p className="detail-tagline">{p.tagline}</p>
          <div className="detail-meta">
            <div className="dm"><span className="dm-k">{t.year}</span><span className="dm-v">{p.year}</span></div>
            <div className="dm"><span className="dm-k">{t.role}</span><span className="dm-v">{p.role}</span></div>
            <div className="dm"><span className="dm-k">{t.status}</span><span className="dm-v">{p.status}</span></div>
          </div>
          {p.live && (
            <div className="detail-actions">
              <Mg strength={0.2}>
                <a className="btn btn-primary" href={p.live.url} target="_blank" rel="noopener">{Icon.ext({})} {t.visit} {p.live.label}</a>
              </Mg>
            </div>
          )}
        </div>
      </header>

      <div className="wrap"><hr className="divider" /></div>

      {/* body */}
      <section className="detail-body">
        <div className="wrap">
          <div className="detail-grid">
            <Rv className="detail-overview">
              <div className="eyebrow"><span className="num">·</span> <Dx onView key={lang + slug} text={t.overview} /></div>
              {p.overview.map((para, i) => <p key={i}>{para}</p>)}
            </Rv>
            <Rv delay={100} className="detail-side">
              <div className="side-block">
                <div className="side-h">{t.stack}</div>
                <div className="card-stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
              <div className="side-block">
                <div className="side-h">{t.highlights}</div>
                <ul className="hl-list">
                  {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            </Rv>
          </div>

          {/* turntable (image-sequence 360°) */}
          {p.turntable && (
            <Rv className="gallery-wrap">
              <div className="gallery-head">
                <div className="eyebrow"><span className="num">·</span> <Dx onView key={lang + slug + "tt"} text={t.tt} /></div>
              </div>
              <window.Turntable id={p.turntable.id} accent={p.turntable.accent} />
            </Rv>
          )}

          {/* gallery */}
          <Rv className="gallery-wrap">
            <div className="gallery-head">
              <div className="eyebrow"><span className="num">·</span> <Dx onView key={lang + slug} text={t.gallery} /></div>
              <span className="gallery-hint">{t.hint}</span>
            </div>
            <Gallery p={p} />
          </Rv>
        </div>
      </section>

      {/* more work */}
      <section className="more-work">
        <div className="wrap">
          <div className="eyebrow"><span className="num">→</span> <Dx onView key={lang + slug} text={t.more} /></div>
          <div className="more-grid">
            {others.map((o) => (
              <a key={o.slug} href={`#/p/${o.slug}`} className="more-card"
                 onClick={(e) => { e.preventDefault(); window.location.hash = "/p/" + o.slug; }}>
                <div className={`more-glyph dev-${o.device}`}>{o.name.charAt(0)}</div>
                <div>
                  <div className="more-name">{o.name}</div>
                  <div className="more-kicker">{o.kicker}</div>
                </div>
                <span className="more-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="meta">Sergio Castaño <span className="accent">·</span> {DSTR[lang].contact.foot1}</div>
          <a href="#" className="meta back-foot" onClick={goHome}>← {t.back}</a>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { ProjectDetail, scrollToId });
