export const spaceInvaders = {
  slug: "space-invaders",
  category: "games",
  name: "Space Invaders",
  kicker: { en: "Game · Coursework", es: "Juego · Curso" },
  device: "game",
  badge: { en: "Game Dev", es: "Videojuego" },
  tagline: { en: "The arcade classic, rebuilt from scratch.", es: "El clásico de arcade, reconstruido desde cero." },
  year: "2024",
  role: { en: "Solo build", es: "Desarrollo individual" },
  status: { en: "Course project", es: "Proyecto de curso" },
  stack: ["Unity", "C#", "Game Dev"],
  stickers: [
    { src: "/stickers/unity.svg", alt: "Unity", rotate: 8, position: { x: 0, y: 0 } },
  ],
  overview: [
    { en: "A faithful Space Invaders remake built for a video-game development course, with sprites, waves, collision, scoring and that relentless descending march, all reconstructed by hand.",
      es: "Un remake fiel de Space Invaders hecho para un curso de desarrollo de videojuegos, con sprites, oleadas, colisiones, puntaje y esa marcha descendente implacable, todo reconstruido a mano." },
    { en: "A fun excuse to think about game loops, state and feel.",
      es: "Una excusa divertida para pensar en game loops, estado y feel." },
  ],
  highlights: [
    { en: "Built the core game loop, waves and scoring from scratch", es: "Construí el game loop, las oleadas y el puntaje desde cero" },
    { en: "Made in a video-game development course", es: "Hecho en un curso de desarrollo de videojuegos" },
    { en: "Sharpened C# and real-time interaction fundamentals", es: "Afiné fundamentos de C# e interacción en tiempo real" },
  ],
  gallery: [
    { id: "invaders-1", ratio: "16 / 10", span: "full", cap: { en: "Gameplay",       es: "Gameplay"       } },
    { id: "invaders-2", ratio: "4 / 3",   span: "half", cap: { en: "Wave / enemies", es: "Oleada / enemigos" } },
    { id: "invaders-3", ratio: "4 / 3",   span: "half", cap: { en: "Title / score",  es: "Título / puntaje" } },
  ],
};
