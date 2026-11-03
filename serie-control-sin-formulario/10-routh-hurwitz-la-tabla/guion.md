# 10 · Routh-Hurwitz: la tabla entera con una sola cruz

> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde `escaleta.md` con `herramientas/construir-guiones.mjs`; si cambias algo, cambia la escaleta y vuelve a generar.

| Campo | Valor |
|---|---|
| formato | tutorial paso a paso |
| publico | estudiantes de Ingeniería de Control que presentan el integrador sin formulario |
| tema | estabilidad BIBO, condición necesaria, armado del arreglo, cambios de signo, ejemplos de cuarto y quinto orden de la clase, atajo de tercer orden |
| Frases | 33 |
| Palabras | 482 |
| Duración estimada | ~3:04 (a 2.8 palabras/s con pausas de 0.3 s y 0.5 s; la real la da voz.wav) |

Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada `assets/perrito-recorte.png`; nunca tapa texto.

## Gancho · brillo #ff5a5f

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 1 | Te dan un polinomio de quinto grado y te preguntan si es estable. | Primer fotograma: s⁵ + 5s⁴ + 2s³ + 3s² + 4s + 10 y «¿estable?» en rojo. | push in rápido | SVG |
| 2 | Sin calculadora de raíces, solo tienes un camino: Routh. | Una calculadora con «raíces» se tacha; el perrito cae. | deriva lenta | SVG · perrito |
| 3 | Y la tabla entera se arma con una sola cruz. | Una cruz de cuatro números se dibuja en blanco. | push out | SVG |

## Qué es estable · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 4 | Un sistema es estable si toda entrada acotada da una salida acotada. | Entrada encerrada entre dos líneas → salida encerrada entre dos líneas, verde. | viaje largo a la estación 1 | SVG |
| 5 | Eso pasa si y solo si todos los polos tienen parte real negativa. | Plano s con todas las × a la izquierda, zona verde. | push in | SVG |
| 6 | Un polo sobre el eje imaginario ya no cuenta como estable: es críticamente estable. | Una × sobre el eje jω parpadea ámbar. | deriva lenta | SVG |
| 7 | Ejemplo: uno entre ese con un escalón da una rampa que crece sin límite. | 1/s × escalón → rampa que se sale del cuadro, roja. El perrito se inclina. | pan con desenfoque | SVG · perrito |

## Condición necesaria · brillo #ffd166

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 8 | Primera revisión, antes de cualquier tabla. | Lupa sobre los coeficientes. | viaje largo a la estación 2 | Phosphor `magnifying-glass` |
| 9 | Todos los coeficientes deben existir y tener el mismo signo. | Coeficientes en fila, todos con «+» verde. | push in | SVG |
| 10 | Si falta uno, como en ese a la cuarta más dos ese al cubo más tres ese más cuatro, ya es inestable. | s⁴ + 2s³ + 0s² + 3s + 4: el hueco de s² parpadea rojo, «NO ESTABLE». | deriva lenta | SVG |
| 11 | Pero ojo: que pase esta prueba no garantiza nada; solo te deja seguir. | Tarjeta «necesaria ≠ suficiente». | push in | Phosphor `warning` |

## Armar la tabla · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 12 | Las dos primeras filas se llenan con los coeficientes alternados. | Tabla vacía con filas s⁴…s⁰; los coeficientes saltan en zigzag a las dos primeras filas. | viaje largo a la estación 3 | SVG |
| 13 | Fila de arriba: el primero, el tercero, el quinto. Fila de abajo: el segundo, el cuarto, el sexto. | Con s⁴ + 3s³ + s² + 8s + 8: fila 1 = 1, 1, 8; fila 2 = 3, 8, 0. | push in | SVG |
| 14 | Cada elemento nuevo: el pivote por el de arriba a la derecha, menos el de arriba a la izquierda por el de abajo a la derecha, todo entre el pivote. | La cruz se dibuja sobre los cuatro números: (3·1 − 1·8)/3 = −5/3. | deriva lenta | SVG |
| 15 | El pivote es el primer número de la fila de justo arriba. | El 3 se encierra en un círculo «pivote». | push in | SVG |
| 16 | Donde no hay número, pon cero. | Celda vacía se llena con un 0 gris. El perrito asiente. | deriva lenta | SVG · perrito |

## Leer la columna · brillo #c77dff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 17 | Ahora lee solo la primera columna. | La primera columna se ilumina; las demás se atenúan. | viaje largo a la estación 4 | SVG |
| 18 | Cada cambio de signo es una raíz en el semiplano derecho. | Flechas entre filas consecutivas: + → − se marca «cambio». | push in | SVG |
| 19 | Si toda la columna es positiva, es estable. | Columna toda verde con ✓. | deriva lenta | Phosphor `check-circle` |

