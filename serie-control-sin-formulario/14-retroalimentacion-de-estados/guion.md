# 14 · Retroalimentación de estados: coloca los polos donde quieras

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | tutorial paso a paso (dos exámenes rápidos resueltos) |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | u = −Kx + k₃·v_ref; A − BK; colocación de polos comparando polinomios; ExR 4 (doble integrador); ExR 5 (con −b); ganancia de referencia para error cero; diagrama de control |
| Frases | 34 |
| Palabras | 509 |
| Duración estimada | ~3:14 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Encuentra K para que los polos de lazo cerrado queden en menos dos más menos dos jota. | Primer fotograma: «K = ?» y dos × en −2 ± j2 en rojo. | push in rápido | SVG |
| 2 | Suena a teoría moderna, pero es el mismo truco de siempre: comparar polinomios. | Las tarjetas TENGO/QUIERO del vídeo 07 vuelven. El perrito cae entre ellas. | deriva lenta | SVG · perrito |
| 3 | Lo resolvemos con los dos exámenes rápidos. | Dos tarjetas: «ExR 4» y «ExR 5». | push out | SVG |

## La ley de control · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | En retroalimentación de estados, la entrada se calcula con todos los estados. | Planta con x₁ y x₂ saliendo; flechas que regresan a u. | viaje largo a la estación 1 | SVG |
| 5 | U es menos K por x, más una referencia escalada. | u = −Kx + k₃·v_ref. | push in | SVG |
| 6 | K es un renglón de ganancias: k1 por x1, más k2 por x2. | K = [k₁ k₂]; Kx = k₁x₁ + k₂x₂. | deriva lenta | SVG |
| 7 | Al sustituir, la nueva matriz del sistema es A menos B por K. | ẋ = (A − BK)x + Bk₃v_ref. | deriva lenta | SVG |
| 8 | Y los polos de lazo cerrado salen del determinante de ese I menos A más B K. | det(sI − A + BK) = 0. El perrito asiente. | push in | SVG · perrito |

## Examen rápido 4 · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 9 | Examen rápido cuatro: A es cero, uno; cero, cero. Es un doble integrador. | A = [0 1; 0 0], B = [0; 1]; diagrama 1/s → 1/s. | viaje largo a la estación 2 | SVG |
| 10 | B es cero, uno, así que B por K solo llena la última fila con k1 y k2. | BK = [0 0; k₁ k₂]. | push in | SVG |
| 11 | A menos B K queda cero, uno; menos k1, menos k2. | A − BK = [0 1; −k₁ −k₂]. | deriva lenta | SVG |
| 12 | Otra vez la forma canónica: el polinomio es ese al cuadrado más k2 ese más k1. | s² + k₂s + k₁ (tarjeta TENGO). | deriva lenta | SVG |
| 13 | El deseado, con polos en menos dos más menos dos jota, es ese más dos al cuadrado más cuatro: ese al cuadrado más cuatro ese más ocho. | (s + 2)² + 4 = s² + 4s + 8 (tarjeta QUIERO). | push in | SVG |
| 14 | Igualando: k1 es ocho y k2 es cuatro. | k₁ = 8, k₂ = 4; K = [8 4], verde. | deriva lenta | Phosphor `check-circle` |

## Colocar polos no basta · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 15 | Con la salida en x1 y la referencia sin escalar, el lazo cerrado es uno entre ese al cuadrado más cuatro ese más ocho. | y = x₁; T(s) = 1/(s² + 4s + 8). | viaje largo a la estación 3 | SVG |
| 16 | Su ganancia en cero es un octavo: la salida llega a 0.125, y el error al escalón es siete octavos. | La curva sube y se queda en 0.125; hueco de 0.875 en rojo. | push in | SVG |
| 17 | Colocar polos no garantiza que llegue a donde quieres. | Tarjeta ámbar «polos ✓, valor final ✗». El perrito se inclina. | deriva lenta | SVG · perrito |

