import { T, F, G, S, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";

const yt = (t) => 0.5 - Math.exp(-t) + 0.5 * Math.exp(-2 * t);

export default [
  // Gancho
  [
    [F("\\ddot y+3\\dot y+2y=u\\qquad y(t)=\\;?", { id: "q", size: 66 })],
    [I("timer", "**−20 min** si te pones a integrar", { estilo: "roja", at: "integrar" })],
    [Tab([["1", "ED → G(s)"], ["2", "entrada U(s)"], ["3", "fracciones parciales"], ["4", "regresar al tiempo"], ["5", "comprobar"]], { id: "pasos", size: 48, at: "cinco" })],
  ],
  // Paso 1
  [
    [F("\\ddot y+3\\dot y+2y=u", { id: "ed", size: 70 })],
    [cambia("ed", "s^2Y+3sY+2Y=U", { at: "ese" })],
    [cambia("ed", "(s^2+3s+2)\\,Y=U", { at: "cuadrado" })],
    [F("G(s)=\\frac{Y}{U}=\\frac{1}{s^2+3s+2}", { id: "g", estilo: "dorada", at: "salida" })],
    [F("s^2+3s+2=(s+1)(s+2)", { at: "polinomio" }), S({ x: [-3, 1], y: [-1, 1], h: 300, polos: [{ id: "a", re: -1, im: 0, label: "−1" }, { id: "b", re: -2, im: 0, label: "−2" }] }, { at: "polos" })],
  ],
  // Polos, ceros y cancelación
  [
    [T("**Ceros** = raíces del numerador · **Polos** = raíces del denominador", { centro: true })],
    [I("warning", "Antes de contar polos, **cancela** factores comunes", { estilo: "ambar" })],
    [F("\\frac{2(s+1)(s+3)}{(s-1)(s+1)(s+2)}", { id: "c15" }), cambia("c15", "\\frac{2\\cancel{(s+1)}(s+3)}{(s-1)\\cancel{(s+1)}(s+2)}=\\frac{2(s+3)}{(s-1)(s+2)}", { at: "cancela" })],
    [S({ x: [-4, 2], y: [-1, 1], h: 300, polos: [{ id: "u", re: 1, im: 0, label: "+1" }, { id: "v", re: -2, im: 0, label: "−2" }], ceros: [{ re: -3 }], textos: [{ re: -3, im: 0.55, t: "cero −3", color: "azul", size: 30 }] })],
    [T("**Propia**: grado de arriba ≤ grado de abajo", { estilo: "verde", centro: true })],
  ],
  // Pasos 2 y 3
  [
    [F("U(s)=\\frac{1}{s}", { size: 66 })],
    [F("Y(s)=\\frac{1}{s(s+1)(s+2)}", { id: "y", estilo: "dorada" })],
    [F("Y=\\frac{A}{s}+\\frac{B}{s+1}+\\frac{C}{s+2}", { id: "fp" })],
    [I("hand-palm", "**Tapa** el factor del polo y evalúa lo demás en ese polo")],
    [F("A=\\left.\\frac{1}{(s+1)(s+2)}\\right|_{s=0}=\\frac{1}{2}", { estilo: "verde", at: "medio" })],
    [F("B=\\left.\\frac{1}{s(s+2)}\\right|_{s=-1}=\\frac{1}{(-1)(1)}=-1", { estilo: "verde", at: "menos#2" })],
    [F("C=\\left.\\frac{1}{s(s+1)}\\right|_{s=-2}=\\frac{1}{(-2)(-1)}=\\frac{1}{2}", { estilo: "verde", at: "medio" })],
    [Fila([F("\\frac{1}{(s+a)^2}\\to\\frac{A}{s+a}+\\frac{B}{(s+a)^2}", { size: 44 }), F("s^2+bs+c\\to\\left(s+\\tfrac b2\\right)^2+\\omega^2", { size: 44, at: "complejos" })])],
  ],
  // Pasos 4 y 5
  [
    [Fila([F("\\frac{1}{s}\\to 1", { size: 60 }), F("\\frac{1}{s+a}\\to e^{-at}", { size: 60 })])],
    [F("y(t)=\\tfrac12-e^{-t}+\\tfrac12 e^{-2t}", { id: "yt", estilo: "dorada", at: "medio" }), G({ x: [0, 6], y: [0, 0.6], h: 400, xlabel: "t", curvas: [{ f: yt, color: "azul" }], hl: [{ y: 0.5, label: "0.5", color: "verde" }] }, { id: "gy" })],
    [F("y(0)=\\tfrac12-1+\\tfrac12=0", { estilo: "verde" }), ok("yt", { at: "cero#2" })],
  ],
  // Valor final y ganancia de CD
  [
    [F("y(\\infty)=\\lim_{s\\to0} s\\,Y(s)", { id: "vf" })],
    [cambia("vf", "y(\\infty)=\\lim_{s\\to0} s\\cdot\\frac{1}{s(s+1)(s+2)}=\\frac{1}{2}", { at: "medio" })],
    [F("y_{\\text{final}}=A\\cdot G(0)", { estilo: "dorada" })],
    [F("G(0)=5,\\;A=2\\;\\Rightarrow\\;y_{\\text{final}}=10", { id: "e10", at: "cinco" })],
    [I("warning", "Solo vale si el sistema es **estable**", { estilo: "roja" })],
    [F("F=\\frac{1}{s(s-1)}:\\;\\lim_{s\\to0}sF=-1", { id: "trampa" }), G({ x: [0, 4], y: [-1.2, 8], h: 360, xlabel: "t", curvas: [{ f: (t) => -1 + Math.exp(t), color: "rojo" }], hl: [{ y: -1, label: "−1 (falso)", color: "rojo" }] }, { at: "explota" }), tacha("trampa", { at: "explota" })],
  ],
  // Clímax
  [
    [F("y(t)=\\underbrace{\\tfrac12}_{\\text{entrada}}\\;\\underbrace{-\\,e^{-t}+\\tfrac12e^{-2t}}_{\\text{polos del sistema}}", { id: "lee", size: 60 })],
    [T("**½** ← polo de la entrada en $s=0$ → **régimen permanente**", { estilo: "verde", at: "medio" })],
    [T("**e⁻ᵗ, e⁻²ᵗ** ← polos −1 y −2 → **transitorio** que se apaga", { at: "exponenciales" })],
    [T("Entrada → permanente · Polos del sistema → transitorio", { estilo: "dorada", size: 58, centro: true })],
    [brilla("lee")],
  ],
  // Cierre
  [
    [I("hand-palm", "Practica **tapar** con tres polos distintos")],
    [],
  ],
];
