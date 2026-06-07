import { useState, useEffect, lazy, Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { Home } from './sections';
import { PROJECTS, CATEGORIES } from './data';

// Detail + category routes are split out of the initial bundle — the home
// page (what everyone lands on) no longer ships project-detail, turntable,
// StickerPeel or the image-slot custom element. They load on navigation.
const ProjectDetail = lazy(() =>
  import('./project-detail').then((m) => ({ default: m.ProjectDetail }))
);
const CategoryPage = lazy(() =>
  import('./category-page').then((m) => ({ default: m.CategoryPage }))
);

function parseHash() {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  const mP = h.match(/^p\/(.+)$/);
  if (mP) return { view: "project", slug: decodeURIComponent(mP[1]) };
  const mC = h.match(/^cat\/(.+)$/);
  if (mC) return { view: "category", catId: decodeURIComponent(mC[1]) };
  return { view: "home" };
}

function App() {
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const handler = () => {
      const r = parseHash();
      setRoute(r);
      if (r.view !== "home") window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (route.view === "project") {
    const exists = PROJECTS.some((x) => x.slug === route.slug);
    if (exists) return (
      <Suspense fallback={null}>
        <ProjectDetail slug={route.slug} />
      </Suspense>
    );
  }
  if (route.view === "category") {
    const exists = CATEGORIES.some((x) => x.id === route.catId);
    if (exists) return (
      <Suspense fallback={null}>
        <CategoryPage catId={route.catId} />
      </Suspense>
    );
  }
  return <Home />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
