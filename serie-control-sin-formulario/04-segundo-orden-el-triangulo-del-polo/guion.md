# 04 · Segundo orden: lee los polos como un triángulo

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | explicación de un concepto |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | forma estándar, ζ y ωn, polos −σ ± jωd, los cuatro casos de ζ, triángulo del polo, β y cos β = ζ |
| Frases | 34 |
| Palabras | 417 |
| Duración estimada | ~2:41 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Te dan dos polos y te preguntan si la respuesta oscila. | Primer fotograma: plano s con dos × y la pregunta «¿oscila?». | push in rápido | SVG |
| 2 | Si tienes que simularlo, ya perdiste. | Una ventana de simulador genérica (sin logotipos) se tacha en rojo; el perrito cae. | deriva lenta | SVG · perrito |
| 3 | Los polos te dicen todo; solo hay que leerlos como un triángulo. | Desde la × de arriba se dibuja un triángulo rectángulo hasta el origen, en blanco. | push out | SVG |

## Forma estándar · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | La forma estándar de segundo orden es omega ene al cuadrado, entre ese al cuadrado más dos zeta omega ene ese, más omega ene al cuadrado. | G(s) = ωn² / (s² + 2ζωn s + ωn²) en tarjeta blanca. | viaje largo a la estación 1 | SVG |
| 5 | Zeta es el factor de amortiguamiento y omega ene la frecuencia natural no amortiguada. | Etiquetas sobre ζ y ωn, cada una con su color. | push in | SVG |
| 6 | Si hay ganancia, multiplica el numerador por K. | Aparece «K» delante de ωn² en el numerador. | deriva lenta | SVG |
| 7 | Para leer zeta y omega ene, iguala tu denominador a esa forma, término por término. | Debajo: s² + 2s + 25; flechas unen término con término. | pan con desenfoque | SVG |
| 8 | Con ese al cuadrado más dos ese más 25: omega ene es cinco y dos zeta por cinco es dos, así que zeta es 0.2. | ωn² = 25 → ωn = 5; 2ζ·5 = 2 → ζ = 0.2, los números se transforman en su sitio. | push in | SVG |

## Polos · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 9 | Los polos salen de la fórmula general. | Fórmula cuadrática animada sobre el denominador. | viaje largo a la estación 2 | SVG |
| 10 | Son menos zeta omega ene, más menos jota omega ene por la raíz de uno menos zeta al cuadrado. | s₁,₂ = −ζωn ± jωn√(1 − ζ²). | push in | SVG |
| 11 | A la parte real le llamamos sigma, y a la imaginaria, omega de. | −ζωn se etiqueta «σ» (verde azulado) y ωn√(1−ζ²) «ωd» (violeta). El perrito asiente. | deriva lenta | SVG · perrito |

## Los cuatro casos · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 12 | Y zeta decide la forma de la respuesta. | Deslizador de ζ junto a un plano s y una gráfica de respuesta al escalón. | viaje largo a la estación 3 | SVG |
| 13 | Con zeta igual a cero, los polos son imaginarios puros y oscila para siempre. | ζ = 0: × en ±jωn; senoide sin fin, ámbar. | push in | SVG |
| 14 | Entre cero y uno, son complejos: subamortiguado, con sobreimpulso. | ζ = 0.4: × complejas; la curva se pasa de 1 y oscila. | deriva lenta | SVG |
| 15 | Con zeta igual a uno, se juntan en un polo doble: críticamente amortiguado, lo más rápido sin pasarse. | ζ = 1: las × se juntan en −ωn; la curva sube sin pasarse, verde. | deriva lenta | SVG |
| 16 | Mayor que uno, se separan en dos polos reales: sobreamortiguado, lento y sin sobreimpulso. | ζ = 2: las × se separan por el eje real; curva lenta. | pan con desenfoque | SVG |
| 17 | Y con zeta negativa, los polos cruzan a la derecha y la respuesta crece: inestable. | ζ = −0.2: las × cruzan el eje imaginario; la curva crece oscilando, roja. | push in | SVG |

