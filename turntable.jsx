/* ============================================================
   Turntable — image-sequence 360° viewer (AirPods-style)
   User drops a sequence of frames; drag / slider / play scrubs them.
   Frames persist per-id in IndexedDB (handles ~36 frames easily).
   Pass `frames` (array of URLs) to bake committed frames in instead.
   ============================================================ */
const { useState: useTS, useEffect: useTE, useRef: useTR, useCallback: useTC } = React;

/* ---- IndexedDB store ---- */
const TT_DB = "portfolio-turntable";
const TT_STORE = "frames";
function ttOpen() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(TT_DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(TT_STORE);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function ttGet(id) {
  try {
    const db = await ttOpen();
    return await new Promise((res, rej) => {
      const tx = db.transaction(TT_STORE, "readonly");
      const rq = tx.objectStore(TT_STORE).get(id);
      rq.onsuccess = () => res(rq.result || null);
      rq.onerror = () => rej(rq.error);
    });
  } catch (e) { return null; }
}
async function ttSet(id, val) {
  try {
    const db = await ttOpen();
    await new Promise((res, rej) => {
      const tx = db.transaction(TT_STORE, "readwrite");
      tx.objectStore(TT_STORE).put(val, id);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    });
  } catch (e) {}
}
async function ttDel(id) {
  try {
    const db = await ttOpen();
    await new Promise((res) => {
      const tx = db.transaction(TT_STORE, "readwrite");
      tx.objectStore(TT_STORE).delete(id);
      tx.oncomplete = () => res();
      tx.onerror = () => res();
    });
  } catch (e) {}
}

/* ---- downscale a file to a compact WebP data URL ---- */
function fileToFrame(file, maxW = 760) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        let out;
        try { out = c.toDataURL("image/webp", 0.82); }
        catch (e) { out = c.toDataURL("image/jpeg", 0.85); }
        resolve(out);
      };
      img.onerror = reject;
      img.src = fr.result;
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

const naturalSort = (a, b) =>
  a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });

function Turntable({ id, frames: baked, accent = 330 }) {
  const [lang] = window.useLang();
  const [theme] = window.useTheme();
  const t = window.STR[lang].detail;

  const [frames, setFrames] = useTS(baked || null);
  const [idx, setIdx] = useTS(0);
  const [playing, setPlaying] = useTS(false);
  const [busy, setBusy] = useTS(false);
  const [progress, setProgress] = useTS(0);
  const [over, setOver] = useTS(false);

  const stageRef = useTR(null);
  const drag = useTR(null);
  const inputRef = useTR(null);

  /* hydrate from IndexedDB (unless baked frames given) */
  useTE(() => {
    if (baked) return;
    let alive = true;
    ttGet(id).then((f) => { if (alive && f && f.length) { setFrames(f); setIdx(0); } });
    return () => { alive = false; };
  }, [id]);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const n = frames ? frames.length : 0;

  /* autoplay */
  useTE(() => {
    if (!playing || n < 2) return;
    let raf, last = 0;
    const step = (ts) => {
      if (ts - last > 55) { last = ts; setIdx((i) => (i + 1) % n); }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, n]);

  /* ingest dropped / chosen files */
  const ingest = useTC(async (fileList) => {
    const files = [...fileList].filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    files.sort(naturalSort);
    setBusy(true); setProgress(0); setPlaying(false);
    const out = [];
    for (let i = 0; i < files.length; i++) {
      try { out.push(await fileToFrame(files[i])); } catch (e) {}
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setFrames(out); setIdx(0); setBusy(false);
    if (!baked) ttSet(id, out);
  }, [id, baked]);

  const clear = useTC(() => {
    setFrames(null); setIdx(0); setPlaying(false);
    if (!baked) ttDel(id);
  }, [id, baked]);

  /* drag to spin */
  const onDown = (e) => {
    if (n < 2) return;
    setPlaying(false);
    const w = stageRef.current.getBoundingClientRect().width;
    drag.current = { x: e.clientX, startIdx: idx, perFrame: Math.max(6, w / n) };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const d = e.clientX - drag.current.x;
    const adv = Math.round(d / drag.current.perFrame);
    setIdx(((drag.current.startIdx + adv) % n + n) % n);
  };
  const onUp = (e) => {
    drag.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const tint = theme === "light" ? `oklch(0.5 0.15 ${accent})` : `oklch(0.8 0.12 ${accent})`;

  /* ---- empty state ---- */
  if (!frames || !n) {
    return (
      <div
        className={`tt-drop ${over ? "over" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); ingest(e.dataTransfer.files); }}
        style={{ "--tt-a": accent }}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple hidden
               onChange={(e) => ingest(e.target.files)} />
        {busy ? (
          <div className="tt-busy">
            <div className="tt-bar-track"><div className="tt-bar-fill" style={{ width: progress + "%" }}></div></div>
            <span>{t.ttLoading} {progress}%</span>
          </div>
        ) : (
          <>
            <div className="tt-drop-ico" style={{ color: tint }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="34" height="34">
                <path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 3v4m0-4 3 3m-3-3-3 3" />
              </svg>
            </div>
            <div className="tt-drop-title">{t.tt}</div>
            <div className="tt-drop-sub">{t.ttDrop}</div>
            <div className="tt-drop-note">{t.ttNote}</div>
          </>
        )}
      </div>
    );
  }

  /* ---- viewer ---- */
  return (
    <div className="tt-viewer" style={{ "--tt-a": accent }}>
      <div
        className="tt-stage"
        ref={stageRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {frames.map((src, i) => (
          <img key={i} src={src} alt="" draggable="false"
               style={{ opacity: i === idx ? 1 : 0 }} />
        ))}
        <div className="tt-spin-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v4h4" />
          </svg>
          {t.ttHint}
        </div>
        <div className="tt-count">{String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</div>
      </div>

      <div className="tt-controls">
        {!reduce && (
          <button className="tt-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? t.ttPause : t.ttPlay}>
            {playing
              ? <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M7 5.5v13l11-6.5z" /></svg>}
            <span>{playing ? t.ttPause : t.ttPlay}</span>
          </button>
        )}
        <input className="tt-slider" type="range" min="0" max={n - 1} value={idx}
               onChange={(e) => { setPlaying(false); setIdx(+e.target.value); }} />
        {!baked && (
          <button className="tt-clear" onClick={clear}>{t.ttClear}</button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Turntable });
