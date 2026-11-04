import { T, F, G, S, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, resp } from "../produccion/motor/piezas.mjs";


export default [
  // Gancho
  [
    [Tab([["$e^{-at}$", "$\\dfrac{1}{s+a}$"], ["$t$", "$\\dfrac{1}{s^2}$"], ["$\\sin\\omega t$", "$\\dfrac{\\omega}{s^2+\\omega^2}$"], ["$\\cos\\omega t$", "$\\dfrac{s}{s^2+\\omega^2}$"]], { id: "tabla", size: 50 }), mal("tabla", { at: "nadie" })],
    [F("\\ddot y + 3\\dot y + 2y = u", { id: "ed", estilo: "roja" }), tacha("ed", { at: "ecuación" })],
    [T("**1 par** + **4 trucos** = toda la tabla", { estilo: "verde", size: 62, centro: true, at: "par" })],
  ],
  // Para qué sirve
  [
    [Fila([T("TIEMPO", { estilo: "oscura", size: 60, centro: true }), I("arrows-left-right", "", { estilo: "oscura", size: 60 }), T("DOMINIO s", { estilo: "oscura", size: 60, centro: true })])],
    [F("\\frac{d}{dt} \\;\\longrightarrow\\; \\times\\, s", { id: "der", at: "derivar" }), F("\\int dt \\;\\longrightarrow\\; \\div\\, s", { at: "integrar" })],
    [F("\\boxed{\\;\\dfrac{1}{s}\\;}\\quad =\\ \\text{integrador}", { estilo: "dorada" })],
    [F("(s^2+3s+2)\\,Y = U", { estilo: "verde", at: "álgebra" })],
  ],
  // El par madre
  [
    [F("e^{-at}\\;\\longleftrightarrow\\;\\dfrac{1}{s+a}", { id: "madre", estilo: "dorada", size: 84, at: "transforma" })],
    [F("\\int_0^{\\infty} e^{-at}e^{-st}\\,dt", { id: "int", size: 58 }), cambia("int", "\\int_0^{\\infty} e^{-at}e^{-st}\\,dt=\\left[\\dfrac{-e^{-(s+a)t}}{s+a}\\right]_0^{\\infty}=\\dfrac{1}{s+a}", { at: "comprobar" })],
    [S({ x: [-4, 2], y: [-1.5, 1.5], h: 330, polos: [{ id: "p", re: -2, im: 0, label: "−a" }] }, { at: "polo" })],
  ],
  // Trucos uno y dos
  [
    [F("a = 0", { id: "a0", size: 70 })],
    [F("e^{0\\cdot t}=1=u(t)\\;\\longleftrightarrow\\;\\dfrac{1}{s}", { estilo: "verde", at: "escalón" })],
    [F("t\\,f(t)\\;\\longleftrightarrow\\;-\\dfrac{dF}{ds}", { estilo: "dorada", at: "derivar" })],
    [F("t\\;\\longleftrightarrow\\;-\\dfrac{d}{ds}\\Big(\\dfrac{1}{s}\\Big)=\\dfrac{1}{s^2}", { at: "rampa" })],
    [F("t\\,e^{-at}\\;\\longleftrightarrow\\;\\dfrac{1}{(s+a)^2}", { id: "rep", at: "vuelve" })],
    [brilla("rep"), T("Polo **repetido** en $s=-a$", { centro: true })],
  ],
  // Truco tres: Euler
  [
    [F("\\sin\\omega t=\\dfrac{e^{j\\omega t}-e^{-j\\omega t}}{2j}", { at: "Euler" })],
    [G({ x: [0, 6.3], y: [-1.2, 1.2], h: 340, curvas: [{ f: (t) => Math.sin(2 * t), color: "violeta" }] })],
    [F("\\sin\\omega t\\;\\longleftrightarrow\\;\\dfrac{\\omega}{s^2+\\omega^2}", { id: "sen", at: "obtienes" })],
    [F("\\cos\\omega t\\;\\longleftrightarrow\\;\\dfrac{s}{s^2+\\omega^2}", { id: "cos" })],
    [G({ x: [0, 6.3], y: [-1.2, 1.2], h: 340, curvas: [{ f: (t) => Math.cos(2 * t), color: "azul" }, { f: (t) => Math.sin(2 * t), color: "violeta", dash: "10 10", dibuja: false }], puntos: [{ x: 0, y: 1, label: "cos 0 = 1", color: "azul" }, { x: 0, y: 0, label: "sin 0 = 0", color: "violeta", dy: 40 }] }, { at: "Evalúa" })],
    [ok("cos", { at: "arriba" })],
  ],
  // Truco cuatro
  [
    [F("e^{-at}f(t)\\;\\longleftrightarrow\\;F(s+a)", { estilo: "dorada", at: "cambiar" })],
    [F("e^{-at}\\sin\\omega t\\;\\longleftrightarrow\\;\\dfrac{\\omega}{(s+a)^2+\\omega^2}", { at: "amortiguado" }), G({ x: [0, 6], y: [-1.1, 1.1], h: 340, curvas: [{ f: (t) => Math.exp(-0.5 * t), color: "gris", dash: "12 10", dibuja: false }, { f: (t) => -Math.exp(-0.5 * t), color: "gris", dash: "12 10", dibuja: false }, { f: (t) => Math.exp(-0.5 * t) * Math.sin(4 * t), color: "naranja" }] }, { at: "omega" })],
    [T("= **segundo orden subamortiguado** (vídeo 04)", { centro: true })],
  ],
  // Las reglas
  [
    [T("Las 4 reglas de cada problema", { estilo: "oscura", size: 60, centro: true })],
    [F("\\dot f\\;\\longleftrightarrow\\;sF(s)-f(0)", { id: "dr" }), cambia("dr", "\\dot f\\;\\longleftrightarrow\\;sF(s)\\quad(\\text{CI}=0)", { at: "condiciones" })],
    [F("\\int_0^t f\\,d\\tau\\;\\longleftrightarrow\\;\\dfrac{F(s)}{s}")],
    [F("f(\\infty)=\\lim_{s\\to 0} sF(s)", { estilo: "verde" })],
    [F("f(0^+)=\\lim_{s\\to \\infty} sF(s)", { estilo: "verde" })],
  ],
  // Clímax
  [
    [T("La idea que conecta **todo** el curso", { size: 62, centro: true })],
    [S({ x: [-3.5, 1.5], y: [-3.6, 3.6], h: 560, polos: [{ id: "q", re: -2, im: 0, label: "polo", ldy: -28 }, { id: "c", re: -0.6, im: 3, capa: "comp", color: "naranja" }] }, { id: "pl" }),
     G({ x: [0, 8], y: [-1.3, 1.3], h: 420, xlabel: "t", curvas: [
       { f: resp.polo(-0.8, 0), color: "verde", capa: "dec" }, { f: resp.polo(0.3, 0), color: "rojo", capa: "exp" },
       { f: resp.polo(-0.35, 3), color: "naranja", capa: "osc" }, { f: resp.polo(0, 3), color: "ambar", capa: "sost" }] }, { id: "sg", at: "término" })],
    [mueve("pl", "q", [-0.8, 0]), capa("sg", "dec", { at: "apaga" })],
    [mueve("pl", "q", [0.8, 0]), oculta("sg", "dec"), capa("sg", "exp", { at: "explota" })],
    [oculta("pl", "polo-q"), capa("pl", "comp"), oculta("sg", "exp"), capa("sg", "osc", { at: "oscila" })],
    [mueve("pl", "c", [0, 3]), oculta("sg", "osc"), capa("sg", "sost", { at: "oscila" })],
    [T("**Estable** = todos los polos a la izquierda → Routh (vídeos 10 y 11)", { estilo: "verde", at: "estabilidad" })],
  ],
  // Cierre
  [
    [I("timer", "Escribe la tabla completa en **1 minuto**", { at: "Repite" })],
    [],
  ],
];
