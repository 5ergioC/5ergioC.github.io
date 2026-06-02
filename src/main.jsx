import { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './image-slot.js';
import './styles.css';
import { Home } from './sections';
import { ProjectDetail } from './project-detail';
import { CategoryPage } from './category-page';
import { PROJECTS, CATEGORIES } from './data';

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
    if (exists) return <ProjectDetail slug={route.slug} />;
  }
  if (route.view === "category") {
    const exists = CATEGORIES.some((x) => x.id === route.catId);
    if (exists) return <CategoryPage catId={route.catId} />;
  }
  return <Home />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
