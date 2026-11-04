# 03 · Primer orden: lee K y tau en tres segundos

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | explicación de un concepto |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | forma estándar K/(τs+1), normalización, 63 % y 98 %, identificación con una gráfica, circuito RC, rampa e impulso |
| Frases | 36 |
| Palabras | 448 |
| Duración estimada | ~2:53 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | En una gráfica de primer orden hay un número escondido que te da medio problema. | Primer fotograma: curva de primer orden subiendo; un signo «?» parpadea sobre el eje del tiempo. | push in rápido | SVG · Phosphor `question` |
| 2 | Si no sabes dónde mirar, te quedas sin la constante de tiempo. | La curva se pone roja; el perrito cae y mira la gráfica sin entender. | deriva lenta | perrito |
| 3 | Hoy aprendes a leerla en tres segundos. | Cronómetro de 3 s en verde. | push out | Phosphor `timer` |

## Forma estándar · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Un sistema de primer orden tiene un solo polo real. | Plano s con una sola × sobre el eje real negativo. | viaje largo a la estación 1 | SVG |
| 5 | Su forma estándar es K entre tau ese más uno. | G(s) = K/(τs + 1) en tarjeta blanca. | push in | SVG |
| 6 | K es la ganancia: cuánto vale la salida final por cada unidad de entrada. | La «K» se ilumina y una flecha va a la altura final de la curva. | deriva lenta | SVG |
| 7 | Tau es la constante de tiempo: qué tan rápido llega. | La «τ» se ilumina y una flecha va al eje del tiempo. | deriva lenta | SVG |
| 8 | El polo está en menos uno entre tau. | La × del plano s se etiqueta −1/τ. | push in al plano | SVG |

## Normalizar · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 9 | Primer error típico: leer K y tau sin normalizar. | Tarjeta roja «4/(s + 2) → K = 4 ✗». El perrito niega con la cabeza. | viaje largo a la estación 2 | SVG · perrito |
| 10 | Con cuatro entre ese más dos, factoriza el dos de abajo. | El «2» del denominador sale como factor: 4 / [2(s/2 + 1)]. | push in | SVG |
| 11 | Queda dos entre un medio de ese más uno. | 4/2 se transforma en 2; queda 2/(0.5s + 1). | deriva lenta | SVG |
| 12 | Ahora sí: K vale dos y tau vale un medio. | Tarjeta verde K = 2, τ = 0.5. | push in | Phosphor `check-circle` |

## Respuesta al escalón · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 13 | Ante un escalón de amplitud A, la salida es K por A, por uno menos e a la menos t entre tau. | y(t) = KA(1 − e^(−t/τ)) y la curva se dibuja. | viaje largo a la estación 3 | SVG |
| 14 | En t igual a tau ya llegó al 63 %. | Cursor en t = τ; la marca «63 %» sube por la curva; el número se transforma 0 % → 63 %. | push in | SVG |
| 15 | En cuatro tau, al 98 %: ese es el tiempo de establecimiento. | Cursor salta a t = 4τ; 63 % → 98 %; aparece la banda del 2 %. Etiqueta tₛ = 4τ. | pan con desenfoque | SVG |
| 16 | Y la tangente en el origen corta el valor final justo en t igual a tau. | Recta tangente desde el origen; choca con la línea del valor final sobre t = τ. | deriva lenta | SVG |
| 17 | Sin formulario, estos números salen de e: e a la menos uno es 0.37 y e a la menos cuatro, 0.02. | 1 − 0.37 = 0.63 y 1 − 0.02 = 0.98, en su sitio. El perrito asiente. | push in | SVG · perrito |

## Leer una gráfica · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 18 | Para identificar un modelo con una gráfica, haz dos lecturas. | Gráfica sin fórmula, con dos casillas vacías K y τ. | viaje largo a la estación 4 | SVG |
| 19 | El valor final entre la amplitud de la entrada te da K. | Línea horizontal en el valor final; K = y∞ / A llena su casilla. | push in | SVG |
| 20 | El tiempo donde llega al 63 % de ese valor final te da tau. | Línea al 63 % baja al eje del tiempo; τ llena su casilla. | deriva lenta | SVG |
| 21 | Ejemplo del libro: un termómetro llega al 98 % en un minuto. | Termómetro (dibujo) que sube; marca «98 % en 1 min». | pan con desenfoque | SVG · Phosphor `thermometer` |
| 22 | Eso es cuatro tau, así que tau es un cuarto de minuto. | 4τ = 1 min → τ = 0.25 min, el número se transforma. | push in | SVG |

