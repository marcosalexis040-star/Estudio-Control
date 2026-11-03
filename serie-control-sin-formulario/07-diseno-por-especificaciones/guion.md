# 07 · Encuentra a, b o k para el comportamiento que te piden

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | tutorial paso a paso |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | comparar el polinomio que tienes con el que quieres; Integrador 1 (2025) problema 1; ExR 2 (kp, kd, kf); región permitida (Ej. 27); límite de un control proporcional |
| Frases | 34 |
| Palabras | 475 |
| Duración estimada | ~3:01 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Encuentra a y b para que la respuesta sea críticamente amortiguada. | Primer fotograma: el enunciado en tarjeta, con «a = ?» y «b = ?» en rojo. | push in rápido | SVG |
| 2 | Si no sabes por dónde empezar, ese problema se te va entero. | Los puntos del problema caen al suelo; el perrito cae con ellos. | deriva lenta | SVG · perrito |
| 3 | El método siempre es el mismo: polinomio que tienes contra polinomio que quieres. | Dos tarjetas enfrentadas, «TENGO» y «QUIERO», con un signo = en medio. | push out | SVG |

## El método · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Paso uno: saca la función de transferencia de lazo cerrado. | Casilla 1 con un diagrama pequeño que se reduce a un solo bloque. | viaje largo a la estación 1 | SVG |
| 5 | Paso dos: escribe su denominador mónico, con ese al cuadrado sola. | Casilla 2: «s² + … » con el coeficiente de s² igual a 1 resaltado. | deriva lenta | SVG |
| 6 | Paso tres: construye el polinomio deseado con los polos que te piden. | Casilla 3: (s − p₁)(s − p₂). | deriva lenta | SVG |
| 7 | Paso cuatro: iguala coeficiente por coeficiente y despeja. | Casilla 4: flechas entre coeficientes del mismo grado. El perrito asiente. | push in | SVG · perrito |

## Integrador 2025 · brillo problema 1

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 8 | Ejemplo del integrador del año pasado, con k1 y k2 igual a cinco. | Diagrama redibujado: r → k₁ → u → b → 1/s → 1/s → y, con a y k₂ realimentando x₂. | viaje largo a la estación 2 | SVG |
| 9 | Del diagrama sale cinco b, entre ese al cuadrado, más a más cinco b por ese, más cinco b. | El diagrama se colapsa en Y/R = 5b / [s² + (a + 5b)s + 5b]. | push in | SVG |
| 10 | Polos críticamente amortiguados en menos uno: el deseado es ese más uno, al cuadrado: ese al cuadrado más dos ese más uno. | Tarjeta QUIERO: (s + 1)² = s² + 2s + 1; dos × juntas en −1. | deriva lenta | SVG |
| 11 | Iguala: cinco b es uno, así que b es un quinto. | 5b = 1 → b = 0.2, el número se transforma. | push in | SVG |
| 12 | Y a más cinco b es dos, así que a es uno. | a + 1 = 2 → a = 1. | deriva lenta | SVG |
| 13 | Con un escalón de dos, la salida final es la ganancia en cero, uno, por dos: dos. | G(0) = 5b/5b = 1; y∞ = 1 × 2 = 2; la curva sube a 2 sin pasarse. | push out | SVG · Phosphor `check-circle` |

## Desde zeta · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 14 | Si en vez de polos te dan zeta, compara con la forma estándar. | Tarjeta QUIERO cambia a s² + 2ζωn s + ωn². | viaje largo a la estación 3 | SVG |
| 15 | En el examen rápido del diagrama con kp, kd y kf, el lazo cerrado queda kp más kf, entre ese al cuadrado, más a más kd por ese, más kp. | Y/R = (kp + kf) / [s² + (a + kd)s + kp] (se deduce en el vídeo 08). | push in | SVG |
| 16 | Omega ene al cuadrado es kp: con kp igual a cinco, omega ene es la raíz de cinco. | ωn² = 5 → ωn = 2.24. | deriva lenta | SVG |
| 17 | Y dos zeta omega ene es a más kd. | 2ζωn = a + kd. | deriva lenta | SVG |
| 18 | Para zeta de 0.6 y kd igual a uno, a vale 1.68. | a = 2(0.6)(2.24) − 1 = 1.68, el número se transforma. | push in | SVG |
| 19 | Para críticamente amortiguado, zeta es uno y a más kd es dos raíz de cinco. | ζ = 1 → a + kd = 4.47. | deriva lenta | SVG |
| 20 | Y para críticamente estable, el término en ese se anula: a más kd igual a cero. | El término en s se tacha: polos en ± j√5; senoide sin fin. El perrito se inclina. | pan con desenfoque | SVG · perrito |

