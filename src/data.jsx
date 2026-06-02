/* ============================================================
   Data — experience, skills, projects, icons
   ============================================================ */
import { L } from './i18n';

export const Icon = {
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>,
  back: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5m6 7-7-7 7-7"/></svg>,
  download: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>,
  work: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m4 17 6-6-6-6M12 19h8"/></svg>,
  mail: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9.5 12 1.8 1.8L15 10"/></svg>,
  ext: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 3h6v6m0-6-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>,
  github: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 2.5-.34c.85 0 1.7.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/></svg>,
  linkedin: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.65h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9s-2.04 1.38-2.04 2.8V21H9z"/></svg>,
  behance: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8.3 6.2c.66 0 1.26.06 1.8.18.54.1 1 .3 1.38.55.38.26.67.6.88 1.04.2.43.3.97.3 1.6 0 .7-.16 1.27-.48 1.73-.32.46-.8.84-1.42 1.12.86.25 1.5.68 1.92 1.3.42.6.63 1.34.63 2.2 0 .68-.13 1.28-.4 1.78s-.63.92-1.08 1.24c-.45.32-.97.56-1.56.71-.58.15-1.18.23-1.8.23H2V6.2zM7.78 11.1c.54 0 .98-.13 1.33-.39.34-.26.5-.67.5-1.25 0-.32-.05-.58-.17-.78a1.2 1.2 0 0 0-.46-.47 1.9 1.9 0 0 0-.67-.23 4.5 4.5 0 0 0-.78-.06H4.7v3.18zM7.93 16.3c.3 0 .58-.03.84-.09.26-.06.5-.16.69-.3.2-.14.36-.33.48-.57.12-.24.18-.55.18-.92 0-.72-.2-1.24-.6-1.55-.4-.31-.95-.46-1.62-.46H4.7v3.9zM16.1 16.16c.36.36.89.54 1.57.54.49 0 .91-.12 1.27-.37.35-.25.57-.51.65-.78h2.13c-.34 1.06-.86 1.81-1.57 2.27-.7.46-1.56.69-2.56.69-.7 0-1.32-.11-1.88-.34a3.92 3.92 0 0 1-1.42-.96 4.3 4.3 0 0 1-.9-1.49 5.5 5.5 0 0 1-.31-1.9c0-.67.1-1.3.32-1.87.22-.58.53-1.07.93-1.49.4-.42.88-.74 1.43-.98a4.7 4.7 0 0 1 1.85-.35c.75 0 1.4.14 1.97.43.56.3 1.02.68 1.38 1.17.36.49.62 1.05.78 1.68.16.63.21 1.29.16 1.98h-6.3c0 .69.23 1.31.6 1.66zM18.88 11.5c-.29-.32-.78-.49-1.38-.49-.4 0-.72.07-.98.2-.26.14-.47.3-.63.5-.16.2-.27.4-.33.62-.06.22-.1.41-.11.59h3.9c-.06-.61-.21-1.09-.47-1.42zM15 7.34h4.86v1.18H15z"/></svg>,
};

