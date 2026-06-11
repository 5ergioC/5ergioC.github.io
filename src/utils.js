export function scrollToId(id, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
}

// Navigate to the home route and land on a section once it exists.
// Polling (not a fixed delay) because the home view mounts on hashchange
// and the section isn't in the DOM yet when the click handler runs.
export function goHomeToSection(id) {
  window.location.hash = '';
  const t0 = Date.now();
  const attempt = () => {
    if (document.getElementById(id)) scrollToId(id, false);
    else if (Date.now() - t0 < 2000) setTimeout(attempt, 40);
  };
  setTimeout(attempt, 0);
}
