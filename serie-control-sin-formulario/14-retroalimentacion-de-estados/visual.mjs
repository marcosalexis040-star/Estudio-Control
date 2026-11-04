import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";
import { realimEstados } from "../produccion/motor/diagramas-lista.mjs";

const M = (a, b, c, d) => `\\begin{bmatrix}${a}&${b}\\\\${c}&${d}\\end{bmatrix}`;
// ExR 4 con K = [8 4]: T(s) = 1/(s²+4s+8) → ωn = √8, ζ = 4/(2√8)
const wn = Math.sqrt(8), z = 4 / (2 * wn);

export default [
  // Gancho
  [
    [S({ x: [-4, 1], y: [-3, 3], h: 440, polos: [{ id: "p", re: -2, im: 2, label: "−2 ± j2" }] }), F("K=\\;?", { estilo: "roja", size: 80, centro: true })],
    [Fila([T("TENGO", { estilo: "color", size: 58, centro: true }), T("=", { estilo: "oscura", size: 76, centro: true }), T("QUIERO", { estilo: "color", size: 58, centro: true })], { at: "comparar" })],
    [Fila([T("ExR 4", { estilo: "color", size: 58, centro: true }), T("ExR 5", { estilo: "color", size: 58, centro: true })], { at: "dos" })],
  ],
  // La ley de control
  [
    [D(realimEstados(false), { id: "re" }), T("La entrada usa **todos** los estados", { id: "lt", centro: true })],
    [F("u=-Kx+k_3\\,v_{ref}", { id: "u", estilo: "dorada", size: 72, at: "menos", foco: ["re"] })],
    [F("K=\\begin{bmatrix}k_1&k_2\\end{bmatrix},\\quad Kx=k_1x_1+k_2x_2", { id: "K", size: 54, at: "renglón", foco: ["u"] })],
    [F("\\dot x=(A-BK)\\,x+Bk_3v_{ref}", { id: "abk", estilo: "verde", size: 62, at: "sustituir", foco: ["K"] })],
    [F("\\det(sI-A+BK)=0", { estilo: "dorada", size: 68, at: "determinante", foco: ["abk"] })],
  ],
  // Examen rápido 4
  [
    [F("A=" + M("0", "1", "0", "0") + "\\quad\\text{(doble integrador)}", { id: "A4", size: 58, at: "cero" })],
    [F("BK=\\begin{bmatrix}0\\\\1\\end{bmatrix}\\begin{bmatrix}k_1&k_2\\end{bmatrix}=" + M("0", "0", "k_1", "k_2"), { id: "bk", size: 52, at: "llena", foco: ["A4"] })],
    [F("A-BK=" + M("0", "1", "-k_1", "-k_2"), { id: "abk4", size: 58, at: "queda", foco: ["bk"] })],
    [F("\\text{TENGO: } s^2+k_2s+k_1", { id: "t4", estilo: "dorada", size: 62, at: "polinomio", foco: ["abk4"] })],
    [F("\\text{QUIERO: }(s+2)^2+4=s^2+4s+8", { id: "q4", estilo: "verde", size: 58, at: "deseado", foco: ["t4"] })],
    [F("k_1=8,\\qquad k_2=4", { id: "s4", size: 76, at: "ocho", foco: ["t4", "q4"] }), ok("s4", { at: "cuatro" })],
  ],
  // Colocar polos no basta
  [
    [F("y=x_1:\\quad T(s)=\\frac{1}{s^2+4s+8}", { id: "T4", size: 62, at: "uno" })],
    [G({ x: [0, 5], y: [0, 1.2], h: 460, xlabel: "t", curvas: [{ f: (t) => 1, color: "gris", dash: "12 10", dibuja: false }, { f: resp.esc2(z, wn, 1 / 8), color: "rojo" }, { f: resp.esc2(z, wn, 1), color: "verde", capa: "k3" }], hl: [{ y: 0.125, label: "0.125", color: "rojo" }] }, { id: "g4", at: "octavo" }), F("e_{ss}=1-\\tfrac18=\\tfrac78", { id: "e4", estilo: "roja", size: 60, at: "siete", foco: ["g4"] })],
    [I("warning", "Polos bien colocados ≠ **llega a donde quieres**", { estilo: "ambar", foco: ["g4"] })],
  ],
  // Examen rápido 5
  [
    [F("A=" + M("0", "1", "0", "-b") + ",\\quad B=\\begin{bmatrix}0\\\\1\\end{bmatrix},\\quad C=\\begin{bmatrix}1&0\\end{bmatrix}", { id: "A5", size: 50, at: "cero" })],
    [F("G(s)=C(sI-A)^{-1}B=\\frac{1}{s\\,(s+b)}", { id: "g5", estilo: "verde", size: 58, at: "función", foco: ["A5"] })],
    [F("u=-k_1x_1-k_2x_2+k_3\\,v_{ref}", { id: "u5", size: 60, at: "u", foco: ["g5"] })],
    [F("\\text{TENGO: }s^2+(b+k_2)\\,s+k_1", { id: "t5", estilo: "dorada", size: 58, at: "polinomio", foco: ["u5"] })],
    [F("\\text{QUIERO: }(s+2b)^2", { id: "q5", estilo: "verde", size: 62, at: "deseado", foco: ["t5"] })],
    [cambia("q5", "\\text{QUIERO: }s^2+4b\\,s+4b^2", { at: "cuatro", foco: ["t5"] })],
    [F("k_1=4b^2,\\qquad k_2=3b", { id: "s5", size: 72, at: "Igualando", foco: ["t5", "q5"] }), ok("s5", { at: "tres" })],
    [F("T(s)=\\frac{k_3}{(s+2b)^2}", { id: "T5", estilo: "dorada", size: 68, at: "k3", foco: ["s5"] })],
  ],
  // Clímax · la ganancia de referencia
  [
    [T("El punto del examen", { estilo: "oscura", size: 66, centro: true })],
    [F("e_{ss}=0\\;\\Longleftrightarrow\\;T(0)=1", { id: "t0", estilo: "dorada", size: 70, at: "ganancia" })],
    [F("\\frac{k_3}{4b^2}=1\\;\\Rightarrow\\;k_3=4b^2=k_1", { id: "k3", estilo: "verde", size: 66, at: "K3", foco: ["t0"] }), ok("k3", { at: "k1" })],
    [capa("g4", "k3", { at: "ocho" })],
    [T("Salida en $x_1$, entrada en la última fila → **k₃ = término independiente** del deseado", { id: "regla", estilo: "verde", centro: true, at: "independiente", foco: ["k3"] })],
  ],
  // El diagrama que piden
  [
    [D(realimEstados(true), { id: "d5" }), T("**v_ref → k₃ → sumador**, y le restas k₁x₁ y k₂x₂", { id: "dt", centro: true, at: "k3", foco: ["d5"] })],
    [capa("d5", "k", { at: "regresan" }), cambia("dt", "u entra a la planta; los estados **regresan** por sus ganancias", { at: "planta", foco: ["d5"] })],
  ],
  // Cierre
  [
    [F("(s+3)^2=s^2+6s+9\\;\\Rightarrow\\;k_1=9,\\ k_2=6", { size: 56, estilo: "dorada" })],
    [],
  ],
];
