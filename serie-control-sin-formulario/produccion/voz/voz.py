#!/usr/bin/env python3
"""Voz de la serie, frase a frase, con Kokoro-82M (voz «em_alex», español).

Sustituye a voz.mjs + Loquendo, que solo corren en Windows. Para cada vídeo:
  - lee ../NN-*/escaleta.md (frases y bloques);
  - aplica COMO_SE_DICE (nombres propios, abreviaturas, la variable Y);
  - sintetiza cada frase por separado;
  - recorta el silencio de los bordes y pega las frases con 0.3 s de pausa
    y 0.5 s al cerrar cada bloque;
  - estima el tiempo de cada palabra: reparte el tramo con voz de cada frase
    según el número de fonemas de cada palabra y coloca los silencios internos
    detectados en las comas y los dos puntos.

Salida: produccion/proyectos/NN/assets/voz.wav y produccion/proyectos/NN/tiempos.json

Uso: python3 voz/voz.py            (todos)
     python3 voz/voz.py 03 07      (algunos)
"""
import json, re, sys, unicodedata
from pathlib import Path
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro
from kokoro_onnx.tokenizer import Tokenizer

RAIZ = Path(__file__).resolve().parents[2]          # serie-control-sin-formulario/
PROD = RAIZ / "produccion"
MODELO = Path.home() / ".cache/hyperframes/tts/models/kokoro-v1.0.onnx"
VOCES = Path.home() / ".cache/hyperframes/tts/voices/voices-v1.0.bin"
VOZ, VELOCIDAD, SR = "em_alex", 1.0, 24000
PAUSA_FRASE, PAUSA_BLOQUE, INICIO, COLA = 0.30, 0.50, 0.35, 1.2

# COMO_SE_DICE: escrito → dicho (regex sobre el texto de la frase)
COMO_SE_DICE = [
    (r"\bLaplace\b", "Laplás"), (r"\bRouth\b", "Ráuz"), (r"\bHurwitz\b", "Júrvits"),
    (r"\bMason\b", "Méison"), (r"\bZiegler\b", "Zíguler"), (r"\bNichols\b", "Níkols"),
    (r"\bEuler\b", "Óiler"), (r"\bPID\b", "pe i de"), (r"\bPI\b", "pe i"),
    (r"\bki\b", "ka i"), (r"\bTi\b", "te i"), (r"\b0\.125\b", "cero punto ciento veinticinco"),
    (r"\b1 segundo\b", "un segundo"), (r"\b(por|menos) Y\b", r"\1 ye"), (r"\bY (igual|entre|con)\b", r"ye \1"),
    (r"\bMp\b", "eme pe"), (r"\bv_ref\b", "referencia"),
]

def decir(texto: str) -> str:
    for a, b in COMO_SE_DICE:
        texto = re.sub(a, b, texto)
    return texto

def leer_escaleta(ruta: Path):
    cuerpo = ruta.read_text(encoding="utf8").split("=== NOTAS ===")[0]
    bloques = []
    for linea in cuerpo.splitlines():
        l = linea.strip()
        if l.startswith("## "):
            nombre, _, color = l[3:].partition("·")
            bloques.append({"nombre": nombre.strip(), "color": color.strip(), "frases": []})
        elif "||" in l:
            campos = [c.strip() for c in l.split("||")]
            bloques[-1]["frases"].append({"texto": campos[0], "camara": campos[2] if len(campos) > 2 else ""})
    return bloques

tok = Tokenizer()
def n_fonemas(palabra_dicha: str) -> int:
    p = tok.phonemize(palabra_dicha, "es")
    return max(1, len(re.sub(r"[ˈˌ\s.,:;¿?¡!]", "", p)))

def recortar(a: np.ndarray, umbral=0.012):
    v = np.where(np.abs(a) > umbral)[0]
    if len(v) == 0:
        return a
    i0, i1 = max(0, v[0] - int(0.02 * SR)), min(len(a), v[-1] + int(0.04 * SR))
    return a[i0:i1]

