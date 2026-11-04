// API para escribir visual.mjs. Cada frase del guion recibe una lista de operaciones.
// Piezas nuevas (se apilan en la estación del bloque):
//   T(texto, o)   texto en tarjeta. **palabra** resalta; $..$ es fórmula en línea.
//   F(latex, o)   fórmula grande (KaTeX).
//   G(spec, o)    gráfica en el tiempo (ver graficas.mjs: plot).
//   S(spec, o)    plano s (ver graficas.mjs: plano).
//   D(spec, o)    diagrama de bloques (ver diagramas.mjs).
//   Tab(filas, o) tabla; una celda puede ser "texto", "$latex$" o {t, capa, marca}.
//   I(icono, texto, o)  icono de Phosphor con texto.
//   Fila([piezas], o)   piezas lado a lado.
// Cambios sobre piezas existentes (por id):
//   cambia(id, nuevo)  la pieza se transforma en su sitio (texto o latex nuevo).
//   capa(id, nombre) / oculta(id, nombre)   muestra u oculta una capa de una gráfica, plano, diagrama o tabla.
//   mueve(id, polo, [re, im])   desplaza un polo (y su conjugado).
//   tacha(id), ok(id), mal(id), brilla(id), limpia()
// Opciones comunes: id, at ("palabra" o "palabra#2": aparece al decirla), estilo, size, w.
export const T = (texto, o = {}) => ({ k: "txt", texto, ...o });
export const F = (latex, o = {}) => ({ k: "tex", latex, ...o });
export const G = (spec, o = {}) => ({ k: "plot", spec, ...o });
export const S = (spec, o = {}) => ({ k: "plano", spec, ...o });
export const D = (spec, o = {}) => ({ k: "diag", spec, ...o });
export const Tab = (filas, o = {}) => ({ k: "tabla", filas, ...o });
export const I = (icono, texto = "", o = {}) => ({ k: "icono", icono, texto, ...o });
export const Fila = (hijos, o = {}) => ({ k: "fila", hijos, ...o });

export const cambia = (id, nuevo, o = {}) => ({ k: "cambia", id, nuevo, ...o });
export const capa = (id, nombre, o = {}) => ({ k: "capa", id, nombre, ...o });
export const oculta = (id, nombre, o = {}) => ({ k: "oculta", id, nombre, ...o });
export const mueve = (id, polo, a, o = {}) => ({ k: "mueve", id, polo, a, ...o });
export const tacha = (id, o = {}) => ({ k: "tacha", id, ...o });
export const ok = (id, o = {}) => ({ k: "ok", id, ...o });
export const mal = (id, o = {}) => ({ k: "mal", id, ...o });
export const brilla = (id, o = {}) => ({ k: "brilla", id, ...o });
export const limpia = (o = {}) => ({ k: "limpia", ...o });

// Respuestas y utilidades numéricas para las gráficas
export { resp } from "./graficas.mjs";
