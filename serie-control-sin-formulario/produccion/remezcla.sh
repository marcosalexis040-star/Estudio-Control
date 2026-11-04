#!/usr/bin/env bash
# Vuelve a poner la mezcla (assets/mezcla.wav) sobre un render ya hecho, sin re-renderizar el vídeo.
set -euo pipefail
cd "$(dirname "$0")"
for nn in "$@"; do
  nombre=$(basename "$(ls -d ../${nn}-* | head -1)")
  ffmpeg -hide_banner -loglevel error -y -i salida/$nn-render.mp4 -i proyectos/$nn/assets/mezcla.wav \
    -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest ../videos/$nombre.mp4
  echo "remezclado $nn"
done
