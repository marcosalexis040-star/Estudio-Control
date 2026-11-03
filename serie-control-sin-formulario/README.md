# Control sin formulario · serie de 15 reels

Serie vertical de vídeos para estudiar **todo** el temario del examen integrador de Ingeniería de Control (Prof. Vásquez López) sin formulario. Cada vídeo dura unos 3 minutos y entre todos suman unos 45. La meta es que **con solo ver los vídeos** puedas deducir cada fórmula y resolver cada tipo de problema que aparece en los exámenes del Drive.

> **Estado: Fase 1 terminada (guion y lista de medios). Espera tu OK** antes de pasar a la Fase 2 (voz).

## Los 15 vídeos

La duración es una estimación: 2.8 palabras/s más pausas. La real la da `voz.wav`.

| # | Vídeo | Qué deja aprendido | Problemas del Drive que resuelve | Duración est. |
|---|---|---|---|---|
| 01 | [Laplace sin formulario](01-laplace-sin-formulario/guion.md) | La tabla completa desde e^(−at) y 4 trucos; propiedades; valor final e inicial; polo ↔ señal | Base de todos | ~2:56 |
| 02 | [De la ED a la respuesta](02-de-la-ecuacion-a-la-respuesta/guion.md) | ED → G(s); polos y ceros; cancelación; tapar; valor final; ganancia de CD | Libro Ej. 12 y 15 | ~3:03 |
| 03 | [Primer orden](03-primer-orden/guion.md) | K y τ, normalizar, 63 % y 98 %, leer una gráfica, RC, rampa, impulso | Libro Ej. 25 y 26; Simulación 1er orden; Clase 2 | ~2:51 |
| 04 | [Segundo orden: el triángulo del polo](04-segundo-orden-el-triangulo-del-polo/guion.md) | ζ, ωn, cuatro casos, σ, ωd, β, cos β = ζ | Integrador 2026 P1 (s₁) | ~2:39 |
| 05 | [Deduce tₚ, Mₚ, tₛ y tᵣ](05-segundo-orden-deduce-las-formulas/guion.md) | Deducción de las cuatro fórmulas; tabla ζ → Mₚ; despeje de ζ; Mₚ directo del polo | Integrador 2026 P1 | ~2:44 |
| 06 | [Los cinco polos del integrador](06-leer-el-plano-s-problema-del-integrador/guion.md) | Horizontal, vertical, rayo y círculo; «más rápido»; escalar polos | **Integrador 2026 P1 completo**; ExR 3b P2 y P3 | ~2:43 |
| 07 | [Encuentra a, b o k](07-diseno-por-especificaciones/guion.md) | TENGO contra QUIERO; región permitida; lo que una P no mueve | **Integrador 2025 P1**; ExR II a–d; Libro Ej. 27; Integrador 2025 P3 (concepto) | ~3:01 |
| 08 | [Álgebra de bloques](08-algebra-de-bloques/guion.md) | Serie, paralelo, lazo, mover sumadores y nodos, ecuaciones por sumador | ExR II (deducción); ExR 3b P1 | ~2:50 |
| 09 | [Mason con el problema del integrador](09-mason-problema-del-integrador/guion.md) | Trayectos, lazos, no se tocan, Δ y Δₖ; comprobación con k = 0 | **Integrador 2026 P2 (Mason)** | ~2:58 |
| 10 | [Routh: la tabla](10-routh-hurwitz-la-tabla/guion.md) | BIBO, condición necesaria, la cruz, cambios de signo, atajo de 3.er orden | Ejemplos de 4.º y 5.º orden de la Clase 4; Libro Ej. 32.1 y 33 | ~3:04 |
| 11 | [Routh: ceros y rango de k](11-routh-casos-especiales-y-rango-de-k/guion.md) | ε, renglón de ceros, polinomio auxiliar, rango de k, frecuencia crítica | **Integrador 2026 P2 (Routh)**; Libro Ej. 35/37 y 42; Tarea 2 | ~3:18 |
| 12 | [Error en estado estable y PID](12-error-en-estado-estable-y-pid/guion.md) | e_ss, tipo, Kp y Kv; P, I y D; Ziegler-Nichols con Routh | **Integrador 2025 P2**; Libro Ej. 47; Ejercicios de preparación P4 | ~3:28 |
| 13 | [Variables de estado](13-variables-de-estado/guion.md) | ẋ = Ax + Bu; canónica controlable; inversa 2 × 2; det(sI − A); forma diagonal; op-amp | **Ejercicio de prueba (paralelo)**; ExR 5 P1 | ~3:25 |
| 14 | [Retroalimentación de estados](14-retroalimentacion-de-estados/guion.md) | A − BK; colocar polos; ganancia de referencia k₃; diagrama | **ExR 4 y ExR 5 completos** | ~3:14 |
| 15 | [Los 10 errores del integrador](15-los-10-errores-del-integrador/guion.md) | Repaso de toda la serie; estrategia para 100 min; plano general final | Todos | ~2:24 |

