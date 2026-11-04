---
titulo: 09 · Mason paso a paso con el problema del integrador
formato: tutorial paso a paso (problema de examen resuelto)
publico: estudiantes de Ingeniería de Control que presentan el integrador sin formulario
tema: regla de Mason, trayectos, lazos, lazos que no se tocan, Δ y cofactores; problema 2 del Integrador 1 (2026); comprobación con k = 0
---

## Gancho · #ff5a5f
30 puntos del integrador se ganaban con una sola fórmula: Mason. || Primer fotograma: el diagrama del problema 2 redibujado y «30 pts» en rojo. || push in rápido || SVG
Y casi todos los errores salen de un solo paso: los lazos que no se tocan. || Dos lazos se superponen y chocan con un destello rojo. El perrito cae. || deriva lenta || SVG · perrito
Vamos a resolver el problema del examen completo. || El diagrama se acomoda en el centro del mundo. || push out || SVG

## La fórmula · #4da3ff
La regla de Mason dice: suma de cada trayecto por su cofactor, entre delta. || T = Σ Pₖ Δₖ / Δ en tarjeta grande. || viaje largo a la estación 1 || SVG
Delta es uno, menos la suma de todos los lazos, más los productos de pares de lazos que no se tocan, menos los tríos, y así. || Δ = 1 − ΣLᵢ + ΣLᵢLⱼ − ΣLᵢLⱼLₖ… con signos alternos coloreados. || push in || SVG
Cada cofactor es delta, quitando los lazos que tocan ese trayecto. || «Δₖ = Δ sin los lazos que tocan Pₖ». || deriva lenta || SVG
Tocarse significa compartir un nodo o un bloque. || Dos lazos con un nodo común: el nodo parpadea en rojo. El perrito asiente. || push in || SVG · perrito

## Datos y trayectos · #ffd166
En el examen, G1, G3 y G4 valen uno, G2 es k entre ese, G5 es uno entre ese. || Los bloques del diagrama cambian su nombre por su valor. || viaje largo a la estación 2 || SVG
H1 y H3 valen uno, y H2 es uno entre ese más a. || H₁ = H₃ = 1, H₂ = 1/(s + a). || deriva lenta || SVG
Trayecto uno: por arriba, G1 G2 G3 G4: k entre ese. || Una línea blanca recorre el camino de arriba; P₁ = k/s. || push in || SVG
Trayecto dos: por abajo, G1 G5 G4: uno entre ese. || Una línea amarilla recorre el camino de abajo; P₂ = 1/s. || pan con desenfoque || SVG

## Lazos · #c77dff
Ahora los lazos, cada uno con su signo menos porque la realimentación es negativa. || Cuatro colores listos al costado. || viaje largo a la estación 3 || SVG
L1, con H1 alrededor de G2: menos k entre ese. || Lazo rojo alrededor de G₂: L₁ = −k/s. || push in || SVG
L2, el grande por H2 pasando por G2, G3 y G4: menos k entre ese por ese más a. || Lazo azul grande: L₂ = −k/[s(s + a)]. || deriva lenta || SVG
L3, por H2 pero bajando por G5: menos uno entre ese por ese más a. || Lazo verde: L₃ = −1/[s(s + a)]. || deriva lenta || SVG
L4, el pequeño de H3 con G5: menos uno entre ese. || Lazo café abajo: L₄ = −1/s. || deriva lenta || SVG

## Lazos que no se tocan · #06d6a0
¿Qué pares no se tocan? || Matriz 4 × 4 de pares vacía. || viaje largo a la estación 4 || SVG
L1 y L4: uno vive arriba y otro abajo, sin nodos en común. || L₁ y L₄ se separan sin chocar; casilla verde. || push in || SVG
L2 y L4: el grande no pasa por el lazo de G5. || L₂ y L₄ sin nodo común; casilla verde. || deriva lenta || SVG
Los demás comparten algún nodo, así que no entran. || Las demás casillas se ponen rojas con su nodo común marcado. || deriva lenta || SVG
No hay tríos. || Casilla «tríos: 0». || deriva lenta || SVG
Delta es uno, menos la suma de los cuatro lazos, más L1 por L4, más L2 por L4. || Δ = 1 − (L₁ + L₂ + L₃ + L₄) + L₁L₄ + L₂L₄. El perrito salta. || push in || SVG · perrito

