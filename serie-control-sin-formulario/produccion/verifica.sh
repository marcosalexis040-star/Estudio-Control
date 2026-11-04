#!/usr/bin/env bash
# Comprueba un vídeo terminado: duración contra la voz, tramos negros y sonoridad final.
cd "$(dirname "$0")"
for nn in "$@"; do
  f=$(ls ../videos/${nn}-*.mp4 2>/dev/null | head -1); [ -n "$f" ] || { echo "$nn: falta el vídeo"; continue; }
  dv=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  dt=$(python3 -c "import json;print(json.load(open('proyectos/$nn/tiempos.json'))['duracion'])")
  negro=$(ffmpeg -v info -i "$f" -vf "blackdetect=d=0.5:pix_th=0.05" -an -f null - 2>&1 | grep -c black_start)
  lufs=$(ffmpeg -hide_banner -nostats -i "$f" -vn -af loudnorm=I=-14:TP=-1:print_format=json -f null - 2>&1 | python3 -c "import sys,json;s=sys.stdin.read();d=json.loads(s[s.rfind('{'):s.rfind('}')+1]);print(d['input_i'],'LUFS',d['input_tp'],'dBTP')")
  echo "$nn: $(basename "$f") · vídeo ${dv}s · voz ${dt}s · tramos negros: $negro · $lufs · $(du -h "$f" | cut -f1)"
done