/* ---------- Experience (most recent first) ---------- */
export const EXP = [
  {
    period: { en: "Jan 2026 - Present", es: "Ene 2026 - Presente" }, now: true,
    role: { en: "Teaching Assistant, Web Application Development", es: "Monitor, Desarrollo de Aplicaciones Web" },
    org: "Universidad de los Andes",
    desc: {
      en: "Support students through a semester-long full-stack project across five modules: web fundamentals, UI/UX, frontend, backend security (JWT) and DevOps & AI. I guide deliverables and review code quality on both ends of the stack.",
      es: "Acompaño a los estudiantes en un proyecto full-stack de todo el semestre dividido en cinco módulos: fundamentos web, UI/UX, frontend, seguridad de backend (JWT) y DevOps e IA. Guío las entregas y reviso la calidad del código en ambos lados del stack.",
    },
    tags: ["React", "TypeScript", "NestJS", "TypeORM", "Docker", "UX/UI"],
  },
  {
    period: { en: "Aug 2025 - Present", es: "Ago 2025 - Presente" }, now: true,
    role: { en: "Teaching Assistant, Computing Technologies & Infrastructure", es: "Monitor, Tecnologías y Infraestructura de Cómputo" },
    org: "Universidad de los Andes",
    desc: {
      en: "Help students grasp the fundamentals of modern computing platforms: operating systems, virtualization and containerization. I tutor exercises in C and Assembly, teach memory management on Ubuntu, and run lab sessions.",
      es: "Ayudo a los estudiantes a entender los fundamentos de las plataformas de cómputo modernas: sistemas operativos, virtualización y contenedores. Doy tutorías de ejercicios en C y Assembly, enseño manejo de memoria en Ubuntu y dirijo sesiones de laboratorio.",
    },
    tags: ["C", "x86 Assembly", "Ubuntu", { en: "Virtualization", es: "Virtualización" }, { en: "Memory Mgmt", es: "Memoria" }],
  },
  {
    period: { en: "Dec 2024 - Nov 2025", es: "Dic 2024 - Nov 2025" }, now: false,
    role: { en: "Student Representative, Systems & Computing Eng. Dept.", es: "Representante Estudiantil, Depto. de Ing. de Sistemas y Computación" },
    org: "Universidad de los Andes",
    desc: {
      en: "Elected to represent over 1,000 students, bridging the student body and faculty. Organized academic and well-being events and made sure student concerns reached the department level.",
      es: "Elegido para representar a más de 1,000 estudiantes, conectando al estudiantado con la facultad. Organicé eventos académicos y de bienestar y me aseguré de que las inquietudes de los estudiantes llegaran al departamento.",
    },
    tags: [{ en: "Public Speaking", es: "Oratoria" }, { en: "Team Coordination", es: "Coordinación" }, { en: "Community", es: "Comunidad" }, { en: "Events", es: "Eventos" }],
  },
  {
    period: { en: "Jan 2025 - Jun 2025", es: "Ene 2025 - Jun 2025" }, now: false,
    role: { en: "Content Developer, Stanford Summer Python Bootcamp", es: "Desarrollador de Contenido, Stanford Summer Python Bootcamp" },
    org: "Uniandes + Pylatino",
    desc: {
      en: "Created and translated instructional material for an intro Python course aimed at Latin American students, designing interactive resources for algorithmic thinking in both English and Spanish.",
      es: "Creé y traduje material instruccional para un curso introductorio de Python dirigido a estudiantes latinoamericanos, diseñando recursos interactivos para el pensamiento algorítmico en inglés y español.",
    },
    tags: ["Python", { en: "Bilingual Content", es: "Contenido Bilingüe" }, { en: "Video Editing", es: "Edición de Video" }],
  },
  {
    period: { en: "Aug 2024 - Jun 2025", es: "Ago 2024 - Jun 2025" }, now: false,
    role: { en: "Teaching Assistant, Intro to Systems Engineering & Programming", es: "Monitor, Introducción a la Ingeniería de Sistemas y Programación" },
    org: "Universidad de los Andes",
    desc: {
      en: "Guided students through hands-on projects across a broad toolset: FlutterFlow, Arduino, Power BI, cybersecurity, generative AI, Unity 3D and XR. I also contributed to the course reform review.",
      es: "Guié a los estudiantes en proyectos prácticos con un conjunto amplio de herramientas: FlutterFlow, Arduino, Power BI, ciberseguridad, IA generativa, Unity 3D y XR. También aporté a la revisión de la reforma del curso.",
    },
    tags: ["Flutter", "Arduino", "Power BI", "Unity", { en: "Cybersecurity", es: "Ciberseguridad" }],
  },
  {
    period: { en: "Aug 2024 - Dec 2024", es: "Ago 2024 - Dic 2024" }, now: false, remote: true,
    role: { en: "Website Manager, Dept. of Industrial Engineering", es: "Administrador de Sitio Web, Depto. de Ingeniería Industrial" },
    org: "Universidad de los Andes",
    desc: {
      en: "Maintained and updated the department's website through a major curriculum reform, keeping it technically stable and the academic information accurate for students and faculty.",
      es: "Mantuve y actualicé el sitio web del departamento durante una reforma curricular importante, manteniéndolo técnicamente estable y con información académica precisa para estudiantes y profesores.",
    },
    tags: ["WordPress", "Drupal", "HTML5", { en: "Web Dev", es: "Desarrollo Web" }],
  },
];

