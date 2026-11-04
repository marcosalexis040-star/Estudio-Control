#!/usr/bin/env node
// Construye el proyecto HyperFrames de un vídeo:
//   ../NN-*/escaleta.md  (frases, bloques, brillo, cámara)
//   ../NN-*/visual.mjs   (operaciones visuales por frase)
//   proyectos/NN/tiempos.json (voz: inicio y fin de cada frase y palabra)
// → proyectos/NN/index.html, assets/katex, eventos.json (efectos de sonido)
// Uso: node motor/construir.mjs 01 [02 ...]
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import katex from "katex";
import { plot, plano, COL } from "./graficas.mjs";
import { diagrama } from "./diagramas.mjs";

const require = createRequire(import.meta.url);
const PROD = join(dirname(fileURLToPath(import.meta.url)), "..");
const SERIE = join(PROD, "..");
const W = 1080, H = 1920, CX = 540, CY = 960, ANCHO = 960, GAP = 30, TOP_EST = 150;

// brillo del bloque → [claro para fondo oscuro, oscuro para texto sobre blanco]
const TONOS = {
  "#ff5a5f": ["#ff6b6f", "#c62828"], "#4da3ff": ["#5aaeff", "#1d5fc4"], "#ffd166": ["#ffd166", "#9a6b00"],
  "#06d6a0": ["#17dfa9", "#05875f"], "#c77dff": ["#cf8dff", "#7a3fd1"], "#ff9f1c": ["#ffa53a", "#b45f06"],
};
const tono = (hex) => TONOS[(hex || "").toLowerCase()] || ["#5aaeff", "#1d5fc4"];

const CORTO = { "01": "Laplace sin formulario", "02": "De la ecuación a la respuesta", "03": "Primer orden", "04": "El triángulo del polo", "05": "Deduce tₚ, Mₚ, tₛ y tᵣ",
  "06": "Los cinco polos del integrador", "07": "Encuentra a, b o k", "08": "Álgebra de bloques", "09": "Mason paso a paso", "10": "Routh: la tabla",
  "11": "Routh: ceros y rango de k", "12": "Error estable y PID", "13": "Variables de estado", "14": "Retroalimentación de estados", "15": "Los 10 errores del integrador" };
const SIGUIENTE = {
  "01": "02 · De la ecuación a la respuesta", "02": "03 · Primer orden", "03": "04 · El triángulo del polo",
  "04": "05 · Deduce tₚ, Mₚ, tₛ y tᵣ", "05": "06 · Los cinco polos del integrador", "06": "07 · Encuentra a, b o k",
  "07": "08 · Álgebra de bloques", "08": "09 · Mason paso a paso", "09": "10 · Routh: la tabla",
  "10": "11 · Routh: ceros y rango de k", "11": "12 · Error en estado estable y PID", "12": "13 · Variables de estado",
  "13": "14 · Retroalimentación de estados", "14": "15 · Los 10 errores del integrador", "15": "",
};

// ---------- utilidades ----------
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const r3 = (v) => Math.round(v * 1000) / 1000;
const norm = (w) => w.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ]/g, "");
const tex = (l, display = true) => katex.renderToString(l, { displayMode: display, throwOnError: false, output: "html", strict: "ignore" });
function enLinea(t, oscuro) {
  // **x** → resaltado; $..$ → fórmula en línea
  return t.split(/(\$[^$]+\$)/g).map((p) => (p.startsWith("$") && p.endsWith("$") && p.length > 2 ? tex(p.slice(1, -1), false)
    : esc(p).replace(/\*\*([^*]+)\*\*/g, `<span class="${oscuro ? "hlc" : "hl"}">$1</span>`))).join("");
}
function icono(nombre) {
  const p = join(PROD, "node_modules/@phosphor-icons/core/assets/bold", `${nombre}-bold.svg`);
  if (!existsSync(p)) throw new Error("Icono no encontrado: " + nombre);
  return readFileSync(p, "utf8").replace("<svg ", '<svg class="ico" ');
}

function leerEscaleta(ruta) {
  const cuerpo = readFileSync(ruta, "utf8").split(/^=== NOTAS ===/m)[0];
  const meta = {}, bloques = []; let enMeta = false;
  for (const linea of cuerpo.split("\n")) {
    const l = linea.trim();
    if (l === "---") { enMeta = !enMeta; continue; }
    if (enMeta) { const i = l.indexOf(":"); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); continue; }
    if (l.startsWith("## ")) { const [nombre, color] = l.slice(3).split("·").map((x) => x.trim()); bloques.push({ nombre, color, frases: [] }); continue; }
    if (l.includes("||")) { const [texto, ve, camara] = l.split("||").map((x) => x.trim()); bloques.at(-1).frases.push({ texto, ve, camara }); }
  }
  return { meta, bloques };
}

