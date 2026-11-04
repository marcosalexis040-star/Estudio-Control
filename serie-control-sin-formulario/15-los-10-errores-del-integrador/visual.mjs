import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";

// Cada error nace en rojo y se transforma en su arreglo, en verde
const err = (id, n, texto, o = {}) => [T(`**Error ${n}** · ${texto}`, { id, estilo: "roja", ...o }), mal(id, { at: o.at })];
const arr = (id, texto, o = {}) => [cambia(id, `✓ ${texto}`, o), ok(id, { at: o.at })];

export default [
  // Gancho
  [
    [F("100\\;\\longrightarrow\\;70", { id: "cal", estilo: "roja", size: 96 })],
    [T("Sin procedimiento = **0 puntos**, aunque esté bien", { estilo: "roja", centro: true, at: "cero" })],
    [T("**10 errores** y cómo arreglarlos", { estilo: "verde", size: 66, centro: true, at: "diez" })],
  ],
  // Errores 1 a 3
  [
    err("e1", 1, "resultado sin justificar", { at: "resultado" }),
    arr("e1", "escribe la fórmula y **por qué aplica**", { at: "fórmula" }),
    [...err("e2", 2, "leer K y τ sin normalizar", { at: "normalizar" }), F("\\frac{4}{s+2}\\;\\to\\;K=4\\ \\color{#e5484d}{\\times}", { id: "f2", size: 54, at: "denominador" })],
    [...arr("e2", "término constante = **1** antes de comparar", { at: "constante" }), cambia("f2", "\\frac{4}{s+2}=\\frac{2}{0.5s+1}\\;\\to\\;K=2,\\ \\tau=0.5", { at: "comparar" })],
    err("e3", 3, "tₚ con ωₙ", { at: "pico" }),
    [...arr("e3", "**tₚ = π / ωd** (parte imaginaria)", { at: "imaginaria" })],
  ],
  // Errores 4 y 5
  [
    [...err("e4", 4, "β desde el eje imaginario", { at: "beta" }), S({ x: [-4.5, 1], y: [-0.5, 4.5], h: 420, polos: [{ id: "p", re: -2, im: 3.4 }], arcos: [{ re: -2, im: 3.4, r: 90 }] }, { id: "b4" })],
    arr("e4", "β desde el **eje real negativo**, cos β = ζ", { at: "negativo", foco: ["b4"] }),
    err("e5", 5, "«más rápido» sin decir qué tiempo", { at: "rápido" }),
    arr("e5", "nombra el reloj: **tₛ = 4 / σ**", { at: "establecimiento" }),
  ],
  // Errores 6 a 8
  [
    err("e6", 6, "Mason: multiplicar lazos que **se tocan**", { at: "multiplicar" }),
    arr("e6", "colorea los lazos; solo pares **sin nodos comunes**", { at: "colores" }),
    err("e7", 7, "Routh: **copiar** en vez de hacer la cruz", { at: "copiar" }),
    arr("e7", "cada celda sale de **su cruz**; sin número → **0**", { at: "cruz" }),
    [...err("e8", 8, "contar **negativos**", { at: "negativos" }), Fila([F("1", { size: 56 }), F("3", { size: 56 }), F("-\\tfrac53", { size: 56, estilo: "roja" }), F("\\tfrac{112}{5}", { size: 56 }), F("8", { size: 56 })], { at: "cambios" })],
    arr("e8", "cuenta **cambios de signo**: aquí **2**", { at: "cambio" }),
  ],
  // Errores 9 y 10
  [
    err("e9", 9, "valor final en un sistema **inestable**", { at: "valor" }),
    arr("e9", "**Routh primero**, error después", { at: "Routh" }),
    err("e10", 10, "olvidar la **ganancia de referencia**", { at: "olvidar" }),
    [...arr("e10", "revisa **T(0)** y ajústala a 1 con k₃", { at: "revisa" }), G({ x: [0, 5], y: [0, 1.2], h: 360, xlabel: "t", curvas: [{ f: (t) => 1, color: "gris", dash: "12 10", dibuja: false }, { f: resp.esc2(0.707, 2.83, 1 / 8), color: "rojo" }, { f: resp.esc2(0.707, 2.83, 1), color: "verde" }] }, { at: "uno" })],
  ],
  // La estrategia de 100 minutos
  [
    [I("timer", "**100 minutos**", { estilo: "dorada", size: 64 })],
    [Tab([["0–5 min", "lee todo; empieza por más **pts/min**"], [{ t: "durante", capa: "d" }, { t: "deduce las fórmulas en la hoja", capa: "d" }], [{ t: "cada resultado", capa: "c" }, { t: "comprueba con k = 0 o valor final", capa: "c" }], [{ t: "últimos 10", capa: "u" }, { t: "revisa **signos**", capa: "u" }]], { id: "plan", size: 46, at: "cinco" })],
    [capa("plan", "d", { at: "Deduce" })],
    [capa("plan", "c", { at: "Comprueba" })],
    [capa("plan", "u", { at: "diez" }), brilla("plan", { at: "signos" })],
  ],
  // Clímax
  [
    [T("La frase que une **todo** el curso", { estilo: "oscura", size: 64, centro: true })],
    [S({ x: [-4, 1.5], y: [-3, 3], h: 440, polos: [{ id: "p", re: -1.5, im: 2.2, label: "polos" }] }, { id: "fin" }), T("**estable** · **rápido** · **cuánto se pasa** · **cuánto oscila**", { estilo: "dorada", centro: true, at: "estable", foco: ["fin"] })],
    [Tab([["**Laplace**", "los encuentra"], ["**diagramas**", "los esconden"], ["**Routh**", "los cuenta"], ["**retroalimentación**", "los mueve"]], { id: "frase", size: 52, at: "Laplace" }), brilla("frase", { at: "mueve" })],
  ],
  // Cierre
  [
    [T("Repasa la serie completa una vez antes del examen", { centro: true })],
    [],
  ],
];
