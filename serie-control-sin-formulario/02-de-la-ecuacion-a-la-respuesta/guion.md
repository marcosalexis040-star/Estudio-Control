# 02 · De la ecuación diferencial a la respuesta en cinco pasos

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | tutorial paso a paso |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | función de transferencia, polos y ceros, cancelación, fracciones parciales por el método de tapar, valor final, ganancia de CD |
| Frases | 37 |
| Palabras | 478 |
| Duración estimada | ~3:03 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Te dan una ecuación diferencial y te piden la salida en el tiempo. | Primer fotograma: hoja de examen con ÿ + 3ẏ + 2y = u y la pregunta «y(t) = ?» en rojo. | push in rápido | SVG |
| 2 | Si te pones a integrar, se te van veinte minutos del examen. | Reloj de 100 min; se come 20 min en rojo. El perrito cae y se lleva la pata a la cabeza. | deriva lenta | Phosphor `timer` · perrito |
| 3 | Con Laplace son cinco pasos y uno de comprobación. | Aparecen seis casillas numeradas 1–5 y ✓, en blanco. | push out | SVG |

## Paso 1 · brillo ED a función de transferencia

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Ejemplo: la segunda derivada de y, más tres veces su derivada, más dos y, igual a u. | La ED en grande; cada término con su color. | viaje largo a la estación 1 | SVG |
| 5 | Con condiciones iniciales cero, cada derivada es una ese. | ÿ se transforma en s²Y, ẏ en sY, en su sitio. | push in | SVG |
| 6 | Queda ese al cuadrado más tres ese más dos, por Y, igual a U. | (s² + 3s + 2)Y = U. | deriva lenta | SVG |
| 7 | La función de transferencia es salida entre entrada: uno entre ese al cuadrado más tres ese más dos. | G(s) = Y/U = 1/(s² + 3s + 2) en tarjeta blanca; casilla 1 ✓ en verde. | push in | SVG |
| 8 | Su denominador es el polinomio característico, y sus raíces, menos uno y menos dos, son los polos. | El denominador se factoriza en (s + 1)(s + 2); en un mini plano s caen dos × en −1 y −2. | pan con desenfoque | SVG |

## Polos, ceros y cancelación · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 9 | Los ceros son las raíces del numerador. | En el plano s aparece un círculo «○ = cero» junto a las ×. | viaje largo a la estación 2 | SVG |
| 10 | Cuidado: antes de contar polos, cancela los factores comunes. | Advertencia ámbar; el perrito se inclina a mirar. | push in | Phosphor `warning` · perrito |
| 11 | En dos por ese más uno por ese más tres, entre ese menos uno, ese más uno y ese más dos, el factor ese más uno se cancela. | 2(s + 1)(s + 3) / [(s − 1)(s + 1)(s + 2)]; los dos (s + 1) se tachan en verde. | deriva lenta | SVG |
| 12 | Quedan un cero en menos tres y polos en uno y en menos dos. | En el plano: ○ en −3, × en +1 (roja) y × en −2. | push in al plano | SVG |
| 13 | Y la función es propia si el grado de arriba no supera al de abajo. | Etiqueta «grado N ≤ grado D → propia». | deriva lenta | SVG |

## Pasos 2 y 3 · brillo tapar

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 14 | Ahora la entrada: un escalón unitario es uno entre ese. | U(s) = 1/s entra en la fórmula; casilla 2 ✓. | viaje largo a la estación 3 | SVG |
| 15 | Y queda uno entre ese, por ese más uno, por ese más dos. | Y(s) = 1/[s(s + 1)(s + 2)]. | push in | SVG |
| 16 | Escribe un término por cada polo: A entre ese, B entre ese más uno, C entre ese más dos. | Y = A/s + B/(s+1) + C/(s+2), con A, B y C en recuadros vacíos. | deriva lenta | SVG |
| 17 | Método de tapar: tapa el factor del polo y evalúa lo que queda en ese polo. | Una mano (icono) tapa un factor; casilla 3 ✓. | push in | Phosphor `hand-palm` |
| 18 | Para A, tapa la ese y evalúa en cero: un medio. | Se tapa «s»; 1/[(0+1)(0+2)] → 1/2 entra en el recuadro A. | deriva lenta | SVG |
| 19 | Para B, tapa ese más uno y evalúa en menos uno: menos uno. | Se tapa «(s+1)»; 1/[(−1)(1)] → −1 en B. | deriva lenta | SVG |
| 20 | Para C, tapa ese más dos y evalúa en menos dos: un medio. | Se tapa «(s+2)»; 1/[(−2)(−1)] → 1/2 en C. El perrito asiente. | deriva lenta | SVG · perrito |
| 21 | Si un polo se repite, agrega un término con el factor al cuadrado; si son complejos, completa el cuadrado y usa el seno amortiguado. | Dos mini tarjetas: «(s+a)² → A/(s+a) + B/(s+a)²» y «s²+bs+c → (s+b/2)² + ω²». | pan con desenfoque | SVG |

