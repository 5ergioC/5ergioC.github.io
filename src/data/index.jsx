import { L }          from '../i18n';
import { Icon }        from './icons';
import { EXP }         from './experience';
import { SKILLS }      from './skills';
import { CATEGORIES }  from './categories';
import { PROJECTS }    from './projects/index';

// Re-export raw arrays (used by any consumer that needs them directly)
export { Icon, EXP, SKILLS, CATEGORIES, PROJECTS };

// Localized getters — pass lang ("en" | "es") to get translated data
export function getEXP(lang)        { return L(EXP,        lang); }
export function getSKILLS(lang)     { return L(SKILLS,     lang); }
export function getPROJECTS(lang)   { return L(PROJECTS,   lang); }
export function getCATEGORIES(lang) { return L(CATEGORIES, lang); }
export function getPROJECT(slug, lang) {
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? L(p, lang) : null;
}