## Circuito RC · brillo #ff9f1c

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 23 | El circuito RC es el primer orden de manual. | Esquema animado: fuente, resistencia R, capacitor C; la carga del capacitor se llena. | viaje largo a la estación 5 | SVG |
| 24 | El voltaje del capacitor entre el de entrada es uno entre RC ese más uno. | Vc/Vin = 1/(RCs + 1) aparece sobre el esquema. | push in | SVG |
| 25 | Así que tau es R por C, y K es uno. | «τ = RC, K = 1» en verde. | deriva lenta | SVG |

## Rampa e impulso · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 26 | Con una rampa unitaria y K igual a uno, la salida la sigue con un retraso. | Rampa r(t) = t y la salida y(t) paralela, desplazada. | viaje largo a la estación 6 | SVG |
| 27 | Y el error en estado estable es exactamente tau. | Corchete vertical entre las dos rectas: «e∞ = τ». | push in | SVG |
| 28 | En el libro, el termómetro en un baño que sube 10 grados por minuto se queda 2.5 grados atrás. | El termómetro vuelve; 10 °/min × 0.25 min = 2.5 °, en su sitio. | deriva lenta | SVG · Phosphor `thermometer` |
| 29 | Con un impulso, la salida salta a K entre tau y decae. | Curva que empieza en K/τ y decae. | pan con desenfoque | SVG |
| 30 | Y no memorices tres respuestas: la del impulso es la derivada de la del escalón, y esta, la derivada de la de la rampa. | Tres curvas en fila unidas por flechas «d/dt»: rampa → escalón → impulso. El perrito señala. | push out | SVG · perrito |

## Clímax · brillo lo que más confunde

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 31 | Ahora lo que más confunde. | Golpe y sacudida; brillo rojo. | push in con golpe | SVG |
| 32 | Subir K no hace más rápido al sistema: solo lo hace llegar más alto. | Tres curvas con K = 1, 2 y 4: todas cruzan el 63 % en el mismo t = τ. | deriva lenta | SVG |
| 33 | Lo rápido lo decide tau, es decir, dónde está el polo. | Tres curvas con τ = 0.5, 1 y 2, y sus × en el plano s moviéndose. | pan con desenfoque | SVG |
| 34 | Mientras más a la izquierda está el polo, más rápido responde. | La × se va a la izquierda y la curva se comprime. El perrito celebra con bocadillo `lightning`. | push in | perrito · Phosphor `lightning` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 35 | Dibuja una curva de primer orden y marca 63 % y 98 % sin mirar. | Plano general de las seis estaciones unidas por el camino. | push out a plano general | SVG |
| 36 | En el siguiente vídeo: segundo orden y el triángulo del polo. | Tarjeta final «Siguiente · 04» con el título del próximo vídeo y el mapa de la serie. | push in a la tarjeta | SVG |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| K/(τs+1), polo en −1/τ, y = KA(1 − e^(−t/τ)) | Libro de Vásquez López §4.1.1; apuntes clase 24 sep 2026 y clase 2 parte 0 (1 oct 2026) |
| 4/(s+2) → K = 2, τ = 0.5 | Apuntes Clase 2 (1 oct 2026), 00:56–02:50 (G₁ comprobada en pantalla) |
| 63.2 % en τ, 98 % en 4τ, tangente corta en τ | Libro §4.1.1; artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) tema 1; 1 − e^(−1) = 0.6321 y 1 − e^(−4) = 0.9817 (sympy) |
| Termómetro: 98 % en 1 min → τ = 0.25 min; baño a 10 °/min → error 2.5 ° | Libro Ej. 25 |
| RC: Vc/Vin = 1/(RCs+1) | Libro Ej. 26; apuntes clase 24 sep 2026, 51–61 min |
| Error a la rampa = τ (K = 1); impulso = derivada del escalón | Libro §4.1.2–4.1.4 |
| Cambiar K no cambia la rapidez | Guía «Simulación 1er orden» del profesor, partes 1 y 2; apuntes Clase 2 |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| 63 % | sesenta y tres por ciento |
| 98 % | noventa y ocho por ciento |
| 0.37 | cero punto treinta y siete |
| 0.02 | cero punto cero dos |
| 10 | diez |
| 2.5 | dos punto cinco |
| tau | táu |
| RC | erre ce |

## Medios
Dibujado: termómetro, circuito RC y curvas. Opcional: una foto real de un circuito RC en protoboard (ver `MEDIOS-WEB.md`, M3, todavía sin confirmar).
