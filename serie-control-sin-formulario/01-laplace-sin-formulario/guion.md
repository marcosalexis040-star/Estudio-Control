# 01 · Laplace sin formulario: la tabla entera desde un solo par

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | tutorial paso a paso |
| publico | estudiantes de Ingeniería de Control (Tec, Gpo. 502) que presentan el integrador sin formulario |
| tema | transformada de Laplace, tabla mínima, propiedades, valor final e inicial, polo ↔ señal |
| Frases | 39 |
| Palabras | 456 |
| Duración estimada | ~2:56 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Sin formulario, en el integrador la tabla de Laplace no te la va a dar nadie. | Primer fotograma: tarjeta blanca «TABLA DE LAPLACE» con diez pares; se agrieta en P("nadie") y cae en pedazos rojos. El perrito cae desde arriba y aterriza junto a los pedazos. | push in rápido sobre la tarjeta | SVG · Phosphor `x-circle` |
| 2 | Y sin tabla, no resuelves ni una ecuación diferencial. | Una ecuación diferencial ÿ + 3ẏ + 2y = u se pone roja y tiembla. | deriva lenta hacia la derecha | SVG |
| 3 | La buena noticia: te basta con un solo par y cuatro trucos. | Los pedazos se reúnen en UNA tarjeta verde «1 par + 4 trucos»; el perrito asiente con bocadillo de bombilla. | push out suave | perrito · Phosphor `lightbulb` |

## Para qué sirve · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Laplace es un traductor. | Dos columnas: «TIEMPO» y «s». Una flecha con icono de traductor las une. | viaje largo a la estación 1 | Phosphor `translate` |
| 5 | Convierte derivar en multiplicar por ese, e integrar en dividir entre ese. | d/dt se transforma en «× s»; ∫ dt se transforma en «÷ s», en su sitio. | push in | SVG |
| 6 | Por eso un integrador se dibuja como un bloque de uno entre ese. | Aparece un bloque «1/s» con entrada y salida; dentro, el símbolo ∫ se funde en 1/s. | deriva lenta | SVG |
| 7 | Así una ecuación diferencial se vuelve álgebra de secundaria. | La ED del gancho baja a la columna «s» y queda (s² + 3s + 2)Y = U, en verde. | pan con desenfoque a la derecha | SVG |

## El par madre · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 8 | El único par que memorizas es este: e a la menos a t se transforma en uno entre ese más a. | Tarjeta grande con borde dorado: e^(−at) ⟷ 1/(s + a). Brillo dorado. | viaje largo a la estación 2 y push in | SVG |
| 9 | Sale de integrar una sola exponencial, y lo puedes comprobar en diez segundos. | Debajo se escribe la integral ∫₀^∞ e^(−at)e^(−st)dt = [−e^(−(s+a)t)/(s+a)]₀^∞ = 1/(s+a), término a término. | deriva lenta hacia abajo | SVG |
| 10 | Léelo así: una exponencial en el tiempo es un polo en menos a. | A la derecha, mini plano s con una × en −a; una flecha une la exponencial con la ×. El perrito se inclina a mirar la ×. | push out | SVG · perrito |

## Trucos uno y dos · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 11 | Truco uno: pon a igual a cero. | En la tarjeta madre la «a» parpadea y se vuelve 0. | viaje largo a la estación 3 | SVG |
| 12 | El escalón, que vale uno siempre, se vuelve uno entre ese. | e^(0·t) se transforma en u(t) = 1 y 1/(s+0) en 1/s; mini gráfica de un escalón. | push in | SVG |
| 13 | Truco dos: multiplicar por t en el tiempo es derivar respecto a ese y cambiar el signo. | Regla en tarjeta: t·f(t) ⟷ −dF/ds. | deriva lenta | SVG |
| 14 | Así la rampa t se vuelve uno entre ese al cuadrado. | 1/s → −d/ds → 1/s²; mini gráfica de rampa. | pan con desenfoque | SVG |
| 15 | Y t por e a la menos a t se vuelve uno entre ese más a, al cuadrado. | 1/(s+a) → −d/ds → 1/(s+a)². | deriva lenta | SVG |
| 16 | Ese es el polo repetido. | En el mini plano s la × de −a se duplica: «×2». El perrito salta. | push in | SVG · perrito |

## Truco tres: Euler · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 17 | Truco tres: Euler. | Rótulo «Euler»: sin ωt = (e^(jωt) − e^(−jωt))/2j. | viaje largo a la estación 4 | SVG |
| 18 | El seno y el coseno son dos exponenciales imaginarias sumadas. | Dos flechas giratorias (fasores) se suman y dibujan una senoide. | deriva lenta | SVG |
| 19 | Aplica el par madre a cada una y obtienes omega entre ese al cuadrado más omega al cuadrado para el seno. | Con a = ∓jω en el par madre aparece sin ωt ⟷ ω/(s² + ω²). | push in | SVG |
| 20 | Y ese entre ese al cuadrado más omega al cuadrado para el coseno. | Debajo: cos ωt ⟷ s/(s² + ω²). | deriva lenta | SVG |
| 21 | ¿Cuál era cuál? Evalúa en t igual a cero. | Signo de interrogación sobre las dos; cursor en t = 0 en ambas gráficas. El perrito, bocadillo con `question`. | push in a las gráficas | perrito · Phosphor `question` |
| 22 | El coseno empieza en uno, así que es el que tiene la ese arriba. | La curva del coseno arranca en 1 y se resalta la «s» del numerador en verde. | push out | SVG |