Orden de estudio recomendado: del 01 al 15. Si te queda poco tiempo: 06, 09, 11, 07, 12, 14 y 15.

**Decisión pendiente:** los vídeos 11, 12, 13 y 14 se estiman entre 3:14 y 3:28. YouTube Shorts acepta hasta 3:00; TikTok acepta más. Las opciones son:

- dejarlos así (pediste que fueran lo más largos posible);
- subir la velocidad de Loquendo a 62;
- partir cada uno en dos.

## Lo que queda fuera, y por qué

- **Lugar de las raíces, compensación, Bode y Nyquist** (capítulos 6, 7 y 9 del libro) y **Lagrange** (apéndice B): no aparecen en ningún apunte de clase, examen rápido ni integrador del Drive. Si entran en tu examen, dímelo y agrego vídeos.
- **Integrador 2025 P3b** (diseño completo de un PID para tₛ = 2/3 s y Mₚ = 50 %): el vídeo 07 explica por qué la P sola no llega y el 12 enseña el PID, pero no hay solución del profesor en el Drive para comprobar el diseño.
- **Ejercicios de preparación 2019, P1, P2, P6, P7 y P9**: necesitan sus figuras y no hay solución oficial. Los métodos sí están (vídeos 03, 07, 08, 10 y 11).
- **`Apuntes control fern.pdf`**: no se pudo leer (ver `FUENTES.md`).

## Archivos de cada vídeo

```
NN-nombre/
  escaleta.md   fuente única: frase || qué se ve || cámara || medio, y notas (fuentes, COMO_SE_DICE, medios)
  guion.txt     una frase por línea (entrada de voz.mjs)
  guion.md      tabla por frase, duración estimada, fuentes y medios
```

Para regenerar después de editar una escaleta:

```bash
node herramientas/construir-guiones.mjs
```

Documentos comunes: [`FUENTES.md`](FUENTES.md) (qué se leyó y cómo se comprobó), [`MEDIOS-WEB.md`](MEDIOS-WEB.md) (3 medios opcionales, ninguno descargado), [`COMO_SE_DICE.md`](COMO_SE_DICE.md), y `comprobaciones/verificar.py` con su salida en `comprobaciones/resultados.txt`.

## Lo que falta en este entorno para la Fase 2 y siguientes

Esta sesión corre en un contenedor Linux en la nube. Tu plantilla pide cosas que solo están en tu PC:

1. **La tubería de `top5-solidworks`** (`generar.mjs`, `generador/`, `voz.mjs`, `voz/loquendo.ps1`, `transcribir.mjs`, `comparar.mjs`, `comprobar-sincronia.mjs`, `mezclar.mjs`, `entregar.mjs`, `variables-sin-subtitulos.json` y `assets/`). No está en este repositorio ni en ningún otro de tu GitHub.
2. **Loquendo TTS 7 «Jorge»**: `LoqTTS7.dll` necesita el PowerShell de 32 bits de Windows. En Linux no corre, y SAPI no se usa. La voz se genera en tu PC.
3. **El perrito**: faltan `assets/perrito-recorte.png` y `assets/perrito-avatar.png`.
4. **Las skills `/hyperframes`, `/media-use` y `/hyperframes-registry`** no están instaladas en esta sesión. El paquete `hyperframes` (0.9.9) sí está en npm, así que se pueden instalar antes de la Fase 3.
5. **La red** bloquea Wikimedia Commons, Wikipedia, Pexels y Control Tutorials. Por eso las licencias de `MEDIOS-WEB.md` quedan en [COMPROBAR].

Camino que propongo: tú generas `voz.wav` de cada vídeo en tu PC con `voz.mjs` y lo subes al repositorio junto con la tubería y los dos PNG del perrito. Desde aquí hago la transcripción y la comparación, la prueba de 8 s, la animación, el sonido y las comprobaciones.
