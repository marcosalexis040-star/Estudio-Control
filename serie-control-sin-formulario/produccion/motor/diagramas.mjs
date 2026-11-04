// Mini lenguaje para diagramas de bloques en SVG.
// cajas: {x, y, w, h, t, sub?, color?, capa?}   (x, y = centro)
// sumas: {x, y, r?, signos: {l, t, b, r}, capa?}
// cables: {p: [[x,y],...], flecha?: true, color?, ancho?, capa?, dash?}
// nodos: {x, y}  (punto de derivación)
// textos: {x, y, t, size?, color?, anchor?, capa?}
// resaltes: {p: [[x,y],...], color, capa, cerrado?}  — trazo grueso translúcido que se dibuja
import { COL } from "./graficas.mjs";
const C = (c) => COL[c] || c || COL.ink;
const f2 = (v) => Math.round(v * 10) / 10;
const capa = (e, cls = "") => (e.capa ? `class="capa ${cls}" data-capa="${e.capa}" opacity="0"` : cls ? `class="${cls}"` : "");
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function longitud(p) { let L = 0; for (let i = 1; i < p.length; i++) L += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return L; }

export function diagrama(d) {
  const W = d.w || 960, H = d.h || 420;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block">`;
  s += `<defs><marker id="${d.uid}-fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${COL.ink}"/></marker></defs>`;
  for (const r of d.resaltes || []) {
    const pts = r.cerrado ? [...r.p, r.p[0]] : r.p, L = Math.ceil(longitud(pts)) + 4;
    const dpath = pts.map((q, i) => (i ? "L" : "M") + f2(q[0]) + " " + f2(q[1])).join("");
    s += `<path ${r.capa ? `class="capa trazo dibuja" data-capa="${r.capa}" opacity="0"` : `class="trazo"`} d="${dpath}" fill="none" stroke="${C(r.color || "ambar")}" stroke-opacity="0.55" stroke-width="${r.ancho || 22}" stroke-linejoin="round" stroke-linecap="round" data-len="${L}" stroke-dasharray="${L}" stroke-dashoffset="${r.capa ? L : 0}"/>`;
  }
  for (const c of d.cables || []) {
    const dpath = c.p.map((q, i) => (i ? "L" : "M") + f2(q[0]) + " " + f2(q[1])).join("");
    s += `<path ${capa(c)} d="${dpath}" fill="none" stroke="${C(c.color || "ink")}" stroke-width="${c.ancho || 5}" stroke-linejoin="round" ${c.dash ? `stroke-dasharray="${c.dash}"` : ""} ${c.flecha === false ? "" : `marker-end="url(#${d.uid}-fl)"`}/>`;
  }
  for (const n of d.nodos || []) s += `<circle ${capa(n)} cx="${n.x}" cy="${n.y}" r="9" fill="${COL.ink}"/>`;
  for (const b of d.cajas || []) {
    const w = b.w || 150, h = b.h || 96;
    s += `<g ${capa(b)}><rect x="${f2(b.x - w / 2)}" y="${f2(b.y - h / 2)}" width="${w}" height="${h}" rx="14" fill="${b.fondo || "#ffffff"}" stroke="${C(b.color || "ink")}" stroke-width="5"/>`;
    const lines = String(b.t).split("\n"), fs = b.size || (lines.length > 1 ? 30 : 36);
    lines.forEach((ln, i) => { s += `<text x="${b.x}" y="${f2(b.y + fs * 0.36 + (i - (lines.length - 1) / 2) * fs * 1.15)}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${C(b.tcolor || "ink")}">${esc(ln)}</text>`; });
    s += `</g>`;
  }
  for (const m of d.sumas || []) {
    const r = m.r || 28;
    s += `<g ${capa(m)}><circle cx="${m.x}" cy="${m.y}" r="${r}" fill="#fff" stroke="${COL.ink}" stroke-width="5"/>`;
    s += `<path d="M${m.x - r * 0.7} ${m.y - r * 0.7}L${m.x + r * 0.7} ${m.y + r * 0.7}M${m.x - r * 0.7} ${m.y + r * 0.7}L${m.x + r * 0.7} ${m.y - r * 0.7}" stroke="${COL.ink}" stroke-width="3"/>`;
    const off = { l: [-r - 16, -10], t: [-20, -r - 10], b: [-22, r + 34], r: [r + 10, -10] };
    for (const [k, sg] of Object.entries(m.signos || {})) { const [dx, dy] = off[k]; s += `<text x="${m.x + dx}" y="${m.y + dy}" font-size="34" font-weight="900" text-anchor="middle" fill="${sg === "-" || sg === "−" ? COL.rojo : COL.verde}">${sg === "-" ? "−" : sg}</text>`; }
    s += `</g>`;
  }
  for (const t of d.textos || []) s += `<text ${capa(t)} x="${t.x}" y="${t.y}" font-size="${t.size || 32}" font-weight="${t.peso || 800}" fill="${C(t.color || "ink")}" text-anchor="${t.anchor || "middle"}">${esc(t.t)}</text>`;
  return s + `</svg>`;
}
