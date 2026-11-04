import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";

// ζ = 0.4, ωn = 2: σ = 0.8, ωd = 1.833, tp = 1.714, Mp = 25.4 %, ts ≈ 5
const z = 0.4, wn = 2, sg = z * wn, wd = wn * Math.sqrt(1 - z * z), tp = Math.PI / wd, Mp = Math.exp(-Math.PI * sg / wd), b = Math.acos(z), tr = (Math.PI - b) / wd;
const env = (k) => (t) => 1 + k * Math.exp(-sg * t) / Math.sqrt(1 - z * z);
const g = G({ x: [0, 7], y: [0, 1.75], h: 560, xlabel: "t", ylabel: "y", curvas: [
  { f: env(1), color: "turquesa", dash: "12 10", dibuja: false, capa: "env" }, { f: env(-1), color: "turquesa", dash: "12 10", dibuja: false, capa: "env" },
  { f: resp.esc2(z, wn), color: "azul" }],
  hl: [{ y: 1, color: "gris" }], bandas: [{ y0: 0.98, y1: 1.02, color: "verde", capa: "ts" }],
  vl: [{ x: tp, color: "violeta", capa: "tp", label: "tₚ" }, { x: 4 / sg, color: "verde", capa: "ts", label: "tₛ", dy: 40 }, { x: tr, color: "naranja", capa: "tr", label: "tᵣ", dy: 80 }],
  puntos: [{ x: tp, y: 1 + Mp, color: "violeta", label: "Mₚ", capa: "mp" }] }, { id: "g" });

