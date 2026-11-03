# Fuentes leídas y cómo se comprobó cada dato

El repositorio es **público**, así que aquí se citan los archivos del Drive por su nombre, sin enlaces ni identificadores. La carpeta es la que compartiste en el mensaje.

## Material del curso (carpeta del Drive)

| Archivo | Qué contiene | Leído | Vídeos |
|---|---|---|---|
| `libroctrl-1.pdf` | V. Vásquez López, *Ingeniería de Control*, Tec de Monterrey, 2018 (108 pp.) | Texto completo e índice | 01–14 |
| `Ex_integrdor1.pdf` y `Ex_integrdor1_solucion.pdf` | Examen Integrador 1, 23 oct 2026, y su solución: 5 polos; Mason y Routh con a y k | Texto e imágenes de todas las páginas | 05, 06, 09, 11, 15 |
| `Examen Integrador 1.pdf` | Integrador 1, 24 oct 2025: diagrama con a y b; e_ss y ζ con sⁿ; P y PID | Texto e imagen | 07, 12 |
| `Examen Rápido 2a/2b/2c-1/2d.pdf` | ExR II, 3 oct 2025: diagrama kp, kd, kf | Texto e imagen | 07, 08 |
| `ExR_3b_octubre-1.pdf` | ExR del 13 oct 2026: bloques y segundo orden (4 preguntas) | Imágenes | 06, 08 |
| `Examen Rapido 4.pdf` (dice «Ejercicio prueba examen») | Paralelo de 1/(s+pᵢ): G(s), estados y det(sI − A) | Imagen | 13 |
| `Examen Rapido 5.pdf` (dice «Examen rápido 4») | Doble integrador, u = −Kx + v_ref, polos en −2 ± 2i | Imagen | 14 |
| `Examen Rapido 6.pdf` (dice «Examen rápido 5») | A = [0 1; 0 −b]: C(sI − A)⁻¹B, colocación de polos y k₃ | Imagen | 13, 14 |
| `Ejercicios_preparacion.pdf` | Examen del 2.º parcial (21 mar 2019): motor, PI, región, Routh, RC | Texto e imágenes | 03, 07, 12 |
| `Simulación1er_orden.pdf` | Guía de exploración de primer orden (efecto de K y τ) | Texto | 03 |
| `Apuntes_Control_24sept2026 (1).docx` | Primer orden y RC | Texto | 03 |
| `apuntes control clase 2 parte parte 0 01oct2026.docx` | Laplace, fracciones parciales y valor final en primer orden | Texto | 02, 03 |
| `Apuntes_Control_Clase2_01oct2026.docx` | Primer orden, impulso y RC | Texto | 03 |
| `Apuntes_Control_Clase2_Parte2_01oct2026.docx` | Segundo orden y lectura de polos | Texto | 04, 05 |
| `Apuntes_Control_Clase2_Parte3_01oct2026.docx` | De G(s) a integradores y amplificadores operacionales | Texto | 13 |
| `Apuntes_Control_Clase3_Parte1/2/3_08oct2026.pdf` | Segundo orden (tₛ, tₚ, Mₚ), mismo ángulo, Mason y ExR kp/kd | Texto | 04–07, 09 |
| `Apuntes_Control_Clase_4_Partes_1_y_2_15oct2026.pdf` | Mason, Routh, ejemplos de 4.º y 5.º orden | Texto | 09, 10, 11 |
| `fundamentals_of_control_BD-1.pdf` | B. Douglas, *The Fundamentals of Control Theory*, rev. 1.6 (2019), CC BY-NC-SA 4.0 | Texto (índice y capítulos 1–3) | Fondo de 01 y 08 |
| `Apuntes control fern.pdf` | 13 páginas escaneadas, sin texto | **No leído**: pesa más de 10 MB y el proxy no deja descargarlo. [COMPROBAR] si trae algún tema que falte | — |

## Artifacts

- [Laboratorio de Control](https://claude.ai/artifact/BJfyQSa8vXzATmStSCGQMr): primer y segundo orden, ED → FT, bloques y Mason, Routh, error, Simulink, autoevaluación, formulario y erratas del libro.
- [Del polo a la respuesta](https://claude.ai/artifact/Jd34SCxbLtsozfW5Y5FAkG): geometría del polo, deducción de tₚ, Mₚ, tₛ y tᵣ, lugares geométricos, escalado y confusiones frecuentes.
- [Laplace sin formulario](https://claude.ai/artifact/3XoEmi2ge3mH57Knz1Ev6R): par madre, tabla reconstruida, propiedades, fracciones parciales y valor final.

## Comprobación numérica

`comprobaciones/verificar.py` (sympy 1.14) recalcula **cada número que se dice en la voz**: pares de Laplace, fracciones parciales, ζ, Mₚ, tₚ y tₛ de los cinco polos, la tabla ζ → Mₚ, el ExR II, el Integrador 2025, Mason contra las ecuaciones de nodos, todas las tablas de Routh, Z-N y los tres problemas de variables de estado. La salida está en `comprobaciones/resultados.txt`.

```bash
pip install sympy && python3 comprobaciones/verificar.py
```

## Erratas que el vídeo evita repetir

Vienen del artifact Laboratorio y se comprobaron aquí:

- Ej. 39: el rango correcto es 3.6 < k < 5.54 (el libro imprime 3.36). No se usa en los vídeos.
- Ej. 29: Mₚ ≈ 79 % (el libro imprime 0.79 %). No se usa.
- Ej. 35: en rigor es un renglón de ceros; el vídeo 11 lo trata así.
- ExR 3b, pregunta 4: ninguna opción da y_max = 1.2. No se usa.

## Referencias externas que no se pudieron abrir en esta sesión

El entorno bloquea estos dominios. Cuando estén permitidos, sirven de segunda fuente:

- U. Michigan, *Control Tutorials for MATLAB & Simulink*: «Introduction: System Analysis» y «Introduction: State-Space Methods for Controller Design» (ctms.engin.umich.edu).
- Wikipedia: «Routh–Hurwitz stability criterion», «Mason's gain formula», «Ziegler–Nichols method».
