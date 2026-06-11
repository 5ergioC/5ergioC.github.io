/* ============================================================
   Shared sticky nav for project detail + category pages
   Desktop: inline category pills · ≤820px: burger dropdown
   ============================================================ */
import { useState } from 'react';
import { useLang, ThemeToggle, LangToggle } from './i18n';
import { getCATEGORIES } from './data';

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
