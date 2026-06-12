/* ============================================================
   Shared chrome for project detail + category pages:
   sticky nav (desktop pills · ≤960px burger) and footer
   ============================================================ */
import { useState } from 'react';
import { useLang, STR, ThemeToggle, LangToggle } from './i18n';
import { Icon, getCATEGORIES } from './data';

const goHomeDefault = (e) => { e.preventDefault(); window.location.hash = ''; };

export function DetailNav({ activeCat, onHome }) {
  const [lang] = useLang();
  const [open, setOpen] = useState(false);
  const categories = getCATEGORIES(lang).filter((c) => c.id !== 'all');

  const goCat = (e, id) => {
    e.preventDefault();
    setOpen(false);
    window.location.hash = '/cat/' + id;
  };

  return (
    <nav className="nav scrolled detail-nav">
      <div className="wrap">
        <a href="#" className="brand" onClick={onHome || goHomeDefault}>
          <span className="dot"></span>SC<span className="slash">/</span><span style={{ color: 'var(--fg-mute)' }}>dev</span>
        </a>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {categories.map((c, i) => (
            <a key={c.id}
               href={`#/cat/${c.id}`}
               className={`cat-pill cat-color-${c.id}${activeCat === c.id ? ' active' : ''}`}
               onClick={(e) => goCat(e, c.id)}>
              <span className="cat-pill-idx">0{i + 1}.</span>{c.label}
            </a>
          ))}
          <a className="nav-cta" href="assets/Sergio_Castano_CV.pdf" download>CV ↓</a>
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <LangToggle />
          <button className={`nav-burger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export function DetailFooter({ backLabel, onBack }) {
  const [lang] = useLang();
  return (
    <footer>
      <div className="wrap">
        <div className="meta">Sergio Castaño <span className="accent">·</span> {STR[lang].contact.foot1}</div>
        <div className="foot-socials">
          <a href="https://github.com/5ergioC" target="_blank" rel="noopener">{Icon.github({ className: 'ic' })} GitHub</a>
          <a href="https://www.linkedin.com/in/sergio-alejandro-castaño-arcila/" target="_blank" rel="noopener">{Icon.linkedin({ className: 'ic' })} LinkedIn</a>
          <a href="https://www.behance.net/sergiocastao6" target="_blank" rel="noopener">{Icon.behance({ className: 'ic' })} Behance</a>
          <a href="mailto:sergioacastanoa@gmail.com">{Icon.mail({ className: 'ic' })} Mail</a>
        </div>
        <a href="#" className="meta back-foot" onClick={onBack}>← {backLabel}</a>
      </div>
    </footer>
  );
}
