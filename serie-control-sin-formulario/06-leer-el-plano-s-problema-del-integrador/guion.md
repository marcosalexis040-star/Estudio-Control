# 06 · El problema de los cinco polos del integrador, resuelto sin cuentas largas

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | tutorial paso a paso (problema de examen resuelto) |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | líneas del plano s (horizontal, vertical, rayo y círculo); problema 1 del Integrador 1 (2026); preguntas del ExR 3b; escalar polos |
| Frases | 34 |
| Palabras | 433 |
| Duración estimada | ~2:47 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Este problema valió 40 puntos en el integrador y se resuelve sin una sola cuenta larga. | Primer fotograma: el enunciado del problema 1 (redibujado en tarjeta, sin el PDF) y «40 pts» en rojo. | push in rápido | SVG |
| 2 | Cinco pares de polos, cinco preguntas. | Cinco × aparecen de golpe en un plano s y cinco casillas a–e. El perrito cae entre ellas. | deriva lenta | SVG · perrito |
| 3 | Si sabes qué mira cada métrica, terminas en cinco minutos. | Cronómetro de 5 min en verde. | push out | Phosphor `timer` |

## El mapa de las cuatro líneas · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Primero el mapa. | Plano s vacío con rejilla. | viaje largo a la estación 1 | SVG |
| 5 | Una línea horizontal tiene la misma parte imaginaria: mismo tiempo pico. | Se dibuja una horizontal violeta; etiqueta «ωd igual → tₚ igual». | push in | SVG |
| 6 | Una línea vertical tiene la misma parte real: mismo tiempo de establecimiento. | Vertical verde azulado; «σ igual → tₛ igual». | deriva lenta | SVG |
| 7 | Un rayo desde el origen tiene el mismo ángulo: mismo zeta y mismo sobreimpulso. | Rayo ámbar; «β igual → ζ y Mₚ iguales». | deriva lenta | SVG |
| 8 | Y un círculo centrado en el origen tiene la misma omega ene. | Círculo blanco punteado; «ωn igual». El perrito asiente. | push out | SVG · perrito |

## Los polos del examen · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 9 | Los polos del examen: menos dos más menos jota cuatro, menos cuatro más menos jota ocho, menos cuatro más menos jota cuatro, menos dos más menos jota ocho y menos ocho más menos jota cuatro. | Las cinco × caen una por una en su sitio, numeradas s₁ a s₅, en P("cuatro"), P("ocho")… | viaje largo a la estación 2 | SVG |
| 10 | Ubícalos en el plano antes de calcular nada. | Mitad superior resaltada: s₁ (−2, 4), s₂ (−4, 8), s₃ (−4, 4), s₄ (−2, 8), s₅ (−8, 4). | push in | SVG |

## Inciso a · brillo mismo sobreimpulso

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 11 | ¿Cuáles tienen el mismo sobreimpulso? | Casilla «a» se ilumina. | viaje largo a la estación 3 | SVG |
| 12 | El segundo es exactamente el doble del primero: menos cuatro más jota ocho es dos veces menos dos más jota cuatro. | Flecha que estira s₁ hasta s₂ por el mismo rayo: «×2». | push in | SVG |
| 13 | Están sobre el mismo rayo, con zeta de 0.45, y los dos tienen 21 % de sobreimpulso. | El rayo ámbar pasa por s₁ y s₂; ζ = 0.45 y Mₚ = 21 % en ambos. Casilla a ✓. | deriva lenta | SVG · Phosphor `check-circle` |

## Incisos b y c · brillo pico y establecimiento

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 14 | ¿Mismo tiempo pico? Agrupa por parte imaginaria. | Casilla «b»; aparecen horizontales en j4 y j8. | viaje largo a la estación 4 | SVG |
| 15 | Con omega de igual a cuatro están el primero, el tercero y el quinto: tiempo pico de pi cuartos, 0.79 segundos. | s₁, s₃ y s₅ se iluminan sobre j4; tₚ = π/4 = 0.79 s. | push in | SVG |
| 16 | Con omega de igual a ocho, el segundo y el cuarto: 0.39 segundos. | s₂ y s₄ sobre j8; tₚ = π/8 = 0.39 s. Casilla b ✓. | deriva lenta | SVG |
| 17 | ¿Mismo establecimiento? Agrupa por parte real. | Casilla «c»; verticales en −2 y −4. | pan con desenfoque | SVG |
| 18 | Sigma igual a dos: el primero y el cuarto, con 2 segundos. | s₁ y s₄ sobre σ = 2; tₛ = 4/2 = 2 s. | push in | SVG |
| 19 | Sigma igual a cuatro: el segundo y el tercero, con 1 segundo. | s₂ y s₃ sobre σ = 4; tₛ = 4/4 = 1 s. Casilla c ✓. | deriva lenta | SVG |

