---
titulo: 11 · Routh sin atorarte: ceros en la tabla y rango de k
formato: errores y cómo arreglarlos
publico: estudiantes de Ingeniería de Control que presentan el integrador sin formulario
tema: caso especial ε, renglón de ceros y polinomio auxiliar, rango de estabilidad de k, frecuencia en el límite, Routh del problema 2 del Integrador 1 (2026), trampa del Ej. 42
---

## Gancho · #ff5a5f
A mitad de la tabla de Routh te sale un cero en la primera columna. || Primer fotograma: tabla a medio llenar; un 0 en la primera columna parpadea rojo. || push in rápido || SVG
No puedes dividir entre cero, y ahí se atora medio salón. || «÷ 0» en rojo; el perrito cae sobre la tabla. || deriva lenta || SVG · perrito
Hay dos casos, y cada uno tiene su salida. || Dos puertas: «Caso 1» y «Caso 2». || push out || SVG

## Caso 1 · épsilon · #4da3ff
Caso uno: el cero aparece solo en la primera columna y el resto de la fila no es cero. || Fila «0  1»: el 0 rojo, el 1 blanco. || viaje largo a la estación 1 || SVG
Cámbialo por épsilon, un número positivo muy pequeño, y sigue. || El 0 se transforma en ε. || push in || SVG
Al final, haz que épsilon tienda a cero y cuenta los cambios de signo. || «ε → 0⁺» y flechas de signo en la columna. || deriva lenta || SVG
En ese a la quinta más dos ese a la cuarta más dos ese al cubo más cuatro ese al cuadrado más seis ese más diez, la fila de ese al cubo empieza en cero. || Tabla de s⁵ + 2s⁴ + 2s³ + 4s² + 6s + 10; fila s³ = 0, 1. || pan con desenfoque || SVG
Con épsilon, la siguiente queda cuatro menos dos entre épsilon: muy negativa. || 4 − 2/ε → «−∞» en rojo. || push in || SVG
Dos cambios de signo: dos raíces en el semiplano derecho. || Dos flechas de cambio; dos × a la derecha. El perrito asiente. || deriva lenta || SVG · perrito

## Caso 2 · renglón de ceros · #ffd166
Caso dos: toda una fila se hace cero. || Fila completa de ceros, roja. || viaje largo a la estación 2 || SVG
Eso avisa que hay raíces simétricas respecto al origen, como un par en el eje imaginario. || Plano s con un par ± jω simétrico. || push in || SVG
Arma el polinomio auxiliar con la fila de arriba, derívalo y usa esa derivada en lugar de los ceros. || Fila de arriba → P(s); P′(s) baja y reemplaza los ceros. || deriva lenta || SVG
Las raíces simétricas salen de igualar el auxiliar a cero. || P(s) = 0 → ± jω. || deriva lenta || SVG
Ejemplo del libro: ese al cubo más dos ese al cuadrado más cuatro ese más ocho. || Tabla de s³ + 2s² + 4s + 8. || pan con desenfoque || SVG
La fila de ese a la uno se hace cero; el auxiliar es dos ese al cuadrado más ocho. || Fila s¹ = 0 → P(s) = 2s² + 8 → P′(s) = 4s. || push in || SVG
Sus raíces son más menos dos jota: oscila para siempre, críticamente estable. || × en ± j2 sobre el eje; senoide sin fin, ámbar. || deriva lenta || SVG

## Rango de k · #06d6a0
Ahora la pregunta estrella del integrador: ¿para qué valores de k es estable? || Deslizador de k con «¿?». || viaje largo a la estación 3 || SVG
Arma la tabla con k como letra. || Tabla con k dentro de las celdas. || deriva lenta || SVG
Pide que cada elemento de la primera columna sea positivo. || Cada celda de la primera columna lleva «> 0». || deriva lenta || SVG
Y quédate con la intersección de todas las condiciones. || Rectas numéricas que se superponen; se queda el tramo común. || push in || SVG
Ejemplo: ese al cubo más tres ese al cuadrado más tres ese más uno más k. || s³ + 3s² + 3s + (1 + k). || pan con desenfoque || SVG
La fila de ese a la uno es ocho menos k, entre tres; la última es uno más k. || s¹: (8 − k)/3; s⁰: 1 + k. || deriva lenta || SVG
Estable para k entre menos uno y ocho. || Recta numérica: −1 < k < 8 en verde. El perrito salta. || push in || SVG · perrito