// ---------- piezas → HTML ----------
let UID = 0;
function htmlPieza(op, ctx) {
  const [claro, oscuro] = tono(ctx.color);
  const est = op.estilo || (op.k === "txt" ? "blanca" : "blanca");
  const uid = op.uid;
  const estados = [];
  const tam = op.size || (op.k === "tex" ? 64 : 54);
  if (op.k === "txt") {
    estados.push(enLinea(op.texto, est === "oscura"));
    for (const c of op._cambios || []) estados.push(enLinea(c, est === "oscura"));
  } else if (op.k === "tex") {
    estados.push(tex(op.latex));
    for (const c of op._cambios || []) estados.push(tex(c));
  } else if (op.k === "plot") estados.push(plot({ ...op.spec, w: op._w - 32, uid }));
  else if (op.k === "plano") estados.push(plano({ ...op.spec, w: op._w - 32, uid }));
  else if (op.k === "diag") estados.push(diagrama({ ...op.spec, w: op.spec.w || op._w - 32, uid }));
  else if (op.k === "icono") estados.push(`<div class="icrow">${icono(op.icono)}${op.texto ? `<div class="ictx">${enLinea(op.texto)}</div>` : ""}</div>`);
  else if (op.k === "tabla") {
    let t = `<table class="tab${op.routh ? " routh" : ""}">`;
    op.filas.forEach((fila, ri) => {
      t += `<tr${op.cab && ri === 0 ? ' class="cab"' : ""}>`;
      fila.forEach((c, ci) => {
        const cel = typeof c === "object" && c !== null ? c : { t: c };
        const contenido = String(cel.t ?? "").startsWith("$") ? tex(String(cel.t).slice(1, -1), false) : enLinea(String(cel.t ?? ""));
        const capa = cel.capa ? ` class="capa${ci === 0 ? " c0" : ""}" data-capa="${cel.capa}" style="opacity:0"` : ci === 0 ? ' class="c0"' : "";
        const marca = cel.marca ? `<span class="marca${cel.mcapa ? " capa" : ""}" ${cel.mcapa ? `data-capa="${cel.mcapa}" style="opacity:0;` : 'style="'}border-color:${COL[cel.marca] || cel.marca}"></span>` : "";
        t += `<td${capa}>${marca}${contenido}</td>`;
      });
      t += `</tr>`;
    });
    estados.push(t + `</table>`);
  }
  const fs = op.k === "tex" ? tam / 1.21 : tam;
  const sts = estados.map((h, i) => `<div class="st" id="${uid}-s${i}" style="font-size:${fs}px;${i ? "opacity:0;" : ""}">${h}</div>`).join("");
  const card = `<div class="card est-${est}${op.k === "plot" || op.k === "plano" || op.k === "diag" ? " svgc" : ""}${op.centro !== false && op.k !== "txt" ? " centro" : ""}${op.k === "txt" && op.centro ? " centro" : ""}" style="--osc:${oscuro};--cla:${claro}">${sts}</div>`;
  return { estados: estados.length, html: card };
}

// ---------- medición en Chromium ----------
async function medir(dir, piezas) {
  const { chromium } = require("playwright");
  const cuerpo = piezas.map((p) => `<div class="medida" data-id="${p.uid}" style="width:${p._w}px">${p._html}</div>`).join("\n");
  writeFileSync(join(dir, "_medir.html"), `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="assets/katex/katex.min.css"><style>${CSS}</style></head><body style="width:1080px;background:#07090d">${cuerpo}</body></html>`);
  const nav = await chromium.launch();
  const pag = await nav.newPage({ viewport: { width: 1080, height: 1920 } });
  await pag.goto(pathToFileURL(join(dir, "_medir.html")).href);
  await pag.evaluate(() => document.fonts.ready);
  const res = await pag.evaluate(() => {
    const out = {};
    for (const m of document.querySelectorAll(".medida")) {
      const card = m.querySelector(".card");
      const sts = [...m.querySelectorAll(".st")];
      let hmax = 0;
      for (const st of sts) {
        st.style.position = "static"; st.style.opacity = "1";
        let fs = parseFloat(st.style.fontSize);
        while (st.scrollWidth > st.clientWidth + 2 && fs > 26) { fs -= 2; st.style.fontSize = fs + "px"; }
        hmax = Math.max(hmax, st.offsetHeight);
        st.dataset.fs = fs;
      }
      const cs = getComputedStyle(card);
      out[m.dataset.id] = { h: Math.ceil(hmax + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)), fs: sts.map((s) => +s.dataset.fs) };
    }
    return out;
  });
  await nav.close();
  return res;
}

