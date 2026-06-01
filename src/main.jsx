import { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './image-slot.js';
import './styles.css';
import { Home } from './sections';
import { ProjectDetail } from './project-detail';
import { PROJECTS } from './data';

function parseHash() {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  const m = h.match(/^p\/(.+)$/);
  if (m) return { view: "project", slug: decodeURIComponent(m[1]) };
  return { view: "home" };
}

function App() {
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const handler = () => {
      const r = parseHash();
      setRoute(r);
      if (r.view === "project") window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (route.view === "project") {
    const exists = PROJECTS.some((x) => x.slug === route.slug);
    if (exists) return <ProjectDetail slug={route.slug} />;
  }
  return <Home />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
