# 12 · Error en estado estable, tipo de sistema y PID con Ziegler-Nichols

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | explicación de un concepto |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | e_ss por valor final, tipo, Kp y Kv, Integrador 1 (2025) problema 2, efecto de P, I y D, segunda regla de Ziegler-Nichols con Routh (Ej. 47) |
| Frases | 34 |
| Palabras | 550 |
| Duración estimada | ~3:28 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Tu sistema es estable, pero nunca llega a donde le pides. | Primer fotograma: referencia en 1 y una salida que se queda en 0.8; el hueco parpadea rojo. | push in rápido | SVG |
| 2 | Ese hueco es el error en estado estable, y en el integrador vale puntos fáciles. | El hueco se etiqueta «e_ss»; el perrito cae dentro del hueco. | deriva lenta | SVG · perrito |
| 3 | Se saca con un límite y una pregunta: ¿cuántos integradores hay? | Dos tarjetas: «lím s→0» y «¿cuántos 1/s?». | push out | SVG |

## La fórmula · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Con realimentación unitaria, el error es la referencia entre uno más Gc por G. | Lazo unitario; E = R/(1 + GcG). | viaje largo a la estación 1 | SVG |
| 5 | Aplica el valor final: límite de ese por R, entre uno más Gc G, con ese a cero. | e_ss = lím s→0 sR(s)/(1 + GcG). | push in | SVG |
| 6 | Pero antes, Routh: si el lazo no es estable, el error no existe. | Candado «Routh ✓» delante de la fórmula. El perrito asiente. | deriva lenta | SVG · perrito · Phosphor `lock` |

## El tipo del sistema · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 7 | El tipo del sistema es el número de integradores, de polos en ese igual a cero, en Gc por G. | Bloques 1/s que se cuentan: tipo 0, 1, 2. | viaje largo a la estación 2 | SVG |
| 8 | Ante un escalón de amplitud A, el error es A entre uno más Kp, con Kp igual al límite de Gc G en cero. | e_escalón = A/(1 + Kp), Kp = lím s→0 GcG. | push in | SVG |
| 9 | Si hay un integrador, Kp es infinito y el error es cero. | Kp → ∞; el hueco de la gráfica se cierra, verde. | deriva lenta | SVG |
| 10 | Ante una rampa de pendiente A, el error es A entre Kv, con Kv igual al límite de ese por Gc G. | e_rampa = A/Kv, Kv = lím s→0 s·GcG; gráfica con dos rectas paralelas. | pan con desenfoque | SVG |
| 11 | Tipo cero: error infinito. Tipo uno: A entre Kv. Tipo dos: cero. | Tabla 2 × 3 (escalón y rampa contra tipo 0, 1, 2) que se llena celda por celda. | push in | SVG |

## Integrador 2025 · brillo problema 2

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 12 | Problema del integrador del año pasado: controlador k y planta uno entre ese a la ene por ese más a. | Lazo con Gc = k y G = 1/[sⁿ(s + a)]. | viaje largo a la estación 3 | SVG |
| 13 | Piden error de un medio y zeta de un medio. | «e_ss = 0.5» y «ζ = 0.5». | deriva lenta | SVG |
| 14 | Con ene igual a cero sería de primer orden y no habría zeta; con ene igual a dos faltaría el término en ese y sería inestable. | n = 0 → s + a + k (sin ζ) ✗; n = 2 → s³ + as² + k (falta s) ✗. | deriva lenta | SVG |
| 15 | Así que ene es uno, y el error de un medio tiene que ser ante una rampa. | n = 1 ✓: tipo 1, el error al escalón es 0, así que el 0.5 es de rampa. El perrito se inclina. | push in | SVG · perrito |
| 16 | Kv es k entre a, así que a entre k es un medio. | Kv = k/a → a/k = 0.5. | deriva lenta | SVG |
| 17 | El lazo cerrado es ese al cuadrado más a ese más k: omega ene es raíz de k y a es dos zeta omega ene, es decir, raíz de k. | s² + as + k; ωn = √k; a = 2(0.5)√k = √k. | deriva lenta | SVG |
| 18 | Resolviendo: k es cuatro y a es dos. | √k = 2 → k = 4, a = 2; s² + 2s + 4 estable ✓. | push in | Phosphor `check-circle` |

## Qué hace cada parte del PID · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 19 | Si la ganancia sola no alcanza, entra el PID. | Tres perillas P, I y D. | viaje largo a la estación 4 | SVG |
| 20 | La parte proporcional empuja según el error de ahora. | La perilla P empuja la salida hacia arriba. | deriva lenta | SVG |
| 21 | La integral suma el error pasado: agrega un integrador y borra el error al escalón. | El área del error se acumula y el hueco se cierra a cero. | deriva lenta | SVG |
| 22 | La derivativa mira hacia dónde va el error: amortigua y reduce el sobreimpulso. | El sobreimpulso de la curva se aplana. | deriva lenta | SVG |
| 23 | Con un PI y planta de primer orden: si apagas ki, queda un error permanente; si apagas kp, el error se borra, pero el lazo pasa a segundo orden y puede oscilar. | Dos gráficas: una que se queda corta (ki = 0) y otra que oscila hasta llegar (kp = 0). | pan con desenfoque | SVG |