## Región permitida · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 21 | Cuando te dan desigualdades, dibuja la región permitida. | Plano s vacío. | viaje largo a la estación 4 | SVG |
| 22 | Sobreimpulso máximo: un rayo, y los polos van entre el rayo y el eje real. | Rayo ámbar; la cuña entre el rayo y el eje real se pinta verde. | push in | SVG |
| 23 | Establecimiento máximo: una vertical, y los polos van a su izquierda. | Vertical; todo lo de la derecha se pinta rojo. | deriva lenta | SVG |
| 24 | Tiempo pico máximo: una horizontal, y los polos van por encima. | Horizontal; lo de abajo se pinta rojo. Queda una región verde. | deriva lenta | SVG |
| 25 | Elige un polo cómodo dentro de la región. | Una × cae dentro de la región verde. | push in | SVG |
| 26 | Ejemplo del libro: con sobreimpulso menor a 10 % y tiempo pico menor a un segundo, eligen menos cuatro más menos jota cuatro. | × en −4 ± j4: Mₚ = 4.3 % < 10 % ✓ y tₚ = 0.79 s < 1 s ✓. | deriva lenta | SVG |
| 27 | Eso da ese al cuadrado más ocho ese más 32, y comparando, p es 8 y k es 32. | s² + 8s + 32 contra s² + ps + k: p = 8, k = 32. | push in | SVG |

## Clímax · brillo lo que una ganancia no mueve

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 28 | Y la trampa del integrador del año pasado. | Golpe y sacudida; brillo rojo. | push in con golpe | SVG |
| 29 | Con un controlador solo proporcional y planta uno entre ese más uno por ese más cuatro, el lazo cerrado es ese al cuadrado más cinco ese más cuatro más k. | 1/[(s + 1)(s + 4)] con ganancia k → s² + 5s + (4 + k). | deriva lenta | SVG |
| 30 | K solo mueve el último término: la parte real se queda fija en menos 2.5. | Al subir k, las × suben y bajan por una vertical fija en −2.5. | pan con desenfoque | SVG |
| 31 | El establecimiento no puede bajar de 1.6 segundos, por más ganancia que pongas. | tₛ = 4/2.5 = 1.6 s, en rojo, con un candado. | push in | Phosphor `lock` |
| 32 | Por eso piden un PID: para mover lo que una ganancia sola no mueve. | El candado se abre y aparece «PID → vídeo 12». El perrito celebra con bocadillo `key`. | push out | perrito · Phosphor `key` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 33 | Antes de despejar, revisa qué coeficientes puede mover cada parámetro. | Plano general de las cuatro estaciones con las tarjetas TENGO/QUIERO. | push out a plano general | SVG |
| 34 | Sígueme para más trucos de control. | Tarjeta de perfil @perritoCAD; «Seguir» → «Siguiendo». | push in a la tarjeta | perrito-avatar.png |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| Diagrama y enunciado (k₁ = k₂ = 5, polos en −1, escalón de 2) | Examen Integrador 1, 24 oct 2025 (`Examen Integrador 1.pdf`), problema 1 |
| Y/R = 5b/[s² + (a+5b)s + 5b] → b = 1/5, a = 1, y∞ = 2 | Resolución propia, comprobada con sympy (`comprobaciones/verificar.py`). [COMPROBAR] contra la solución del profesor si la tienes: no está en el Drive |
| Y/R = (kp + kf)/[s² + (a+kd)s + kp] | Examen Rápido II (3 oct 2025, versiones a–d); sympy |
| a = 1.683 (ζ = 0.6, kd = 1); críticamente amortiguado a + kd = 2√5; críticamente estable a + kd = 0 | Versiones a, d y c del ExR II; sympy |
| Región permitida y Ej. 27: s_d = −4 ± 4j → p = 8, k = 32 | Libro de Vásquez López, Ej. 27; artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) |
| P con 1/[(s+1)(s+4)]: σ fija en 2.5, tₛ ≥ 1.6 s | Examen Integrador 1 (2025), problema 3 (pide tₛ = 2/3 s); cuenta propia |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| k1 / k2 | ka uno / ka dos |
| kp / kd / kf | ka pe / ka de / ka efe |
| 0.6 | cero punto seis |
| 1.68 | uno punto sesenta y ocho |
| 10 % | diez por ciento |
| 32 / 8 | treinta y dos / ocho |
| 2.5 / 1.6 | dos punto cinco / uno punto seis |
| PID | pe i de |

## Medios
Todo dibujado. Los diagramas del examen se redibujan, no se copian del PDF.
