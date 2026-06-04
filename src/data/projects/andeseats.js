export const andeseats = {
  slug: "andeseats",
  category: "dev",
  name: "AndesEats",
  kicker: "andeseats.co",
  device: "web",
  badge: { en: "Live Product", es: "En Producción" },
  tagline: { en: "Restaurant discovery for university students.", es: "Descubre dónde comer cerca del campus." },
  year: "2025",
  role: { en: "Full-stack developer", es: "Desarrollador full-stack" },
  status: { en: "Live in production", es: "En vivo, en producción" },
  live: { label: "andeseats.co", url: "https://andeseats.co" },
  stickers: [
    { src: "/stickers/react.svg", alt: "React", rotate: -10, position: { x: 0, y: 0 } },
  ],
  stack: ["React", "Web App", "REST APIs", "Production"],
  overview: [
    { en: "AndesEats helps university students find, compare and decide where to eat around campus, turning the daily \"where do we go?\" into a couple of taps.",
      es: "AndesEats ayuda a estudiantes universitarios a encontrar, comparar y decidir dónde comer cerca del campus, convirtiendo el \"¿a dónde vamos?\" de cada día en un par de toques." },
    { en: "It's live and serving real students. This page preserves the product's design and story, so the work stays visible even if the live site is ever taken down for maintenance.",
      es: "Está en vivo y sirviendo a estudiantes reales. Esta página conserva el diseño y la historia del producto, para que el trabajo siga visible aunque el sitio se baje por mantenimiento." },
  ],
  highlights: [
    { en: "Discovery & search tuned for a student's budget and walking distance", es: "Búsqueda y descubrimiento pensados para el presupuesto y la distancia a pie de un estudiante" },
    { en: "Built and shipped on React with a production deployment", es: "Construido y desplegado en React, con una versión en producción" },
    { en: "Designed end to end, from UX flows to frontend implementation", es: "Diseñado de principio a fin, desde los flujos de UX hasta el frontend" },
  ],
  gallery: [
    { id: "andeseats-1", ratio: "16 / 9",  span: "full", cap: { en: "Home / discovery",    es: "Inicio / descubrimiento"   } },
    { id: "andeseats-2", ratio: "16 / 11", span: "half", cap: { en: "Restaurant listing",  es: "Listado de restaurantes"   } },
    { id: "andeseats-3", ratio: "16 / 11", span: "half", cap: { en: "Detail view",         es: "Vista de detalle"          } },
  ],
};
