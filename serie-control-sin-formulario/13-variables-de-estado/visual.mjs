import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";
import { integradores, paralelo3, opamp } from "../produccion/motor/diagramas-lista.mjs";

const M = (a, b, c, d) => `\\begin{bmatrix}${a}&${b}\\\\${c}&${d}\\end{bmatrix}`;

export default [
  // Gancho
  [
    [F("G(s)=C\\,(sI-A)^{-1}B", { id: "g0", estilo: "dorada", size: 80 })],
    [F(M("a", "b", "c", "d") + "^{-1}=\\;?", { id: "q", estilo: "roja", size: 72, at: "invertir" })],
    [I("timer", "Truco de **3 segundos**", { estilo: "verde", at: "truco" })],
  ],
  // El modelo
  [
    [T("Variables de estado = **dos ecuaciones**", { centro: true })],
    [F("\\dot x=Ax+Bu\\qquad y=Cx", { id: "ss", estilo: "dorada", size: 80, at: "derivada" })],
    [Fila([T("**A**: cómo se mueven solos", { size: 46, centro: true }), T("**B**: por dónde entra u", { size: 46, centro: true }), T("**C**: qué mides", { size: 46, centro: true })])],
  ],
  // De la ecuación a los estados
  [
    [F("x_1=y,\\qquad x_2=\\dot y", { id: "xs", size: 66, at: "x1" })],
    [F("\\ddot y+3\\dot y+2y=3u", { id: "ed", estilo: "dorada", size: 66 })],
    [F("\\dot x_1=x_2", { id: "e1", size: 62, at: "x2" })],
    [cambia("e1", "\\dot x_1=x_2,\\qquad \\dot x_2=-2x_1-3x_2+3u", { at: "menos" })],
    [F("A=" + M("0", "1", "-2", "-3"), { id: "A", size: 62, at: "cero", foco: ["e1"] })],
    [F("B=\\begin{bmatrix}0\\\\3\\end{bmatrix},\\qquad C=\\begin{bmatrix}1&0\\end{bmatrix}", { id: "BC", size: 58, at: "B", foco: ["A"] })],
    [brilla("A", { at: "última" }), T("Última fila = coeficientes con signo cambiado: **canónica controlable**", { estilo: "verde", centro: true, at: "canónica", foco: ["A"] })],
    [D(integradores(), { id: "di", at: "integradores" })],
  ],
  // El truco de la inversa
  [
    [F("G=C\\,(sI-A)^{-1}B", { size: 66 })],
    [F(M("a", "b", "c", "d") + "^{-1}", { id: "inv", estilo: "dorada", size: 66 })],
    [cambia("inv", M("a", "b", "c", "d") + "^{-1}=\\frac{1}{ad-bc}" + M("d", "-b", "-c", "a"), { at: "Intercambia" })],
    [F("sI-A=" + M("s", "-1", "2", "s+3"), { id: "sia", size: 62, at: "Ese", foco: ["inv"] })],
    [F("\\det=s(s+3)+2=s^2+3s+2", { id: "det", estilo: "verde", size: 58, at: "determinante", foco: ["sia"] })],
    [F("G=\\begin{bmatrix}1&0\\end{bmatrix}\\frac{1}{s^2+3s+2}" + M("s+3", "1", "-2", "s") + "\\begin{bmatrix}0\\\\3\\end{bmatrix}=\\frac{3}{s^2+3s+2}", { id: "gf", size: 44, at: "Multiplica", foco: ["det"] }), ok("gf", { at: "Recuperaste" })],
  ],
  // El determinante son los polos
  [
    [F("\\det(sI-A)", { id: "dd", estilo: "dorada", size: 80 })],
    [cambia("dd", "\\det(sI-A)=0\\quad\\text{ecuación característica}", { at: "característica" })],
    [S({ x: [-3, 1], y: [-1, 1], h: 300, polos: [{ id: "a", re: -1, im: 0, label: "−1" }, { id: "b", re: -2, im: 0, label: "−2" }] }, { at: "polos" }), T("Valores propios de **A** = **polos**", { estilo: "verde", centro: true, at: "propios" })],
    [T("Otros estados, **mismos polos**", { centro: true, at: "Cambiar" })],
  ],
  // Ejercicio de prueba · en paralelo
  [
    [D(paralelo3(), { id: "p3" })],
    [F("\\frac{Y}{U}=b+\\frac{c_1}{s+p_1}+\\frac{c_2}{s+p_2}+\\frac{c_3}{s+p_3}", { id: "gp", size: 52, at: "función", foco: ["p3"] })],
    [F("\\dot x_i=-p_i\\,x_i+u", { id: "xi", estilo: "verde", size: 64, at: "derivada", foco: ["p3"] })],
    [F("A=\\begin{bmatrix}-p_1&0&0\\\\0&-p_2&0\\\\0&0&-p_3\\end{bmatrix},\\ B=\\begin{bmatrix}1\\\\1\\\\1\\end{bmatrix},\\ C=\\begin{bmatrix}c_1&c_2&c_3\\end{bmatrix},\\ D=b", { id: "Ad", size: 40, at: "diagonal", foco: ["xi"] })],
    [F("(s+p_1)(s+p_2)(s+p_3)=0", { estilo: "dorada", size: 60, at: "característica", foco: ["Ad"] })],
  ],
  // En hardware
  [
    [D(opamp(), { id: "oa" })],
    [F("\\frac{V_o}{V_i}=-\\frac{1}{RC\\,s}", { id: "oaf", estilo: "dorada", size: 72, at: "menos", foco: ["oa"] }), T("El signo menos → un **inversor** (R₂ = R₁)", { centro: true, at: "inversor", foco: ["oaf"] })],
  ],
  // Clímax
  [
    [Tab([["estados", "= salidas de los integradores"], ["**A**", "= el diagrama"], ["**det(sI − A)**", "= los polos"]], { id: "res", size: 50, at: "estados" }), brilla("res", { at: "determinante" })],
  ],
  // Cierre
  [
    [F(M("a", "b", "c", "d") + "^{-1}=\\frac{1}{ad-bc}" + M("d", "-b", "-c", "a"), { size: 56, estilo: "dorada" })],
    [],
  ],
];
