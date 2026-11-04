import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";

// Polos del Examen Integrador 1 (23 oct 2026), mitad superior
const P5 = [[-2, 4, "s₁"], [-4, 8, "s₂"], [-4, 4, "s₃"], [-2, 8, "s₄"], [-8, 4, "s₅"]];
const plano5 = (extra = {}, capas = false, id) => S({ x: [-9.5, 1], y: [-0.6, 9.5], h: 720, etiquetas: true,
  polos: P5.map(([re, im, l], i) => ({ id: "s" + (i + 1), re, im, label: l, ldx: 18, ldy: -16, ...(capas ? { capa: "p" + (i + 1) } : {}) })), ...extra }, id ? { id } : {});

export default [
  // Gancho
  [
    [T("Integrador 1 · Problema 1 · **40 pts**", { estilo: "roja", size: 60, centro: true })],
    [plano5({}, false), Tab([["a", "b", "c", "d", "e"]], { id: "cas", size: 52 })],
    [I("timer", "Sabes qué mira cada métrica → **5 minutos**", { estilo: "verde" })],
  ],
  // El mapa de las cuatro líneas
  [
    [S({ x: [-6, 1], y: [-0.5, 6], h: 640, polos: [{ id: "q", re: -3, im: 3, color: "gris" }],
      lineas: [{ tipo: "h", v: 3, color: "violeta", ancho: 8, capa: "h" }, { tipo: "v", v: -3, color: "turquesa", ancho: 8, capa: "v" }, { tipo: "rayo", re: -3, im: 3, color: "ambar", ancho: 8, capa: "r" }, { tipo: "circulo", r: 4.243, color: "ink", ancho: 6, dash: "14 12", dibuja: false, capa: "c" }] }, { id: "mapa" }), T("Cuatro líneas, cuatro métricas", { id: "lin", centro: true })],
    [capa("mapa", "h", { at: "horizontal" }), cambia("lin", "**horizontal** → misma ωd → mismo **tₚ**", { at: "pico", foco: ["mapa"] })],
    [capa("mapa", "v", { at: "vertical" }), cambia("lin", "**vertical** → misma σ → mismo **tₛ**", { at: "establecimiento", foco: ["mapa"] })],
    [capa("mapa", "r", { at: "rayo" }), cambia("lin", "**rayo** → mismo ζ → mismo **Mₚ**", { at: "sobreimpulso", foco: ["mapa"] })],
    [capa("mapa", "c", { at: "círculo" }), cambia("lin", "**círculo** → misma **ωₙ**", { at: "omega", foco: ["mapa"] })],
  ],
  // Los polos del examen
  [
    [plano5({}, true, "_pl"), capa("_pl", "p1", { at: "cuatro" }), capa("_pl", "p2", { at: "ocho" }), capa("_pl", "p3", { at: "cuatro#4" }), capa("_pl", "p4", { at: "ocho#2" }), capa("_pl", "p5", { at: "cuatro#5" })],
    [T("Ubícalos **antes** de calcular", { centro: true })],
  ],
  // Inciso a
  [
    [plano5({ lineas: [{ tipo: "rayo", re: -2, im: 4, color: "ambar", ancho: 8, capa: "r" }] }, false, "_a"), T("a) ¿Mismo **sobreimpulso**?", { id: "ia", centro: true })],
    [F("-4+j8=2\\,(-2+j4)", { id: "dob", estilo: "dorada", size: 66, at: "doble", foco: ["_a"] })],
    [capa("_a", "r", { at: "rayo" }), cambia("dob", "s_1,\\ s_2:\\ \\zeta=0.45,\\ M_p=e^{-\\pi/2}=21\\,\\%", { at: "21", foco: ["_a"] }), ok("ia", { at: "21" })],
  ],
  // Incisos b y c
  [
    [plano5({ lineas: [{ tipo: "h", v: 4, color: "violeta", ancho: 8, capa: "h4" }, { tipo: "h", v: 8, color: "violeta", ancho: 8, capa: "h8" }, { tipo: "v", v: -2, color: "turquesa", ancho: 8, capa: "v2" }, { tipo: "v", v: -4, color: "turquesa", ancho: 8, capa: "v4" }] }, false, "_b"), T("b) ¿Mismo **tiempo pico**?", { id: "ib", centro: true })],
    [capa("_b", "h4", { at: "cuatro" }), cambia("ib", "**ωd = 4**: s₁, s₃, s₅ → tₚ = π/4 = **0.79 s**", { at: "quinto", foco: ["_b"] })],
    [capa("_b", "h8", { at: "ocho" }), cambia("ib", "**ωd = 8**: s₂, s₄ → tₚ = π/8 = **0.39 s**", { at: "0.39", foco: ["_b"] })],
    [oculta("_b", "h4"), oculta("_b", "h8"), cambia("ib", "c) ¿Mismo **establecimiento**?", { at: "establecimiento", foco: ["_b"] })],
    [capa("_b", "v2", { at: "Sigma" }), cambia("ib", "**σ = 2**: s₁, s₄ → tₛ = 4/2 = **2 s**", { at: "2", foco: ["_b"] })],
    [capa("_b", "v4", { at: "Sigma" }), cambia("ib", "**σ = 4**: s₂, s₃ → tₛ = 4/4 = **1 s**", { at: "1", foco: ["_b"] })],
  ],
  // Incisos d y e
  [
    [plano5({ arcos: [{ re: -8, im: 4, r: 110, capa: "b5" }], lineas: [{ tipo: "rayo", re: -8, im: 4, color: "verde", ancho: 8, capa: "r5" }, { tipo: "v", v: -8, color: "turquesa", ancho: 8, capa: "v8" }] }, false, "_d"), T("d) ¿Menor **sobreimpulso**?", { id: "id", centro: true })],
    [capa("_d", "r5"), capa("_d", "b5"), cambia("id", "**s₅ = −8 ± j4**: β = 26.6°, ζ = 0.89, Mₚ ≈ **0.19 %**", { at: "quinto", foco: ["_d"] })],
    [cambia("id", "e) ¿Respuesta más **rápida**?", { at: "rápida", foco: ["_d"] })],
    [capa("_d", "v8", { at: "quinto" }), cambia("id", "**s₅**: tₛ = 4/8 = **0.5 s**", { at: "segundo", foco: ["_d"] })],
    [I("clock", "Di qué reloj usas: aquí **tₛ = 4/σ**", { estilo: "verde", foco: ["_d"] })],
  ],
  // Mover sobre el rayo
  [
    [S({ x: [-7, 1], y: [-0.5, 7], h: 560, polos: [{ id: "a", re: -1.5, im: 2, label: "a" }, { id: "bb", re: -3, im: 4, label: "b", color: "gris" }, { id: "c", re: -4.5, im: 6, label: "c", color: "gris" }], lineas: [{ tipo: "rayo", re: -1.5, im: 2, color: "ambar", ancho: 6, dibuja: false }] }, { id: "ry" }), T("¿Alejar sobre el **mismo rayo**? ¿V o F?", { id: "vf", centro: true })],
    [mueve("ry", "a", [-4.5, 6], { at: "conserva" }), cambia("vf", "**Verdadero**: mismo ángulo, σ crece → tₛ baja", { at: "Verdadero", foco: ["ry"] }), ok("vf", { at: "crece" })],
    [G({ x: [0, 6], y: [0, 1.5], h: 420, xlabel: "t", curvas: [{ f: resp.esc2(0.6, 1.5), color: "gris" }, { f: resp.esc2(0.6, 4.5), color: "naranja" }] }), T("Polos × k → la **misma curva** k veces más rápida", { centro: true, size: 48 })],
    [Fila([F("-8\\pm j1", { id: "g81", size: 58, estilo: "verde" }), F("-4\\pm j4", { size: 58 }), F("-1\\pm j8", { size: 58 })], { at: "izquierda" }), ok("g81", { at: "real" })],
  ],
  // Clímax
  [
    [T("Las 3 confusiones que más puntos quitan", { estilo: "oscura", size: 60, centro: true })],
    [T("**Mₚ** depende del **ángulo**, no de la distancia", { id: "c1", estilo: "verde", at: "ángulo" })],
    [T("**tₚ = π / ωd**, no π / ωₙ", { id: "c2", estilo: "verde", at: "omega" })],
    [T("**β** desde el eje **real negativo**", { id: "c3", estilo: "verde", at: "negativo" }), ok("c3", { at: "negativo" })],
  ],
  // Cierre
  [
    [I("crosshair", "Dibuja los 5 polos y responde **a–e** en voz alta")],
    [],
  ],
];