/* ---------- Skills ---------- */
export const SKILLS = [
  [{ en: "Frontend", es: "Frontend" }, "--c-frontend", ["React", "Angular", "Next.js", "HTML", "CSS", "JavaScript", "TypeScript"]],
  [{ en: "Backend", es: "Backend" }, "--c-backend", ["Node.js", "NestJS", "Flask", "Django"]],
  [{ en: "Data & AI", es: "Datos e IA" }, "--c-ai", ["Python", "Pandas", "TensorFlow", "Scikit-learn"]],
  [{ en: "Security & Systems", es: "Seguridad y Sistemas" }, "--c-security", ["Linux", "Docker", "Virtualization", "JWT / Auth", "C", "x86 Assembly"]],
  [{ en: "Cloud", es: "Cloud" }, "--c-cloud", ["AWS", "Google Cloud", "Firebase"]],
  [{ en: "Databases", es: "Bases de Datos" }, "--c-db", ["PostgreSQL", "MySQL", "MongoDB"]],
  [{ en: "Design", es: "Diseño" }, "--c-design", ["Figma", "Adobe Suite", "Blender"]],
  [{ en: "Other", es: "Otros" }, "--c-other", ["Git", "GitHub", "Unity"]],
];

/* ---------- Project categories ---------- */
export const CATEGORIES = [
  { id: "all",    label: { en: "All",            es: "Todo"           } },
  { id: "dev",    label: { en: "Development",    es: "Desarrollo"     } },
  { id: "cyber",  label: { en: "Cybersecurity",  es: "Ciberseguridad" } },
  { id: "design", label: { en: "Design",         es: "Diseño"         } },
  { id: "games",  label: { en: "Games",          es: "Juegos"         } },
];