## El triángulo · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 18 | Ahora dibuja el polo de arriba y baja una vertical al eje real. | Plano s grande; × en −2 + j4; línea vertical punteada al eje real. | viaje largo a la estación 4 | SVG |
| 19 | Queda un triángulo rectángulo. | El triángulo se rellena en blanco translúcido. | push in | SVG |
| 20 | El cateto horizontal es sigma, igual a zeta por omega ene. | Cateto horizontal en verde azulado: «σ = ζωn». | deriva lenta | SVG |
| 21 | El cateto vertical es omega de, la frecuencia de la oscilación. | Cateto vertical en violeta: «ωd». | deriva lenta | SVG |
| 22 | La hipotenusa, la distancia al origen, es omega ene. | Hipotenusa en blanco: «ωn = √(σ² + ωd²)». | deriva lenta | SVG |
| 23 | Y el ángulo beta se mide desde el eje real negativo, no desde el imaginario. | Arco ámbar desde el eje real negativo; un arco rojo desde el eje imaginario se tacha. El perrito se inclina. | push in al origen | SVG · perrito |
| 24 | Su coseno es zeta. | «cos β = ζ» en tarjeta verde. | push out | SVG |

## Leer el ángulo · brillo #ff9f1c

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 25 | Por eso un polo pegado al eje imaginario tiene beta cerca de 90 grados y zeta casi cero: oscila mucho. | La × se desliza hacia el eje imaginario; β → 90°, ζ → 0; la curva oscila mucho. | viaje largo a la estación 5 | SVG |
| 26 | Y uno pegado al eje real tiene zeta casi uno: casi no oscila. | La × baja hacia el eje real; ζ → 1; la curva casi no se pasa. | pan con desenfoque | SVG |
| 27 | Con beta de 45 grados, zeta es 0.71. | β = 45°: cos 45° = 0.71, el número se transforma. | push in | SVG |
| 28 | Con 60 grados, zeta es un medio. | β = 60°: cos 60° = 0.5. | deriva lenta | SVG |

## Clímax · brillo un polo del integrador

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 29 | Pruébalo con un ejemplo real del integrador: menos dos más menos jota cuatro. | Golpe y sacudida; brillo rojo. × en −2 ± j4 con el rótulo «Integrador 1 · 2026». | push in con golpe | SVG |
| 30 | Sigma es dos, omega de es cuatro, y omega ene es la raíz de 20, unos 4.47. | El triángulo se mide: σ = 2, ωd = 4, ωn = √20 ≈ 4.47, en su sitio. | deriva lenta | SVG |
| 31 | Zeta es dos entre 4.47: 0.45. | ζ = 2/4.47 → 0.45. | push in | SVG |
| 32 | Subamortiguado, con sobreimpulso, y sin simular nada. | Tarjeta verde «subamortiguado»; el perrito celebra con bocadillo `check-circle`. | push out | perrito · Phosphor `check-circle` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 33 | Dibuja tres polos al azar y saca su triángulo hasta que te salga solo. | Plano general de las cinco estaciones; tres × nuevas aparecen con su triángulo. | push out a plano general | SVG |
| 34 | En el siguiente vídeo: cómo deducir tiempo pico, sobreimpulso y establecimiento. | Tarjeta final «Siguiente · 05» con el título del próximo vídeo y el mapa de la serie. | push in a la tarjeta | SVG |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| Forma estándar, polos −ζωn ± jωn√(1−ζ²) | Libro de Vásquez López §4.2; apuntes Clase 3 parte 1 (8 oct 2026), 00:59 |
| Los cuatro casos de ζ (y ζ < 0 inestable) | Libro §4.2; artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) tabla de casos; apuntes Clase 2 parte 2 |
| Triángulo σ, ωd, ωn y cos β = ζ medido desde el eje real negativo | Artifact [Del polo a la respuesta](https://claude.ai/artifact/Jd34SCxbLtsozfW5Y5FAkG) §2 |
| s² + 2s + 25 → ωn = 5, ζ = 0.2 | Ejemplo propio; cuenta directa |
| −2 ± j4 → ωn = √20 = 4.472, ζ = 0.447, β = 63.4° | Examen Integrador 1 (23 oct 2026), problema 1; sympy (`comprobaciones/verificar.py`) |
| cos 45° = 0.707; cos 60° = 0.5 | Cuenta directa |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| 25 | veinticinco |
| 0.2 | cero punto dos |
| 0.71 | cero punto setenta y uno |
| 4.47 | cuatro punto cuarenta y siete |
| 0.45 | cero punto cuarenta y cinco |
| 20 | veinte |
| 45 / 60 / 90 | cuarenta y cinco / sesenta / noventa |
| jota | jota (la j imaginaria) |

## Medios
Todo dibujado o animado.
