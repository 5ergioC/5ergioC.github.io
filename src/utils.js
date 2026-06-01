export function scrollToId(id, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
}
