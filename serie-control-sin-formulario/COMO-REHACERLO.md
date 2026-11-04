# Cómo rehacer los vídeos

Todo sale de tres archivos por vídeo y de la carpeta `produccion/`. Nada se coloca a mano: cada aparición está atada a una palabra de la voz.

```
NN-nombre/escaleta.md   frases (voz), bloques, brillo y movimiento de cámara
NN-nombre/visual.mjs    qué aparece en cada frase (fórmulas, gráficas, planos s, tablas, diagramas)
produccion/             voz, motor visual, sonido y render
videos/NN-nombre.mp4    resultado
```

## Requisitos

- Node 22, Python 3.11 o más reciente y ffmpeg.
- `cd produccion && npm install` instala KaTeX, los iconos Phosphor y HyperFrames 0.9.9.
- `pip install kokoro-onnx soundfile sympy` instala la voz y las comprobaciones.
- La primera vez, `npx hyperframes tts "hola" -v ef_dora` descarga el modelo Kokoro (~330 MB) a `~/.cache/hyperframes/tts`.

## Pasos

Corre todo desde `produccion/`:

```bash
python3 voz/voz.py 05
```

Genera la voz frase a frase (voz `em_alex`): 0.3 s entre frases, 0.5 s al cerrar cada bloque y COMO_SE_DICE aplicado. Escribe `proyectos/05/assets/voz.wav` y `proyectos/05/tiempos.json`, con el inicio y el fin de cada frase y de cada palabra.

```bash
node motor/construir.mjs 05
```

Arma el proyecto HyperFrames y escribe `proyectos/05/index.html` y `proyectos/05/eventos.json`. Primero mide cada pieza en Chromium y achica las fórmulas que no caben. Después las coloca en estaciones de un mundo 2D, calcula la cámara (push in, push out, pan con desenfoque, viaje largo y plano general), los subtítulos palabra a palabra y la línea de tiempo GSAP.

```bash
python3 audio/sonido.py 05
```

Sintetiza los efectos (whoosh, pop, click, golpe y éxito) en cada evento visible y la música de fondo, 18 dB por debajo de la voz. La mezcla pasa por un limitador suave y loudnorm a −14 LUFS y −1 dBTP, y queda en `proyectos/05/assets/mezcla.wav`.

```bash
./render.sh 05
```

Renderiza con `npx hyperframes render --quality looks --crf 24 --workers 4` usando el Chromium headless shell de Playwright. Después pone encima la mezcla exacta con `-c:v copy`, porque el render baja el audio unos 0.6 dB, y deja el resultado en `../videos/`.

Si cambias una frase en la escaleta, rehaz la voz de ese vídeo: el motor se niega a construir si los textos no coinciden. Si solo cambias `visual.mjs`, basta con `construir.mjs`, `sonido.py` y `render.sh`.

## Lo que se comprobó

- `npx hyperframes lint` sale con 0 errores en los 15 vídeos. El único aviso es `composition_file_too_large`: cada vídeo es una sola composición a propósito, porque la cámara recorre un mundo continuo.
- `npx hyperframes check` se corrió en el vídeo 06. Sus errores de solapamiento y oclusión vienen de texto que pasa bajo el velo oscuro de arriba y abajo, que está hecho a propósito para que nada tape los subtítulos. Los de contraste salen de piezas medidas a media entrada. Los reales se corrigieron: etiquetas grises, una etiqueta encimada en el plano s y títulos cortados.
- Snapshots revisados de los vídeos 01, 04, 06, 07, 09, 10, 12 y 14.
- Cada número de la voz está recalculado con sympy en `comprobaciones/verificar.py`.
- Las mezclas miden entre −14.3 y −14.9 LUFS con picos de unos −0.9 dBTP (ver `produccion/audio/sonido.log`).

## Diferencias con la plantilla original

Se hizo así porque los vídeos son solo para estudiar y no se van a publicar:

- **Voz**: Kokoro-82M (`em_alex`, español), local y sin red. Loquendo «Jorge» solo corre en Windows de 32 bits y no se pudo usar aquí. Para cambiar a Loquendo, genera los `voz.wav` en tu PC y sustitúyelos; `tiempos.json` habría que rehacerlo con un alineador.
- **Tiempos de palabra**: no se pudo descargar Whisper ni Parakeet porque Hugging Face está bloqueado. Cada frase se genera por separado, así que su inicio y su fin son exactos. Dentro de la frase, las palabras se reparten por número de fonemas y los silencios detectados caen en las comas.
- **Sin perrito ni tarjeta de perfil**: faltan los PNG. Al final de cada vídeo aparece una tarjeta con el siguiente vídeo de la serie.
- **Sin medios de la web**: todo se dibujó o se animó. Las tres propuestas de `MEDIOS-WEB.md` no se descargaron.
- **Un solo archivo por vídeo** (`video-FINAL`, con subtítulos), para no duplicar el tiempo de render.
- Los temas de lugar de las raíces, Bode y Nyquist quedan fuera, como pediste.