// ---------- estilos ----------
const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,sans-serif}
.card{position:relative;border-radius:30px;padding:26px 34px;background:#fff;color:#0f141b;font-weight:800;line-height:1.2;box-shadow:0 18px 60px rgba(0,0,0,.45)}
.card.svgc{padding:16px}
.card.centro .st{text-align:center}
.st{position:absolute;left:34px;right:34px;top:26px;overflow:hidden}
.svgc .st{left:16px;right:16px;top:16px}
.est-oscura{background:transparent;color:#fff;box-shadow:none;padding:10px 6px}
.est-oscura .st{left:6px;right:6px;top:10px}
.est-verde{border-left:16px solid #12a150}
.est-verde .st{color:#0a7f43}
.est-roja{border-left:16px solid #e5484d}
.est-roja .st{color:#b42318}
.est-ambar{border-left:16px solid #d98a00}
.est-ambar .st{color:#8a5300}
.est-dorada{border:6px solid #ffc53d;box-shadow:0 0 0 6px rgba(255,197,61,.18),0 18px 60px rgba(0,0,0,.45)}
.est-color{background:var(--cla);color:#0b0f14}
.hl{color:var(--osc)}
.hlc{color:var(--cla)}
.katex{font-size:1.21em}
.katex-display{margin:0}
.icrow{display:flex;align-items:center;gap:28px}
.ico{width:1.9em;height:1.9em;flex:none;fill:var(--osc)}
.est-oscura .ico{fill:var(--cla)}
.ictx{flex:1}
table.tab{border-collapse:collapse;width:100%;font-size:inherit}
table.tab td{position:relative;padding:12px 16px;border-bottom:3px solid #e3e8ef;text-align:center;font-variant-numeric:tabular-nums}
table.tab td.c0{color:#5b6573;text-align:left;font-weight:900}
table.tab tr.cab td{color:#5b6573;font-size:.8em}
.marca{position:absolute;inset:4px;border:6px solid;border-radius:14px}
`;

// ---------- construcción ----------
async function construir(nn) {
  const carpeta = readdirSync(SERIE).find((d) => d.startsWith(nn + "-"));
  const { meta, bloques } = leerEscaleta(join(SERIE, carpeta, "escaleta.md"));
  const visual = (await import(pathToFileURL(join(SERIE, carpeta, "visual.mjs")).href + "?v=" + Date.now())).default;
  const dir = join(PROD, "proyectos", nn);
  const tiempos = JSON.parse(readFileSync(join(dir, "tiempos.json"), "utf8"));
  mkdirSync(join(dir, "assets/katex"), { recursive: true });
  cpSync(join(PROD, "node_modules/katex/dist/katex.min.css"), join(dir, "assets/katex/katex.min.css"));
  cpSync(join(PROD, "node_modules/katex/dist/fonts"), join(dir, "assets/katex/fonts"), { recursive: true });
  cpSync(join(PROD, "node_modules/hyperframes/dist/vendor/npm/gsap@3.15.0/dist/gsap.min.js"), join(dir, "assets/gsap.min.js"));

  if (visual.length !== bloques.length) throw new Error(`${nn}: visual tiene ${visual.length} bloques y la escaleta ${bloques.length}`);
  const frases = [];
  bloques.forEach((b, bi) => {
    if (visual[bi].length !== b.frases.length) throw new Error(`${nn} bloque ${bi} (${b.nombre}): visual ${visual[bi].length} frases, escaleta ${b.frases.length}`);
    b.frases.forEach((f, fi) => frases.push({ ...f, bi, fi, ops: visual[bi][fi] || [] }));
  });
  if (frases.length !== tiempos.frases.length) throw new Error(`${nn}: tiempos con ${tiempos.frases.length} frases, escaleta ${frases.length}`);
  frases.forEach((f, i) => {
    const tf = tiempos.frases[i];
    if (tf.texto !== f.texto) throw new Error(`${nn} frase ${i + 1} cambió: rehaz la voz (python3 voz/voz.py ${nn})`);
    Object.assign(f, { inicio: tf.inicio, fin: tf.fin, palabras: tf.palabras });
  });

  // 1. piezas
  const piezas = [], porId = {};
  const nueva = (op, ctx, w) => {
    op.uid = `p${++UID}`; op._w = w; op._color = ctx.color; op._bloque = ctx.bi;
    if (op.id) { if (porId[op.id]) throw new Error(`${nn}: id repetido ${op.id}`); porId[op.id] = op; }
    piezas.push(op);
    return op;
  };
  for (const f of frases) {
    const ctx = { color: bloques[f.bi].color, bi: f.bi };
    for (const op of f.ops) {
      if (op.k === "fila") {
        const n = op.hijos.length, g = 24, w = op.w || ANCHO, wi = (w - g * (n - 1)) / n;
        op.hijos.forEach((h) => { nueva(h, ctx, wi); h._enFila = op; });
        op._w = w;
      } else if (["txt", "tex", "plot", "plano", "diag", "icono", "tabla"].includes(op.k)) nueva(op, ctx, op.w || ANCHO);
      else if (op.k === "cambia") { const t = porId[op.id]; if (!t) throw new Error(`${nn}: cambia sobre id desconocido ${op.id}`); (t._cambios ||= []).push(op.nuevo); op._estado = t._cambios.length; }
    }
  }
  for (const p of piezas) { const r = htmlPieza(p, { color: p._color }); p._html = r.html; p._nest = r.estados; }
  const medidas = await medir(dir, piezas);
  for (const p of piezas) { p._h = medidas[p.uid].h; p._fs = medidas[p.uid].fs; p._html = p._html.replace(/(id="(p\d+)-s(\d+)" style="font-size:)[\d.]+px/g, (m, a, u, k) => `${a}${p._fs[+k]}px`); }

  // 2. tiempos de cada operación
  const tPalabra = (f, at) => {
    const [w, nth] = String(at).split("#"), objetivo = norm(w); let n = 0;
    for (const p of f.palabras) if (norm(p.w) === objetivo || (objetivo.length > 3 && norm(p.w).startsWith(objetivo))) { n++; if (n === (+nth || 1)) return p.inicio; }
    throw new Error(`${nn}: «${at}» no está en la frase «${f.texto}»`);
  };
  for (const f of frases) {
    const libres = f.ops.filter((o) => o.at === undefined);
    const dur = f.fin - f.inicio, paso = libres.length > 1 ? Math.min(1.3, (dur * 0.7) / (libres.length - 1)) : 0;
    let k = 0;
    for (const o of f.ops) o._t = o.at !== undefined ? (typeof o.at === "number" ? f.inicio + o.at : tPalabra(f, o.at)) : f.inicio + 0.05 + paso * k++;
  }
  // La primera pieza del vídeo ya está en el fotograma 0
  const primera = frases[0].ops.find((o) => o.uid || o.k === "fila");
  if (primera) primera._t = 0;

  // 3. maquetación por estación
  const estaciones = bloques.map((b, bi) => ({ bi, nombre: b.nombre, color: b.color, piezas: [], alto: TOP_EST + 40 }));
  for (const f of frases) {
    const est = estaciones[f.bi];
    est.cursor ??= TOP_EST;
    for (const op of f.ops) {
      if (op.k === "limpia") { op._piezas = est.piezas.filter((p) => !p._limpia); op._piezas.forEach((p) => (p._limpia = op._t)); est.cursor = TOP_EST; continue; }
      const coloca = (p, x, y) => { p._x = x; p._y = y; p._est = est; est.piezas.push(p); };
      if (op.k === "fila") {
        const h = Math.max(...op.hijos.map((c) => c._h)); let x = (ANCHO - op._w) / 2;
        for (const c of op.hijos) { coloca(c, x, est.cursor + (h - c._h) / 2); c._t = op._t + (c.at ? 0 : 0); x += c._w + 24; }
        op._y = est.cursor; op._h = h; est.cursor += h + GAP;
      } else if (op.uid) { coloca(op, (ANCHO - op._w) / 2, est.cursor); est.cursor += op._h + GAP; }
      est.alto = Math.max(est.alto, est.cursor + 40);
    }
  }
  // posiciones en el mundo: serpiente de dos columnas
  let yFila = 0;
  for (let i = 0; i < estaciones.length; i += 2) {
    const fila = estaciones.slice(i, i + 2), alto = Math.max(...fila.map((e) => e.alto));
    fila.forEach((e, j) => { e.x = (i / 2) % 2 === 0 ? j * 1500 : (1 - j) * 1500; e.y = yFila; });
    yFila += alto + 520;
  }
  const mundo = { x0: -400, y0: -500, x1: 1500 + ANCHO + 400, y1: yFila + 200 };

  // 4. cámara
  const cam = []; let est = { x: CX - ANCHO / 2, y: 0, s: 1 }; // estado: punto del mundo en el centro y escala
  const estAbs = (e, p) => { const q = p._est || e; return { x: q.x + p._x, y: q.y + p._y, w: p._w, h: p._h }; };
  let enfoque = null, tLibre = 0, estActual = -1;
  const ev = [], tl = [];
  const mover = (t, a, dur, ease, extra = {}) => {
    t = Math.max(t, tLibre);
    const hueco = t - tLibre;
    if (hueco > 0.05) { // deriva lenta mientras no hay movimiento: nunca un fotograma congelado
      const k = Math.min(1, hueco / 3), deriva = { x: est.x, y: est.y - 14 * k, s: est.s * (1 + 0.014 * k) };
      cam.push({ t: tLibre, desde: { ...est }, a: deriva, dur: hueco, ease: "sine.inOut" });
      est = deriva;
    }
    cam.push({ t, desde: { ...est }, a, dur, ease, ...extra });
    est = { ...a }; tLibre = t + dur;
  };
  const caja = (ps) => { const x0 = Math.min(...ps.map((p) => p.x)), y0 = Math.min(...ps.map((p) => p.y)), x1 = Math.max(...ps.map((p) => p.x + p.w)), y1 = Math.max(...ps.map((p) => p.y + p.h)); return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }; };
  const escalaPara = (c, max = 1.12, min = 0.55) => Math.max(min, Math.min(max, 1000 / (c.w + 60), 1020 / (c.h + 60)));
  const destino = (c, s) => ({ x: c.x + c.w / 2, y: c.y + c.h / 2, s });

  for (const f of frases) {
    const e = estaciones[f.bi];
    const nuevas = f.ops.flatMap((o) => (o.k === "fila" ? o.hijos : o.uid ? [o] : []));
    const tocadas = [...f.ops.filter((o) => o.id && !o.uid && porId[o.id]).map((o) => porId[o.id]),
      ...f.ops.flatMap((o) => (o.foco || []).map((id) => { if (!porId[id]) throw new Error(`${nn}: foco sobre id desconocido ${id}`); return porId[id]; }))];
    const objetivo = [...nuevas, ...tocadas].map((p) => estAbs(e, p));
    const t0 = Math.min(...f.ops.map((o) => o._t ?? f.inicio), f.inicio + 0.2);
    const camT = (f.camara || "").toLowerCase();
    const visibles = e.piezas.filter((p) => p._t <= f.fin && !(p._limpia && p._limpia <= f.inicio)).map((p) => estAbs(e, p));
    const titulo = { x: e.x, y: e.y, w: ANCHO, h: 110 };
    if (f.bi !== estActual && camT.includes("plano general")) {
      const c = { x: mundo.x0 + 300, y: mundo.y0 + 400, w: mundo.x1 - mundo.x0 - 600, h: mundo.y1 - mundo.y0 - 500 };
      const tv = Math.max(tLibre, f.inicio - 0.4);
      mover(tv, destino(c, Math.min(1000 / c.w, 1000 / c.h)), 1.8, "power2.inOut", { general: true }); ev.push({ t: tv, tipo: "whoosh" });
      e._tIn = tv; estActual = f.bi; continue;
    }
    if (f.bi !== estActual) {
      // viaje largo a la nueva estación
      const c = objetivo.length ? caja([titulo, ...objetivo]) : titulo;
      const s = escalaPara(c, 1.0);
      const tv = f.bi === 0 ? 0 : Math.max(tLibre, f.inicio - 0.55);
      if (f.bi === 0) { est = { ...destino(c, s * 0.93) }; cam.push({ t: 0, desde: { ...est }, a: destino(c, s), dur: 1.4, ease: "power2.out" }); est = destino(c, s); tLibre = 1.4; }
      else { mover(tv, destino(c, s), 1.3, "power3.inOut", { viaje: true }); ev.push({ t: tv, tipo: "whoosh" }); }
      e._tIn = f.bi === 0 ? 0 : tv; estActual = f.bi; enfoque = c;
      continue;
    }
    if (camT.includes("plano general")) {
      const c = { x: mundo.x0 + 300, y: mundo.y0 + 400, w: mundo.x1 - mundo.x0 - 600, h: mundo.y1 - mundo.y0 - 500 };
      mover(f.inicio - 0.2, destino(c, Math.min(1000 / c.w, 1000 / c.h)), 1.8, "power2.inOut", { general: true }); ev.push({ t: f.inicio - 0.2, tipo: "whoosh" }); continue;
    }
    if (camT.includes("tarjeta")) { mover(f.inicio, { ...est, s: est.s * 1.04 }, Math.max(1, f.fin - f.inicio), "sine.inOut"); continue; }
    if (camT.includes("viaje largo de regreso")) {
      const n = +((camT.match(/estación (\d+)/) || [])[1] || 0), e2 = estaciones[n];
      const vis2 = e2.piezas.map((p) => estAbs(e2, p)); const c = caja(vis2.slice(-3));
      mover(f.inicio - 0.3, destino(c, escalaPara(c, 1.0)), 1.3, "power3.inOut", { viaje: true }); ev.push({ t: f.inicio - 0.3, tipo: "whoosh" }); continue;
    }
    if (!objetivo.length) { continue; } // deriva: la rellena mover() en el siguiente movimiento
    let c = caja(objetivo), s;
    if (camT.startsWith("push out")) {
      const yMax = Math.max(...objetivo.map((q) => q.y + q.h)), cerca = visibles.filter((q) => q.y > yMax - 1250);
      c = caja([...cerca, ...objetivo]); s = escalaPara(c, 0.96, 0.7);
    }
    else if (camT.startsWith("push in")) s = escalaPara(c, 1.12, 0.6);
    else s = escalaPara(c, 1.0, 0.6);
    // que la última pieza quede entera en pantalla
    const t = Math.max(f.inicio - 0.25, Math.min(...[...nuevas, ...tocadas].map((p) => p._t ?? f.inicio)) - 0.45);
    const extra = camT.startsWith("pan") ? { pan: true } : {};
    mover(t, destino(c, s), camT.startsWith("pan") ? 0.8 : 0.9, "power2.inOut", extra);
    if (camT.includes("golpe")) { f._golpe = Math.max(t, f.inicio); ev.push({ t: f._golpe, tipo: "golpe" }); }
    enfoque = c;
  }
  const DUR = tiempos.duracion;
  if (tLibre < DUR) cam.push({ t: tLibre, desde: { ...est }, a: { ...est, y: est.y - 10, s: est.s * 1.01 }, dur: DUR - tLibre, ease: "sine.inOut" });
  // golpes que caen en frases sin movimiento propio
  for (const f of frases) if ((f.camara || "").toLowerCase().includes("golpe") && f._golpe === undefined) { f._golpe = f.inicio; ev.push({ t: f.inicio, tipo: "golpe" }); }

  // 5. línea de tiempo
  // Se acumulan y se escriben al final: el fromTo más temprano de cada elemento fija la base y el resto lleva immediateRender:false
  const tw = [];
  const T = (sel, de, a, t) => tw.push({ sel, de: JSON.stringify(de), a: JSON.stringify(a), t: r3(t) });
  const Tf = (sel, de, a, t) => tw.push({ sel, de, a, t: r3(t) });
  const camXY = (q) => ({ x: r3(CX - q.x * q.s), y: r3(CY - q.y * q.s), scale: r3(q.s) });
  for (const k of cam) {
    T("#cam", camXY(k.desde), { ...camXY(k.a), duration: r3(k.dur), ease: k.ease }, k.t);
    if (k.pan || k.viaje) { T("#cam", { filter: "blur(0px)" }, { filter: `blur(${k.viaje ? 5 : 7}px)`, duration: r3(k.dur * 0.45), ease: "power1.in" }, k.t); T("#cam", { filter: `blur(${k.viaje ? 5 : 7}px)` }, { filter: "blur(0px)", duration: r3(k.dur * 0.5), ease: "power1.out" }, k.t + k.dur * 0.5); }
  }
  // estaciones: título, brillo y camino
  estaciones.forEach((e, i) => {
    const t = e._tIn ?? 0;
    T(`#est${i}-tit`, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, i === 0 ? 0 : t + 0.5);
    T(`#est${i}-glow`, { opacity: i === 0 ? 0.5 : 0 }, { opacity: 1, duration: 1.2, ease: "sine.out" }, i === 0 ? 0 : t + 0.4);
    if (i > 0) Tf(`#cam${i}`, `{strokeDashoffset:(i,el)=>el.dataset.len}`, `{strokeDashoffset:0,duration:1.2,ease:"power2.inOut"}`, t);
  });
  // piezas
  const opac = {};
  for (const f of frases) {
    for (const op of f.ops) {
      const t = op._t;
      const entra = (p, tt) => {
        const sel = `#${p.uid}-in`;
        if (tt <= 0.001) T(sel, { opacity: 1, y: 0, scale: 1.06 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }, 0);
        else { T(sel, { opacity: 0, y: 46, scale: 0.94, filter: "blur(8px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }, tt); ev.push({ t: tt, tipo: "pop" }); }
        opac[p.uid] = 1;
        if (p._html.includes('class="trazo dibuja"')) Tf(`#${p.uid} .trazo.dibuja:not(.capa)`, `{strokeDashoffset:(i,el)=>el.dataset.len}`, `{strokeDashoffset:0,duration:1.3,ease:"power2.inOut",stagger:0.15}`, tt + 0.2);
      };
      if (op.k === "fila") op.hijos.forEach((h, i) => entra(h, t + i * 0.12));
      else if (op.uid) entra(op, t);
      else if (op.k === "cambia") { const p = porId[op.id], k = op._estado; T(`#${p.uid}-s${k - 1}`, { opacity: 1, y: 0 }, { opacity: 0, y: -26, duration: 0.28, ease: "power2.in" }, t); T(`#${p.uid}-s${k}`, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.36, ease: "power3.out" }, t + 0.16); ev.push({ t, tipo: "click" }); }
      else if (op.k === "capa") {
        const p = porId[op.id]; if (!p) throw new Error(`${nn}: capa sobre id desconocido ${op.id}`);
        if (!p._html.includes(`data-capa="${op.nombre}"`)) throw new Error(`${nn}: la pieza ${op.id} no tiene la capa ${op.nombre}`);
        T(`#${p.uid} [data-capa="${op.nombre}"]`, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, t);
        if (p._html.includes(`class="capa trazo dibuja" data-capa="${op.nombre}"`)) Tf(`#${p.uid} .dibuja[data-capa="${op.nombre}"]`, `{strokeDashoffset:(i,el)=>el.dataset.len}`, `{strokeDashoffset:0,duration:1.1,ease:"power2.inOut"}`, t);
        ev.push({ t, tipo: "click" });
      }
      else if (op.k === "oculta") { const p = porId[op.id]; T(`#${p.uid} [data-capa="${op.nombre}"]`, { opacity: 1 }, { opacity: 0, duration: 0.35 }, t); }
      else if (op.k === "mueve") {
        const p = porId[op.id], polo = p.spec.polos.find((q) => q.id === op.polo);
        const u = 1; polo._pos ??= [polo.re, polo.im];
        const pre = polo._pos, unidad = p._unidad ?? (p._unidad = unidadPlano(p));
        const d0 = { x: (pre[0] - polo.re) * unidad, y: -(pre[1] - polo.im) * unidad }, d1 = { x: (op.a[0] - polo.re) * unidad, y: -(op.a[1] - polo.im) * unidad };
        T(`#${p.uid}-${polo.id}a`, { x: r3(d0.x), y: r3(d0.y) }, { x: r3(d1.x), y: r3(d1.y), duration: op.dur || 1.0, ease: "power2.inOut" }, t);
        if (Math.abs(polo.im) > 1e-9) T(`#${p.uid}-${polo.id}b`, { x: r3(d0.x), y: r3(-d0.y) }, { x: r3(d1.x), y: r3(-d1.y), duration: op.dur || 1.0, ease: "power2.inOut" }, t);
        polo._pos = op.a; void u;
      }
      else if (op.k === "tacha") { const p = porId[op.id]; T(`#${p.uid}-x`, { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: "power2.out" }, t); T(`#${p.uid}-in`, { opacity: 1 }, { opacity: 0.62, duration: 0.35 }, t + 0.2); opac[p.uid] = 0.62; ev.push({ t, tipo: "click" }); }
      else if (op.k === "ok" || op.k === "mal") {
        const p = porId[op.id], otro = op.k === "ok" ? "mal" : "ok";
        if (p._badge === otro) T(`#${p.uid}-${otro}`, { scale: 1, opacity: 1 }, { scale: 0.5, opacity: 0, duration: 0.2, ease: "power2.in" }, t);
        if (p._badge !== op.k) T(`#${p.uid}-${op.k}`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.4)" }, t + (p._badge === otro ? 0.15 : 0));
        p._badge = op.k; ev.push({ t, tipo: op.k === "ok" ? "exito" : "click" });
      }
      else if (op.k === "brilla") { const p = porId[op.id]; T(`#${p.uid}-g`, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t); T(`#${p.uid}-g`, { opacity: 1 }, { opacity: 0.35, duration: 0.9 }, t + 0.5); }
      else if (op.k === "limpia") { for (const p of op._piezas) T(`#${p.uid}-in`, { opacity: opac[p.uid] ?? 1, y: 0 }, { opacity: 0, y: -40, duration: 0.4, ease: "power2.in" }, t); }
    }
    if (f._golpe !== undefined) {
      const g = f._golpe;
      const sec = [[14, -9], [-12, 8], [9, 6], [-6, -5], [3, 2], [0, 0]];
      let prev = [0, 0];
      sec.forEach(([x, y], i) => { T("#shake", { x: prev[0], y: prev[1] }, { x, y, duration: 0.06, ease: "none" }, g + i * 0.06); prev = [x, y]; });
      T("#shake", { scale: 1 }, { scale: 1.05, duration: 0.12, ease: "power2.out" }, g); T("#shake", { scale: 1.05 }, { scale: 1, duration: 0.5, ease: "power2.out" }, g + 0.12);
      T("#flash", { opacity: 0 }, { opacity: 0.75, duration: 0.12, ease: "power2.out" }, g); T("#flash", { opacity: 0.75 }, { opacity: 0, duration: 0.9, ease: "power2.out" }, g + 0.12);
    }
  }
  // tarjeta final
  const ultima = frases.at(-1);
  T("#final-in", { opacity: 0, y: 60, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }, ultima.inicio - 0.1);
  ev.push({ t: ultima.inicio - 0.1, tipo: "exito" });
  // barra de progreso (decorativa)
  T("#prog", { scaleX: 0 }, { scaleX: 1, duration: DUR, ease: "none" }, 0);

  // 6. subtítulos palabra a palabra
  const CLAVE = new Set("polo polos cero ceros laplace routh hurwitz mason estable inestable estabilidad zeta sigma omega beta tau ganancia sobreimpulso establecimiento pico subida integrador integradores lazo lazos trayecto trayectos delta cofactor error tipo rampa escalon impulso exponencial seno coseno determinante matriz estados inversa pivote cruz epsilon auxiliar critica critico criticamente derivada integral transferencia fracciones tapar ziegler nichols pid proporcional derivativa referencia sumador nodo diagonal canonica amortiguamiento subamortiguado sobreamortiguado amortiguado normalizar constante cambio cambios signo rayo vertical horizontal circulo angulo".split(" "));
  const grupos = [];
  for (const f of frases) {
    let g = [];
    const cerrar = () => { if (g.length) grupos.push(g); g = []; };
    f.palabras.forEach((p, i) => {
      g.push(p);
      const chars = g.map((q) => q.w).join(" ").length;
      const sig = f.palabras[i + 1];
      if (!sig || g.length >= 4 || chars > 20 || /[,:;.?!]$/.test(p.w) || (sig && sig.inicio - p.fin > 0.15)) cerrar();
    });
    cerrar();
  }
  let caps = "";
  grupos.forEach((g, gi) => {
    const inicio = g[0].inicio - 0.06, siguiente = grupos[gi + 1]?.[0].inicio ?? Infinity;
    const fin = Math.max(inicio + 0.3, Math.min(g.at(-1).fin + 0.35, siguiente - 0.04));
    const ci = g.map((q) => norm(q.w)).findIndex((w) => CLAVE.has(w) || /\d/.test(w));
    const clave = ci >= 0 ? ci : -1;
    caps += `<div class="cg" id="cg${gi}">` + g.map((q, i) => `<span class="cw${i === clave ? " ck" : ""}" id="cg${gi}w${i}">${esc(q.w)}</span>`).join(" ") + `</div>`;
    T(`#cg${gi}`, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, inicio);
    g.forEach((q, i) => T(`#cg${gi}w${i}`, { opacity: 0.38 }, { opacity: 1, duration: 0.08 }, Math.max(inicio, q.inicio)));
    tw.push({ raw: `tl.to("#cg${gi}",{opacity:0,duration:0.1,ease:"power2.in"},${r3(fin - 0.1)});tl.set("#cg${gi}",{opacity:0,visibility:"hidden"},${r3(fin + 0.001)});`, t: fin });
  });

  // emitir la línea de tiempo
  const primeraT = {};
  for (const x of tw) if (!x.raw && (primeraT[x.sel] === undefined || x.t < primeraT[x.sel])) primeraT[x.sel] = x.t;
  const usada = {};
  for (const x of tw.sort((a, b) => a.t - b.t)) {
    if (x.raw) { tl.push(x.raw); continue; }
    const base = !usada[x.sel] && x.t === primeraT[x.sel];
    usada[x.sel] = true;
    const a = base ? x.a : x.a.replace(/\}$/, ",immediateRender:false}");
    tl.push(`tl.fromTo(${JSON.stringify(x.sel)},${x.de},${a},${x.t});`);
  }

  // 7. HTML
  const brilloBloque = (e) => tono(e.color)[0];
  let mundoHtml = `<div id="rejilla" style="left:${mundo.x0 - 3000}px;top:${mundo.y0 - 3000}px;width:${mundo.x1 - mundo.x0 + 6000}px;height:${mundo.y1 - mundo.y0 + 6000}px"></div>`;
  // camino entre estaciones
  let camino = `<svg id="camino" style="left:${mundo.x0}px;top:${mundo.y0}px" width="${mundo.x1 - mundo.x0}" height="${mundo.y1 - mundo.y0}" viewBox="${mundo.x0} ${mundo.y0} ${mundo.x1 - mundo.x0} ${mundo.y1 - mundo.y0}">`;
  estaciones.forEach((e, i) => {
    if (!i) return;
    const a = estaciones[i - 1], p0 = [a.x + 48, a.y + 52], p1 = [e.x + 48, e.y + 52];
    const mid = [(p0[0] + p1[0]) / 2, Math.min(p0[1], p1[1]) - 260];
    const L = Math.ceil(Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) * 1.25) + 10;
    camino += `<path id="cam${i}" d="M${p0[0]} ${p0[1]} Q${mid[0]} ${mid[1]} ${p1[0]} ${p1[1]}" fill="none" stroke="${brilloBloque(e)}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" data-len="${L}" opacity="0.8"/>`;
  });
  camino += `</svg>`;
  mundoHtml += camino;
  estaciones.forEach((e, i) => {
    const titulo = i === 0 ? CORTO[nn] : e.nombre;
    const fsTit = Math.max(34, Math.min(50, Math.floor(820 / (0.6 * [...titulo].length))));
    mundoHtml += `<div class="est" id="est${i}" style="left:${e.x}px;top:${e.y}px;width:${ANCHO}px;height:${e.alto}px">`;
    mundoHtml += `<div class="glow" id="est${i}-glow" style="background:radial-gradient(closest-side, ${brilloBloque(e)}55, transparent 72%)"></div>`;
    mundoHtml += `<div class="tit" id="est${i}-tit"><span class="num" style="background:${brilloBloque(e)}">${i === 0 ? nn : i}</span><span class="tt" style="font-size:${fsTit}px">${esc(titulo)}</span></div>`;
    for (const p of e.piezas) {
      mundoHtml += `<div class="it" id="${p.uid}" style="left:${r3(p._x)}px;top:${r3(p._y)}px;width:${r3(p._w)}px;height:${p._h}px"><div class="in" id="${p.uid}-in">${p._html.replace(/(<div class="card[^"]*" style=")/, `$1height:${p._h}px;`)}<div class="tachado" id="${p.uid}-x"></div><div class="badge ok" id="${p.uid}-ok">${icono("check")}</div><div class="badge mal" id="${p.uid}-mal">${icono("x")}</div><div class="glowp" id="${p.uid}-g" style="box-shadow:0 0 0 8px ${brilloBloque(e)}, 0 0 60px 10px ${brilloBloque(e)}"></div></div></div>`;
    }
    mundoHtml += `</div>`;
  });
  const flashCol = brilloBloque(estaciones.find((e) => frases.some((f) => f.bi === e.bi && (f.camara || "").includes("golpe"))) || estaciones[0]);
  const sig = SIGUIENTE[nn];
  const finalHtml = `<div id="final"><div id="final-in"><div class="fk">${sig ? "Siguiente vídeo" : "Fin de la serie"}</div><div class="ft">${esc(sig || "Control sin formulario · 15 vídeos")}</div><div class="fs">${sig ? "Control sin formulario" : "Mucho éxito en tu integrador"}</div></div></div>`;
  const html = `<!doctype html>
<html lang="es" data-resolution="portrait">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<title>${esc(meta.titulo || nn)}</title>
<script src="assets/gsap.min.js"></script>
<link rel="stylesheet" href="assets/katex/katex.min.css" />
<style>
html,body{margin:0;width:1080px;height:1920px;overflow:hidden;background:#07090d}
#root{position:relative;width:1080px;height:1920px;overflow:hidden;background:#07090d;font-family:Inter,sans-serif}
#fondo{position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 40%,#0d1320 0%,#07090d 70%)}
#shake{position:absolute;inset:0;transform-origin:540px 960px}
#cam{position:absolute;left:0;top:0;width:10px;height:10px;transform-origin:0 0}
#rejilla{position:absolute;background-image:linear-gradient(rgba(255,255,255,.055) 2px,transparent 2px),linear-gradient(90deg,rgba(255,255,255,.055) 2px,transparent 2px);background-size:120px 120px}
#camino{position:absolute;overflow:visible}
.est{position:absolute}
.est .glow{position:absolute;left:-520px;top:-420px;right:-520px;bottom:-420px;opacity:0;pointer-events:none}
.tit{position:absolute;left:0;top:0;width:960px;height:104px;display:flex;align-items:center;gap:22px;color:#fff;font-size:50px;font-weight:900;letter-spacing:-.01em;white-space:nowrap;overflow:hidden}
.tit .tt{overflow:hidden;text-overflow:ellipsis}
.tit .num{display:inline-flex;align-items:center;justify-content:center;min-width:96px;height:96px;padding:0 18px;border-radius:26px;color:#0b0f14;font-size:50px}
.it{position:absolute}
.in{position:relative;width:100%;height:100%}
${CSS}
.tachado{position:absolute;left:-10px;right:-10px;top:50%;height:12px;margin-top:-6px;background:#e5484d;border-radius:6px;transform:scaleX(0);transform-origin:left center;box-shadow:0 0 0 4px rgba(0,0,0,.25)}
.badge{position:absolute;right:-22px;top:-22px;width:84px;height:84px;border-radius:50%;display:flex;align-items:center;justify-content:center;opacity:0;box-shadow:0 8px 24px rgba(0,0,0,.4)}
.badge .ico{width:54px;height:54px;fill:#fff}
.badge.ok{background:#12a150}.badge.mal{background:#e5484d}
.glowp{position:absolute;inset:0;border-radius:30px;opacity:0;pointer-events:none}
#flash{position:absolute;inset:0;opacity:0;background:radial-gradient(70% 55% at 50% 50%,${flashCol}cc,${flashCol}33 60%,transparent 80%);mix-blend-mode:screen}
#vel-top{position:absolute;left:0;right:0;top:0;height:500px;background:linear-gradient(#07090d 0%,#07090d 84%,rgba(7,9,13,0) 100%)}
#vel-bot{position:absolute;left:0;right:0;bottom:0;height:440px;background:linear-gradient(rgba(7,9,13,0) 0%,#07090d 22%,#07090d 100%)}
#caps{position:absolute;left:60px;right:60px;top:232px;height:170px}
.cg{position:absolute;left:0;right:0;top:0;height:170px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px 18px;text-align:center;opacity:0;color:#fff;font-size:62px;font-weight:900;line-height:1.08;letter-spacing:-.01em}
.cw{display:inline-block;text-shadow:0 4px 18px rgba(0,0,0,.6)}
.ck{background:#ffd166;color:#0b0f14;padding:2px 16px;border-radius:14px;text-shadow:none}
#prog{position:absolute;left:0;bottom:0;width:1080px;height:10px;background:linear-gradient(90deg,#5aaeff,#17dfa9);transform-origin:left center;transform:scaleX(0);opacity:.85}
#final{position:absolute;left:60px;right:60px;top:1010px;height:420px}
#final-in{position:relative;width:100%;height:100%;opacity:0;border-radius:36px;background:#fff;color:#0f141b;padding:48px 52px;box-shadow:0 30px 90px rgba(0,0,0,.6)}
.fk{font-size:42px;font-weight:900;color:#1d5fc4;text-transform:uppercase;letter-spacing:.04em}
.ft{font-size:66px;font-weight:900;line-height:1.08;margin-top:18px}
.fs{font-size:40px;font-weight:700;color:#5b6573;margin-top:24px}
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${r3(DUR)}" data-width="1080" data-height="1920" data-fps="30">
<div id="fondo"></div>
<div id="shake"><div id="cam">${mundoHtml}</div></div>
<div id="flash"></div>
<div id="vel-top"></div><div id="vel-bot"></div>
<div id="caps">${caps}</div>
${finalHtml}
<div id="prog"></div>
<audio id="mezcla" class="clip" src="assets/mezcla.wav" data-start="0" data-duration="${r3(DUR)}" data-track-index="1" data-volume="1"></audio>
</div>
<script>
const tl = gsap.timeline({ paused: true });
${tl.join("\n")}
window.__timelines["main"] = tl;
tl.seek(0);
</script>
</body>
</html>`;
  writeFileSync(join(dir, "index.html"), html);
  writeFileSync(join(dir, "eventos.json"), JSON.stringify(ev.sort((a, b) => a.t - b.t).map((e) => ({ t: r3(Math.max(0, e.t)), tipo: e.tipo })), null, 0));
  if (!existsSync(join(dir, "hyperframes.json"))) writeFileSync(join(dir, "hyperframes.json"), JSON.stringify({ paths: { blocks: "compositions", components: "compositions/components", assets: "assets" }, media: { autoProxy: true } }, null, 2));
  console.log(`${nn}: ${piezas.length} piezas, ${frases.length} frases, ${grupos.length} subtítulos, ${tl.length} tweens, ${r3(DUR)} s`);
}

function unidadPlano(p) {
  const s = p.spec, Wp = p._w - 32, Hp = s.h || 640, m = { l: 40, r: 40, t: 30, b: 40 };
  const [x0, x1] = s.x || [-10, 2], [y0, y1] = s.y || [-1, 10];
  return Math.min((Wp - m.l - m.r) / (x1 - x0), (Hp - m.t - m.b) / (y1 - y0));
}

for (const nn of process.argv.slice(2)) await construir(nn);
