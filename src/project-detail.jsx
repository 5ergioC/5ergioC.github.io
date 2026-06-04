/* ============================================================
   Project detail subpage (hash route #/p/<slug>)
   ============================================================ */
import { useEffect } from 'react';
import { Reveal, Magnetic, DecryptText } from './fx';
import { useLang, STR, ThemeToggle, LangToggle } from './i18n';
import { Icon, getPROJECT, getPROJECTS, getCATEGORIES } from './data';
import { Turntable } from './turntable';
import { scrollToId } from './utils';
import StickerPeel from './StickerPeel';

function Slot({ g, shape = "rounded", radius = 14 }) {
  return (
    <image-slot
      id={g.id}
      shape={shape}
      radius={String(radius)}
      placeholder={g.cap}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

function VideoEmbed({ p }) {
  if (!p.video) return null;
  return (
    <div className="video-wrap gallery-video">
      <iframe
        className="demo-video"
        src={`https://www.youtube.com/embed/${p.video}`}
        title={p.name + " demo"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

function Gallery({ p }) {
  if (p.device === "mobile") {
    return (
      <>
        <VideoEmbed p={p} />
        <div className="gallery-phones">
          {p.gallery.map((g) => (
            <figure className="phone" key={g.id}>
              <div className="phone-frame"><div className="phone-notch"></div><Slot g={g} radius={26} /></div>
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </>
    );
  }
  if (p.device === "cube") {
    return (
      <>
        <VideoEmbed p={p} />
        <div className="gallery-cubes">
          {p.gallery.map((g) => (
            <figure key={g.id} className="shot">
              <div className="shot-frame" style={{ aspectRatio: g.ratio }}><Slot g={g} /></div>
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <VideoEmbed p={p} />
      <div className="gallery">
        {p.gallery.map((g) => (
          <figure key={g.id} className={`shot ${g.span === "full" ? "full" : "half"}`}>
            <div className="shot-frame" style={{ aspectRatio: g.ratio }}><Slot g={g} /></div>
            <figcaption>{g.cap}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

export function ProjectDetail({ slug }) {
  const [lang] = useLang();
  const t = STR[lang].detail;
  const p = getPROJECT(slug, lang);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const goHome = (e) => {
    e.preventDefault();
    window.location.hash = "";
    setTimeout(() => scrollToId("projects", false), 40);
  };
  const others     = getPROJECTS(lang).filter((x) => x.slug !== slug);
  const categories = getCATEGORIES(lang).filter(c => c.id !== 'all');

  return (
    <div className="detail">
      <nav className="nav scrolled detail-nav">
        <div className="wrap">
          <a href="#" className="brand" onClick={goHome}>
            <span className="dot"></span>SC<span className="slash">/</span><span style={{ color: "var(--fg-mute)" }}>dev</span>
          </a>
          <div className="detail-nav-right">
            {categories.map((c, i) => (
              <a key={c.id}
                 href={`#/cat/${c.id}`}
                 className={`cat-color-${c.id}${p.category === c.id ? ' active' : ''}`}
                 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, padding: '8px 10px', borderRadius: 7, background: p.category === c.id ? 'var(--surface-2)' : 'none' }}
                 onClick={(e) => { e.preventDefault(); window.location.hash = '/cat/' + c.id; }}>
                <span style={{ marginRight: 4, opacity: 0.6, fontSize: 11 }}>0{i + 1}.</span>{c.label}
              </a>
            ))}
            <ThemeToggle />
            <LangToggle />
            <a className="nav-cta" href="assets/Sergio_Castano_CV.pdf" download>CV ↓</a>
          </div>
        </div>
      </nav>

      <header className={`detail-hero dev-${p.device}`}>
        <div className="wrap">
          <a href="#" className="crumb" onClick={goHome}>{Icon.back({ style: { width: 14, height: 14 } })} {t.crumb}</a>
          <div className="detail-kicker">{p.kicker}</div>
          <h1 className="detail-title"><DecryptText onView key={lang + slug} text={p.name} /></h1>
          <p className="detail-tagline">{p.tagline}</p>
          <div className="detail-meta">
            <div className="dm"><span className="dm-k">{t.year}</span><span className="dm-v">{p.year}</span></div>
            <div className="dm"><span className="dm-k">{t.role}</span><span className="dm-v">{p.role}</span></div>
            <div className="dm"><span className="dm-k">{t.status}</span><span className="dm-v">{p.status}</span></div>
          </div>
          {p.live && (
            <div className="detail-actions">
              <Magnetic strength={0.2}>
                <a className="btn btn-primary" href={p.live.url} target="_blank" rel="noopener">{Icon.ext({})} {t.visit} {p.live.label}</a>
              </Magnetic>
            </div>
          )}
        </div>
        {p.stickers && p.stickers.length > 0 && (
          <div className="sticker-zone">
            {p.stickers.map((s, i) => (
              <StickerPeel
                key={i}
                imageSrc={s.src}
                width={190}
                rotate={s.rotate ?? (i % 2 === 0 ? -8 : 10)}
                peelBackHoverPct={32}
                peelBackActivePct={50}
                peelDirection={s.peelDirection ?? 0}
                shadowIntensity={0.4}
                lightingIntensity={0.1}
                initialPosition={s.position ?? { x: i * 155, y: i * 30 }}
              />
            ))}
          </div>
        )}
      </header>

      <div className="wrap"><hr className="divider" /></div>

      <section className="detail-body">
        <div className="wrap">
          <div className="detail-grid">
            <Reveal className="detail-overview">
              <div className="eyebrow"><span className="num">·</span> <DecryptText onView key={lang + slug} text={t.overview} /></div>
              {p.overview.map((para, i) => <p key={i}>{para}</p>)}
            </Reveal>
            <Reveal delay={100} className="detail-side">
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
            </Reveal>
          </div>

          {p.turntable && (
            <Reveal className="gallery-wrap">
              <div className="gallery-head">
                <div className="eyebrow"><span className="num">·</span> <DecryptText onView key={lang + slug + "tt"} text={t.tt} /></div>
              </div>
              <Turntable id={p.turntable.id} accent={p.turntable.accent} />
            </Reveal>
          )}

          <Reveal className="gallery-wrap">
            <div className="gallery-head">
              <div className="eyebrow"><span className="num">·</span> <DecryptText onView key={lang + slug} text={t.gallery} /></div>
              <span className="gallery-hint">{t.hint}</span>
            </div>
            <Gallery p={p} />
          </Reveal>
        </div>
      </section>

      <section className="more-work">
        <div className="wrap">
          <div className="eyebrow"><span className="num">→</span> <DecryptText onView key={lang + slug} text={t.more} /></div>
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
          <div className="meta">Sergio Castaño <span className="accent">·</span> {STR[lang].contact.foot1}</div>
          <a href="#" className="meta back-foot" onClick={goHome}>← {t.back}</a>
        </div>
      </footer>
    </div>
  );
}
