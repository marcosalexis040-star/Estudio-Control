# 15 · Los 10 errores que te quitan puntos en el integrador (y la estrategia para 100 minutos)

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | errores y cómo arreglarlos |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | repaso final de toda la serie; errores típicos; estrategia de tiempo; plano general de los 15 vídeos |
| Frases | 33 |
| Palabras | 370 |
| Duración estimada | ~2:24 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Llevas semanas estudiando y vas a perder puntos por errores que no son de teoría. | Primer fotograma: hoja de examen con una calificación que baja de 100 a 70 en rojo. | push in rápido | SVG |
| 2 | En el integrador, una respuesta sin procedimiento vale cero aunque esté bien. | Resultado correcto encerrado con «0 pts» al lado; el perrito cae. | deriva lenta | SVG · perrito |
| 3 | Estos son los diez errores que más puntos quitan, y cómo arreglarlos. | Diez tarjetas rojas boca abajo en un camino. | push out | SVG |

## Errores 1 a 3 · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Error uno: dar el resultado sin justificar. | Tarjeta 1 se voltea: resultado suelto, rojo. | viaje largo a la estación 1 | SVG |
| 5 | Arreglo: escribe siempre qué fórmula usas y por qué aplica. | La tarjeta se vuelve verde con «fórmula + por qué». | push in | Phosphor `check-circle` |
| 6 | Error dos: leer K y tau sin normalizar el denominador. | Tarjeta 2: 4/(s + 2) → K = 4 ✗. | deriva lenta | SVG |
| 7 | Arreglo: haz que el término constante valga uno antes de comparar. | 2/(0.5s + 1) → K = 2 ✓. | deriva lenta | SVG |
| 8 | Error tres: calcular el tiempo pico con omega ene. | Tarjeta 3: π/ωn ✗. | pan con desenfoque | SVG |
| 9 | Arreglo: el tiempo pico usa la parte imaginaria, omega de. | π/ωd ✓; en el plano s, la altura del polo. El perrito asiente. | push in | SVG · perrito |

## Errores 4 y 5 · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 10 | Error cuatro: medir beta desde el eje imaginario. | Tarjeta 4: arco desde el eje imaginario ✗. | viaje largo a la estación 2 | SVG |
| 11 | Arreglo: beta se mide desde el eje real negativo y su coseno es zeta. | Arco desde el eje real negativo ✓; cos β = ζ. | push in | SVG |
| 12 | Error cinco: decir más rápido sin decir con qué tiempo. | Tarjeta 5: «más rápido» sin unidades ✗. | deriva lenta | SVG |
| 13 | Arreglo: nombra el reloj; normalmente, el de establecimiento, cuatro entre sigma. | «rápido = tₛ = 4/σ» ✓. | deriva lenta | Phosphor `clock` |

## Errores 6 a 8 · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 14 | Error seis: en Mason, multiplicar lazos que comparten un nodo. | Tarjeta 6: L₁·L₂ con nodo común ✗. | viaje largo a la estación 3 | SVG |
| 15 | Arreglo: márcalos de colores y solo multiplica los que no tienen nada en común. | Lazos coloreados; solo L₁L₄ y L₂L₄ ✓. | push in | SVG |
| 16 | Error siete: en Routh, copiar un número en lugar de hacer la cruz. | Tarjeta 7: celda copiada ✗. | deriva lenta | SVG |
| 17 | Arreglo: cada elemento sale de su cruz, y donde no hay número va un cero. | Cruz dibujada ✓; celda vacía = 0. | deriva lenta | SVG |
| 18 | Error ocho: contar negativos en vez de cambios de signo. | Tarjeta 8: «1 negativo = 1 raíz» ✗. | pan con desenfoque | SVG |
| 19 | Arreglo: recorre la primera columna de arriba abajo y cuenta cada cambio. | Columna 1, 3, −5/3, 112/5, 8 con dos flechas de cambio ✓. El perrito salta. | push in | SVG · perrito |

## Errores 9 y 10 · brillo #ff9f1c

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 20 | Error nueve: usar el valor final en un sistema inestable. | Tarjeta 9: lím sF = −1 con una curva que explota ✗. | viaje largo a la estación 4 | SVG |
| 21 | Arreglo: Routh primero, error después. | Candado «Routh ✓ → e_ss». | push in | Phosphor `lock` |
| 22 | Error diez: olvidar la ganancia de referencia en retroalimentación de estados. | Tarjeta 10: polos bien colocados pero la salida en 0.125 ✗. | deriva lenta | SVG |
| 23 | Arreglo: después de colocar polos, revisa la ganancia en cero y ajústala a uno. | T(0) = 1 con k₃ ✓; la curva llega a 1. | deriva lenta | SVG |

## La estrategia de 100 minutos · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 24 | Y la estrategia para los 100 minutos. | Reloj de 100 min dividido en tramos de colores. | viaje largo a la estación 5 | Phosphor `timer` |
| 25 | Los primeros cinco minutos, lee todo y empieza por el problema que más puntos da por minuto. | Tramo de 5 min: los problemas se ordenan por «pts/min». | push in | SVG |
| 26 | Deduce las fórmulas en la hoja cuando las necesites: eso también cuenta como procedimiento. | Una deducción corta de tₚ = π/ωd escrita en la hoja, con ✓. | deriva lenta | SVG |
| 27 | Comprueba cada resultado con un caso fácil, como k igual a cero o el valor final. | Dos sellos: «k = 0 ✓» y «lím s→0 ✓». | deriva lenta | SVG |
| 28 | Y deja diez minutos al final para revisar signos. | Último tramo de 10 min con una lupa sobre los signos. El perrito asiente. | push in | SVG · perrito · Phosphor `magnifying-glass` |

## Clímax · brillo la frase que une el curso

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 29 | Recuerda la frase que une todo el curso. | Golpe y sacudida; brillo rojo. | push in con golpe | SVG |
| 30 | Los polos lo deciden todo: si es estable, qué tan rápido, cuánto se pasa y cuánto oscila. | Un par de × grande en el centro; cuatro flechas a «estable», «rápido», «se pasa», «oscila». | deriva lenta | SVG |
| 31 | Laplace los encuentra, los diagramas los esconden, Routh los cuenta y la retroalimentación los mueve. | Cuatro verbos se encienden uno por uno alrededor de las ×. El perrito celebra con bocadillo `trophy`. | push out | perrito · Phosphor `trophy` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 32 | Repasa la serie completa una vez antes del examen. | Push out a plano general con las 15 estaciones de la serie unidas por el camino, cada una con su título. | push out a plano general | SVG |
| 33 | Mucho éxito en tu integrador. | Tarjeta final «Fin de la serie» con el mapa de los 15 vídeos. | push in a la tarjeta | SVG |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| Una respuesta sin procedimiento vale cero | Instrucciones del Examen Integrador 1, 23 oct 2026 (`Ex_integrdor1.pdf`) |
| 100 minutos | Dato que diste tú. El Integrador 1 de 2026 y el de 2025 duraban 90 min. [COMPROBAR] con el profesor la duración del que viene |
| Cada error y su arreglo | Vídeos 03, 05, 06, 09, 10, 11 y 14 de esta serie, con sus fuentes |
| Ejemplos numéricos (4/(s + 2), columna 1, 3, −5/3, 112/5, 8, salida en 0.125) | Apuntes Clase 2 (1 oct 2026), Clase 4 parte 2 (15 oct 2026), ExR 4; sympy |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| 100 | cien |
| 10 | diez |
| tau | táu |

## Medios
Todo dibujado.
