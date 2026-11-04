import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";
import { lazoUnit } from "../produccion/motor/diagramas-lista.mjs";

const c = (t, capa, marca, mcapa) => ({ t, capa, marca, mcapa });
const w5 = Math.sqrt(5);

export default [
  // Gancho
  [
    [G({ x: [0, 8], y: [0, 1.2], h: 460, xlabel: "t", curvas: [{ f: (t) => 1, color: "gris", dash: "12 10", dibuja: false }, { f: resp.esc2(0.7, 1.6, 0.8), color: "azul" }], textos: [{ x: 6.6, y: 0.9, t: "e_ss", color: "rojo", size: 38 }], vl: [{ x: 6.2, color: "rojo", dash: "6 6" }] }, { id: "g0" })],
    [T("Ese hueco es el **error en estado estable**", { estilo: "roja", centro: true, at: "error" })],
    [Fila([F("\\lim_{s\\to0}", { size: 64 }), T("¿cuántos **1/s**?", { size: 56, centro: true })], { at: "límite" })],
  ],
  // La fórmula
  [
    [D(lazoUnit(), { id: "lu" }), F("E=\\frac{R}{1+G_cG}", { id: "ef", estilo: "dorada", size: 72, at: "referencia", foco: ["lu"] })],
    [cambia("ef", "e_{ss}=\\lim_{s\\to0}\\frac{s\\,R(s)}{1+G_c(s)G(s)}", { at: "final", foco: ["lu"] })],
    [I("shield-check", "Antes: **Routh**. Si no es estable, el error **no existe**", { estilo: "ambar", at: "Routh" })],
  ],
  // El tipo del sistema
  [
    [T("**Tipo** = número de integradores (polos en s = 0) de $G_cG$", { centro: true })],
    [F("\\text{escalón }A:\\quad e_{ss}=\\frac{A}{1+K_p},\\qquad K_p=\\lim_{s\\to0}G_cG", { size: 52, at: "Kp" })],
    [F("\\text{un integrador}\\Rightarrow K_p=\\infty\\Rightarrow e_{ss}=0", { estilo: "verde", size: 54, at: "infinito" })],
    [F("\\text{rampa }At:\\quad e_{ss}=\\frac{A}{K_v},\\qquad K_v=\\lim_{s\\to0}s\\,G_cG", { size: 52, at: "Kv" })],
    [Tab([["", "Tipo 0", "Tipo 1", "Tipo 2"], ["Escalón", c("$\\frac{A}{1+K_p}$", "t0"), c("0", "t1", "verde", "t1"), c("0", "t2", "verde", "t2")], ["Rampa", c("∞", "t0", "rojo", "t0"), c("$\\frac{A}{K_v}$", "t1"), c("0", "t2", "verde", "t2")]], { id: "tt", cab: true, size: 52 }), capa("tt", "t0", { at: "cero" }), capa("tt", "t1", { at: "uno" }), capa("tt", "t2", { at: "dos" })],
  ],
  // Integrador 2025 · problema 2
  [
    [D(lazoUnit({ gc: "k", g: "G" }), { id: "lz" }), F("G_c=k,\\qquad G=\\frac{1}{s^n(s+a)}", { size: 60, estilo: "dorada" })],
    [Fila([F("e_{ss}=\\tfrac12", { size: 62 }), F("\\zeta=\\tfrac12", { size: 62 })], { id: "pide", at: "error" })],
    [T("n = 0 → primer orden, sin ζ ✗ · n = 2 → falta el término en s ✗", { id: "nn", estilo: "roja", centro: true, at: "ene", foco: ["lz"] })],
    [cambia("nn", "**n = 1**: tipo 1 → el ½ es ante una **rampa**", { at: "rampa", foco: ["lz"] }), ok("nn", { at: "rampa" })],
    [F("K_v=\\frac{k}{a}\\;\\Rightarrow\\;\\frac{a}{k}=\\frac12", { id: "kv", size: 62, at: "Kv", foco: ["nn"] })],
    [F("s^2+as+k:\\quad \\omega_n=\\sqrt k,\\quad a=2\\zeta\\omega_n=\\sqrt k", { id: "lc", size: 52, at: "cerrado", foco: ["kv"] })],
    [F("k=4,\\qquad a=2", { id: "sol", estilo: "verde", size: 80, at: "cuatro", foco: ["lc"] }), ok("sol", { at: "dos" })],
  ],
  // Qué hace cada parte del PID
  [
    [F("u=k_p\\,e+k_i\\!\\int e\\,dt+k_d\\,\\frac{de}{dt}", { id: "pid", estilo: "dorada", size: 62, at: "PID" })],
    [T("**P**: empuja según el error **de ahora**", { id: "pp", centro: true, at: "proporcional", foco: ["pid"] })],
    [cambia("pp", "**I**: suma el error **pasado** → borra el error al escalón", { at: "integral", foco: ["pid"] })],
    [cambia("pp", "**D**: mira hacia dónde va → **amortigua**", { at: "derivativa", foco: ["pid"] })],
    [G({ x: [0, 8], y: [0, 1.5], h: 440, xlabel: "t", curvas: [{ f: (t) => 1, color: "gris", dash: "12 10", dibuja: false }, { f: resp.esc1(0.75, 0.5), color: "rojo", capa: "ki0" }, { f: resp.esc2(0.3, 1.3), color: "naranja", capa: "kp0" }], textos: [{ x: 6.4, y: 0.62, t: "ki = 0", color: "rojo", capa: "ki0", size: 32 }, { x: 6.4, y: 1.25, t: "kp = 0", color: "naranja", capa: "kp0", size: 32 }] }, { id: "pi", at: "PI" }), capa("pi", "ki0", { at: "ki" }), capa("pi", "kp0", { at: "kp" })],
  ],
  // Ziegler-Nichols con Routh
  [
    [T("Ziegler-Nichols · **2.ª regla**", { estilo: "oscura", size: 64, centro: true })],
    [G({ x: [0, 10], y: [-1.6, 1.6], h: 420, xlabel: "t", curvas: [{ f: (t) => Math.exp(-0.25 * t) * Math.sin(w5 * t), color: "verde", capa: "dec" }, { f: (t) => Math.sin(w5 * t), color: "ambar", capa: "kc" }] }, { id: "zn" }), capa("zn", "dec", { at: "Sube" }), oculta("zn", "dec", { at: "crecer" }), capa("zn", "kc", { at: "crecer" }), T("**Kc** = ganancia crítica", { id: "kc", estilo: "ambar", centro: true, at: "crítica", foco: ["zn"] })],
    [cambia("kc", "Con **Routh**: la k que anula la fila $s^1$", { at: "Routh", foco: ["zn"] })],
    [F("s^3+6s^2+5s+2k_p:\\quad s^1=5-\\tfrac{k_p}{3}=0\\Rightarrow K_c=15", { id: "z1", size: 48, at: "15" })],
    [F("6s^2+30=0\\Rightarrow\\omega=\\sqrt5=2.24,\\quad P_c=\\frac{2\\pi}{\\sqrt5}=2.81\\text{ s}", { id: "z2", size: 46, at: "periodo", foco: ["z1"] })],
    [Tab([["$k_p$", "$T_i$", "$T_d$"], ["$0.6\\,K_c$", "$P_c/2$", "$P_c/8$"]], { id: "reg", cab: true, size: 56, at: "reglas" })],
    [Tab([["$k_p$", "$T_i$", "$T_d$"], ["9", "1.405 s", "0.351 s"]], { id: "res", cab: true, size: 60, at: "Resultado" }), ok("res", { at: "0.35" })],
  ],
  // Clímax
  [
    [T("Resumen que **vale oro**", { estilo: "oscura", size: 66, centro: true })],
    [Tab([["**tipo**", "¿hay error?"], ["**ganancia**", "¿cuánto?"], ["**Routh**", "¿tiene sentido?"]], { id: "oro", size: 58, at: "tipo" }), brilla("oro", { at: "Routh" })],
  ],
  // Cierre
  [
    [T("Escribe de memoria la tabla **tipo 0, 1, 2** contra escalón y rampa", { centro: true })],
    [],
  ],
];
