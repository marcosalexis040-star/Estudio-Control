import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";
import { int26 } from "../produccion/motor/diagramas-lista.mjs";

const si = (c) => ({ t: "✓", capa: c, marca: "verde", mcapa: c });
const no = (c) => ({ t: "✗", capa: c });

export default [
  // Gancho
  [
    [D(int26(), { id: "d0" }), T("Integrador 1 · Mason · **30 pts**", { estilo: "roja", centro: true, size: 60 })],
    [capa("d0", "L1", { at: "lazos" }), capa("d0", "L2", { at: "tocan" }), I("warning", "El error típico: **lazos que se tocan**", { estilo: "ambar", at: "tocan" })],
    [T("Lo resolvemos **completo**", { estilo: "verde", centro: true })],
  ],
  // La fórmula
  [
    [F("T=\\frac{\\sum_k P_k\\,\\Delta_k}{\\Delta}", { estilo: "dorada", size: 90, at: "suma" })],
    [F("\\Delta=1-\\sum L_i+\\sum L_iL_j-\\sum L_iL_jL_k+\\cdots", { size: 54, at: "Delta" })],
    [F("\\Delta_k=\\Delta\\ \\text{sin los lazos que tocan } P_k", { size: 52, at: "cofactor" })],
    [I("graph", "**Tocarse** = compartir un nodo o un bloque", { estilo: "ambar" })],
  ],
  // Datos y trayectos
  [
    [D(int26(), { id: "d1" }), F("G_1=G_3=G_4=1,\\quad G_2=\\frac{k}{s},\\quad G_5=\\frac1s", { id: "dat", size: 50, foco: ["d1"] })],
    [cambia("dat", "H_1=H_3=1,\\qquad H_2=\\frac{1}{s+a}", { at: "H2", foco: ["d1"] })],
    [capa("d1", "T1", { at: "arriba" }), cambia("dat", "P_1=G_1G_2G_3G_4=\\frac{k}{s}", { at: "k", foco: ["d1"] })],
    [capa("d1", "T2", { at: "abajo" }), cambia("dat", "P_1=\\frac{k}{s},\\qquad P_2=G_1G_5G_4=\\frac{1}{s}", { at: "uno", foco: ["d1"] })],
  ],
  // Lazos
  [
    [D(int26(), { id: "d2" }), T("Cada lazo lleva su **signo menos**", { id: "lt", centro: true })],
    [capa("d2", "L1", { at: "L1" }), cambia("lt", "**L₁** = −H₁G₂ = **−k/s**", { at: "menos", foco: ["d2"] })],
    [capa("d2", "L2", { at: "L2" }), cambia("lt", "**L₂** = −H₂G₂G₃G₄ = **−k / s(s+a)**", { at: "menos", foco: ["d2"] })],
    [capa("d2", "L3", { at: "L3" }), cambia("lt", "**L₃** = −H₂G₅G₄ = **−1 / s(s+a)**", { at: "menos", foco: ["d2"] })],
    [capa("d2", "L4", { at: "L4" }), cambia("lt", "**L₄** = −H₃G₅ = **−1/s**", { at: "menos", foco: ["d2"] })],
  ],
  // Lazos que no se tocan
  [
    [Tab([["", "L₂", "L₃", "L₄"], ["L₁", no("x12"), no("x13"), si("x14")], ["L₂", "", no("x23"), si("x24")], ["L₃", "", "", no("x34")]], { id: "m", cab: true, size: 54 })],
    [capa("m", "x14", { at: "L1" })],
    [capa("m", "x24", { at: "L2" })],
    [capa("m", "x12"), capa("m", "x13"), capa("m", "x23"), capa("m", "x34")],
    [T("Tríos que no se tocan: **0**", { centro: true })],
    [F("\\Delta=1-(L_1+L_2+L_3+L_4)+L_1L_4+L_2L_4", { estilo: "dorada", size: 52, at: "Delta" })],
  ],
  // Cofactores y resultado
  [
    [F("\\Delta_1=1-L_4=1+\\frac1s", { id: "c1", size: 62, at: "cofactor" })],
    [F("\\Delta_2=1", { size: 62, at: "uno" })],
    [F("\\times\\; s^2(s+a)", { id: "mul", size: 62, at: "Multiplica" })],
    [F("N(s)=(ks+k+s)(s+a)", { id: "num", estilo: "verde", at: "numerador" })],
    [F("D(s)=s^3+(a+k+1)s^2+(ak+2k+a+1)s+(a+1)k", { id: "den", estilo: "dorada", size: 46, at: "denominador" })],
  ],
  // Clímax
  [
    [T("Ese **D(s)** va a Routh: **verifícalo**", { estilo: "oscura", size: 62, centro: true })],
    [D(int26(), { id: "d3" }), T("Truco: haz **k = 0**", { id: "k0", estilo: "ambar", centro: true, at: "cero" })],
    [capa("d3", "T2", { at: "abajo" }), F("k=0:\\;\\frac{s+a}{s^2+(a+1)s+(a+1)}", { id: "a0", at: "mano", foco: ["d3"] })],
    [ok("a0", { at: "mismo#2" }), F("D(s)\\big|_{k=0}=s\\,\\big(s^2+(a+1)s+(a+1)\\big)", { size: 50, estilo: "verde", foco: ["a0"] })],
    [T("✗ multiplicar lazos que **sí se tocan**", { estilo: "roja", centro: true, size: 58 })],
  ],
  // Cierre
  [
    [I("graph", "Colorea cada lazo y busca los pares **sin nodos en común**")],
    [],
  ],
];