## Ejemplos de clase · brillo #ff9f1c

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 20 | Ejemplo de clase: ese a la cuarta más tres ese al cubo más ese al cuadrado más ocho ese más ocho. | Tabla del ejemplo de cuarto orden completándose celda por celda. | viaje largo a la estación 5 | SVG |
| 21 | La primera columna queda uno, tres, menos cinco tercios, 112 quintos y ocho. | 1, 3, −5/3, 112/5, 8; los números se transforman en su sitio. | push in | SVG |
| 22 | De positivo a negativo y de vuelta a positivo: dos cambios, dos polos inestables. | Dos flechas rojas de cambio; en un mini plano s, dos × a la derecha. | deriva lenta | SVG |
| 23 | Cuenta cambios, no números negativos: un solo negativo puede dar dos cambios. | El −5/3 se marca «1 negativo = 2 cambios». | deriva lenta | SVG |
| 24 | El de quinto grado: ese a la quinta más cinco ese a la cuarta más dos ese al cubo más tres ese al cuadrado más cuatro ese más diez. | El polinomio del gancho entra en una tabla nueva. | pan con desenfoque | SVG |
| 25 | Su columna es uno, cinco, siete quintos, menos veintinueve séptimos, 156 entre 29 y diez: otra vez dos cambios. | 1, 5, 7/5, −29/7, 156/29, 10; dos cambios; dos × a la derecha. El perrito salta. | push in | SVG · perrito |

## Atajo de tercer orden · brillo #4da3ff

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 26 | Y para tercer grado, el atajo que te ahorra la tabla. | Tarjeta dorada «3.er orden». | viaje largo a la estación 6 | SVG |
| 27 | Ese al cubo más a ese al cuadrado más b ese más c es estable si a y c son positivos y a por b es mayor que c. | s³ + as² + bs + c: «a > 0, c > 0, ab > c». | push in | SVG |
| 28 | Con ese al cubo más diez ese al cuadrado más ese más dos: diez por uno es diez, mayor que dos, estable. | 10 · 1 = 10 > 2 ✓, verde. | deriva lenta | SVG |

## Clímax · brillo el error más repetido

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 29 | El error que más se repite: copiar un número en lugar de hacer la cruz. | Golpe y sacudida; brillo rojo. Una celda copiada se pone roja. | push in con golpe | SVG |
| 30 | En clase, alguien puso dos donde iba diez, y toda la tabla dejó de ser del polinomio. | En la tabla de quinto orden, un «2» en la celda de c₂ vuelve rojas todas las celdas de abajo; luego se corrige a 10 y todo vuelve a verde. | deriva lenta | SVG |
| 31 | Cada elemento sale de su cruz, sin excepción. | Rótulo verde «1 celda = 1 cruz». El perrito celebra con bocadillo `check-circle`. | push out | perrito · Phosphor `check-circle` |

## Cierre · brillo #06d6a0

| # | Frase (voz) | Qué se ve | Cámara | Medio |
|---:|---|---|---|---|
| 32 | Arma la tabla de ese a la cuarta más tres ese al cubo más ese al cuadrado más ocho ese más ocho sin mirar y busca los dos cambios. | Plano general de las seis estaciones. | push out a plano general | SVG |
| 33 | Sígueme para más trucos de control. | Tarjeta de perfil @perritoCAD; «Seguir» → «Siguiendo». | push in a la tarjeta | perrito-avatar.png |

## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| Estabilidad BIBO ⇔ polos con parte real negativa; eje jω = críticamente estable; 1/s con escalón da rampa | Libro de Vásquez López cap. 5 (teorema 10, Ej. 31); artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) tema 5 |
| Condición necesaria; s⁴ + 2s³ + 3s + 4 no pasa | Libro Ej. 32.1; apuntes Clase 4 parte 2 (15 oct 2026) |
| Regla de la cruz b₁ = (a₁a₂ − a₀a₃)/a₁; celda vacía = 0 | Libro §5.1; apuntes Clase 4 parte 2, «Completar c1 y d1» |
| s⁴ + 3s³ + s² + 8s + 8 → 1, 3, −5/3, 112/5, 8; dos cambios | Apuntes Clase 4 parte 2, 32:00–1:04:50; sympy: raíces 0.564 ± j1.555 |
| s⁵ + 5s⁴ + 2s³ + 3s² + 4s + 10 → 1, 5, 7/5, −29/7, 156/29, 10; dos cambios | Apuntes Clase 4 parte 2, 1:04:50–1:19:30; sympy: raíces 0.696 ± j0.979 |
| El «2 en lugar de 10» en c₂ | Apuntes Clase 4 parte 2, «Quinto orden: c1 y c2» (transcripción) |
| Atajo de 3.er orden; s³ + 10s² + s + 2 estable | Artifact Laboratorio («Atajo de 3.er orden»); libro Ej. 33 (columna 1, 10, 0.8, 2) |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| Routh | Ráuz |
| Hurwitz | Júrvits |
| 112 | ciento doce |
| 156 / 29 | ciento cincuenta y seis / veintinueve |

## Medios
Todo dibujado.
