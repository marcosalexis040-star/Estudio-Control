---
titulo: 05 · Tiempo pico, sobreimpulso y establecimiento: dedúcelos sin formulario
formato: tutorial paso a paso
publico: estudiantes de Ingeniería de Control que presentan el integrador sin formulario
tema: deducción de tp, Mp, ts y tr desde y(t); tabla ζ → Mp; despeje de ζ desde Mp; Mp directo del polo
---

## Gancho · #ff5a5f
Sin formulario, las fórmulas de tiempo pico y sobreimpulso son las que primero se olvidan. || Primer fotograma: cuatro tarjetas tₚ, Mₚ, tₛ, tᵣ con su fórmula; las fórmulas se borran letra por letra. || push in rápido || SVG
Y en el último integrador valían 40 puntos. || Barra de 100 puntos del examen: 40 se ponen rojos con el rótulo «Problema 1». El perrito cae. || deriva lenta || SVG · perrito
No las memorices: dedúcelas de una sola ecuación en un minuto. || Las cuatro tarjetas vacías se unen con flechas a una sola ecuación en el centro. || push out || SVG

## La respuesta · #4da3ff
La respuesta al escalón subamortiguada es uno, menos una exponencial que se apaga, por un seno. || y(t) = 1 − [e^(−σt)/√(1−ζ²)]·sin(ωd t + β) y su curva. || viaje largo a la estación 1 || SVG
La exponencial es e a la menos sigma t: solo contiene a sigma, y es la envolvente. || La envolvente 1 ± e^(−σt)/√(1−ζ²) se dibuja punteada en verde azulado. || push in || SVG
El seno oscila con frecuencia omega de, y empieza desfasado el ángulo beta. || El seno se resalta en violeta y el desfase β en ámbar. El perrito asiente. || deriva lenta || SVG · perrito

## Tiempo pico · #c77dff
El pico está donde la derivada vale cero. || Cursor en el primer máximo; tangente horizontal. || viaje largo a la estación 2 || SVG
La derivada del escalón es la respuesta al impulso: una exponencial por seno de omega de t. || dy/dt = [ωn/√(1−ζ²)]·e^(−σt)·sin(ωd t). || push in || SVG
La exponencial nunca vale cero, así que manda el seno. || e^(−σt) se marca «≠ 0» en gris; sin(ωd t) se ilumina. || deriva lenta || SVG
El primer cero después del inicio es omega de t igual a pi. || ωd·t = π. || push in || SVG
Tiempo pico: pi entre omega de. Solo depende de la parte imaginaria. || Tarjeta tₚ = π/ωd con un borde violeta; en el plano s, la altura del polo parpadea. || push out || SVG

## Sobreimpulso · #ffd166
Ahora evalúa la exponencial en ese tiempo. || t = π/ωd entra en e^(−σt). || viaje largo a la estación 3 || SVG
Te queda e a la menos pi por sigma entre omega de. || e^(−σπ/ωd), el exponente se transforma en su sitio. || push in || SVG
Ese es el sobreimpulso máximo, y solo depende del cociente sigma entre omega de, es decir, del ángulo. || Tarjeta Mₚ = e^(−πσ/ωd); en el plano s, un rayo desde el origen parpadea en ámbar. || deriva lenta || SVG
En términos de zeta: e a la menos pi zeta entre la raíz de uno menos zeta al cuadrado. || Debajo: Mₚ = e^(−πζ/√(1−ζ²)). || deriva lenta || SVG

## Establecimiento y subida · #06d6a0
Para el establecimiento, pide que la envolvente baje del 2 %. || Banda del 2 % alrededor de 1; la envolvente entra en ella. || viaje largo a la estación 4 || SVG
Como el logaritmo de 50 es casi cuatro, queda cuatro entre sigma. || e^(−σtₛ) = 0.02 → σtₛ = ln 50 ≈ 3.9 → 4; tₛ ≈ 4/σ. || push in || SVG
Por eso el tiempo de establecimiento es aproximado y solo depende de la parte real. || Sello «≈» en la tarjeta tₛ; en el plano s, una vertical parpadea en verde azulado. || deriva lenta || SVG
Con el criterio del 5 % es tres entre sigma. || 2 % → 5 %: el 4 se transforma en 3. || deriva lenta || SVG
Y el tiempo de subida, de cero al cien por ciento, es pi menos beta, entre omega de. || El seno se anula cuando ωd t + β = π → tᵣ = (π − β)/ωd. El perrito señala. || push in || SVG · perrito

