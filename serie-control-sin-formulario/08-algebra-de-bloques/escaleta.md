---
titulo: 08 · Reduce cualquier diagrama de bloques sin perderte
formato: tutorial paso a paso
publico: estudiantes de Ingeniería de Control que presentan el integrador sin formulario
tema: serie, paralelo, lazo G/(1+GH), mover sumadores y nodos, método de ecuaciones por sumador; ExR II (kp, kd, kf); pregunta conceptual del ExR 3b
---

## Gancho · #ff5a5f
Un diagrama de bloques mal reducido arrastra el error a todo el problema. || Primer fotograma: un diagrama enredado; un signo equivocado se pone rojo y el rojo se propaga por todas las flechas. || push in rápido || SVG
Y en el integrador, la función de transferencia es el primer paso de todo. || Escalera: «G(s) → polos → Routh → error»; el primer escalón se rompe. El perrito cae. || deriva lenta || SVG · perrito
Con tres reglas y dos movimientos lo reduces sin perderte. || Tres tarjetas y dos flechas curvas aparecen en blanco. || push out || SVG

## Tres reglas · #4da3ff
Bloques en serie se multiplican. || G₁ → G₂ se funden en un bloque G₁G₂. || viaje largo a la estación 1 || SVG
Bloques en paralelo se suman, con el signo de cada rama. || Dos ramas G₁ y G₂ a un sumador se funden en G₁ ± G₂. || deriva lenta || SVG
Y un lazo de realimentación negativa es G entre uno más G por H. || Un lazo G con H abajo se colapsa en G/(1 + GH), en verde. || push in || SVG
Si la realimentación es positiva, el signo de abajo cambia a menos. || El «+» del sumador parpadea y el denominador cambia a 1 − GH. || deriva lenta || SVG
De ahí sale la ecuación característica: uno más G por H igual a cero. || «1 + GH = 0» en una tarjeta con el rótulo «polos de lazo cerrado». El perrito asiente. || push in || SVG · perrito

## Dos movimientos · #ffd166
Cuando los lazos se enciman, mueve sumadores o nodos. || Dos lazos cruzados; un sumador se marca para moverse. || viaje largo a la estación 2 || SVG
Si mueves un sumador hacia atrás de un bloque G, la señal que entraba ahí pasa por uno entre G. || El sumador salta antes de G; en su rama aparece un bloque 1/G. || push in || SVG
Si lo mueves hacia adelante, pasa por G. || El sumador salta después de G; en su rama aparece un bloque G. || deriva lenta || SVG
Con un nodo de derivación es al revés: hacia atrás, la rama pasa por G; hacia adelante, por uno entre G. || Un punto de derivación se mueve y aparecen G y 1/G en la rama. || pan con desenfoque || SVG
La regla para no equivocarte: la señal que sale debe ser la misma que antes. || Un medidor en la salida marca la misma señal antes y después; ✓ verde. || push in || Phosphor `check-circle`

## Ejemplo · examen rápido II · #06d6a0
Ejemplo del examen rápido: un lazo externo con kp y kf, y uno interno con kd. || Diagrama redibujado: R → sumador → kp → sumador (+ kf·R, − kd) → 1/(s + a) → 1/s → Y. || viaje largo a la estación 3 || SVG
Empieza siempre por el lazo más interno. || El lazo de kd se ilumina. || push in || SVG
Uno entre ese más a, realimentado con kd, queda uno entre ese más a más kd. || 1/(s + a) con kd se colapsa en 1/(s + a + kd). || deriva lenta || SVG
En serie con el integrador: uno entre ese por ese más a más kd. || Se funde con 1/s: 1/[s(s + a + kd)]. || deriva lenta || SVG
La señal kf entra sin pasar por el comparador, así que es mejor escribir la ecuación del sumador. || La rama kf parpadea en ámbar. El perrito se inclina. || pan con desenfoque || SVG · perrito
El sumador recibe kp por el error, más kf por la referencia. || Sumador: kp(R − Y) + kf·R. || push in || SVG
Escribe Y igual a la planta por kp por R menos Y, más kf por R. || Y = [1/(s(s + a + kd))]·[kp(R − Y) + kf R]. || deriva lenta || SVG
Despeja Y entre R: kp más kf, entre ese al cuadrado, más a más kd por ese, más kp. || Y/R = (kp + kf)/[s² + (a + kd)s + kp], en tarjeta verde. || push in || SVG

