// Gráficas en SVG generadas en la construcción: respuesta en el tiempo y plano s.
// Todo elemento con `capa` nace oculto y aparece con la operación capa(id, nombre).
// Los trazos con `dibuja` se dibujan (stroke-dashoffset) al aparecer.

export const COL = {
  ink: "#0f141b", muted: "#5b6573", grid: "#e3e8ef", eje: "#8a94a3",
  rojo: "#e5484d", verde: "#12a150", azul: "#2f6fde", ambar: "#d98a00", violeta: "#8b5cf6",
  turquesa: "#0d9488", naranja: "#ea6a12", gris: "#9aa3af", rosa: "#db2777",
};
const C = (c) => COL[c] || c || COL.azul;
const f2 = (v) => Math.round(v * 10) / 10;

function nice(a, b, n) {
  const span = b - a; if (span <= 0) return [a];
  const raw = span / n, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
  const step = (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * p, out = [];
  for (let v = Math.ceil(a / step - 1e-9) * step; v <= b + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}
const etq = (v) => (Math.abs(v) < 1e-9 ? "0" : String(+v.toFixed(3)).replace("-", "−"));

function capaAttrs(e, extra = "") {
  return e.capa ? `class="capa ${extra}" data-capa="${e.capa}" opacity="0"` : (extra ? `class="${extra}"` : "");
}
function longitud(pts) {
  let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L;
}
function trazo(pts, { color, ancho = 6, dash, capa, dibuja = true, id }) {
  const d = pts.map((p, i) => (i ? "L" : "M") + f2(p[0]) + " " + f2(p[1])).join("");
  const L = Math.ceil(longitud(pts)) + 2;
  const dibAttr = dibuja && !dash ? ` data-len="${L}" stroke-dasharray="${L}" stroke-dashoffset="${L}"` : "";
  const cls = ["trazo", dibuja && !dash ? "dibuja" : ""].filter(Boolean).join(" ");
  const g = capa ? `class="capa ${cls}" data-capa="${capa}" opacity="0"` : `class="${cls}"`;
  return `<path ${id ? `id="${id}"` : ""} ${g} d="${d}" fill="none" stroke="${C(color)}" stroke-width="${ancho}" stroke-linecap="round" stroke-linejoin="round" ${dash ? `stroke-dasharray="${dash}"` : ""}${dibAttr}/>`;
}

// Respuestas típicas
export const resp = {
  esc1: (K = 1, tau = 1, A = 1) => (t) => K * A * (1 - Math.exp(-t / tau)),
  imp1: (K = 1, tau = 1) => (t) => (K / tau) * Math.exp(-t / tau),
  ramp1: (tau = 1) => (t) => t - tau + tau * Math.exp(-t / tau),
  esc2: (z, wn, K = 1) => (t) => {
    if (t <= 0) return 0;
    if (z < 1 - 1e-9) {
      const wd = wn * Math.sqrt(1 - z * z), b = Math.acos(Math.max(-1, Math.min(1, z)));
      return K * (1 - Math.exp(-z * wn * t) / Math.sqrt(1 - z * z) * Math.sin(wd * t + b));
    }
    if (Math.abs(z - 1) < 1e-9) return K * (1 - Math.exp(-wn * t) * (1 + wn * t));
    const r = Math.sqrt(z * z - 1), p1 = wn * (z - r), p2 = wn * (z + r);
    return K * (1 - (p2 * Math.exp(-p1 * t) - p1 * Math.exp(-p2 * t)) / (p2 - p1));
  },
  polo: (s, w) => (t) => (w > 0 ? Math.exp(s * t) * Math.sin(w * t) : Math.exp(s * t)),
};

export function plot(spec) {
  const W = spec.w || 960, H = spec.h || 560;
  const m = { l: 92, r: 34, t: 34, b: 78 };
  const pw = W - m.l - m.r, ph = H - m.t - m.b;
  const [x0, x1] = spec.x, [y0, y1] = spec.y;
  const X = (x) => m.l + ((x - x0) / (x1 - x0)) * pw, Y = (y) => m.t + (1 - (y - y0) / (y1 - y0)) * ph;
  const cy = (y) => Math.max(y0 - (y1 - y0) * 0.08, Math.min(y1 + (y1 - y0) * 0.08, y));
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block">`;
  s += `<defs><clipPath id="${spec.uid}-clip"><rect x="${m.l}" y="${m.t}" width="${pw}" height="${ph}"/></clipPath></defs>`;
  for (const b of spec.bandas || []) s += `<rect ${capaAttrs(b)} x="${m.l}" y="${f2(Y(b.y1))}" width="${pw}" height="${f2(Y(b.y0) - Y(b.y1))}" fill="${C(b.color || "verde")}" fill-opacity="0.16"/>`;
  if (spec.rejilla !== false) {
    for (const v of nice(x0, x1, spec.nx || 6)) s += `<line x1="${f2(X(v))}" x2="${f2(X(v))}" y1="${m.t}" y2="${m.t + ph}" stroke="${COL.grid}" stroke-width="2"/><text x="${f2(X(v))}" y="${H - m.b + 44}" text-anchor="middle" font-size="30" font-weight="700" fill="${COL.muted}">${spec.xticks === false ? "" : etq(v)}</text>`;
    for (const v of nice(y0, y1, spec.ny || 5)) s += `<line x1="${m.l}" x2="${m.l + pw}" y1="${f2(Y(v))}" y2="${f2(Y(v))}" stroke="${COL.grid}" stroke-width="2"/><text x="${m.l - 14}" y="${f2(Y(v) + 10)}" text-anchor="end" font-size="30" font-weight="700" fill="${COL.muted}">${spec.yticks === false ? "" : etq(v)}</text>`;
  }
  if (y0 < 0 && y1 > 0) s += `<line x1="${m.l}" x2="${m.l + pw}" y1="${f2(Y(0))}" y2="${f2(Y(0))}" stroke="${COL.eje}" stroke-width="3"/>`;
  s += `<rect x="${m.l}" y="${m.t}" width="${pw}" height="${ph}" fill="none" stroke="${COL.eje}" stroke-width="3"/>`;
  s += `<g clip-path="url(#${spec.uid}-clip)">`;
  for (const l of spec.hl || []) s += trazo([[m.l, Y(l.y)], [m.l + pw, Y(l.y)]], { color: l.color || "gris", ancho: l.ancho || 4, dash: l.dash ?? "14 12", capa: l.capa, dibuja: false });
  for (const l of spec.vl || []) s += trazo([[X(l.x), m.t], [X(l.x), m.t + ph]], { color: l.color || "gris", ancho: l.ancho || 4, dash: l.dash ?? "14 12", capa: l.capa, dibuja: false });
  for (const c of spec.curvas || []) {
    const pts = [];
    if (c.pts) for (const [x, y] of c.pts) pts.push([X(x), Y(cy(y))]);
    else { const N = c.n || 260, a = c.desde ?? x0, b = c.hasta ?? x1; for (let i = 0; i <= N; i++) { const x = a + ((b - a) * i) / N; pts.push([X(x), Y(cy(c.f(x)))]); } }
    s += trazo(pts, { color: c.color, ancho: c.ancho || 7, dash: c.dash, capa: c.capa, dibuja: c.dibuja !== false, id: c.id ? `${spec.uid}-${c.id}` : undefined });
  }
  s += `</g>`;
  for (const p of spec.puntos || []) {
    s += `<g ${capaAttrs(p)}><circle cx="${f2(X(p.x))}" cy="${f2(Y(p.y))}" r="11" fill="#fff" stroke="${C(p.color || "ink")}" stroke-width="5"/>`;
    if (p.label) s += `<text x="${f2(X(p.x) + (p.dx ?? 18))}" y="${f2(Y(p.y) + (p.dy ?? -18))}" font-size="34" font-weight="800" fill="${C(p.color || "ink")}" text-anchor="${p.anchor || "start"}">${p.label}</text>`;
    s += `</g>`;
  }
  for (const t of spec.textos || []) s += `<text ${capaAttrs(t)} x="${f2(X(t.x))}" y="${f2(Y(t.y))}" font-size="${t.size || 34}" font-weight="800" fill="${C(t.color || "ink")}" text-anchor="${t.anchor || "middle"}">${t.t}</text>`;
  for (const l of spec.hl || []) if (l.label) s += `<text ${capaAttrs(l)} x="${m.l + pw - 10}" y="${f2(Y(l.y) - 12)}" text-anchor="end" font-size="30" font-weight="800" fill="${C(l.color || "muted")}">${l.label}</text>`;
  for (const l of spec.vl || []) if (l.label) s += `<text ${capaAttrs(l)} x="${f2(X(l.x) + 10)}" y="${m.t + 36 + (l.dy || 0)}" font-size="30" font-weight="800" fill="${C(l.color || "muted")}">${l.label}</text>`;
  if (spec.xlabel) s += `<text x="${m.l + pw}" y="${H - 8}" text-anchor="end" font-size="30" font-weight="800" fill="${COL.ink}">${spec.xlabel}</text>`;
  if (spec.ylabel) s += `<text x="${m.l + 12}" y="${m.t + 40}" font-size="32" font-weight="800" fill="${COL.ink}">${spec.ylabel}</text>`;
  return s + `</svg>`;
}

// Plano s con escala igual en ambos ejes (los ángulos y el triángulo son reales).
export function plano(spec) {
  const W = spec.w || 960, H = spec.h || 640;
  const m = { l: 40, r: 40, t: 30, b: 40 };
  const [x0, x1] = spec.x || [-10, 2], [y0, y1] = spec.y || [-1, 10];
  const u = Math.min((W - m.l - m.r) / (x1 - x0), (H - m.t - m.b) / (y1 - y0));
  const ox = m.l + ((W - m.l - m.r) - u * (x1 - x0)) / 2, oy = m.t + ((H - m.t - m.b) - u * (y1 - y0)) / 2;
  const X = (x) => ox + (x - x0) * u, Y = (y) => oy + (y1 - y) * u;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block">`;
  s += `<defs><clipPath id="${spec.uid}-clip"><rect x="${f2(X(x0))}" y="${f2(Y(y1))}" width="${f2((x1 - x0) * u)}" height="${f2((y1 - y0) * u)}"/></clipPath></defs>`;
  if (spec.spd !== false && x1 > 0) s += `<rect x="${f2(X(0))}" y="${f2(Y(y1))}" width="${f2(X(x1) - X(0))}" height="${f2((y1 - y0) * u)}" fill="${COL.rojo}" fill-opacity="0.10"/>`;
  for (const z of spec.zonas || []) s += `<path ${capaAttrs(z)} d="${z.d(X, Y)}" fill="${C(z.color || "verde")}" fill-opacity="${z.op || 0.18}"/>`;
  const paso = spec.paso || (x1 - x0 > 14 ? 2 : 1);
  for (let v = Math.ceil(x0 / paso) * paso; v <= x1; v += paso) s += `<line x1="${f2(X(v))}" x2="${f2(X(v))}" y1="${f2(Y(y1))}" y2="${f2(Y(y0))}" stroke="${COL.grid}" stroke-width="2"/>` + (v !== 0 && spec.etiquetas !== false && (x1 - v) * u > 40 ? `<text x="${f2(X(v))}" y="${f2(Y(0) + 38)}" text-anchor="middle" font-size="30" font-weight="800" fill="${COL.muted}">${etq(v)}</text>` : "");
  for (let v = Math.ceil(y0 / paso) * paso; v <= y1; v += paso) s += `<line x1="${f2(X(x0))}" x2="${f2(X(x1))}" y1="${f2(Y(v))}" y2="${f2(Y(v))}" stroke="${COL.grid}" stroke-width="2"/>` + (v !== 0 && spec.etiquetas !== false && (y1 - v) * u > 54 ? `<text x="${f2(X(0) + 12)}" y="${f2(Y(v) + 9)}" font-size="30" font-weight="800" fill="${COL.muted}">j${etq(v)}</text>` : "");
  s += `<line x1="${f2(X(x0))}" x2="${f2(X(x1))}" y1="${f2(Y(0))}" y2="${f2(Y(0))}" stroke="${COL.eje}" stroke-width="4"/><line x1="${f2(X(0))}" x2="${f2(X(0))}" y1="${f2(Y(y1))}" y2="${f2(Y(y0))}" stroke="${COL.eje}" stroke-width="4"/>`;
  s += `<text x="${f2(X(x1) - 8)}" y="${f2(Y(0) - 14)}" text-anchor="end" font-size="30" font-weight="800" fill="${COL.ink}">Re</text><text x="${f2(X(0) + 12)}" y="${f2(Y(y1) + 34)}" font-size="30" font-weight="800" fill="${COL.ink}">Im</text>`;
  s += `<g clip-path="url(#${spec.uid}-clip)">`;
  const R = (x1 - x0 + y1 - y0) * 2;
  for (const l of spec.lineas || []) {
    let pts;
    if (l.tipo === "h") pts = [[X(x0), Y(l.v)], [X(x1), Y(l.v)]];
    else if (l.tipo === "v") pts = [[X(l.v), Y(y0)], [X(l.v), Y(y1)]];
    else if (l.tipo === "rayo") { const a = Math.atan2(l.im, l.re); pts = [[X(0), Y(0)], [X(R * Math.cos(a)), Y(R * Math.sin(a))]]; }
    else if (l.tipo === "seg") pts = [[X(l.a[0]), Y(l.a[1])], [X(l.b[0]), Y(l.b[1])]];
    else if (l.tipo === "circulo") { pts = []; for (let i = 0; i <= 180; i++) { const a = (Math.PI * 2 * i) / 180; pts.push([X(l.r * Math.cos(a)), Y(l.r * Math.sin(a))]); } }
    s += trazo(pts, { color: l.color || "gris", ancho: l.ancho || 5, dash: l.dash, capa: l.capa, dibuja: l.dibuja !== false });
  }
  s += `</g>`;
  for (const a of spec.arcos || []) {
    const ang = Math.atan2(a.im, -a.re), r = a.r || 70, cx = X(0), cy = Y(0);
    const ex = cx - r * Math.cos(ang), ey = cy - r * Math.sin(ang);
    s += `<g ${capaAttrs(a)}><path d="M${f2(cx - r)} ${f2(cy)} A${r} ${r} 0 0 1 ${f2(ex)} ${f2(ey)}" fill="none" stroke="${C(a.color || "ambar")}" stroke-width="6"/>`;
    s += `<text x="${f2(cx - r - 36)}" y="${f2(cy - 18)}" font-size="34" font-weight="900" fill="${C(a.color || "ambar")}" text-anchor="middle">${a.label || "β"}</text></g>`;
  }
  for (const t of spec.textos || []) s += `<text ${capaAttrs(t)} x="${f2(X(t.re))}" y="${f2(Y(t.im))}" font-size="${t.size || 32}" font-weight="900" fill="${C(t.color || "ink")}" text-anchor="${t.anchor || "middle"}">${t.t}</text>`;
  const cruz = (px, py, col, k) => `<path d="M${f2(px - k)} ${f2(py - k)}L${f2(px + k)} ${f2(py + k)}M${f2(px - k)} ${f2(py + k)}L${f2(px + k)} ${f2(py - k)}" stroke="${col}" stroke-width="8" stroke-linecap="round"/>`;
  for (const p of spec.polos || []) {
    const col = C(p.color || "rojo"), k = p.k || 15;
    const una = (im, suf) => {
      const px = X(p.re), py = Y(im);
      return `<g transform="translate(${f2(px)} ${f2(py)})"><g id="${spec.uid}-${p.id}${suf}" class="mov" data-u="${u}">${cruz(0, 0, col, k)}${p.label && suf !== "b" ? `<text x="${p.ldx ?? 22}" y="${p.ldy ?? -20}" font-size="40" font-weight="900" fill="${p.color === "gris" ? COL.muted : col}">${p.label}</text>` : ""}</g></g>`;
    };
    s += `<g ${p.capa ? capaAttrs(p) : `data-capa="polo-${p.id}"`}>` + una(p.im, "a") + (p.conj !== false && Math.abs(p.im) > 1e-9 && y0 < -1e-9 ? una(-p.im, "b") : "") + `</g>`;
  }
  for (const z of spec.ceros || []) s += `<g ${capaAttrs(z)}><circle cx="${f2(X(z.re))}" cy="${f2(Y(z.im || 0))}" r="15" fill="#fff" stroke="${C(z.color || "azul")}" stroke-width="7"/></g>`;
  return s + `</svg>`;
}
