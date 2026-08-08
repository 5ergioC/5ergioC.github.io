export const experimentalAnimation = {
  slug: "experimental-animation",
  category: "design",
  tag: { en: "Animation", es: "Animación" },
  name: { en: "Experimental Animation", es: "Animación Experimental" },
  kicker: { en: "Blender · Animate · Stop Motion", es: "Blender · Animate · Stop Motion" },
  device: "video",
  compactTitle: true, // long name — shrink + wrap so it clears the sticker zone
  badge: { en: "Design · Animation", es: "Diseño · Animación" },
  tagline: {
    en: "Short pieces from the Experimental Animation elective — from rotoscoping to stylized 3D in Blender.",
    es: "Piezas cortas de la electiva de Animación Experimental — de rotoscopía a 3D estilizado en Blender.",
  },
  year: "2026",
  role: { en: "Animation", es: "Animación" },
  status: { en: "Selected pieces", es: "Piezas seleccionadas" },
  provenance: {
    k: { en: "Course", es: "Curso" },
    v: { en: "Experimental Animation (elective) · DISO3411 · 2026-1", es: "Animación Experimental (electiva) · DISO3411 · 2026-1" },
  },
  stack: ["Blender", "Photoshop", "Adobe Animate", "Stop Motion"],
  stickers: [
    { src: "/stickers/blender.svg",   alt: "Blender",   rotate: -8, position: { x: 8,   y: 24 } },
    { src: "/stickers/photoshop.svg", alt: "Photoshop", rotate: 9,  position: { x: 120, y: 196 } },
  ],

  // Featured piece: my 3D part of the collaborative "exquisite corpse".
  // Vertical short (like Spendant); caption links to the full class post.
  video: "yQtCSVY1C24",
  videoRatio: "9 / 16",
  videoCaption: {
    en: "Exquisite corpse — my part: stylized 3D in Blender, a purple Menger sponge that breathes and bursts as a transition into the next clip. 3 s · 12 fps.",
    es: "Cadáver exquisito — mi parte: 3D estilizado en Blender, una esponja de Menger morada que respira y estalla como transición a la siguiente animación. 3 s · 12 fps.",
  },
  // Full collaborative piece, embedded inline below my segment
  instagram: "https://www.instagram.com/p/DYCbEj6w471/",
  instagramLabel: {
    en: "The full class collab",
    es: "El cadáver exquisito completo del curso",
  },

  overview: [
    { en: "Selected pieces from the Experimental Animation elective (DISO3411) at Universidad de los Andes, exploring a different technique each time — traditional frame-by-frame, rotoscoping, 3D, and stop motion.",
      es: "Piezas seleccionadas de la electiva de Animación Experimental (DISO3411) en la Universidad de los Andes, explorando una técnica distinta cada vez — cuadro a cuadro tradicional, rotoscopía, 3D y stop motion." },
    { en: "The standout is the collaborative exquisite corpse, where my segment is 3D in Blender — the kind of animation I enjoy most.",
      es: "El destacado es el cadáver exquisito colaborativo, donde mi segmento es 3D en Blender — el tipo de animación que más disfruto." },
  ],
  highlights: [
    { en: "Stylized 3D animation in Blender", es: "Animación 3D estilizada en Blender" },
    { en: "Rotoscoping and traditional frame-by-frame", es: "Rotoscopía y cuadro a cuadro tradicional" },
    { en: "Stop motion and pixilation", es: "Stop motion y pixilación" },
  ],

  // Horizontal pieces, in order. Two-column reel below the featured short.
  gallery: [
    {
      id: "anim-rotoscopia",
      youtube: "SUF269S7DSQ",
      ratio: "16 / 9",
      cap: {
        en: "Rotoscoping · 10 fps · 10 s · Photoshop — Link from Ocarina of Time as the \"Ibai explaining\" meme, on why he shouldn't go back to the past.",
        es: "Rotoscopía · 10 fps · 10 s · Photoshop — Link de Ocarina of Time como el meme del \"Ibai explicando\", sobre por qué no debería volver al pasado.",
      },
    },
    {
      id: "anim-headturn",
      youtube: "Xj4Iy_093ho",
      ratio: "16 / 9",
      cap: {
        en: "Head turn · 24 fps · 2 s · Adobe Animate — Makoto Yuki (Persona 3 Reload) following the blue butterfly.",
        es: "Head turn · 24 fps · 2 s · Adobe Animate — Makoto Yuki (Persona 3 Reload) siguiendo la mariposa azul.",
      },
    },
    {
      id: "anim-pelota",
      youtube: "gkiqkH91zdU",
      ratio: "16 / 9",
      cap: {
        en: "Bouncing ball · 12 fps · 6 s · Photoshop — a basketball drops from the sky and ricochets off objects until it scores (played back at 2×).",
        es: "Pelota rebotando · 12 fps · 6 s · Photoshop — una pelota de básquet cae del cielo y rebota en objetos hasta encestarse (reproducido a 2×).",
      },
    },
    {
      id: "anim-pixilacion",
      youtube: "HRiI1Mb7sZA",
      ratio: "16 / 9",
      cap: {
        en: "Pixilation · stop motion (group) — a 6:30 am class so sleepy you head out for a Starbucks coffee, framed like a little ad.",
        es: "Pixilación · stop motion (grupal) — una clase de 6:30 am con tanto sueño que sales por un café de Starbucks, planteado como una pequeña publicidad.",
      },
    },
  ],
};
