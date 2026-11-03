# 13 · Variables de estado: de la ecuación a las matrices y de regreso

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | tutorial paso a paso |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | ẋ = Ax + Bu, y = Cx; forma canónica controlable; diagrama de integradores; G(s) = C(sI − A)⁻¹B con la inversa 2 × 2; det(sI − A) = polos; ejercicio de prueba en paralelo (forma diagonal); integrador con amplificador operacional |
| Frases | 34 |
| Palabras | 540 |
| Duración estimada | ~3:25 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | En el examen rápido pidieron la función de transferencia con C por ese I menos A, a la menos uno, por B. | Primer fotograma: «G(s) = C(sI − A)⁻¹B» en rojo sobre una tarjeta de examen. | push in rápido | SVG |
| 2 | Si no recuerdas cómo invertir una matriz de dos por dos, te quedas en blanco. | Una matriz 2 × 2 con «⁻¹» se queda vacía; el perrito cae. | deriva lenta | SVG · perrito |
| 3 | Hoy lo resolvemos todo con un truco de tres segundos. | Cronómetro de 3 s en verde. | push out | Phosphor `timer` |

## El modelo · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Un modelo en variables de estado son dos ecuaciones. | Dos tarjetas vacías apiladas. | viaje largo a la estación 1 | SVG |
| 5 | La derivada de x es A por x más B por u, y la salida es C por x. | ẋ = Ax + Bu; y = Cx. | push in | SVG |
| 6 | A dice cómo se mueven los estados solos, B por dónde entra la entrada y C qué mides. | A, B y C se iluminan con sus etiquetas, cada una de un color. El perrito asiente. | deriva lenta | SVG · perrito |

## De la ecuación a los estados · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 7 | Para pasar de una ecuación diferencial a estados, elige x1 igual a y, y x2 igual a su derivada. | «x₁ = y, x₂ = ẏ». | viaje largo a la estación 2 | SVG |
| 8 | Ejemplo: la segunda derivada de y, más tres veces la primera, más dos y, igual a tres u. | ÿ + 3ẏ + 2y = 3u. | push in | SVG |
| 9 | La derivada de x1 es x2. | ẋ₁ = x₂. | deriva lenta | SVG |
| 10 | Y la derivada de x2 es menos dos x1, menos tres x2, más tres u. | ẋ₂ = −2x₁ − 3x₂ + 3u (se despeja la derivada más alta). | deriva lenta | SVG |
| 11 | A queda cero, uno en la primera fila, y menos dos, menos tres en la segunda. | A = [0 1; −2 −3]. | push in | SVG |
| 12 | B es cero, tres; y C es uno, cero. | B = [0; 3], C = [1 0]. | deriva lenta | SVG |
| 13 | Fíjate: la última fila de A son los coeficientes del polinomio con el signo cambiado. Esa es la forma canónica controlable. | Los coeficientes 2 y 3 del polinomio vuelan a la última fila de A como −2 y −3. | push in | SVG |
| 14 | Y es exactamente el diagrama de dos integradores en cadena, con las ramas de realimentación. | Sumador → 1/s → 1/s; ramas −3 y −2 de regreso al sumador; x₂ y x₁ etiquetados en las salidas de los integradores. | pan con desenfoque | SVG |

## El truco de la inversa · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 15 | Ahora de regreso: G es C por ese I menos A, inversa, por B. | G(s) = C(sI − A)⁻¹B. | viaje largo a la estación 3 | SVG |
| 16 | La inversa de una matriz de dos por dos se hace así. | Matriz [a b; c d] genérica. | push in | SVG |
| 17 | Intercambia los de la diagonal, cámbiale el signo a los otros dos y divide entre el determinante. | a y d cambian de lugar; b y c se vuelven −b y −c; todo entre (ad − bc). El perrito salta. | deriva lenta | SVG · perrito |
| 18 | Ese I menos A es ese, menos uno; dos, ese más tres. | sI − A = [s −1; 2 s+3]. | push in | SVG |
| 19 | Su determinante es ese al cuadrado más tres ese más dos. | det = s(s + 3) + 2 = s² + 3s + 2. | deriva lenta | SVG |
| 20 | Multiplica por B y por C: te queda tres entre ese al cuadrado más tres ese más dos. Recuperaste la función. | Inversa × B × C → 3/(s² + 3s + 2), verde. | push in | Phosphor `check-circle` |

