import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";

const c = (t, capa, marca, mcapa) => ({ t, capa, marca, mcapa });

export default [
  // Gancho
  [
    [F("s^5+5s^4+2s^3+3s^2+4s+10", { id: "p5", size: 58 }), T("¿Estable?", { estilo: "oscura", size: 72, centro: true })],
    [I("calculator", "Sin raíces: solo **Routh**", { estilo: "roja", at: "Routh" })],
    [F("\\frac{\\color{#1d5fc4}{a_1}\\,a_2-a_0\\,\\color{#1d5fc4}{a_3}}{a_1}", { estilo: "dorada", size: 72, at: "cruz" })],
  ],
  // Qué es estable
  [
    [G({ x: [0, 8], y: [-1.3, 1.3], h: 380, xlabel: "t", curvas: [{ f: (t) => Math.sign(Math.sin(1.2 * t)) * 0.8, color: "gris", dash: "10 8", dibuja: false }, { f: (t) => Math.exp(-0.25 * t) * Math.sin(2 * t), color: "verde" }] }), T("Entrada acotada → salida **acotada**", { estilo: "verde", centro: true })],
    [S({ x: [-4, 2], y: [-3, 3], h: 420, polos: [{ id: "a", re: -1, im: 2, color: "verde" }, { id: "b", re: -3, im: 0, color: "verde" }, { id: "j", re: 0, im: 1.5, color: "ambar", capa: "jw" }] }, { id: "sp" }), T("**Todos** los polos con parte real **negativa**", { centro: true, at: "negativa" })],
    [capa("sp", "jw"), T("Polo sobre el eje jω → **críticamente estable** (no cuenta)", { estilo: "ambar", at: "críticamente" })],
    [F("\\frac{1}{s}\\cdot\\frac{1}{s}=\\frac{1}{s^2}\\;\\Rightarrow\\;y=t", { size: 60, at: "rampa" }), G({ x: [0, 6], y: [0, 6], h: 320, xlabel: "t", curvas: [{ f: (t) => t, color: "rojo" }] }, { at: "crece" })],
  ],
  // Condición necesaria
  [
    [I("magnifying-glass", "Primero, **sin tabla**", { estilo: "oscura" })],
    [T("Todos los coeficientes **existen** y tienen el **mismo signo**", { estilo: "verde", centro: true, at: "coeficientes" })],
    [F("s^4+2s^3+\\color{#e5484d}{0\\,s^2}+3s+4", { id: "falta", size: 66, at: "falta" }), mal("falta", { at: "inestable" })],
    [I("warning", "Pasar esta prueba **no garantiza** nada", { estilo: "ambar", at: "garantiza" })],
  ],
  // Armar la tabla
  [
    [F("s^4+3s^3+s^2+8s+8", { id: "p4", size: 64 }), Tab([
      ["$s^4$", c("1", undefined, "azul", "x"), c("1", undefined, "azul", "x"), "8"],
      ["$s^3$", c("3", undefined, "azul", "x"), c("8", undefined, "azul", "x"), c("0", "z")],
      ["$s^2$", c("$-\\tfrac53$", "b1"), c("8", "b2"), c("", undefined)],
      ["$s^1$", c("$\\tfrac{112}{5}$", "c1"), "", ""],
      ["$s^0$", c("8", "d1"), "", ""]], { id: "tb", size: 54, at: "filas" })],
    [T("Arriba: 1.º, 3.º, 5.º · Abajo: 2.º, 4.º, 6.º", { id: "alt", centro: true, at: "arriba", foco: ["tb"] })],
    [capa("tb", "x", { at: "pivote" }), capa("tb", "b1", { at: "pivote#2" }), cambia("alt", "$b_1=\\dfrac{3\\cdot1-1\\cdot8}{3}=-\\dfrac53$", { at: "derecha#2", foco: ["tb"] })],
    [cambia("alt", "**Pivote** = primer número de la fila de arriba (aquí **3**)", { at: "pivote", foco: ["tb"] }), capa("tb", "b2", { at: "arriba" })],
    [capa("tb", "z", { at: "cero" }), capa("tb", "c1", { at: "cero" }), capa("tb", "d1", { at: "cero" }), cambia("alt", "Sin número → **0**", { at: "cero", foco: ["tb"] })],
  ],
  // Leer la columna
  [
    [Tab([["$s^4$", "1", c("+", "g1")], ["$s^3$", "3", c("+", "g1")], ["$s^2$", c("$-\\tfrac53$", undefined, "rojo", "g2"), c("−", "g2")], ["$s^1$", c("$\\tfrac{112}{5}$", undefined, "rojo", "g2"), c("+", "g1")], ["$s^0$", "8", c("+", "g1")]], { id: "col", size: 54 })],
    [capa("col", "g1", { at: "cambio" }), capa("col", "g2", { at: "raíz" }), T("Cada **cambio de signo** = una raíz en el semiplano derecho", { id: "ct", estilo: "roja", at: "derecho", foco: ["col"] })],
    [cambia("ct", "Toda la columna **positiva** → **estable**", { at: "estable", foco: ["col"] })],
  ],
  // Ejemplos de clase
  [
    [T("Clase 4: $s^4+3s^3+s^2+8s+8$", { centro: true })],
    [Fila([F("1", { size: 60 }), F("3", { size: 60 }), F("-\\tfrac53", { size: 60, estilo: "roja" }), F("\\tfrac{112}{5}", { size: 60 }), F("8", { size: 60 })], { at: "columna" })],
    [T("+ → − → + : **2 cambios** → 2 polos inestables", { id: "e4", estilo: "roja", centro: true, at: "dos" })],
    [I("warning", "Cuenta **cambios**, no negativos: 1 negativo = 2 cambios", { estilo: "ambar" })],
    [F("s^5+5s^4+2s^3+3s^2+4s+10", { size: 56 })],
    [Fila([F("1", { size: 52 }), F("5", { size: 52 }), F("\\tfrac75", { size: 52 }), F("-\\tfrac{29}{7}", { size: 52, estilo: "roja" }), F("\\tfrac{156}{29}", { size: 52 }), F("10", { size: 52 })], { at: "columna" }), T("Otra vez **2 cambios**", { estilo: "roja", centro: true, at: "cambios" })],
  ],
  // Atajo de tercer orden
  [
    [I("lightning", "Atajo para **tercer grado**", { estilo: "dorada" })],
    [F("s^3+as^2+bs+c:\\quad a>0,\\ c>0,\\ ab>c", { estilo: "dorada", size: 58, at: "estable" })],
    [F("s^3+10s^2+s+2:\\ \\ 10\\cdot1=10>2", { id: "a3", estilo: "verde", size: 56, at: "diez" }), ok("a3", { at: "estable" })],
  ],
  // Clímax
  [
    [T("El error que más se repite: **copiar** en vez de hacer la cruz", { estilo: "roja", centro: true })],
    [Tab([["$s^5$", "1", "2", "4"], ["$s^4$", "5", "3", "10"], ["$s^3$", "$\\tfrac75$", "2", ""], ["$s^2$", "$-\\tfrac{29}{7}$", { t: "2", capa: "mal", marca: "rojo", mcapa: "mal" }, ""]], { id: "q5", size: 52 }), T("$c_2$ = **10**, no 2", { id: "c2", estilo: "roja", centro: true, at: "diez" }), capa("q5", "mal", { at: "dos" })],
    [cambia("c2", "**1 celda = 1 cruz**, sin excepción", { foco: ["q5"] }), ok("c2", { at: "excepción" })],
  ],
  // Cierre
  [
    [T("Arma la tabla de $s^4+3s^3+s^2+8s+8$ y encuentra los **2 cambios**", { centro: true })],
    [],
  ],
];