## Comprueba tu resultado · #c77dff
Comprueba tu resultado con dos preguntas. || Dos casillas de verificación. || viaje largo a la estación 4 || SVG
¿El grado del denominador coincide con el número de bloques dinámicos? Aquí hay dos, grado dos. || 1/(s + a) y 1/s se cuentan: 2 = grado 2 ✓. || deriva lenta || SVG
¿La ganancia en cero tiene sentido? Kp más kf entre kp: con kf igual a cero, uno, sin error al escalón. || G(0) = (kp + kf)/kp; con kf = 0 → 1 ✓. || deriva lenta || SVG
Si una de las dos falla, revisa signos. || Los signos del diagrama parpadean. || push in || Phosphor `warning`

## Pregunta conceptual · #ff9f1c
Pregunta de examen rápido: dos diagramas distintos dan la misma función de transferencia. || Dos diagramas diferentes con la misma G(s) debajo. || viaje largo a la estación 5 || SVG
¿Qué es necesariamente cierto? || Cuatro opciones a–d. || deriva lenta || SVG
No que tengan los mismos lazos ni las mismas señales internas. || Opciones a, b y c se tachan en rojo. || deriva lenta || SVG
Solo que, con condiciones iniciales cero, dan la misma salida ante la misma entrada. || La opción d se ilumina en verde con la nota «CI = 0». El perrito asiente. || push in || SVG · perrito

## Clímax · el truco del enredo · #ff5a5f
Y el truco que te salva cuando el diagrama es un enredo. || Golpe y sacudida; brillo rojo; diagrama enredado. || push in con golpe || SVG
Ponle nombre a la salida de cada sumador y escribe una ecuación por sumador. || Etiquetas e₁, e₂, e₃ en cada sumador; tres ecuaciones aparecen al lado. || deriva lenta || SVG
Es álgebra pura, y funciona aunque ninguna regla de movimiento te salga. || Las ecuaciones se resuelven y queda una sola G(s), verde. || pan con desenfoque || SVG
Y si hay muchos lazos cruzados, usa Mason. || Rótulo «Mason → vídeo 09». El perrito celebra con bocadillo `lightbulb`. || push out || perrito · Phosphor `lightbulb`

## Cierre · #06d6a0
Reduce el mismo diagrama dos veces, por reglas y por ecuaciones, y compara. || Plano general de las cinco estaciones. || push out a plano general || SVG
En el siguiente vídeo: Mason con el problema del integrador. || Tarjeta final «Siguiente · 09» con el título del próximo vídeo y el mapa de la serie. || push in a la tarjeta || SVG

=== NOTAS ===
## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| Serie, paralelo, G/(1 ± GH), mover sumadores y nodos | Libro de Vásquez López §2.2; artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) tema 4 (tabla de reglas); Douglas (2019) cap. 3 |
| Ecuación característica 1 + GH = 0 | Artifact Laboratorio, formulario |
| Diagrama del ExR II y Y/R = (kp + kf)/[s² + (a + kd)s + kp] | `Examen Rápido 2a.pdf` (3 oct 2025); resuelto con sympy |
| Dos diagramas con la misma G(s) → misma salida con CI = 0 | `ExR_3b_octubre-1.pdf` (13 oct 2026), pregunta 1. El enunciado dice «mismas condiciones iniciales»; el vídeo lo acota a CI = 0 porque así es como la G(s) garantiza la misma salida |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| kp / kd / kf | ka pe / ka de / ka efe |
| G / H | ge / hache |
| Mason | Méison |

## Medios
Todo dibujado.
