export const ctfWriteups = {
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
    { id: "ctf-1", ratio: "16 / 9",  span: "full", cap: { en: "Challenge overview", es: "Vista del reto"    } },
    { id: "ctf-2", ratio: "16 / 11", span: "half", cap: { en: "Exploit / solution", es: "Exploit / solución" } },
    { id: "ctf-3", ratio: "16 / 11", span: "half", cap: { en: "Flag captured",      es: "Flag capturada"    } },
  ],
};