/* ---------- Projects ---------- */
export const PROJECTS = [
  {
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
      { id: "andeseats-1", ratio: "16 / 9", span: "full", cap: { en: "Home / discovery", es: "Inicio / descubrimiento" } },
      { id: "andeseats-2", ratio: "16 / 11", span: "half", cap: { en: "Restaurant listing", es: "Listado de restaurantes" } },
      { id: "andeseats-3", ratio: "16 / 11", span: "half", cap: { en: "Detail view", es: "Vista de detalle" } },
    ],
  },
  {
    slug: "protalker",
    category: "dev",
    name: "ProTalker",
    kicker: "AI · NLP",
    device: "web",
    badge: { en: "Course Project", es: "Proyecto de Curso" },
    tagline: { en: "An AI communication assistant with real-time conversational feedback.", es: "Un asistente de comunicación con IA y retroalimentación en tiempo real." },
    year: "2025",
    role: { en: "Engineering team project", es: "Proyecto de equipo de ingeniería" },
    status: { en: "Prototype, not publicly deployed", es: "Prototipo, no desplegado públicamente" },
    stack: ["AI / NLP", "Python", "Real-time", "Speech"],
    overview: [
      { en: "ProTalker started as a mid-career engineering course project and became one I genuinely loved. It listens to a conversation and returns real-time feedback to help people communicate more clearly and confidently.",
        es: "ProTalker empezó como un proyecto de un curso de ingeniería de mitad de carrera y terminó siendo uno que de verdad disfruté. Escucha una conversación y devuelve retroalimentación en tiempo real para ayudar a comunicarse con más claridad y confianza." },
      { en: "It isn't fully deployed, so this page is where the concept, interface and architecture live.",
        es: "No está desplegado del todo, así que esta página es donde viven el concepto, la interfaz y la arquitectura." },
    ],
    highlights: [
      { en: "Real-time conversational feedback loop", es: "Ciclo de retroalimentación conversacional en tiempo real" },
      { en: "Explores speech processing, NLP and live coaching UX", es: "Explora procesamiento de voz, NLP y UX de coaching en vivo" },
      { en: "Team engineering project I chose to keep developing", es: "Proyecto de equipo que decidí seguir desarrollando" },
    ],
    gallery: [
      { id: "protalker-1", ratio: "16 / 9", span: "full", cap: { en: "Live feedback view", es: "Retroalimentación en vivo" } },
      { id: "protalker-2", ratio: "16 / 11", span: "half", cap: { en: "Session summary", es: "Resumen de sesión" } },
      { id: "protalker-3", ratio: "16 / 11", span: "half", cap: { en: "Concept / flow", es: "Concepto / flujo" } },
    ],
  },
  {
    slug: "spendant",
    category: "dev",
    name: "Spendant",
    kicker: { en: "Mobile · Finance", es: "Móvil · Finanzas" },
    device: "mobile",
    badge: { en: "Mobile App", es: "App Móvil" },
    tagline: { en: "Personal finance, designed for your pocket.", es: "Finanzas personales, diseñadas para tu bolsillo." },
    year: "2025",
    role: { en: "Product & development", es: "Producto y desarrollo" },
    status: { en: "In progress", es: "En progreso" },
    stack: ["Mobile", "Personal Finance", "UX/UI"],
    overview: [
      { en: "Spendant is a mobile personal-finance app, a clean way to track spending, understand where money goes, and stay on top of budgets without the friction of a spreadsheet.",
        es: "Spendant es una app móvil de finanzas personales, una forma limpia de registrar gastos, entender a dónde va el dinero y mantener los presupuestos al día sin la fricción de una hoja de cálculo." },
      { en: "Still in progress.",
        es: "Aún en progreso." },
    ],
    highlights: [
      { en: "Mobile-first finance tracking and budgeting", es: "Registro y presupuesto de finanzas pensado primero para móvil" },
      { en: "Focus on a calm, low-friction money experience", es: "Enfocada en una experiencia de dinero tranquila y sin fricción" },
      { en: "Designed and built as a personal product", es: "Diseñada y construida como producto personal" },
    ],
    gallery: [
      { id: "spendant-1", ratio: "9 / 19.5", cap: { en: "Dashboard", es: "Panel" } },
      { id: "spendant-2", ratio: "9 / 19.5", cap: { en: "Transactions", es: "Transacciones" } },
      { id: "spendant-3", ratio: "9 / 19.5", cap: { en: "Budgets", es: "Presupuestos" } },
    ],
  },
  {
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
      { id: "invaders-1", ratio: "16 / 10", span: "full", cap: { en: "Gameplay", es: "Gameplay" } },
      { id: "invaders-2", ratio: "4 / 3", span: "half", cap: { en: "Wave / enemies", es: "Oleada / enemigos" } },
      { id: "invaders-3", ratio: "4 / 3", span: "half", cap: { en: "Title / score", es: "Título / puntaje" } },
    ],
  },
  {
    slug: "studio",
    category: "design",
    name: "3D & Motion",
    kicker: { en: "Design Minor", es: "Minor de Diseño" },
    device: "cube",
    badge: { en: "Design · 3D", es: "Diseño · 3D" },
    tagline: { en: "Modeling & animation from my Design & Creation minor.", es: "Modelado y animación de mi minor en Diseño y Creación." },
    year: "2024 - 2025",
    role: { en: "Design & creation", es: "Diseño y creación" },
    status: { en: "Selected coursework", es: "Trabajos seleccionados" },
    stack: ["Blender", "Adobe Suite", "Modeling", "Animation"],
    turntable: { id: "studio-360", accent: 330 },
    overview: [
      { en: "Alongside engineering, my Minor in Design & Creation pushed me into 3D modeling and animation, building objects, scenes and short motion pieces in Blender and the Adobe suite.",
        es: "Junto a la ingeniería, mi Minor en Diseño y Creación me llevó al modelado 3D y la animación, construyendo objetos, escenas y piezas cortas de motion en Blender y la suite de Adobe." },
      { en: "This is where the visual side of how I think lives.",
        es: "Aquí vive el lado visual de cómo pienso." },
    ],
    highlights: [
      { en: "3D modeling and rendering in Blender", es: "Modelado y renderizado 3D en Blender" },
      { en: "Motion and animation explorations", es: "Exploraciones de motion y animación" },
      { en: "The design half of an engineer who cares about craft", es: "La mitad de diseño de un ingeniero al que le importa el detalle" },
    ],
    gallery: [
      { id: "studio-1", ratio: "1 / 1", cap: { en: "Render", es: "Render" } },
      { id: "studio-2", ratio: "1 / 1", cap: { en: "Model", es: "Modelo" } },
      { id: "studio-3", ratio: "1 / 1", cap: { en: "Animation still", es: "Still de animación" } },
      { id: "studio-4", ratio: "1 / 1", cap: { en: "Scene", es: "Escena" } },
    ],
  },
  {
    slug: "ctf-writeups",
    category: "cyber",
    name: "CTF Writeups",
    kicker: { en: "Security · CTF", es: "Seguridad · CTF" },
    device: "web",
    badge: { en: "Writeups", es: "Writeups" },
    tagline: { en: "Capture the Flag solutions and security challenge breakdowns.", es: "Soluciones de CTF y análisis de retos de seguridad." },
    year: "2025 →",
    role: { en: "Solo", es: "Individual" },
    status: { en: "Ongoing", es: "En curso" },
    stack: ["CTF", "Web Security", "Forensics", "Crypto"],
    overview: [
      { en: "A living collection of CTF writeups and security challenge breakdowns — web exploitation, cryptography, reverse engineering and forensics.",
        es: "Una colección viva de writeups de CTF y análisis de retos de seguridad: explotación web, criptografía, ingeniería inversa y forense." },
      { en: "Each writeup documents the thought process, tools used and lessons learned. Competitions include PicoCTF, HackTheBox and university events.",
        es: "Cada writeup documenta el proceso de pensamiento, las herramientas usadas y las lecciones aprendidas. Competencias incluyen PicoCTF, HackTheBox y eventos universitarios." },
    ],
    highlights: [
      { en: "Web exploitation: XSS, SQLi, SSRF, auth bypasses", es: "Explotación web: XSS, SQLi, SSRF, bypass de autenticación" },
      { en: "Cryptography: classical ciphers, RSA, hash analysis", es: "Criptografía: cifrados clásicos, RSA, análisis de hashes" },
      { en: "Forensics & reverse engineering challenges", es: "Retos de forense e ingeniería inversa" },
    ],
    gallery: [
      { id: "ctf-1", ratio: "16 / 9", span: "full", cap: { en: "Challenge overview", es: "Vista del reto" } },
      { id: "ctf-2", ratio: "16 / 11", span: "half", cap: { en: "Exploit / solution", es: "Exploit / solución" } },
      { id: "ctf-3", ratio: "16 / 11", span: "half", cap: { en: "Flag captured", es: "Flag capturada" } },
    ],
  },
];

export function getEXP(lang) { return L(EXP, lang); }
export function getSKILLS(lang) { return L(SKILLS, lang); }
export function getPROJECTS(lang) { return L(PROJECTS, lang); }
export function getCATEGORIES(lang) { return L(CATEGORIES, lang); }
export function getPROJECT(slug, lang) {
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? L(p, lang) : null;
}
