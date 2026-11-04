import { T, F, G, S, D, I, Fila, Tab, cambia, capa, oculta, mueve, tacha, ok, mal, brilla, limpia, resp } from "../produccion/motor/piezas.mjs";
import { lazoSimple, serieParalelo, moverSuma, er2 } from "../produccion/motor/diagramas-lista.mjs";

export default [
  // Gancho
  [
    [D(er2(), { id: "d0" }), I("warning", "Un signo mal → **todo** el problema mal", { estilo: "roja", at: "error" })],
    [T("**G(s)** → polos → Routh → error", { centro: true, at: "transferencia" })],
    [T("**3 reglas** + **2 movimientos**", { estilo: "verde", size: 64, centro: true, at: "tres" })],
  ],
  // Tres reglas
  [
    [D(serieParalelo(), { id: "sp" }), capa("sp", "s", { at: "multiplican" })],
    [capa("sp", "p", { at: "suman" })],
    [D(lazoSimple(), { id: "lz" }), F("\\frac{G}{1+GH}", { id: "lzf", estilo: "dorada", size: 80, at: "G#2", foco: ["lz"] })],
    [cambia("lzf", "\\text{positiva: }\\frac{G}{1-GH}", { at: "positiva", foco: ["lz"] })],
    [cambia("lzf", "1+GH=0\\quad\\text{(polos de lazo cerrado)}", { at: "característica", foco: ["lz"] })],
  ],
  // Dos movimientos
  [
    [D(moverSuma(), { id: "ms" }), T("Lazos encimados → **mueve** sumadores o nodos", { id: "mv", centro: true })],
    [capa("ms", "d", { at: "atrás" }), cambia("mv", "Sumador **hacia atrás** de G → la señal pasa por **1/G**", { at: "uno", foco: ["ms"] })],
    [cambia("mv", "Sumador **hacia adelante** de G → la señal pasa por **G**", { at: "adelante", foco: ["ms"] })],
    [cambia("mv", "Nodo: atrás → **G** · adelante → **1/G** (al revés)", { at: "revés", foco: ["ms"] })],
    [I("check-circle", "La señal que **sale** debe ser la misma que antes", { estilo: "verde", foco: ["ms"] })],
  ],
  // Ejemplo · examen rápido II
  [
    [D(er2(), { id: "e" }), T("Externo: **kp** y **kf** · interno: **kd**", { id: "et", centro: true })],
    [capa("e", "interno", { at: "interno" }), cambia("et", "Empieza por el lazo **más interno**", { at: "interno", foco: ["e"] })],
    [F("\\frac{\\frac{1}{s+a}}{1+\\frac{k_d}{s+a}}=\\frac{1}{s+a+k_d}", { id: "ef", at: "queda", foco: ["e"] })],
    [cambia("ef", "\\frac{1}{s\\,(s+a+k_d)}", { at: "serie", foco: ["e"] })],
    [capa("e", "kf", { at: "kf" }), cambia("et", "**kf** entra sin pasar por el comparador → ecuación del sumador", { at: "ecuación", foco: ["e", "ef"] })],
    [F("u=k_p\\,(R-Y)+k_f\\,R", { id: "su", estilo: "verde", at: "recibe", foco: ["ef"] })],
    [cambia("su", "Y=\\frac{1}{s(s+a+k_d)}\\,\\big[k_p(R-Y)+k_fR\\big]", { at: "planta", foco: ["ef"] })],
    [F("\\frac{Y}{R}=\\frac{k_p+k_f}{s^2+(a+k_d)\\,s+k_p}", { id: "res", estilo: "dorada", at: "Despeja", foco: ["su"] }), ok("res", { at: "kp#2" })],
  ],
  // Comprueba tu resultado
  [
    [F("\\frac{Y}{R}=\\frac{k_p+k_f}{s^2+(a+k_d)\\,s+k_p}", { id: "r2", size: 60 })],
    [T("① **2** bloques dinámicos → **grado 2** ✓", { id: "c1", estilo: "verde", at: "dos" })],
    [T("② $G(0)=\\dfrac{k_p+k_f}{k_p}$ → con $k_f=0$: **1** ✓", { id: "c2", estilo: "verde", at: "Kp" })],
    [I("magnifying-glass", "Si una falla: **revisa signos**", { estilo: "ambar" })],
  ],
  // Pregunta conceptual
  [
    [T("Dos diagramas distintos, la **misma G(s)**", { centro: true })],
    [T("¿Qué es **necesariamente** cierto?", { estilo: "oscura", size: 60, centro: true })],
    [T("✗ mismos lazos   ✗ mismas señales internas   ✗ misma estructura", { id: "no", estilo: "roja", at: "lazos" })],
    [T("✓ misma salida ante la misma entrada (**CI = 0**)", { id: "si", estilo: "verde", at: "salida" }), ok("si", { at: "entrada" })],
  ],
  // Clímax
  [
    [T("El truco para el diagrama **enredado**", { estilo: "oscura", size: 60, centro: true })],
    [F("e_1=\\dots,\\quad e_2=\\dots,\\quad e_3=\\dots", { id: "eqs", at: "nombre" })],
    [cambia("eqs", "\\text{álgebra}\\;\\Rightarrow\\;G(s)", { at: "álgebra" }), T("Una ecuación **por sumador**: funciona siempre", { estilo: "verde", centro: true })],
    [I("path", "Muchos lazos cruzados → **Mason** (vídeo 09)", { at: "Mason" })],
  ],
  // Cierre
  [
    [T("Reduce el mismo diagrama **dos veces**: reglas y ecuaciones", { centro: true })],
    [],
  ],
];