## Examen rápido 5 · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 18 | Examen rápido cinco: A es cero, uno; cero, menos b. | A = [0 1; 0 −b], B = [0; 1], C = [1 0]. | viaje largo a la estación 4 | SVG |
| 19 | Primero la función: C por ese I menos A inversa por B da uno entre ese por ese más b. | Truco de la inversa (vídeo 13) → G(s) = 1/[s(s + b)]. | push in | SVG |
| 20 | Ahora u es menos k1 x1, menos k2 x2, más k3 por la referencia. | u = −k₁x₁ − k₂x₂ + k₃v_ref. | deriva lenta | SVG |
| 21 | A menos B K da el polinomio ese al cuadrado más b más k2 por ese, más k1. | s² + (b + k₂)s + k₁ (TENGO). | deriva lenta | SVG |
| 22 | Piden los dos polos en menos dos b: el deseado es ese más dos b, al cuadrado. | Dos × juntas en −2b; (s + 2b)² (QUIERO). | push in | SVG |
| 23 | Ese al cuadrado más cuatro b ese más cuatro b al cuadrado. | s² + 4bs + 4b². | deriva lenta | SVG |
| 24 | Igualando: k1 es cuatro b al cuadrado y k2 es tres b. | k₁ = 4b², k₂ = 3b, en su sitio. El perrito salta. | push in | SVG · perrito |
| 25 | El lazo cerrado es k3 entre ese más dos b, al cuadrado. | T(s) = k₃/(s + 2b)². | deriva lenta | SVG |

## Clímax · brillo la ganancia de referencia

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 26 | Y aquí está el punto del examen. | Golpe y sacudida; brillo rojo. | push in con golpe | SVG |
| 27 | Para error cero al escalón, la ganancia en cero debe ser uno. | T(0) = 1 en tarjeta grande. | deriva lenta | SVG |
| 28 | K3 entre cuatro b al cuadrado igual a uno: k3 es cuatro b al cuadrado, igual a k1. | k₃/(4b²) = 1 → k₃ = 4b² = k₁; la curva sube y llega a 1, verde. | push in | SVG |
| 29 | Así que en el examen rápido cuatro, con la referencia multiplicada por ocho, el error sería cero. | De vuelta a la estación 3: el hueco rojo se cierra cuando v_ref se multiplica por 8. | viaje largo de regreso a la estación 3 | SVG |
| 30 | Con esta estructura, salida en x1 y entrada en la última fila, la ganancia de referencia es el término independiente del polinomio deseado. | Tarjeta verde «k₃ = término independiente», con la nota «si y = x₁ y B = [0; 1]». El perrito celebra con bocadillo `target`. | push out | perrito · Phosphor `target` |

## El diagrama que piden · brillo #ff9f1c

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 31 | Si te piden el diagrama: la referencia pasa por k3, entra a un sumador, y le restas k1 por x1 y k2 por x2. | v_ref → k₃ → sumador; ramas −k₁x₁ y −k₂x₂ llegan al sumador. | viaje largo a la estación 5 | SVG |
| 32 | La salida del sumador es u, que entra a la planta, y los dos estados regresan por sus ganancias. | u → planta (1/s, −b, 1/s) → x₂ y x₁, que vuelven por k₂ y k₁. | pan con desenfoque | SVG |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 33 | Repite el examen cuatro con polos dobles en menos tres, y comprueba que k1 sale nueve y k2 sale seis. | Plano general de las cinco estaciones; tarjeta reto: (s + 3)² = s² + 6s + 9. | push out a plano general | SVG |
| 34 | Sígueme para más trucos de control. | Tarjeta de perfil @perritoCAD; «Seguir» → «Siguiendo». | push in a la tarjeta | perrito-avatar.png |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| ExR 4: A = [0 1; 0 0], B = [0; 1], u = −Kx + v_ref, polos en −2 ± 2i | `Examen Rapido 5.pdf` (encabezado «Examen rápido 4») |
| K = [8 4]; con y = x₁, T(s) = 1/(s² + 4s + 8), y∞ = 1/8, e_ss = 7/8 | sympy (`comprobaciones/verificar.py`). [COMPROBAR] el enunciado no dice la matriz C; el vídeo dice «con la salida en x1» |
| ExR 5: A = [0 1; 0 −b], B = [0; 1], C = [1 0], u = −k₁x₁ − k₂x₂ + k₃v_ref, polos en −2b | `Examen Rapido 6.pdf` (encabezado «Examen rápido 5») |
| G = 1/[s(s + b)]; k₁ = 4b², k₂ = 3b; T = k₃/(s + 2b)²; k₃ = 4b² | sympy |
| (s + 3)² → k₁ = 9, k₂ = 6 | Cuenta directa |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| K | ka |
| k1 / k2 / k3 | ka uno / ka dos / ka tres |
| v_ref | referencia (ya va así en la voz) |
| A menos B K | a menos be ka |
| 0.125 | cero punto ciento veinticinco |
| b | be |

## Medios
Todo dibujado.
