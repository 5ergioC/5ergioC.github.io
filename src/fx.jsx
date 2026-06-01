/* ============================================================
   Interactive FX — ReactBits-inspired
   DecryptText · ParticleField · Reveal · Magnetic · spotlight
   ============================================================ */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './i18n';

/* ---- DecryptText: scramble then resolve, char by char ---- */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#&%";
export function DecryptText({ text, className, stepMs = 30, delay = 0, as = "span", onView = false }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  const scramble = () => text.split("").map((c) => (c === " " ? " " : rand())).join("");
  const [display, setDisplay] = useState(() => (reduce ? text : scramble()));
  const ref = useRef(null);

  useEffect(() => {
    if (reduce) { setDisplay(text); return; }
    let raf, startTime = null;
    const chars = text.split("");

    const loop = (t) => {
      if (startTime === null) startTime = t;
      const elapsed = t - startTime;
      if (elapsed < delay) { raf = requestAnimationFrame(loop); return; }
      const revealed = Math.min(Math.floor((elapsed - delay) / stepMs), chars.length);
      setDisplay(chars.map((c, i) => (c === " " ? " " : i < revealed ? c : rand())).join(""));
      if (revealed < chars.length) raf = requestAnimationFrame(loop);
      else setDisplay(text);
    };
    const start = () => { raf = requestAnimationFrame(loop); };

    if (onView) {
      const el = ref.current;
      if (!el) { start(); }
      else {
        const io = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { io.disconnect(); start(); }
        }, { threshold: 0.35, rootMargin: "0px 0px -6% 0px" });
        io.observe(el);
        return () => { io.disconnect(); cancelAnimationFrame(raf); };
      }
    } else {
      start();
    }
    return () => cancelAnimationFrame(raf);
  }, [text, delay, stepMs, onView]);

  const El = as;
  return <El ref={ref} className={className} aria-label={text}>{display}</El>;
}

/* ---- ParticleField: constellation reacting to cursor ---- */
export function ParticleField() {
  const canvasRef = useRef(null);
  const [theme] = useTheme();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, raf;
    const mouse = { x: -9999, y: -9999 };
    let particles = [];

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const C = theme === "light"
      ? { dot: "rgba(108,98,196,0.55)", link: "92,84,196", cursor: "26,140,170" }
      : { dot: "rgba(180,176,235,0.55)", link: "127,119,221", cursor: "92,198,230" };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(72, Math.floor((w * h) / 17000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.7,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000) {
          const f = (26000 - d2) / 26000;
          p.x += (dx / Math.sqrt(d2 + 0.01)) * f * 0.9;
          p.y += (dy / Math.sqrt(d2 + 0.01)) * f * 0.9;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = C.dot;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const op = (1 - dist / 120) * 0.32;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${C.link},${op})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${C.cursor},${(1 - dist / 150) * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    if (!reduce) draw();
    else { draw(); cancelAnimationFrame(raf); }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [theme]);
  return <canvas ref={canvasRef} aria-hidden="true" />;
}

/* ---- Reveal: scroll-triggered fade/slide ---- */
export function Reveal({ children, delay = 0, as = "div", className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVis(true); io.unobserve(el); }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const El = as;
  return (
    <El ref={ref} className={`reveal ${vis ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </El>
  );
}

/* ---- Magnetic: element drifts toward cursor ---- */
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);
  const onLeave = useCallback(() => {
    ref.current.style.transform = "translate(0,0)";
  }, []);
  return (
    <span ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}

/* ---- spotlight: track cursor into --mx/--my CSS vars ---- */
export function useSpotlight() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}
