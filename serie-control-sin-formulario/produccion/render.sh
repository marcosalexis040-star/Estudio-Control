#!/usr/bin/env bash
# Renderiza uno o varios vídeos y les pone encima la mezcla exacta (assets/mezcla.wav).
# Uso: ./render.sh 01 02 ...      Salida: ../videos/NN-nombre.mp4
set -euo pipefail
cd "$(dirname "$0")"
export HYPERFRAMES_BROWSER_PATH="${HYPERFRAMES_BROWSER_PATH:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
mkdir -p ../videos salida
for nn in "$@"; do
  carpeta=$(ls -d ../${nn}-* | head -1); nombre=$(basename "$carpeta")
  if [ -s ../videos/$nombre.mp4 ] && [ -z "${FORZAR:-}" ]; then echo "== $nn ya existe (FORZAR=1 para rehacer)"; continue; fi
  rm -rf salida/.$nn-render.hf-transaction-* salida/work-* 2>/dev/null || true
  echo "== $nn ($nombre) $(date +%H:%M:%S)"
  ( cd proyectos/$nn && npx --prefix ../.. hyperframes render --quality looks --crf 24 --workers 4 -o ../../salida/$nn-render.mp4 2>&1 | grep -E "rendered in|✗|Error|error" || true )
  [ -s salida/$nn-render.mp4 ] || { echo "FALLO render $nn"; continue; }
  # El render baja el audio ~0.6 dB: se sustituye por la mezcla con el vídeo copiado tal cual
  ffmpeg -hide_banner -loglevel error -y -i salida/$nn-render.mp4 -i proyectos/$nn/assets/mezcla.wav \
    -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest ../videos/$nombre.mp4
  dur_v=$(ffprobe -v error -show_entries format=duration -of csv=p=0 ../videos/$nombre.mp4)
  echo "   listo: ../videos/$nombre.mp4  ${dur_v}s  $(du -h ../videos/$nombre.mp4 | cut -f1)  $(date +%H:%M:%S)"
done