## Incisos d y e · brillo el mejor

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 20 | ¿Menor sobreimpulso? El de menor ángulo respecto al eje real negativo. | Casilla «d»; cinco arcos β se comparan. | viaje largo a la estación 5 | SVG |
| 21 | Es el quinto: menos ocho más menos jota cuatro, con zeta de 0.89 y menos de 0.2 % de sobreimpulso. | s₅ se ilumina: β = 26.6°, ζ = 0.89, Mₚ = 0.19 %. Casilla d ✓. | push in | SVG |
| 22 | ¿Respuesta más rápida? El que tiene la parte real más negativa. | Casilla «e»; las verticales se ordenan de izquierda a derecha. | deriva lenta | SVG |
| 23 | Otra vez el quinto: se establece en medio segundo. | s₅: tₛ = 4/8 = 0.5 s. Casilla e ✓. El perrito salta. | push in | SVG · perrito |
| 24 | Y di qué reloj usas: aquí, el tiempo de establecimiento. | Rótulo «rápido = tₛ (justifícalo)». | deriva lenta | Phosphor `clock` |

## Mover sobre el rayo · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 25 | Pregunta de examen rápido: para bajar el establecimiento sin cambiar el sobreimpulso, ¿alejas los polos sobre el mismo rayo? | Tarjeta «Verdadero / Falso» con tres polos a, b y c sobre un rayo. | viaje largo a la estación 6 | SVG |
| 26 | Verdadero: el ángulo se conserva y la parte real crece. | El polo a se desliza por el rayo hasta c; σ crece, β igual; «V» en verde. | push in | SVG |
| 27 | Multiplicar los polos por k es acelerar la misma curva k veces. | Dos curvas, una comprimida en el tiempo; en tiempo normalizado ωn·t se superponen. | pan con desenfoque | SVG |
| 28 | Y si piden rapidez y poco sobreimpulso a la vez, elige el polo más a la izquierda y más pegado al eje real. | Opciones −1 ± j8, −4 ± j4, −8 ± j1 y −2 ± j2; gana −8 ± j1 en verde. | deriva lenta | SVG |

## Clímax · brillo las tres confusiones

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 29 | Las tres confusiones que más puntos quitan. | Golpe y sacudida; brillo rojo; tres tarjetas rojas. | push in con golpe | SVG |
| 30 | El sobreimpulso no depende de la distancia al origen, sino del ángulo. | Tarjeta 1 se voltea a verde: «Mₚ ← ángulo». | deriva lenta | SVG |
| 31 | El tiempo pico se calcula con omega de, no con omega ene. | Tarjeta 2 a verde: «tₚ = π/ωd». | deriva lenta | SVG |
| 32 | Y beta se mide desde el eje real negativo. | Tarjeta 3 a verde: arco desde el eje real negativo. El perrito celebra con bocadillo `check-circle`. | push out | perrito · Phosphor `check-circle` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 33 | Dibuja tus cinco polos y responde las cinco preguntas en voz alta. | Plano general de las seis estaciones con las cinco casillas ✓. | push out a plano general | SVG |
| 34 | En el siguiente vídeo: cómo encontrar a, b o k para lo que te piden. | Tarjeta final «Siguiente · 07» con el título del próximo vídeo y el mapa de la serie. | push in a la tarjeta | SVG |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| Enunciado y 40 puntos del problema 1 | Examen Integrador 1, 23 oct 2026 (`Ex_integrdor1.pdf`) |
| a) s₁ y s₂, mismo ángulo, ζ = 0.44–0.45 | Solución oficial (`Ex_integrdor1_solucion.pdf`, p. 1); sympy: ζ = 0.447, Mₚ = 20.79 % |
| b) ωd = 4: s₁, s₃, s₅, tₚ = 0.785 s; ωd = 8: s₂, s₄, tₚ = 0.393 s | Solución oficial (dice 0.78 y 0.39); sympy |
| c) σ = 2: s₁, s₄ (2 s); σ = 4: s₂, s₃ (1 s) | Solución oficial; sympy |
| d) y e) s₅: β = 26.6°, ζ = 0.894, Mₚ = 0.19 %, tₛ = 0.5 s | Solución oficial (justifica por ángulo y por mayor parte real); sympy |
| Mover sobre el mismo rayo baja tₛ sin cambiar Mₚ (Verdadero) | ExR 3b (13 oct 2026), pregunta 2; artifact [Del polo a la respuesta](https://claude.ai/artifact/Jd34SCxbLtsozfW5Y5FAkG) §5 |
| Rápido y poco sobreimpulso: −8 ± j1 | ExR 3b, pregunta 3; sympy: tₛ = 0.5 s y Mₚ ≈ 0 % |
| Las tres confusiones | Artifact Del polo a la respuesta, «Confusiones frecuentes» |

La pregunta 4 del ExR 3b (y_max = 1.2) **no se usa**: ninguna de sus cuatro opciones da 1.2 (sympy: 1.000, 1.043, 1.730 y 1.000). [COMPROBAR] con el profesor si el enunciado tenía otra opción.

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| 40 | cuarenta |
| 0.45 | cero punto cuarenta y cinco |
| 21 % | veintiún por ciento |
| 0.79 / 0.39 | cero punto setenta y nueve / cero punto treinta y nueve |
| 0.89 | cero punto ochenta y nueve |
| 0.2 % | cero punto dos por ciento |

## Medios
Todo dibujado. El enunciado se redibuja en una tarjeta; no se muestra el PDF del examen.
