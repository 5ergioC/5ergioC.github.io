/* ============================================================
   Project detail subpage (hash route #/p/<slug>)
   ============================================================ */
import { useEffect, useState, useMemo } from 'react';
import { Reveal, Magnetic, DecryptText } from './fx';
import { useLang, STR, L } from './i18n';
import { Icon, getPROJECT, getPROJECTS } from './data';
import { DetailNav, DetailFooter } from './detail-nav';
import { Turntable } from './turntable';
import { goHomeToSection } from './utils';
import StickerPeel from './StickerPeel';

const CAT_HUE = { dev: '220', cyber: '150', design: '286', games: '55' };

// Production image: static, lazy, zero-CLS (parent frame sets aspect-ratio).
// Pass `srcSet`/`sizes` on the gallery item when responsive variants exist.
function Figure({ g }) {
  return (
    <img
      src={g.src}
      srcSet={g.srcSet}
      sizes={g.sizes}
      alt={g.alt || g.cap || ""}
      loading="lazy"
      decoding="async"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

// Bridge: real committed image when the gallery item has `src`, otherwise a
// static placeholder. Once screenshots land in /public and items get a
// `src`, every gallery renders <Figure> automatically.
function Slot({ g }) {
  if (g.youtube) return (
    <iframe
      className="shot-video"
      src={`https://www.youtube.com/embed/${g.youtube}`}
      title={g.cap || ""}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
  if (g.src) return <Figure g={g} />;
  return <div className="img-placeholder" />;
}

function VideoEmbed({ p }) {
  if (!p.video) return null;
  // p.videoRatio: e.g. "9 / 16" for Shorts/vertical recordings. Defaults to 16/9.
  const ratio = p.videoRatio || "16 / 9";
  const isVertical = ratio.replace(/\s/g, '').startsWith('9/');
  // captioned videos drop the gallery-video margin — the figure owns the spacing
  const frame = (
    <div className={`video-wrap${isVertical ? ' vertical' : ''}${p.videoCaption ? '' : ' gallery-video'}`} style={{ '--video-ratio': ratio }}>
      <iframe
        className="demo-video"
        src={`https://www.youtube.com/embed/${p.video}?vq=hd1080`}
        title={p.name + " demo"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
  if (!p.videoCaption) return frame;
  return (
    <figure className="video-feature">
      {frame}
      <figcaption className="video-feature-cap">
        {p.videoCaption}
        {p.videoLink && (
          <a href={p.videoLink} target="_blank" rel="noopener"> {p.videoLinkLabel || "Ver más"} ↗</a>
        )}
      </figcaption>
    </figure>
  );
}

// Official Instagram embed: blockquote processed by embed.js (auto-sizes,
// falls back to a plain link if the script is blocked). Renders nothing
// without a url.
function InstagramEmbed({ url, label }) {
  useEffect(() => {
    if (!url) return;
    const SRC = "https://www.instagram.com/embed.js";
    if (document.querySelector(`script[src="${SRC}"]`)) {
      if (window.instgrm) window.instgrm.Embeds.process();
    } else {
      const s = document.createElement("script");
      s.async = true;
      s.src = SRC;
      document.body.appendChild(s);
    }
  }, [url]);
  if (!url) return null;
  return (
    <figure className="ig-embed">
      {label && <figcaption className="ig-embed-label">{label}</figcaption>}
      <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14">
        <a href={url} target="_blank" rel="noopener">Ver en Instagram ↗</a>
      </blockquote>
    </figure>
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
              <div className="phone-frame"><div className="phone-notch"></div><Slot g={g} /></div>
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
      <InstagramEmbed url={p.instagram} label={p.instagramLabel} />
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

// true on phone-width viewports — drives the spread sticker layout below.
// Must match the ≤480px sticker-zone override in styles.css (unscaled spread).
function useNarrow(query = '(max-width: 480px)') {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return narrow;
}

export function ProjectDetail({ slug }) {
  const [lang] = useLang();
  const t = STR[lang].detail;
  const p = getPROJECT(slug, lang);
  const narrow = useNarrow();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // On phones the authored desktop sticker coords collapse to the center; spread
  // them across the (smaller) mobile zone instead — first left, last right.
  const stickerPos = useMemo(() => {
    const n = p.stickers ? p.stickers.length : 0;
    if (!narrow || !n) return null;
    const zoneW = Math.min(360, (typeof window !== 'undefined' ? window.innerWidth : 360) - 32);
    const sw = 140; // matches .sticker-image width at ≤480px
    const span = Math.max(0, zoneW - sw);
    return p.stickers.map((s, i) => ({
      x: n === 1 ? Math.round(span / 2) : Math.round((span * i) / (n - 1)),
      y: 18 + (i % 2) * 34,
    }));
  }, [narrow, slug, p.stickers]);

  const goHome = (e) => {
    e.preventDefault();
    goHomeToSection("projects");
  };
  const others     = getPROJECTS(lang).filter((x) => x.slug !== slug);

  return (
    <div className="detail">
      <DetailNav activeCat={p.category} onHome={goHome} />

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
                initialPosition={stickerPos ? stickerPos[i] : (s.position ?? { x: i * 155, y: i * 30 })}
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
                 style={{ '--cat-hue': CAT_HUE[o.category] || '260' }}
                 onClick={(e) => { e.preventDefault(); window.location.hash = "/p/" + o.slug; }}>
                <div className="more-glyph">
                  {o.glyph ? <img src={o.glyph} alt="" loading="lazy" decoding="async" /> : o.name.charAt(0)}
                </div>
                <div>
                  <div className="more-name">{o.name}</div>
                  <div className="more-kicker">{L(o.tag, lang)}</div>
                </div>
                <span className="more-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <DetailFooter backLabel={t.back} onBack={goHome} />
    </div>
  );
}