## Cuatro valores para memorizar · #ff9f1c
Para no depender de la calculadora, memoriza cuatro parejas. || Tabla vacía de cuatro filas ζ → Mₚ. || viaje largo a la estación 5 || SVG
Zeta 0.5 da 16 % de sobreimpulso. || Fila 1: 0.5 → 16 %, el número se transforma. || deriva lenta || SVG
Zeta 0.6 da 9.5 %. || Fila 2: 0.6 → 9.5 %. || deriva lenta || SVG
Zeta 0.7 da 4.6 %. || Fila 3: 0.7 → 4.6 %. || deriva lenta || SVG
Y zeta 0.8, 1.5 %. || Fila 4: 0.8 → 1.5 %. Las cuatro filas se iluminan. || push in || SVG
Si te dan el sobreimpulso y piden zeta, despeja con el logaritmo. || Flecha de regreso Mₚ → ζ. || pan con desenfoque || SVG
Zeta es menos el logaritmo de Mp, entre la raíz de pi al cuadrado más ese logaritmo al cuadrado. || ζ = −ln Mₚ / √(π² + ln² Mₚ). || push in || SVG
Con 10 % sale 0.59. || Mₚ = 0.1 → ζ = 0.59. || deriva lenta || SVG

## Clímax · Mp directo del polo · #ff5a5f
Y aquí el atajo que más puntos da. || Golpe y sacudida; brillo rojo. || push in con golpe || SVG
Si el polo es menos sigma más jota omega de, el sobreimpulso es e a la menos pi por sigma entre omega de. || Polo −σ + jωd y Mₚ = e^(−π·σ/ωd), con σ y ωd coloreados. || deriva lenta || SVG
Con menos cuatro más menos jota cuatro, el cociente es uno: e a la menos pi, 4.3 %. || σ/ωd = 4/4 = 1 → e^(−π) = 4.3 %. || push in || SVG
Con menos dos más menos jota cuatro, es un medio: e a la menos pi medios, 21 %. || σ/ωd = 2/4 = 0.5 → e^(−π/2) = 21 %. || deriva lenta || SVG
Lo calculas directo del polo, sin pasar por zeta. || Tarjeta verde «polo → Mₚ en un paso». El perrito celebra con bocadillo `lightning`. || push out || perrito · Phosphor `lightning`

## Cierre · #06d6a0
Escribe la respuesta al escalón y saca las cuatro fórmulas tú solo, sin mirar. || Plano general: las cinco estaciones, cada tarjeta unida a la ecuación central. || push out a plano general || SVG
En el siguiente vídeo: el problema de los cinco polos del integrador. || Tarjeta final «Siguiente · 06» con el título del próximo vídeo y el mapa de la serie. || push in a la tarjeta || SVG

=== NOTAS ===
## Fuentes y comprobación

| Dato que se dice | Fuente |
|---|---|
| El problema 1 del integrador valía 40 puntos (5 incisos de 8) | Examen Integrador 1, 23 oct 2026 (`Ex_integrdor1.pdf`) |
| y(t) = 1 − e^(−σt)/√(1−ζ²)·sin(ωd t + β) | Libro de Vásquez López §4.2.1; artifact [Del polo a la respuesta](https://claude.ai/artifact/Jd34SCxbLtsozfW5Y5FAkG) §3 |
| tₚ = π/ωd por derivada = respuesta al impulso | Artifact Del polo a la respuesta §3; libro §4.2.1 |
| Mₚ = e^(−πσ/ωd) = e^(−πζ/√(1−ζ²)) | Libro §4.2.1; artifact §3 |
| tₛ ≈ 4/σ (2 %), 3/σ (5 %); ln 50 = 3.91 | Artifact §3; ln 50 calculado |
| tᵣ = (π − β)/ωd, de 0 a 100 % | Libro §4.2.1; artifact [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr) (nota sobre stepinfo, que mide 10–90 %) |
| ζ 0.5/0.6/0.7/0.8 → Mₚ 16.3/9.5/4.6/1.5 % | sympy (`comprobaciones/resultados.txt`) |
| ζ = −ln Mₚ/√(π² + ln² Mₚ); Mₚ = 10 % → ζ = 0.591 | Artifact Laboratorio, formulario; sympy |
| −4 ± j4 → 4.32 %; −2 ± j4 → 20.8 % | Examen Integrador 1 (2026) problema 1 y su solución; sympy |

## COMO_SE_DICE

| Escrito | Se dice |
|---|---|
| Mp | eme pe |
| 40 | cuarenta |
| 2 % / 5 % | dos por ciento / cinco por ciento |
| 50 | cincuenta |
| 0.5 / 0.6 / 0.7 / 0.8 | cero punto cinco / seis / siete / ocho |
| 16 % / 9.5 % / 4.6 % / 1.5 % | dieciséis por ciento / nueve punto cinco / cuatro punto seis / uno punto cinco por ciento |
| 10 % | diez por ciento |
| 0.59 | cero punto cincuenta y nueve |
| 4.3 % | cuatro punto tres por ciento |
| 21 % | veintiún por ciento |
| pi | pi |

## Medios
Todo dibujado o animado.