## El determinante son los polos · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 21 | Y ese determinante es la clave. | El det se mueve al centro. | viaje largo a la estación 4 | SVG |
| 22 | Determinante de ese I menos A igual a cero es la ecuación característica. | det(sI − A) = 0. | push in | SVG |
| 23 | Sus raíces son los valores propios de A, y son los polos del sistema: menos uno y menos dos. | (s + 1)(s + 2) = 0 → × en −1 y −2. | deriva lenta | SVG |
| 24 | Cambiar de estados no cambia los polos: son del sistema, no de cómo lo escribes. | Dos matrices A distintas apuntan a las mismas dos ×. | pan con desenfoque | SVG |

## Ejercicio de prueba · brillo en paralelo

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 25 | Ejercicio de prueba del examen: tres bloques uno entre ese más p en paralelo, cada uno con su ganancia c, más un camino directo b. | Diagrama redibujado: U → tres bloques 1/(s + pᵢ) → cᵢ → sumador; rama directa b. | viaje largo a la estación 5 | SVG |
| 26 | La función es b más c1 entre ese más p1, más c2 entre ese más p2, más c3 entre ese más p3. | Y/U = b + c₁/(s+p₁) + c₂/(s+p₂) + c₃/(s+p₃). | push in | SVG |
| 27 | Si cada salida de bloque es un estado, cada derivada es menos p por su estado, más u. | ẋᵢ = −pᵢ xᵢ + u, para i = 1, 2, 3. | deriva lenta | SVG |
| 28 | A queda diagonal con menos p1, menos p2 y menos p3; B son tres unos; C es c1, c2, c3; y b pasa directo. | A = diag(−p₁, −p₂, −p₃), B = [1; 1; 1], C = [c₁ c₂ c₃], D = b. | push in | SVG |
| 29 | La ecuación característica es ese más p1, por ese más p2, por ese más p3, igual a cero. | det(sI − A) = (s + p₁)(s + p₂)(s + p₃) = 0. El perrito asiente. | deriva lenta | SVG · perrito |

## En hardware · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 30 | Y en hardware, cada integrador es un amplificador operacional con R a la entrada y C en la realimentación. | Esquema de integrador con amplificador operacional; R en la entrada y C en la realimentación. | viaje largo a la estación 6 | SVG · opcional M1 |
| 31 | Su función es menos uno entre R C ese: el signo menos se corrige con un inversor de ganancia menos uno. | Vo/Vi = −1/(RCs); al lado, un inversor con R₂ = R₁. | push in | SVG |

## Clímax · brillo el resumen

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 32 | Resumen: los estados son las salidas de los integradores, A es el diagrama, y el determinante te da los polos. | Golpe y sacudida; brillo rojo. Tres flechas: integradores → x, diagrama → A, det → ×. El perrito celebra con bocadillo `check-circle`. | push in con golpe | perrito · Phosphor `check-circle` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 33 | Practica la inversa de dos por dos con tres matrices distintas hasta que salga sola. | Plano general de las seis estaciones. | push out a plano general | SVG |
| 34 | Sígueme para más trucos de control. | Tarjeta de perfil @perritoCAD; «Seguir» → «Siguiendo». | push in a la tarjeta | perrito-avatar.png |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| G(s) = C(sI − A)⁻¹B pedida en el examen rápido | `Examen Rapido 6.pdf` (encabezado «Examen rápido 5»), pregunta 1 |
| Forma canónica controlable; última fila = coeficientes con signo cambiado | Libro de Vásquez López §3.4.1 «Forma canónica controlable» |
| ÿ + 3ẏ + 2y = 3u → A = [0 1; −2 −3], B = [0; 3], C = [1 0] → 3/(s² + 3s + 2) | Ejemplo propio; sympy (`comprobaciones/verificar.py`) |
| Inversa 2 × 2 = [d −b; −c a]/(ad − bc) | sympy |
| det(sI − A) = 0 da los polos; no cambian con x = Tz | Artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr), «Variables de estado» |
| Ejercicio de prueba en paralelo; A diagonal; det = (s+p₁)(s+p₂)(s+p₃) | `Examen Rapido 4.pdf` (encabezado «Ejercicio prueba examen»); libro §3.4.1 «Forma canónica diagonal»; sympy |
| Integrador con amplificador operacional −1/(RCs); inversor −R₂/R₁ | Libro §3.2; artifact Laboratorio, «Del integrador al op-amp»; apuntes Clase 2 parte 3 (1 oct 2026) |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| ese I menos A | ese i menos a |
| x1 / x2 | equis uno / equis dos |
| c1 c2 c3 / p1 p2 p3 | ce uno… / pe uno… |
| R C | erre ce |

## Medios
Dibujado todo. Opcional en la frase del amplificador operacional: foto real de un chip μA741 (`MEDIOS-WEB.md`, M1), todavía sin confirmar.
