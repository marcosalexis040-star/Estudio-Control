import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";

const c = (t, capa, marca, mcapa) => ({ t, capa, marca, mcapa });
// Recta numérica de k
const recta = (a, b, extra = {}) => G({ x: [-3, 11], y: [-1, 1], h: 260, rejilla: false, xlabel: "k", curvas: [
  { pts: [[-3, 0], [11, 0]], color: "gris", ancho: 4, dibuja: false }, { pts: [[a, 0], [b, 0]], color: "verde", ancho: 18 }],
  puntos: [{ x: a, y: 0, label: String(a).replace("-", "−"), color: "verde", dy: -26, anchor: "middle", dx: 0 }, { x: b, y: 0, label: String(b), color: "verde", dy: -26, anchor: "middle", dx: 0 }, ...(extra.puntos || [])] }, extra.o || {});

export default [
  // Gancho
  [
    [Tab([["$s^5$", "1", "2", "6"], ["$s^4$", "2", "4", "10"], ["$s^3$", c("0", undefined, "rojo", "z"), "1", ""]], { id: "t0", size: 56 }), capa("t0", "z", { at: "cero" })],
    [F("\\div\\,0\\;?", { estilo: "roja", size: 80, at: "dividir" })],
    [Fila([T("Caso 1: **ε**", { estilo: "color", size: 56, centro: true }), T("Caso 2: **auxiliar**", { estilo: "color", size: 56, centro: true })], { at: "dos" })],
  ],
  // Caso 1 · épsilon
  [
    [T("**Caso 1**: cero solo en la 1.ª columna; el resto de la fila **no** es cero", { centro: true })],
    [F("0\\;\\longrightarrow\\;\\varepsilon>0\\ \\text{(muy pequeño)}", { estilo: "dorada", size: 62, at: "épsilon" })],
    [F("\\varepsilon\\to0^+:\\ \\text{cuenta los cambios}", { size: 56, at: "tienda" })],
    [Tab([["$s^5$", "1", "2", "6"], ["$s^4$", "2", "4", "10"], ["$s^3$", c("$\\varepsilon$", undefined, "ambar", "e"), "1", ""], ["$s^2$", c("$4-\\tfrac{2}{\\varepsilon}$", "s2", "rojo", "s2"), "10", ""]], { id: "te", size: 52, at: "quinta" }), capa("te", "e", { at: "cero" })],
    [capa("te", "s2", { at: "cuatro" }), F("4-\\frac{2}{\\varepsilon}\\to-\\infty", { id: "neg", estilo: "roja", size: 60, at: "negativa", foco: ["te"] })],
    [T("+ → − → + : **2 cambios** → 2 raíces a la derecha", { estilo: "roja", centro: true, at: "Dos", foco: ["te"] })],
  ],
  // Caso 2 · renglón de ceros
  [
    [T("**Caso 2**: **toda** una fila se hace cero", { estilo: "roja", centro: true })],
    [S({ x: [-3, 3], y: [-3, 3], h: 420, polos: [{ id: "a", re: 0, im: 2, color: "ambar" }, { id: "b", re: -2, im: 0, color: "gris" }] }), T("Raíces **simétricas** respecto al origen", { centro: true, at: "simétricas" })],
    [F("P(s)\\ \\text{(fila de arriba)}\\;\\xrightarrow{d/ds}\\;P'(s)", { estilo: "dorada", size: 58, at: "auxiliar" })],
    [F("P(s)=0\\;\\Rightarrow\\;\\text{raíces simétricas}", { size: 56, at: "igualar" })],
    [F("s^3+2s^2+4s+8", { id: "p3", size: 66 }), Tab([["$s^3$", "1", "4"], ["$s^2$", "2", "8"], ["$s^1$", c("0", undefined, "rojo", "f0"), c("0", undefined, "rojo", "f0")]], { id: "t2", size: 54 })],
    [capa("t2", "f0", { at: "cero" }), F("P(s)=2s^2+8\\;\\Rightarrow\\;P'(s)=4s", { id: "aux", estilo: "verde", size: 58, at: "auxiliar", foco: ["t2"] })],
    [cambia("aux", "2s^2+8=0\\;\\Rightarrow\\;s=\\pm 2j", { at: "jota", foco: ["t2"] }), T("Oscila para siempre: **críticamente estable**", { estilo: "ambar", centro: true, at: "críticamente" })],
  ],
  // Rango de k
  [
    [T("¿Para qué **k** es estable?", { estilo: "oscura", size: 72, centro: true })],
    [I("table", "Arma la tabla con **k como letra**")],
    [T("Cada elemento de la 1.ª columna **> 0**", { estilo: "verde", centro: true, at: "positivo" })],
    [T("Quédate con la **intersección**", { centro: true, at: "intersección" })],
    [F("s^3+3s^2+3s+(1+k)", { id: "pk", estilo: "dorada", size: 66 })],
    [Tab([["$s^3$", "1", "3"], ["$s^2$", "3", "$1+k$"], ["$s^1$", c("$\\tfrac{8-k}{3}$", "c1", "verde", "c1"), ""], ["$s^0$", c("$1+k$", "c0", "verde", "c0"), ""]], { id: "tk", size: 54 }), capa("tk", "c1", { at: "ocho" }), capa("tk", "c0", { at: "última" })],
    [recta(-1, 8, { o: { id: "rk", at: "Estable" } }), F("-1<k<8", { id: "rng", estilo: "verde", size: 72, at: "ocho", foco: ["rk"] })],
  ],
  // El valor crítico
  [
    [F("k=8:\\quad s^1=\\frac{8-8}{3}=0", { id: "k8", size: 62, at: "ocho" })],
    [F("P(s)=3s^2+(1+k)=3s^2+9", { id: "p8", estilo: "dorada", size: 60, at: "auxiliar" })],
    [cambia("p8", "3s^2+9=0\\;\\Rightarrow\\;s=\\pm j\\sqrt3=\\pm j1.73", { at: "tres" }), G({ x: [0, 12], y: [-1.3, 1.3], h: 320, xlabel: "t", curvas: [{ f: (t) => Math.sin(1.732 * t), color: "ambar" }] }, { at: "raíz" })],
    [I("key", "Así sacan **Ziegler y Nichols** la ganancia crítica → vídeo 12", { at: "Ziegler" })],
  ],
  // El problema del integrador
  [
    [F("D(s)=s^3+(a+k+1)s^2+(ak+2k+a+1)s+(a+1)k", { id: "dI", size: 46, estilo: "dorada" })],
    [F("s^0:\\ (a+1)\\,k>0\\;\\Rightarrow\\;k>0", { id: "i0", size: 60, at: "independiente", foco: ["dI"] })],
    [F("s^1:\\ \\frac{(a+1)^2+(a+1)(a+2)k+(a+2)k^2}{a+k+1}>0", { id: "i1", size: 50, at: "sumandos", foco: ["dI"] })],
    [T("Estable para **toda k > 0**", { id: "conc", estilo: "verde", size: 64, centro: true, at: "Conclusión", foco: ["i1"] }), ok("conc", { at: "cero" })],
  ],
  // Clímax · la trampa del ejemplo 42
  [
    [T("La trampa del **ejemplo 42**", { estilo: "oscura", size: 64, centro: true })],
    [F("e_{ss}=\\frac{1}{1+k}=0.1\\;\\Rightarrow\\;k=9", { id: "k9", size: 60, at: "nueve" }), recta(-1, 8, { puntos: [{ x: 9, y: 0, label: "9", color: "rojo", dy: 50, anchor: "middle", dx: 0 }], o: { at: "Routh" } }), tacha("k9", { at: "ocho" })],
    [I("shield-check", "**Routh primero**, error después", { estilo: "verde", at: "revisa" })],
  ],
  // Cierre
  [
    [T("Practica el rango de k con el polinomio del integrador", { centro: true })],
    [],
  ],
];
