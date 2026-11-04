import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";
import { rc } from "../produccion/motor/diagramas-lista.mjs";

const e1 = resp.esc1(1, 1);
const curva = (extra = {}) => G({ x: [0, 5], y: [0, 1.15], h: 520, xlabel: "t / τ", ylabel: "y", curvas: [{ f: e1, color: "azul" }], ...extra }, {});

export default [
  // Gancho
  [
    [G({ x: [0, 5], y: [0, 1.15], h: 520, xlabel: "t", curvas: [{ f: e1, color: "azul" }], textos: [{ x: 1, y: 0.25, t: "¿ τ ?", size: 56, color: "rojo" }] }, { id: "g0" })],
    [I("question", "¿Dónde está la **constante de tiempo**?", { estilo: "roja" })],
    [I("timer", "Léela en **3 segundos**", { estilo: "verde" })],
  ],
  // Forma estándar
  [
    [S({ x: [-4, 1], y: [-1, 1], h: 260, polos: [{ id: "p", re: -1, im: 0 }] }, { id: "pl" })],
    [F("G(s)=\\frac{K}{\\tau s+1}", { id: "g", estilo: "dorada", size: 80, at: "estándar" })],
    [T("**K** = ganancia: salida final por cada unidad de entrada", { at: "ganancia" })],
    [T("**τ** = constante de tiempo: qué tan rápido llega", { at: "constante" })],
    [F("\\text{polo en } s=-\\frac{1}{\\tau}", { estilo: "verde" })],
  ],
  // Normalizar
  [
    [F("\\frac{4}{s+2}\\;\\Rightarrow\\;K=4\\;?", { id: "mal4", estilo: "roja" }), mal("mal4", { at: "normalizar" })],
    [F("\\frac{4}{s+2}=\\frac{4}{2\\left(\\frac{s}{2}+1\\right)}", { id: "nz", at: "factoriza" })],
    [cambia("nz", "\\frac{4}{s+2}=\\frac{2}{0.5\\,s+1}", { at: "medio" })],
    [F("K=2,\\qquad \\tau=0.5", { id: "kt", estilo: "verde", size: 72 }), ok("kt", { at: "sí" })],
  ],
  // Respuesta al escalón
  [
    [F("y(t)=K A\\left(1-e^{-t/\\tau}\\right)", { estilo: "dorada" }), G({ x: [0, 5], y: [0, 1.15], h: 560, xlabel: "t / τ", ylabel: "y / KA", curvas: [{ f: e1, color: "azul" }],
      vl: [{ x: 1, color: "violeta", capa: "t1", label: "τ" }, { x: 4, color: "verde", capa: "t4", label: "4τ" }], hl: [{ y: 1, color: "gris" }],
      bandas: [{ y0: 0.98, y1: 1.02, color: "verde", capa: "t4" }], puntos: [{ x: 1, y: 0.632, label: "63 %", color: "violeta", capa: "t1" }, { x: 4, y: 0.982, label: "98 %", color: "verde", capa: "t4", dy: 50 }],
      curvas2: [] }, { id: "e", at: "salida" })],
    [capa("e", "t1", { at: "tau" })],
    [capa("e", "t4", { at: "98" })],
    [F("\\text{tangente en } 0:\\ \\text{corta el final en } t=\\tau", { size: 50, at: "tangente" })],
    [Fila([F("e^{-1}\\approx0.37\\Rightarrow 63\\,\\%", { size: 50 }), F("e^{-4}\\approx0.02\\Rightarrow 98\\,\\%", { size: 50, at: "cuatro" })])],
  ],
  // Leer una gráfica
  [
    [G({ x: [0, 2], y: [0, 3.4], h: 500, xlabel: "t (min)", curvas: [{ f: resp.esc1(3, 0.25), color: "azul" }], hl: [{ y: 3, label: "y∞", color: "verde", capa: "k" }, { y: 1.896, label: "63 %", color: "violeta", capa: "tau" }], vl: [{ x: 0.25, color: "violeta", capa: "tau", label: "τ" }] }, { id: "lg" })],
    [capa("lg", "k"), F("K=\\frac{y_\\infty}{A}", { at: "final" })],
    [capa("lg", "tau", { at: "63" }), F("\\tau = t\\ \\text{en el}\\ 63\\,\\%", { at: "tau" })],
    [I("thermometer", "Termómetro: **98 %** en **1 min**", { at: "termómetro" })],
    [F("4\\tau=1\\ \\text{min}\\;\\Rightarrow\\;\\tau=0.25\\ \\text{min}", { estilo: "verde", at: "cuatro" })],
  ],
  // Circuito RC
  [
    [D(rc(), { id: "rc" })],
    [F("\\frac{V_c}{V_{in}}=\\frac{1}{RC\\,s+1}", { estilo: "dorada", at: "voltaje" })],
    [F("\\tau=RC,\\qquad K=1", { estilo: "verde", size: 72 })],
  ],
  // Rampa e impulso
  [
    [G({ x: [0, 5], y: [0, 5], h: 480, xlabel: "t / τ", curvas: [{ f: (t) => t, color: "gris", dash: "14 12", dibuja: false }, { f: resp.ramp1(1), color: "azul" }], textos: [{ x: 3.35, y: 3.9, t: "r = t", color: "muted", size: 32 }, { x: 4.2, y: 2.6, t: "y", color: "azul", size: 32 }] }, { id: "rp" })],
    [F("e_{ss}=\\tau", { estilo: "dorada", size: 80, at: "exactamente" })],
    [F("10\\ ^\\circ\\!/\\text{min}\\times 0.25\\ \\text{min}=2.5\\ ^\\circ", { at: "10" })],
    [G({ x: [0, 5], y: [0, 1.1], h: 420, xlabel: "t / τ", curvas: [{ f: resp.imp1(1, 1), color: "naranja" }], puntos: [{ x: 0, y: 1, label: "K/τ", color: "naranja", dx: 24, dy: 10 }] }, { at: "impulso" })],
    [F("\\text{rampa}\\xrightarrow{\\;d/dt\\;}\\text{escalón}\\xrightarrow{\\;d/dt\\;}\\text{impulso}", { size: 50, at: "derivada" })],
  ],
  // Clímax
  [
    [T("Lo que más confunde", { estilo: "oscura", size: 64, centro: true })],
    [G({ x: [0, 5], y: [0, 4.4], h: 500, xlabel: "t / τ", curvas: [{ f: resp.esc1(1, 1), color: "azul" }, { f: resp.esc1(2, 1), color: "violeta" }, { f: resp.esc1(4, 1), color: "naranja" }], vl: [{ x: 1, color: "rojo", label: "mismo τ" }] }, { at: "K" }), T("Más **K** → más alto, **no** más rápido", { estilo: "roja", centro: true, at: "alto" })],
    [G({ x: [0, 5], y: [0, 1.1], h: 480, xlabel: "t", curvas: [{ f: resp.esc1(1, 0.5), color: "verde" }, { f: resp.esc1(1, 1), color: "azul" }, { f: resp.esc1(1, 2), color: "gris" }], textos: [{ x: 0.9, y: 0.95, t: "τ = 0.5", color: "verde", size: 30 }, { x: 3.4, y: 0.72, t: "τ = 2", color: "muted", size: 30 }] }, { at: "tau" })],
    [S({ x: [-4, 1], y: [-1, 1], h: 260, polos: [{ id: "p", re: -0.5, im: 0, color: "gris" }] }, { id: "pq" }), mueve("pq", "p", [-3, 0], { at: "izquierda" }), T("Polo más a la **izquierda** → más **rápido**", { estilo: "verde", centro: true, at: "rápido" })],
  ],
  // Cierre
  [
    [Fila([F("63\\,\\%\\ \\text{en}\\ \\tau", { size: 54 }), F("98\\,\\%\\ \\text{en}\\ 4\\tau", { size: 54 })])],
    [],
  ],
];
