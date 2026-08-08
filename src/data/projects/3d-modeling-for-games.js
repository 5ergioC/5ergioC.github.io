export const modeling3d = {
  slug: "3d-modeling-for-games",
  category: "design",
  tag: { en: "3D", es: "3D" },
  name: { en: "3D Modeling for Games", es: "Modelado 3D para Videojuegos" },
  compactTitle: true, // long name — shrink + wrap so it clears the sticker zone
  kicker: { en: "Blender · Substance · Unreal", es: "Blender · Substance · Unreal" },
  device: "video",
  cover: "/images/studio-cover.webp",
  badge: { en: "Design · 3D", es: "Diseño · 3D" },
  tagline: {
    en: "A City of Tears diorama, taken through the full game-art pipeline.",
    es: "Un diorama de la Ciudad de las Lágrimas, por todo el pipeline de arte para videojuegos.",
  },
  year: "2025",
  role: { en: "3D artist", es: "Artista 3D" },
  status: { en: "Final project", es: "Proyecto final" },
  provenance: {
    k: { en: "Course", es: "Curso" },
    v: {
      en: "3D Design & Modeling for Games · DISO-2434 · 2025-2",
      es: "Diseño y Modelado 3D para videojuegos · DISO-2434 · 2025-2",
    },
  },
  stack: ["Blender", "Substance 3D Painter", "Unreal Engine", "PBR"],
  stickers: [
    { src: "/stickers/blender.svg",   alt: "Blender",              rotate: -8, position: { x: 8,   y: 24 } },
    { src: "/stickers/substance.svg", alt: "Substance 3D Painter", rotate: 9,  position: { x: 170, y: 210 } },
  ],

  // Final project: the City of Tears diorama, rendered in engine.
  video: "YQ6-5s7Qnio",
  videoCaption: {
    en: "City of Tears diorama — a walkthrough in Unreal Engine: the fountain statue, the mourners, rain and reflective stone under the city's eternal downpour.",
    es: "Diorama de la Ciudad de las Lágrimas — recorrido en Unreal Engine: la estatua de la fuente, los dolientes, la lluvia y la piedra reflejante bajo el aguacero eterno de la ciudad.",
  },

  overview: [
    { en: "A studio course built around the pipeline the games industry actually uses: each stage — polygonal modeling, sculpting, retopology, UV mapping, baking, PBR texturing, shading and scene assembly — was worked through in depth before moving to the next.",
      es: "Un curso de taller montado sobre el pipeline que la industria de videojuegos usa de verdad: cada etapa — modelado poligonal, esculpido, retopología, mapeo UV, baking, texturizado PBR, shading y montaje de escena — se trabajó a fondo antes de pasar a la siguiente." },
    { en: "The final project is a diorama of the City of Tears from Hollow Knight. Models and UVs in Blender, textures in Adobe Substance 3D Painter, and everything assembled in Unreal Engine — master materials, lighting, cameras, and the rain that never stops falling on that city.",
      es: "El proyecto final es un diorama de la Ciudad de las Lágrimas de Hollow Knight. Modelos y UVs en Blender, texturas en Adobe Substance 3D Painter, y todo montado en Unreal Engine — master materials, iluminación, cámaras y la lluvia que nunca deja de caer sobre esa ciudad." },
    { en: "Before the diorama came a run of topology exercises — hard-surface props, organic shapes, and low-poly silhouettes — each one game-ready and judged on its wireframe as much as its render.",
      es: "Antes del diorama vino una serie de ejercicios de topología — props hard-surface, formas orgánicas y siluetas low-poly — cada uno game-ready y evaluado tanto por su wireframe como por su render." },
  ],
  highlights: [
    { en: "Full game-art pipeline: modeling → sculpt → retopology → UV → baking → texturing → engine",
      es: "Pipeline completo de arte 3D: modelado → esculpido → retopología → UV → baking → texturizado → motor" },
    { en: "PBR texturing in Substance 3D Painter, exported as base color / normal / ORM maps",
      es: "Texturizado PBR en Substance 3D Painter, exportado como mapas de base color / normal / ORM" },
    { en: "Scene assembly in Unreal Engine — master materials, lighting, cameras and rain FX",
      es: "Montaje de escena en Unreal Engine — master materials, iluminación, cámaras y efectos de lluvia" },
  ],

  // 1) The diorama, full-width. 2) Topology exercises, solid + wireframe side by side.
  gallery: [
    {
      id: "studio-diorama-wide", span: "full", ratio: "2000 / 1023",
      src: "/images/studio-diorama-wide.webp",
      alt: "Wide shot of the City of Tears diorama with mourners on lily pads under rain",
      cap: { en: "The diorama in Unreal Engine — mourners gathered under the rain",
             es: "El diorama en Unreal Engine — dolientes reunidos bajo la lluvia" },
    },
    {
      id: "studio-diorama-fountain", span: "full", ratio: "2000 / 1023",
      src: "/images/studio-diorama-fountain.webp",
      alt: "The City of Tears fountain statue standing over rippling water",
      cap: { en: "The fountain statue — reflective water and stonework lit in engine",
             es: "La estatua de la fuente — agua reflejante y piedra iluminadas en motor" },
    },
    {
      id: "studio-diorama-silhouette", span: "full", ratio: "2000 / 1023",
      src: "/images/studio-diorama-silhouette.webp",
      alt: "Backlit silhouettes of the diorama characters, with a red cloak catching the light",
      cap: { en: "Backlit pass — silhouette reading and a single warm accent in the palette",
             es: "Pase a contraluz — lectura de siluetas y un solo acento cálido en la paleta" },
    },

    {
      id: "studio-sword-solid", ratio: "329 / 778", src: "/images/studio-sword-solid.webp",
      alt: "Dragonslayer greatsword model, solid shading",
      cap: { en: "Dragonslayer greatsword — hard-surface modeling", es: "Espada Dragonslayer — modelado hard-surface" },
    },
    {
      id: "studio-sword-wire", ratio: "329 / 778", src: "/images/studio-sword-wire.webp",
      alt: "Dragonslayer greatsword wireframe",
      cap: { en: "Wireframe — flat planes kept cheap, detail spent on the guard",
             es: "Wireframe — los planos rectos salen baratos, el detalle se gasta en la guarda" },
    },
    {
      id: "studio-lightsaber-solid", ratio: "336 / 736", src: "/images/studio-lightsaber-solid.webp",
      alt: "Lightsaber hilt model, solid shading",
      cap: { en: "Lightsaber — cylindrical hard-surface with stacked greebles", es: "Sable de luz — hard-surface cilíndrico con greebles apilados" },
    },
    {
      id: "studio-lightsaber-wire", ratio: "336 / 736", src: "/images/studio-lightsaber-wire.webp",
      alt: "Lightsaber hilt wireframe",
      cap: { en: "Wireframe — radial loops on the grip, clean poles at the emitter",
             es: "Wireframe — loops radiales en el mango, polos limpios en el emisor" },
    },
    {
      id: "studio-tenna-solid", ratio: "731 / 689", src: "/images/studio-tenna-solid.webp",
      alt: "Mr. Tenna television-head character model, solid shading",
      cap: { en: "Mr. Tenna — rounded box forms and a subdivision-friendly cage", es: "Mr. Tenna — formas de caja redondeada y una jaula apta para subdivisión" },
    },
    {
      id: "studio-tenna-wire", ratio: "731 / 689", src: "/images/studio-tenna-wire.webp",
      alt: "Mr. Tenna character wireframe",
      cap: { en: "Wireframe — supporting loops holding the bevels through subdivision",
             es: "Wireframe — loops de soporte sosteniendo los biseles a través de la subdivisión" },
    },
    {
      id: "studio-breakfast-solid", ratio: "860 / 641", src: "/images/studio-breakfast-solid.webp",
      alt: "Breakfast plate with fried egg and toast, solid shading",
      cap: { en: "Breakfast plate — organic shapes next to hard edges", es: "Plato de desayuno — formas orgánicas junto a bordes duros" },
    },
    {
      id: "studio-breakfast-wire", ratio: "860 / 641", src: "/images/studio-breakfast-wire.webp",
      alt: "Breakfast plate wireframe",
      cap: { en: "Wireframe — the egg white sculpted loose, the plate kept radial",
             es: "Wireframe — la clara esculpida suelta, el plato mantenido radial" },
    },
    {
      id: "studio-plane-solid", ratio: "1028 / 607", src: "/images/studio-plane-solid.webp",
      alt: "Low-poly propeller plane model, solid shading",
      cap: { en: "Low-poly plane — silhouette carried by flat faces", es: "Avión low-poly — la silueta la carga la cara plana" },
    },
    {
      id: "studio-plane-wire", ratio: "1028 / 607", src: "/images/studio-plane-wire.webp",
      alt: "Low-poly plane wireframe",
      cap: { en: "Wireframe — triangle count kept low on purpose, no smoothing",
             es: "Wireframe — conteo de triángulos bajo a propósito, sin suavizado" },
    },
  ],
};
