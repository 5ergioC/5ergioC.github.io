/* ============================================================
   Category page — #/cat/:catId
   Featured project hero + full project grid for that category
   ============================================================ */
import { useEffect } from 'react';
import { Reveal, Magnetic, DecryptText } from './fx';
import { useLang, STR } from './i18n';
import { Icon, getPROJECTS, getCATEGORIES } from './data';
import { useSpotlight } from './fx';
import { DetailNav, DetailFooter } from './detail-nav';
import { goHomeToSection } from './utils';

const goProject = (slug) => { window.location.hash = '/p/' + slug; };
const goProjects = (e) => { e.preventDefault(); goHomeToSection('projects'); };

const CAT_HUE = { dev: '220', cyber: '150', design: '286', games: '55' };

/* ---------- mini project card ---------- */
function CatCard({ p, t, hue }) {
  const spot = useSpotlight();
  return (
    <a
      className="card cat-card"
      style={{ '--cat-hue': hue }}
      href={`#/p/${p.slug}`}
      onMouseMove={spot}
      onClick={(e) => { e.preventDefault(); goProject(p.slug); }}
    >
      <div className={`cat-card-cover dev-${p.device} cat-color-${p.category}`}>
        <div className="cover-grid" />
        {p.cover && <img className="cover-img" src={p.cover} alt={p.name} loading="lazy" decoding="async" />}
        <div className="cover-glyph">{p.name.charAt(0)}</div>
      </div>
      <div className="card-body">
        <div className="card-top">
          <span className="card-badge">{p.badge}</span>
          {p.live
            ? <span className="card-live"><span className="d" />{p.live.label}</span>
            : <span className="card-status">{p.status}</span>}
        </div>
        <div className="card-name">{p.name}</div>
        <div className="card-desc">{p.tagline}</div>
        <div className="card-stack">{p.stack.slice(0, 3).map(s => <span key={s}>{s}</span>)}</div>
        <span className="card-link">{t.view} <span className="arrow">→</span></span>
      </div>
    </a>
  );
}

/* ---------- Featured hero ---------- */
function FeaturedProject({ p, t, hue }) {
  return (
    <Magnetic strength={0.06} className="cf-mag">
      <a
        className="cat-featured"
        style={{ '--cat-hue': hue }}
        href={`#/p/${p.slug}`}
        onClick={(e) => { e.preventDefault(); goProject(p.slug); }}
      >
        <div className="cf-glyph">{p.name.charAt(0)}</div>
        <div className="cf-body">
          <div className="cf-kicker">{p.kicker}</div>
          <div className={`cf-name${p.compactTitle ? ' compact' : ''}`}>{p.name}</div>
          <p className="cf-tagline">{p.tagline}</p>
          <div className="cf-meta">
            <span>{p.year}</span>
            <span className="cf-dot">·</span>
            <span>{p.role}</span>
          </div>
          <div className="cf-stack">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
          <span className="cf-arrow">{Icon.arrow({ width: 22, height: 22 })}</span>
        </div>
        {p.cover ? (
          <div className="cf-cover">
            <img src={p.cover} alt="" loading="lazy" decoding="async" style={p.coverPosition ? { objectPosition: p.coverPosition } : undefined} />
          </div>
        ) : (
          <div className="cf-cover cf-cover-fallback" aria-hidden="true">
            <span className="cf-fallback-glyph">{p.name.charAt(0)}</span>
          </div>
        )}
      </a>
    </Magnetic>
  );
}

/* ---------- CategoryPage ---------- */
export function CategoryPage({ catId }) {
  const [lang] = useLang();
  const t = STR[lang];
  const allProjects = getPROJECTS(lang);
  const categories  = getCATEGORIES(lang);

  useEffect(() => { window.scrollTo(0, 0); }, [catId]);

  const catMeta    = categories.find(c => c.id === catId);
  const projects   = allProjects.filter(p => p.category === catId);
  const [featured, ...rest] = projects;
  const hue = CAT_HUE[catId] || '260';

  if (!catMeta || !projects.length) {
    return (
      <div className="detail">
        <DetailNav activeCat={catId} />
        <div className="wrap" style={{ paddingTop: '8rem' }}>
          <p style={{ color: 'var(--fg-mute)' }}>No projects here yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail">
      {/* nav */}
      <DetailNav activeCat={catId} />

      {/* category hero */}
      <header className="cat-hero" style={{ '--cat-hue': hue }}>
        <div className="wrap">
          <a href="#" className="crumb" onClick={goProjects}>
            {Icon.back({ style: { width: 14, height: 14 } })} {t.detail.crumb}
          </a>
          <h1 className="cat-hero-title">
            <DecryptText key={catId + lang} text={catMeta.label} />
          </h1>
          <p className="cat-hero-count">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
      </header>

      <div className="wrap"><hr className="divider" /></div>

      {/* featured */}
      {featured && (
        <section className="cat-section">
          <div className="wrap">
            <Reveal>
              <div className="eyebrow">
                <span className="num">·</span>
                <DecryptText onView key={lang + catId} text={t.proj.featured || 'Featured'} />
              </div>
            </Reveal>
            <Reveal delay={60}>
              <FeaturedProject p={featured} t={t.proj} hue={hue} />
            </Reveal>
          </div>
        </section>
      )}

      {/* rest of projects */}
      {rest.length > 0 && (
        <section className="cat-section">
          <div className="wrap">
            <Reveal>
              <div className="eyebrow">
                <span className="num">·</span>
                <DecryptText onView key={lang + catId + 'more'} text={t.proj.more || 'More'} />
              </div>
            </Reveal>
            <div className="proj-grid cat-grid">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <CatCard p={p} t={t.proj} hue={hue} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* footer */}
      <DetailFooter backLabel={t.detail.back} onBack={goProjects} />
    </div>
  );
}