## Cofactores y resultado · #ff9f1c
El trayecto uno no toca a L4, así que su cofactor es uno menos L4: uno más uno entre ese. || P₁ y L₄ sin contacto; Δ₁ = 1 + 1/s. || viaje largo a la estación 5 || SVG
El trayecto dos toca a todos: su cofactor es uno. || P₂ toca los cuatro lazos; Δ₂ = 1. || deriva lenta || SVG
Multiplica todo por ese al cuadrado por ese más a para quitar fracciones. || Factor s²(s + a) barre la fracción grande. || push in || SVG
El numerador queda k ese más k más ese, por ese más a. || Numerador: (ks + k + s)(s + a). || deriva lenta || SVG
Y el denominador: ese al cubo, más a más k más uno por ese al cuadrado, más a k más dos k más a más uno por ese, más a más uno por k. || Denominador: s³ + (a + k + 1)s² + (ak + 2k + a + 1)s + (a + 1)k, en tarjeta verde. || push in || SVG

## Clímax · compruébalo con k igual a cero · #ff5a5f
Ese denominador es el que vas a meter a Routh, así que verifícalo. || Golpe y sacudida; brillo rojo; el denominador se mueve a una caja «→ Routh». || push in con golpe || SVG
Truco para comprobar: haz k igual a cero. || En el diagrama, G₂ = k/s se apaga y la rama de arriba se pone gris. || deriva lenta || SVG
Solo sobrevive la rama de abajo, y reducida a mano da ese más a, entre ese al cuadrado más a más uno por ese, más a más uno. || La rama de abajo se reduce en dos pasos: (s + a)/[s² + (a + 1)s + (a + 1)]. || pan con desenfoque || SVG
Tu fórmula de Mason con k igual a cero debe dar lo mismo, y da lo mismo. || Las dos expresiones se superponen y coinciden; ✓ verde grande. || push in || Phosphor `check-circle`
El error que más puntos quitó: multiplicar lazos que sí se tocan. || Tarjeta roja «L₁·L₂ ✗»; el perrito celebra con bocadillo `check-circle` al taparla. || push out || perrito · Phosphor `check-circle`

## Cierre · #06d6a0
Marca cada lazo con un color y busca los pares sin nodos en común. || Plano general de las cinco estaciones con los cuatro lazos coloreados. || push out a plano general || SVG
En el siguiente vídeo: la tabla de Routh. || Tarjeta final «Siguiente · 10» con el título del próximo vídeo y el mapa de la serie. || push in a la tarjeta || SVG

=== NOTAS ===
## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| Diagrama, valores de bloques y 30 puntos de Mason | Examen Integrador 1, 23 oct 2026 (`Ex_integrdor1.pdf`), problema 2 |
| T₁ = k/s, T₂ = 1/s; L₁…L₄; pares L₁L₄ y L₂L₄; Δ₁ = 1 + 1/s, Δ₂ = 1 | Solución oficial (`Ex_integrdor1_solucion.pdf`, pp. 2–3) |
| T(s) = (ks + k + s)(s + a)/[s³ + (a+k+1)s² + (ak+2k+1+a)s + (a+1)k] | Solución oficial p. 3; comprobado con sympy resolviendo las ecuaciones de nodos (`comprobaciones/verificar.py`: «Mason == nodos: True») |
| Comprobación con k = 0 → (s + a)/[s² + (a+1)s + (a+1)] | Reducción propia de la rama inferior; coincide con la fórmula general con k = 0 |
| Fórmula de Mason, «tocarse = compartir nodo» | Libro de Vásquez López §2.1; apuntes Clase 3 parte 3 (8 oct 2026) y Clase 4 parte 1 (15 oct 2026) |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| Mason | Méison |
| 30 | treinta |
| G1…G5 | ge uno … ge cinco |
| H1…H3 | hache uno … hache tres |
| L1…L4 | ele uno … ele cuatro |
| delta | delta |

## Medios
Todo dibujado. El diagrama del examen se redibuja con bloques blancos.