## Truco cuatro: desplazar · brillo #ff9f1c

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 23 | Truco cuatro: multiplicar por e a la menos a t es cambiar ese por ese más a. | Regla: e^(−at)f(t) ⟷ F(s + a). Cada «s» de una fórmula se transforma en «(s+a)». | viaje largo a la estación 5 | SVG |
| 24 | Con eso sacas el seno amortiguado: omega entre ese más a, al cuadrado, más omega al cuadrado. | ω/(s²+ω²) → ω/((s+a)²+ω²); al lado la senoide se encoge dentro de una envolvente e^(−at). | push in | SVG |
| 25 | Esa es exactamente la forma de un sistema de segundo orden subamortiguado. | La curva se etiqueta «2.º orden subamortiguado → vídeo 04». | pan con desenfoque | SVG |

## Las reglas de cada problema · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 26 | Ahora las reglas que usarás en cada problema. | Estación con cuatro tarjetas vacías en fila. | viaje largo a la estación 6 | SVG |
| 27 | La derivada da ese por F menos el valor inicial; con condiciones iniciales cero, queda solo ese por F. | Tarjeta 1: ḟ ⟷ sF − f(0); el «− f(0)» se tacha en verde con «CI = 0». | push in | SVG |
| 28 | La integral da F entre ese. | Tarjeta 2: ∫f ⟷ F/s. | deriva lenta | SVG |
| 29 | El valor final es el límite de ese por F cuando ese tiende a cero. | Tarjeta 3: f(∞) = lím s→0 sF(s). | deriva lenta | SVG |
| 30 | Y el valor inicial es el mismo límite, pero con ese tendiendo a infinito. | Tarjeta 4: f(0⁺) = lím s→∞ sF(s). El perrito asiente. | push out a las cuatro tarjetas | SVG · perrito |

## Clímax: polo y señal · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 31 | Y aquí está la idea que conecta todo el curso. | Golpe y sacudida; brillo rojo. Aparece un plano s grande. | push in con golpe | SVG |
| 32 | Cada polo de F produce un término en el tiempo. | Una × en el plano lanza una flecha a una gráfica de tiempo. | deriva lenta | SVG |
| 33 | Polo real negativo: la señal se apaga. | × en −2; la gráfica decae a cero, verde. | pan con desenfoque a la izquierda | SVG |
| 34 | Polo real positivo: la señal explota. | × en +1; la gráfica crece y se sale del cuadro, roja. | pan con desenfoque a la derecha | SVG |
| 35 | Polos complejos: oscila, y la parte real decide si la oscilación crece o se apaga. | Par de × en −1 ± j3: senoide que se apaga; luego el par se mueve a +0.5 ± j3 y la senoide crece. | deriva lenta | SVG |
| 36 | Sobre el eje imaginario oscila para siempre. | Par en ± j3: senoide de amplitud constante, ámbar. | push in | SVG |
| 37 | Eso es estabilidad, y es lo que mide Routh. | Rótulo «ESTABLE = todos los polos a la izquierda → vídeos 10 y 11». El perrito celebra con bocadillo `check-circle`. | push out | perrito · Phosphor `check-circle` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 38 | Repite el par madre y los cuatro trucos hasta poder escribir la tabla completa en un minuto. | Push out a plano general: las seis estaciones unidas por el camino; reloj de 60 s que corre. | push out a plano general | SVG · Phosphor `timer` |
| 39 | Sígueme para más trucos de control. | Tarjeta de perfil con perrito-avatar.png y @perritoCAD; el cursor pulsa «Seguir» y cambia a «Siguiendo». | push in a la tarjeta | perrito-avatar.png |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| e^(−at) ⟷ 1/(s+a), escalón, rampa, t·e^(−at), seno, coseno y amortiguados | Vásquez López, *Ingeniería de Control* (2018), §1.1–1.2 (`libroctrl-1.pdf` del Drive); artifact [Laplace sin formulario](https://claude.ai/artifact/3XoEmi2ge3mH57Knz1Ev6R) §3; comprobado con sympy en `comprobaciones/verificar.py` |
| t·f(t) ⟷ −dF/ds; e^(−at)f(t) ⟷ F(s+a) | Libro §1.2 (teoremas); artifact Laplace, tarjetas B y D; sympy |
| Derivada sF − f(0), integral F/s, valor final y valor inicial | Libro §1.2; artifact Laplace §4 |
| Polo real negativo decae, positivo crece, complejo oscila, eje jω oscila sin apagarse | Artifact Laplace §5; Douglas, *The Fundamentals of Control Theory* rev. 1.6 (2019), §2.6.2 «The s Plane» (`fundamentals_of_control_BD-1.pdf` del Drive, CC BY-NC-SA 4.0) |

No se dice ninguna cifra que no salga de estas fórmulas. «Diez segundos» y «un minuto» son metas de práctica, no datos.

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| Laplace | Laplás |
| Routh | Ráuz |
| Euler | Óiler |
| ese | ese (variable s) |

## Medios
Todo se dibuja o se anima (SVG/HTML). Ningún medio de la web en este vídeo.
