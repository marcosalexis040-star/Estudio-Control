import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";
import { int25, er2 } from "../produccion/motor/diagramas-lista.mjs";

const zonaOK = (X, Y) => `M${X(-2.3)} ${Y(3.14)} L${X(-7)} ${Y(3.14)} L${X(-7)} ${Y(7)} L${X(-5.12)} ${Y(7)} Z`;

export default [
  // Gancho
  [
    [D(int25(), { id: "d0" }), T("a = ?   b = ?", { estilo: "roja", size: 66, centro: true })],
    [I("warning", "Sin método, el problema se va **entero**", { estilo: "roja" })],
    [Fila([T("TENGO", { estilo: "color", size: 60, centro: true }), T("=", { estilo: "oscura", size: 80, centro: true }), T("QUIERO", { estilo: "color", size: 60, centro: true })], { at: "polinomio" })],
  ],
  // El método
  [
    [Tab([["1", "función de lazo cerrado"], [{ t: "2", capa: "p2" }, { t: "denominador mónico (s² sola)", capa: "p2" }], [{ t: "3", capa: "p3" }, { t: "polinomio deseado", capa: "p3" }], [{ t: "4", capa: "p4" }, { t: "igualar coeficientes", capa: "p4" }]], { id: "met", size: 50 })],
    [capa("met", "p2", { at: "denominador" })],
    [capa("met", "p3", { at: "deseado" })],
    [capa("met", "p4", { at: "iguala" })],
  ],
  // Integrador 2025 · problema 1
  [
    [D(int25(), { id: "d1" }), T("Integrador 2025 · **k₁ = k₂ = 5**", { centro: true })],
    [F("\\frac{Y}{R}=\\frac{5b}{s^2+(a+5b)\\,s+5b}", { id: "tengo", estilo: "dorada", at: "diagrama" })],
    [F("(s+1)^2=s^2+2s+1", { id: "quiero", estilo: "verde", at: "deseado", foco: ["tengo"] })],
    [F("5b=1\\;\\Rightarrow\\; b=\\tfrac15=0.2", { id: "sol", at: "quinto", foco: ["tengo", "quiero"] })],
    [cambia("sol", "5b=1\\Rightarrow b=0.2\\;\\qquad a+5b=2\\Rightarrow a=1", { at: "uno", foco: ["tengo", "quiero"] }), ok("sol", { at: "uno" })],
    [G({ x: [0, 8], y: [0, 2.3], h: 380, xlabel: "t", curvas: [{ f: (t) => 2 * (1 - Math.exp(-t) * (1 + t)), color: "verde" }], hl: [{ y: 2, label: "y∞ = 2", color: "verde" }] }), F("y_\\infty=G(0)\\cdot 2=1\\cdot2=2", { size: 54 })],
  ],
  // Desde zeta
  [
    [F("s^2+2\\zeta\\omega_n s+\\omega_n^2", { id: "est", estilo: "dorada", size: 66 })],
    [D(er2(), { id: "er" }), F("\\frac{Y}{R}=\\frac{k_p+k_f}{s^2+(a+k_d)\\,s+k_p}", { id: "er2f", at: "queda" })],
    [F("\\omega_n^2=k_p=5\\;\\Rightarrow\\;\\omega_n=\\sqrt5=2.24", { id: "wn", at: "cinco", foco: ["er2f"] })],
    [F("2\\zeta\\omega_n=a+k_d", { id: "zw", estilo: "verde", foco: ["er2f", "wn"] })],
    [F("a=2(0.6)(2.24)-1=1.68", { id: "z6", at: "1.68", foco: ["zw"] })],
    [cambia("z6", "\\zeta=1:\\quad a+k_d=2\\sqrt5=4.47", { at: "críticamente", foco: ["zw"] })],
    [cambia("z6", "\\text{críticamente estable: } a+k_d=0\\;\\Rightarrow\\;s=\\pm j\\sqrt5", { at: "cero", foco: ["zw"] })],
  ],
  // Región permitida
  [
    [S({ x: [-7, 1], y: [-0.5, 7], h: 680, polos: [{ id: "d", re: -4, im: 4, capa: "pd", label: "−4 + j4" }],
      zonas: [{ d: zonaOK, color: "verde", op: 0.28, capa: "ok" }],
      lineas: [{ tipo: "rayo", re: -0.59, im: 0.807, color: "ambar", ancho: 8, capa: "mp" }, { tipo: "v", v: -2, color: "turquesa", ancho: 8, capa: "ts" }, { tipo: "h", v: 3.14, color: "violeta", ancho: 8, capa: "tp" }],
      textos: [{ re: -5.6, im: 6.3, t: "ζ = 0.59", color: "ambar", capa: "mp", size: 32 }, { re: -1.2, im: 6.3, t: "σ = 2", color: "turquesa", capa: "ts", size: 32 }, { re: -5.6, im: 2.6, t: "ωd = π", color: "violeta", capa: "tp", size: 32 }] }, { id: "reg" }), T("Cada especificación es **una línea**", { id: "rt", centro: true })],
    [capa("reg", "mp", { at: "rayo" }), cambia("rt", "**Mₚ máx** → rayo: entre el rayo y el eje real", { at: "real", foco: ["reg"] })],
    [capa("reg", "ts", { at: "vertical" }), cambia("rt", "**tₛ máx** → vertical: a su izquierda", { at: "izquierda", foco: ["reg"] })],
    [capa("reg", "tp", { at: "horizontal" }), cambia("rt", "**tₚ máx** → horizontal: por encima", { at: "encima", foco: ["reg"] })],
    [capa("reg", "ok", { at: "Elige" }), capa("reg", "pd", { at: "dentro" }), cambia("rt", "Elige un polo **dentro** de la zona verde", { at: "dentro", foco: ["reg"] })],
    [cambia("rt", "Libro, Ej. 27: Mₚ < 10 %, tₚ < 1 s → **−4 ± j4**", { at: "eligen", foco: ["reg"] })],
    [F("(s+4)^2+16=s^2+8s+32\\;\\Rightarrow\\;p=8,\\ k=32", { estilo: "verde", at: "comparando", foco: ["reg"] })],
  ],
  // Clímax
  [
    [T("La trampa del integrador 2025", { estilo: "oscura", size: 62, centro: true })],
    [F("s^2+5s+(4+k)", { id: "pk", estilo: "dorada", size: 72, at: "cerrado" })],
    [S({ x: [-6, 1], y: [-6, 6], h: 600, polos: [{ id: "a", re: -2.5, im: 0.6 }], lineas: [{ tipo: "v", v: -2.5, color: "rojo", ancho: 8 }] }, { id: "pp" }), mueve("pp", "a", [-2.5, 5], { at: "último", dur: 2.2 }), T("σ fija en **2.5**", { estilo: "roja", centro: true, at: "fija" })],
    [I("lock", "tₛ = 4 / 2.5 ≥ **1.6 s** con cualquier k", { estilo: "roja", at: "1.6" })],
    [I("key", "**PID**: mueve lo que una ganancia sola no mueve", { estilo: "verde", at: "PID" })],
  ],
  // Cierre
  [
    [T("Antes de despejar: ¿qué coeficiente mueve cada parámetro?", { centro: true })],
    [],
  ],
];
