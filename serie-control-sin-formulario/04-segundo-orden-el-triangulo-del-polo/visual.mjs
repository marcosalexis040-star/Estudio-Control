import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";

const casos = G({ x: [0, 8], y: [-0.1, 2.1], h: 480, xlabel: "t", curvas: [
  { f: resp.esc2(0.0001, 2), color: "ambar", capa: "z0" }, { f: resp.esc2(0.4, 2), color: "naranja", capa: "z04" },
  { f: resp.esc2(1, 2), color: "verde", capa: "z1" }, { f: resp.esc2(1.25, 2), color: "azul", capa: "z2" },
  { f: (t) => 1 - Math.exp(0.4 * t) * (Math.cos(1.96 * t) - 0.204 * Math.sin(1.96 * t)), color: "rojo", capa: "zn" }], hl: [{ y: 1, color: "gris" }] }, { id: "rc" });

export default [
  // Gancho
  [
    [S({ x: [-4, 1], y: [-4, 4], h: 560, polos: [{ id: "p", re: -2, im: 3 }] }, { id: "pq" }), T("¿Oscila?", { estilo: "oscura", size: 72, centro: true })],
    [I("x-circle", "Simular **no** es una opción en el examen", { estilo: "roja" })],
    [T("Los polos te dicen **todo**: léelos como un **triángulo**", { estilo: "verde", centro: true, at: "triángulo" })],
  ],
  // Forma estándar
  [
    [F("G(s)=\\frac{\\omega_n^2}{s^2+2\\zeta\\omega_n s+\\omega_n^2}", { id: "fe", estilo: "dorada", size: 72 })],
    [Fila([T("**ζ** = factor de amortiguamiento", { size: 48 }), T("**ωₙ** = frecuencia natural no amortiguada", { size: 48 })])],
    [cambia("fe", "G(s)=\\frac{K\\,\\omega_n^2}{s^2+2\\zeta\\omega_n s+\\omega_n^2}", { at: "ganancia" })],
    [F("s^2+2s+25", { id: "ej", size: 72, at: "iguala" })],
    [cambia("ej", "\\omega_n^2=25\\Rightarrow\\omega_n=5;\\quad 2\\zeta(5)=2\\Rightarrow\\zeta=0.2", { at: "cinco" })],
  ],
  // Polos
  [
    [F("s=\\frac{-b\\pm\\sqrt{b^2-4c}}{2}", { size: 60 })],
    [F("s_{1,2}=-\\zeta\\omega_n\\pm j\\,\\omega_n\\sqrt{1-\\zeta^2}", { estilo: "dorada" })],
    [F("s_{1,2}=-\\sigma\\pm j\\,\\omega_d", { estilo: "verde", size: 76, at: "sigma" })],
  ],
  // Los cuatro casos
  [
    [S({ x: [-5, 1.5], y: [-3, 3], h: 420, polos: [{ id: "a", re: 0, im: 2, color: "ambar" }, { id: "r", re: -4, im: 0, capa: "real", color: "azul" }] }, { id: "pc" }), casos, T("Mueve **ζ** y mira la respuesta", { id: "caso", centro: true })],
    [capa("rc", "z0"), cambia("caso", "**ζ = 0**: imaginarios puros → oscila para siempre", { at: "oscila", foco: ["pc", "rc"] })],
    [mueve("pc", "a", [-0.8, 1.83]), oculta("rc", "z0"), capa("rc", "z04"), cambia("caso", "**0 < ζ < 1**: complejos → **subamortiguado**", { at: "subamortiguado", foco: ["pc", "rc"] })],
    [mueve("pc", "a", [-2, 0], { at: "juntan" }), oculta("rc", "z04", { at: "juntan" }), capa("rc", "z1", { at: "juntan" }), cambia("caso", "**ζ = 1**: polo doble → **críticamente amortiguado**", { at: "críticamente", foco: ["pc", "rc"] })],
    [mueve("pc", "a", [-1, 0]), capa("pc", "real"), oculta("rc", "z1"), capa("rc", "z2"), cambia("caso", "**ζ > 1**: dos polos reales → **sobreamortiguado**", { at: "sobreamortiguado", foco: ["pc", "rc"] })],
    [oculta("pc", "real"), mueve("pc", "a", [0.4, 1.96]), oculta("rc", "z2"), capa("rc", "zn"), cambia("caso", "**ζ < 0**: polos a la derecha → **inestable**", { at: "inestable", foco: ["pc", "rc"] })],
  ],
  // El triángulo
  [
    [S({ x: [-4.6, 1], y: [-0.6, 5], h: 520, polos: [{ id: "p", re: -2, im: 4, label: "−2 + j4" }],
      lineas: [{ tipo: "seg", a: [-2, 0], b: [-2, 4], color: "gris", dash: "10 10", dibuja: false, capa: "v" },
        { tipo: "seg", a: [-2, 0], b: [0, 0], color: "turquesa", ancho: 10, capa: "sig" }, { tipo: "seg", a: [-2, 0], b: [-2, 4], color: "violeta", ancho: 10, capa: "wd" },
        { tipo: "seg", a: [0, 0], b: [-2, 4], color: "ink", ancho: 8, capa: "wn" }],
      arcos: [{ re: -2, im: 4, capa: "beta", r: 90 }],
      textos: [{ re: -1, im: -0.45, t: "σ", color: "turquesa", capa: "sig", size: 44 }, { re: -2.45, im: 2, t: "ωd", color: "violeta", capa: "wd", size: 44 }, { re: -0.6, im: 2.4, t: "ωn", color: "ink", capa: "wn", size: 44 }] }, { id: "tri" }),
      capa("tri", "v", { at: "vertical" })],
    [F("\\text{triángulo rectángulo}", { id: "trif", size: 56 }), capa("tri", "sig", { foco: ["tri"] }), capa("tri", "wd"), capa("tri", "wn")],
    [cambia("trif", "\\sigma=\\zeta\\,\\omega_n", { at: "horizontal", foco: ["tri"] })],
    [cambia("trif", "\\begin{gathered}\\sigma=\\zeta\\,\\omega_n\\\\ \\omega_d=\\omega_n\\sqrt{1-\\zeta^2}\\end{gathered}", { at: "vertical", foco: ["tri"] })],
    [cambia("trif", "\\begin{gathered}\\sigma=\\zeta\\,\\omega_n\\\\ \\omega_d=\\omega_n\\sqrt{1-\\zeta^2}\\\\ \\omega_n=\\sqrt{\\sigma^2+\\omega_d^2}\\end{gathered}", { at: "hipotenusa", foco: ["tri"] })],
    [capa("tri", "beta", { at: "ángulo" }), T("**β** se mide desde el eje **real negativo**", { id: "bt", estilo: "ambar", at: "negativo", foco: ["tri"] })],
    [cambia("bt", "**cos β = ζ**", { foco: ["tri", "trif"] })],
  ],
  // Leer el ángulo
  [
    [S({ x: [-4.5, 1], y: [-0.5, 5], h: 560, polos: [{ id: "m", re: -1.2, im: 3.3 }] }, { id: "ang" }), mueve("ang", "m", [-0.25, 4], { at: "imaginario" }), T("Pegado al eje imaginario: **β ≈ 90°**, **ζ ≈ 0** → oscila mucho", { at: "oscila" })],
    [mueve("ang", "m", [-4, 0.35]), T("Pegado al eje real: **ζ ≈ 1** → casi no oscila", { estilo: "verde", at: "real" })],
    [mueve("ang", "m", [-2.8, 2.8]), F("\\beta=45^\\circ\\Rightarrow\\zeta=\\cos45^\\circ=0.71", { at: "45" })],
    [mueve("ang", "m", [-2, 3.46]), F("\\beta=60^\\circ\\Rightarrow\\zeta=\\cos60^\\circ=0.5", { at: "60" })],
  ],
  // Clímax
  [
    [S({ x: [-4.6, 1], y: [-0.6, 5], h: 500, polos: [{ id: "p", re: -2, im: 4, label: "s₁ del integrador" }], lineas: [{ tipo: "seg", a: [-2, 0], b: [0, 0], color: "turquesa", ancho: 10 }, { tipo: "seg", a: [-2, 0], b: [-2, 4], color: "violeta", ancho: 10 }, { tipo: "seg", a: [0, 0], b: [-2, 4], color: "ink", ancho: 8 }], arcos: [{ re: -2, im: 4, r: 90 }] }, { id: "cl" })],
    [F("\\sigma=2,\\ \\ \\omega_d=4,\\ \\ \\omega_n=\\sqrt{20}\\approx4.47", { id: "num", at: "Sigma", foco: ["cl"] })],
    [cambia("num", "\\zeta=\\frac{\\sigma}{\\omega_n}=\\frac{2}{4.47}\\approx0.45", { at: "Zeta", foco: ["cl"] })],
    [T("**Subamortiguado**, con sobreimpulso, sin simular", { estilo: "verde", centro: true })],
  ],
  // Cierre
  [
    [I("triangle", "Saca el **triángulo** de tres polos al azar")],
    [],
  ],
];