## El valor crítico · #c77dff
En el límite, k igual a ocho, la fila de ese a la uno se anula. || El deslizador llega a 8; la fila s¹ se vuelve 0. || viaje largo a la estación 4 || SVG
El auxiliar de la fila de arriba te da la frecuencia de oscilación. || Fila s²: 3, 9 → P(s) = 3s² + 9. || push in || SVG
Tres ese al cuadrado más nueve igual a cero: ese es más menos jota raíz de tres. || s = ± j√3 = ± j1.73; senoide de amplitud constante. || deriva lenta || SVG
Eso es lo que usan Ziegler y Nichols para sintonizar un PID, y lo vemos en el siguiente vídeo. || Rótulo «Z-N → vídeo 12». || push out || SVG

## El problema del integrador · #ff9f1c
En el integrador, el polinomio de Mason fue ese al cubo, más a más k más uno por ese al cuadrado, más a k más dos k más a más uno por ese, más a más uno por k. || El denominador del vídeo 09 llega volando a una tabla nueva. || viaje largo a la estación 5 || SVG
Con a positiva, el término independiente pide k positiva. || s⁰: (a + 1)k > 0 → k > 0. || push in || SVG
Y la fila de ese a la uno, desarrollada, solo tiene sumandos positivos cuando k es positiva. || Numerador de s¹: (a+1)² + (a+1)(a+2)k + (a+2)k², todos los términos en verde para k > 0. || deriva lenta || SVG
Conclusión del examen: estable para toda k mayor que cero. || Tarjeta verde «estable ⇔ k > 0». || push in || Phosphor `check-circle`

## Clímax · la trampa del ejemplo 42 · #ff5a5f
Y la trampa del libro, ejemplo 42. || Golpe y sacudida; brillo rojo. || push in con golpe || SVG
Para error de 0.1 al escalón pedían k igual a nueve, pero Routh exige k menor que ocho. || 1/(1 + k) = 0.1 → k = 9; recta numérica con k = 9 fuera de la zona verde. || deriva lenta || SVG
No existe una k que cumpla: siempre revisa la estabilidad antes de calcular el error. || Tarjeta «Routh primero, error después». El perrito celebra con bocadillo `shield-check`. || push out || perrito · Phosphor `shield-check`

## Cierre · #06d6a0
Practica el rango de k con el polinomio del integrador hasta que te salga sin mirar. || Plano general de las cinco estaciones. || push out a plano general || SVG
En el siguiente vídeo: error en estado estable y PID. || Tarjeta final «Siguiente · 12» con el título del próximo vídeo y el mapa de la serie. || push in a la tarjeta || SVG

=== NOTAS ===
## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| Caso ε y caso de renglón de ceros con polinomio auxiliar | Libro de Vásquez López §5.1.1; artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) «Caso especial 1 y 2» |
| s⁵ + 2s⁴ + 2s³ + 4s² + 6s + 10: fila s³ = (0, 1), s² = 4 − 2/ε, dos cambios | Libro, Tarea 2 (cap. 5); artifact Laboratorio, autoevaluación; raíces 0.80 ± 1.31j |
| s³ + 2s² + 4s + 8: P(s) = 2s² + 8, raíces ± 2j | Libro Ej. 35/37 (el artifact anota que en rigor es renglón de ceros) |
| s³ + 3s² + 3s + 1 + k: s¹ = (8 − k)/3, s⁰ = 1 + k, −1 < k < 8 | Libro Ej. 42; sympy |
| En k = 8: 3s² + 9 → ± j√3 | Cuenta propia; (s + 1)³ + 8 = (s + 3)(s² + 3) |
| Problema 2 del integrador: estable ⇔ k > 0 | Solución oficial (`Ex_integrdor1_solucion.pdf`, pp. 3–4); sympy: numerador de s¹ = (a+1)² + (a+1)(a+2)k + (a+2)k² |
| Ej. 42: e_ss = 0.1 pide k = 9 pero Routh exige k < 8 | Libro Ej. 42; artifact Laboratorio §5.2 |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| Routh | Ráuz |
| épsilon | épsilon |
| Ziegler | Zíguler |
| Nichols | Níkols |
| PID | pe i de |
| 0.1 | cero punto uno |
| 42 | cuarenta y dos |

## Medios
Todo dibujado.