## Ziegler-Nichols con Routh · brillo #ff9f1c

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 24 | Y para sintonizarlo sin un modelo fino, la segunda regla de Ziegler y Nichols. | Tarjeta «Z-N, 2.ª regla». | viaje largo a la estación 5 | SVG |
| 25 | Sube la ganancia proporcional hasta que el lazo oscile sin crecer ni apagarse: esa es la ganancia crítica. | Deslizador de kp; la curva pasa de apagarse a oscilar constante en Kc. | push in | SVG |
| 26 | Con Routh la sacas en papel: es el valor de k donde se anula la fila de ese a la uno. | Tabla de Routh con la fila s¹ en cero. | deriva lenta | SVG |
| 27 | Ejemplo del libro: ese al cubo más seis ese al cuadrado más cinco ese más dos kp, estable hasta kp igual a 15. | s³ + 6s² + 5s + 2kp; s¹ = 5 − kp/3 → Kc = 15. | push in | SVG |
| 28 | El auxiliar seis ese al cuadrado más treinta da omega igual a raíz de cinco, y un periodo crítico de 2.81 segundos. | 6s² + 30 = 0 → ω = √5 = 2.24; Pc = 2π/√5 = 2.81 s. | deriva lenta | SVG |
| 29 | Las reglas: kp es 0.6 por la ganancia crítica, Ti es la mitad del periodo y Td un octavo. | kp = 0.6Kc, Ti = Pc/2, Td = Pc/8. | push in | SVG |
| 30 | Resultado: kp de 9, Ti de 1.4 y Td de 0.35 segundos. | kp = 9, Ti = 1.405 s, Td = 0.351 s; los números se transforman en su sitio. El perrito salta. | deriva lenta | SVG · perrito |

## Clímax · brillo el resumen que vale oro

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 31 | Resumen que vale oro. | Golpe y sacudida; brillo rojo. | push in con golpe | SVG |
| 32 | El tipo decide si hay error; la ganancia decide cuánto; y Routh decide si todo eso tiene sentido. | Tres tarjetas en fila: «tipo → ¿hay error?», «ganancia → ¿cuánto?», «Routh → ¿vale?». El perrito celebra con bocadillo `trophy`. | push out | perrito · Phosphor `trophy` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 33 | Haz la tabla de tipos cero, uno y dos contra escalón y rampa hasta que la escribas de memoria. | Plano general de las cinco estaciones; la tabla 2 × 3 en el centro. | push out a plano general | SVG |
| 34 | Sígueme para más trucos de control. | Tarjeta de perfil @perritoCAD; «Seguir» → «Siguiendo». | push in a la tarjeta | perrito-avatar.png |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| e_ss = lím s→0 sR/(1 + GcG); Kp, Kv; tabla de tipos | Libro de Vásquez López §5.2; artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) §5.2 |
| Enunciado: Gc = k, G = 1/[sⁿ(s + a)], e_ss = 0.5, ζ = 0.5 | Examen Integrador 1, 24 oct 2025, problema 2 |
| n = 1, rampa, k = 4, a = 2 | Razonamiento propio (n = 0 sin ζ; n = 2 inestable por falta de término en s), comprobado con sympy. [COMPROBAR] contra la solución del profesor: el enunciado no dice el tipo de entrada |
| PI con planta de primer orden: ki = 0 deja error; kp = 0 lleva a segundo orden | Ejercicios de preparación (examen 2.º parcial, 21 mar 2019), problema 4; tipo de sistema |
| Ej. 47: s³ + 6s² + 5s + 2kp, Kc = 15, ω = √5, Pc = 2.81 s, kp = 9, Ti = 1.405, Td = 0.351 | Libro Ej. 47 y tabla de Z-N (PID: 0.6Kc, Pc/2, Pc/8); artifact Laboratorio; sympy |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| Gc | ge ce |
| Kp / Kv | ka pe / ka uve |
| kp / ki | ka pe / ka i |
| Ti / Td | te i / te de |
| PID / PI | pe i de / pe i |
| Ziegler / Nichols | Zíguler / Níkols |
| 0.6 | cero punto seis |
| 15 / 30 | quince / treinta |
| 2.81 | dos punto ochenta y uno |
| 9 / 1.4 / 0.35 | nueve / uno punto cuatro / cero punto treinta y cinco |
| 0.8 | (solo en pantalla) |

## Medios
Todo dibujado. Opcional: grabado antiguo de un regulador centrífugo de Watt como ilustración de «lazo cerrado» (ver `MEDIOS-WEB.md`, M2). No se añade ningún dato histórico a la voz.