export default [
  // Gancho
  [
    [Fila([F("t_p=\\;?", { size: 60 }), F("M_p=\\;?", { size: 60 }), F("t_s=\\;?", { size: 60 })], { id: "f3" })],
    [T("Problema 1 del integrador: **40 puntos**", { estilo: "roja", centro: true, at: "40" })],
    [F("y(t)=1-\\frac{e^{-\\sigma t}}{\\sqrt{1-\\zeta^2}}\\sin(\\omega_d t+\\beta)", { id: "y", estilo: "dorada", at: "sola" })],
  ],
  // La respuesta
  [
    [g],
    [capa("g", "env", { at: "envolvente", foco: ["g"] }), T("**e^(−σt)** solo contiene a **σ**: es la envolvente", { id: "pz", at: "sigma" })],
    [cambia("pz", "el **seno** oscila con **ωd** y arranca desfasado **β**", { at: "seno", foco: ["g"] })],
  ],
  // Tiempo pico
  [
    [F("\\frac{dy}{dt}=0", { id: "tp", size: 72, foco: ["g"] })],
    [cambia("tp", "\\frac{dy}{dt}=\\frac{\\omega_n}{\\sqrt{1-\\zeta^2}}\\,e^{-\\sigma t}\\sin(\\omega_d t)", { at: "impulso", foco: ["g"] })],
    [cambia("tp", "\\underbrace{e^{-\\sigma t}}_{\\neq 0}\\;\\sin(\\omega_d t)=0", { at: "manda", foco: ["g"] })],
    [cambia("tp", "\\omega_d\\, t=\\pi", { at: "pi", foco: ["g"] })],
    [capa("g", "tp"), capa("g", "mp"), cambia("tp", "\\boxed{t_p=\\frac{\\pi}{\\omega_d}}\\quad\\text{(parte imaginaria)}", { at: "pico", foco: ["g"] })],
  ],
  // Sobreimpulso
  [
    [F("e^{-\\sigma t}\\Big|_{t=\\pi/\\omega_d}", { id: "mp", size: 66, foco: ["g"] })],
    [cambia("mp", "M_p=e^{-\\pi\\sigma/\\omega_d}", { at: "queda", foco: ["g"] })],
    [brilla("mp", { at: "cociente" }), T("Solo depende de **σ / ωd**, es decir, del **ángulo**", { id: "mpt", estilo: "ambar", at: "ángulo" })],
    [cambia("mp", "\\boxed{M_p=e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}}}", { at: "zeta" })],
  ],
  // Establecimiento y subida
  [
    [capa("g", "ts", { at: "envolvente" }), F("\\frac{e^{-\\sigma t_s}}{\\sqrt{1-\\zeta^2}}\\le 0.02", { id: "ts", size: 62, foco: ["g"] })],
    [cambia("ts", "\\sigma t_s=\\ln 50\\approx 3.9\\approx 4\\;\\Rightarrow\\; t_s\\approx\\frac{4}{\\sigma}", { at: "logaritmo", foco: ["g"] })],
    [T("**≈** aproximado · solo depende de la **parte real**", { id: "tst", estilo: "verde", at: "aproximado" })],
    [cambia("ts", "5\\,\\%:\\quad t_s\\approx\\frac{3}{\\sigma}", { at: "5", foco: ["g"] })],
    [capa("g", "tr", { at: "subida" }), F("t_r=\\frac{\\pi-\\beta}{\\omega_d}\\quad(0\\to100\\,\\%)", { at: "beta", foco: ["g"] })],
  ],
  // Cuatro valores para memorizar
  [
    [Tab([["ζ", "Mₚ"], [{ t: "0.5", capa: "r1" }, { t: "16 %", capa: "r1" }], [{ t: "0.6", capa: "r2" }, { t: "9.5 %", capa: "r2" }], [{ t: "0.7", capa: "r3" }, { t: "4.6 %", capa: "r3" }], [{ t: "0.8", capa: "r4" }, { t: "1.5 %", capa: "r4" }]], { id: "tab", cab: true, size: 56 })],
    [capa("tab", "r1", { at: "16" })],
    [capa("tab", "r2", { at: "9.5" })],
    [capa("tab", "r3", { at: "4.6" })],
    [capa("tab", "r4", { at: "1.5" }), brilla("tab")],
    [F("M_p\\;\\longrightarrow\\;\\zeta", { id: "desp", size: 70 })],
    [cambia("desp", "\\zeta=\\frac{-\\ln M_p}{\\sqrt{\\pi^2+\\ln^2 M_p}}", { at: "logaritmo" })],
    [F("M_p=0.10\\;\\Rightarrow\\;\\zeta=0.59", { estilo: "verde", at: "0.59" })],
  ],
  // Clímax
  [
    [T("El atajo que más puntos da", { estilo: "oscura", size: 62, centro: true })],
    [F("s=-\\sigma\\pm j\\omega_d\\;\\Rightarrow\\;M_p=e^{-\\pi\\,\\sigma/\\omega_d}", { estilo: "dorada", at: "sobreimpulso" })],
    [Fila([S({ x: [-5, 1], y: [-0.5, 5], h: 360, etiquetas: false, polos: [{ id: "a", re: -4, im: 4 }], lineas: [{ tipo: "rayo", re: -4, im: 4, color: "ambar" }] }), F("\\frac{4}{4}=1\\Rightarrow e^{-\\pi}=4.3\\,\\%", { size: 50 })], { at: "cuatro#2" })],
    [Fila([S({ x: [-5, 1], y: [-0.5, 5], h: 360, etiquetas: false, polos: [{ id: "b", re: -2, im: 4 }], lineas: [{ tipo: "rayo", re: -2, im: 4, color: "ambar" }] }), F("\\frac{2}{4}=\\frac12\\Rightarrow e^{-\\pi/2}=21\\,\\%", { size: 50 })], { at: "medio" })],
    [T("Directo del polo, **sin pasar por ζ**", { estilo: "verde", centro: true, size: 60 })],
  ],
  // Cierre
  [
    [I("pencil", "Deduce **tₚ, Mₚ, tₛ y tᵣ** tú solo, sin mirar")],
    [],
  ],
];