## Pasos 4 y 5 · brillo regresar y comprobar

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 22 | Con la tabla regresas al tiempo. | Cada fracción baja por una flecha: 1/s → 1, 1/(s+a) → e^(−at). Casilla 4 ✓. | viaje largo a la estación 4 | SVG |
| 23 | Y de t igual a un medio, menos e a la menos t, más un medio de e a la menos dos t. | y(t) = 1/2 − e^(−t) + (1/2)e^(−2t), con su curva subiendo a 0.5. | push in | SVG |
| 24 | Compruébalo: en cero da cero, como pedían las condiciones iniciales. | Cursor en t = 0: 1/2 − 1 + 1/2 = 0 ✓; casilla 5 ✓. | push in a la curva | Phosphor `check-circle` |

## Valor final y ganancia de CD · brillo #ff9f1c

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 25 | Y el valor final sale sin regresar al tiempo. | Nueva estación con «lím s→0 sY(s)». | viaje largo a la estación 5 | SVG |
| 26 | Límite de ese por Y con ese a cero: un medio. | s·1/[s(s+1)(s+2)] → la s se cancela → 1/2; coincide con la asíntota de la curva. Casilla ✓. | push in | SVG |
| 27 | Es la ganancia en corriente directa, G de cero, por la amplitud del escalón. | Fórmula y_final = A·G(0). | deriva lenta | SVG |
| 28 | Con ganancia cinco y un escalón de dos, la salida final es diez. | Ejemplo de clase: 5 × 2 → 10, el número se transforma en su sitio. | push in | SVG |
| 29 | Pero ojo: el teorema solo vale si el sistema es estable. | Advertencia roja; el perrito retrocede. | deriva lenta | Phosphor `warning` · perrito |
| 30 | Con uno entre ese por ese menos uno da menos uno, y la señal real explota. | F = 1/[s(s − 1)]: el límite da −1, pero la curva real −1 + e^t se dispara hacia arriba y se sale del cuadro. | pan con desenfoque | SVG |

## Clímax · brillo leer como ingeniero

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 31 | Lee la respuesta como ingeniero. | Golpe y sacudida; brillo rojo. y(t) en grande. | push in con golpe | SVG |
| 32 | El un medio viene del polo de la entrada: es el régimen permanente. | El 1/2 se ilumina en verde y una flecha lo une a la × en s = 0. | deriva lenta | SVG |
| 33 | Las exponenciales vienen de los polos del sistema: son el transitorio que se apaga. | e^(−t) y e^(−2t) se iluminan en azul y se unen a las × en −1 y −2; se desvanecen en la gráfica. | deriva lenta | SVG |
| 34 | Entrada da permanente; polos del sistema dan transitorio. | Rótulo en dos líneas, verde y azul. | push in | SVG |
| 35 | Esa frase te ahorra la mitad del examen. | El perrito celebra con bocadillo `star`. | push out | perrito · Phosphor `star` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 36 | Practica tapar con tres polos distintos hasta hacerlo de memoria. | Plano general: las cinco estaciones con sus casillas ✓ unidas por el camino. | push out a plano general | SVG |
| 37 | Sígueme para más trucos de control. | Tarjeta de perfil @perritoCAD; el cursor pulsa «Seguir» → «Siguiendo». | push in a la tarjeta | perrito-avatar.png |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| ED → G(s) con CI = 0; polinomio característico; polos −1 y −2 | Libro de Vásquez López (2018) §1.4 y Ej. 12; artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) tema 3 |
| Cancelación 2(s²+4s+3)/[(s−1)(s+1)(s+2)]: cero en −3, polos en 1 y −2 | Libro §1.5, Ej. 15; artifact Laboratorio, «Clasificación y polos/ceros» |
| Propia si grado N ≤ grado D | Libro §1.5 |
| 1/[s(s+1)(s+2)] = 1/(2s) − 1/(s+1) + 1/[2(s+2)] → y = 1/2 − e^(−t) + e^(−2t)/2 | Artifact [Laplace sin formulario](https://claude.ai/artifact/3XoEmi2ge3mH57Knz1Ev6R) §6; sympy (`comprobaciones/verificar.py`) |
| y_final = A·G(0); ganancia 5 con escalón 2 → 10 | Apuntes Clase 3 parte 2 (8 oct 2026), 00:03–02:24 |
| Trampa 1/[s(s−1)]: el límite da −1 pero f(t) = −1 + e^t diverge | Artifact Laplace §8 |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| Laplace | Laplás |
| 1/2 | un medio (ya va en palabras) |

## Medios
Todo dibujado o animado. Ningún medio de la web.