def silencios_internos(a: np.ndarray, min_dur=0.11):
    """Huecos de silencio dentro de la frase: lista de (inicio, fin) en segundos."""
    hop = int(0.01 * SR)
    env = np.array([np.sqrt(np.mean(a[i:i + hop] ** 2)) for i in range(0, len(a) - hop, hop)])
    calla = env < 0.008
    huecos, i = [], 0
    while i < len(calla):
        if calla[i]:
            j = i
            while j < len(calla) and calla[j]:
                j += 1
            if (j - i) * 0.01 >= min_dur and i > 3 and j < len(calla) - 3:
                huecos.append((i * 0.01, j * 0.01))
            i = j
        else:
            i += 1
    return huecos

def tiempos_palabras(palabras, dur, huecos):
    """Reparte [0, dur] entre palabras por fonemas; los huecos caen tras la puntuación."""
    pesos = [n_fonemas(decir(w)) for w in palabras]
    cortes = [k for k, w in enumerate(palabras[:-1]) if re.search(r"[,:;]$", w)]
    # Empareja huecos con cortes en orden cuando el número cuadra (o sobra algún hueco corto)
    usados = []
    if cortes and huecos:
        hs = sorted(sorted(huecos, key=lambda h: h[1] - h[0], reverse=True)[:len(cortes)])
        if len(hs) == len(cortes):
            usados = list(zip(cortes, hs))
    tramos, ini = [], 0
    limites = [(k, h) for k, h in usados]
    for k, h in limites:
        tramos.append((ini, k, h[0]))
        ini = k + 1
    tramos.append((ini, len(palabras) - 1, None))
    salida = [None] * len(palabras)
    t0 = 0.0
    for idx, (a, b, fin) in enumerate(tramos):
        t_fin = fin if fin is not None else dur
        total = sum(pesos[a:b + 1])
        t = t0
        for k in range(a, b + 1):
            d = (t_fin - t0) * pesos[k] / total
            salida[k] = (t, t + d)
            t += d
        if idx < len(limites):
            t0 = limites[idx][1][1]
    return salida

def procesar(carpeta: Path, kokoro: Kokoro):
    nn = carpeta.name[:2]
    bloques = leer_escaleta(carpeta / "escaleta.md")
    destino = PROD / "proyectos" / nn
    (destino / "assets").mkdir(parents=True, exist_ok=True)
    piezas, frases, t = [np.zeros(int(INICIO * SR), dtype=np.float32)], [], INICIO
    for bi, b in enumerate(bloques):
        for fi, f in enumerate(b["frases"]):
            dicho = decir(f["texto"])
            audio, sr = kokoro.create(dicho, voice=VOZ, speed=VELOCIDAD, lang="es")
            assert sr == SR
            audio = recortar(audio.astype(np.float32))
            dur = len(audio) / SR
            palabras = f["texto"].split()
            tp = tiempos_palabras(palabras, dur, silencios_internos(audio))
            frases.append({
                "bloque": bi, "frase": fi, "texto": f["texto"], "dicho": dicho, "camara": f["camara"],
                "inicio": round(t, 3), "fin": round(t + dur, 3),
                "palabras": [{"w": w, "inicio": round(t + a, 3), "fin": round(t + c, 3)} for w, (a, c) in zip(palabras, tp)],
            })
            piezas.append(audio)
            t += dur
            ultima = fi == len(b["frases"]) - 1
            pausa = PAUSA_BLOQUE if ultima else PAUSA_FRASE
            piezas.append(np.zeros(int(pausa * SR), dtype=np.float32))
            t += pausa
    piezas.append(np.zeros(int(COLA * SR), dtype=np.float32))
    voz = np.concatenate(piezas)
    voz = voz / max(1e-6, np.max(np.abs(voz))) * 0.89
    sf.write(destino / "assets" / "voz.wav", voz, SR, subtype="PCM_16")
    duracion = len(voz) / SR
    json.dump({"video": carpeta.name, "voz": VOZ, "duracion": round(duracion, 3),
               "bloques": [{"nombre": b["nombre"], "color": b["color"]} for b in bloques], "frases": frases},
              open(destino / "tiempos.json", "w"), ensure_ascii=False, indent=1)
    print(f"{carpeta.name}: {len(frases)} frases, {duracion:.1f} s", flush=True)

if __name__ == "__main__":
    pedidos = sys.argv[1:]
    kokoro = Kokoro(str(MODELO), str(VOCES))
    for c in sorted(RAIZ.glob("[0-9][0-9]-*")):
        if not pedidos or c.name[:2] in pedidos:
            procesar(c, kokoro)
