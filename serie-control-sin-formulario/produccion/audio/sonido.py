#!/usr/bin/env python3
"""Efectos, música y mezcla de cada vídeo. Todo se sintetiza aquí (sin descargas):
   - whoosh  (ruido filtrado con barrido)      → viajes de cámara
   - pop     (sinusoide corta descendente)     → cada pieza que aparece
   - click   (golpecito de ruido)              → transformaciones, tachados, capas
   - golpe   (bombo grave + ruido)             → clímax
   - exito   (dos notas de campana)            → aciertos (✓) y tarjeta final
   - música: colchón suave en La menor (Am–F–C–G), 18 dB por debajo de la voz
Mezcla: voz + música + efectos → loudnorm a −14 LUFS y −1 dBTP (ffmpeg, dos pasadas).
Uso: python3 audio/sonido.py [NN ...]
"""
import json, subprocess, sys
from pathlib import Path
import numpy as np
import soundfile as sf

SR = 48000
PROD = Path(__file__).resolve().parents[1]
rng = np.random.default_rng(7)

def env(n, a=0.005, r=0.1):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / max(r, 1e-4))
    return e

def lowpass(x, fc):
    # filtro de un polo, suficiente para dar color
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc; y[i] = acc
    return y

def whoosh(d=0.9):
    n = int(d * SR); t = np.arange(n) / SR
    ruido = rng.standard_normal(n)
    # barrido de un filtro paso banda casero: diferencia de dos paso bajo
    fc = 300 + 3500 * np.sin(np.pi * t / d) ** 2
    y = np.zeros(n); lp1 = lp2 = 0.0
    for i in range(n):
        a1 = np.exp(-2 * np.pi * fc[i] / SR); a2 = np.exp(-2 * np.pi * fc[i] * 0.35 / SR)
        lp1 = (1 - a1) * ruido[i] + a1 * lp1; lp2 = (1 - a2) * ruido[i] + a2 * lp2
        y[i] = lp1 - lp2
    return y * np.sin(np.pi * t / d) ** 2

def pop():
    n = int(0.12 * SR); t = np.arange(n) / SR
    f = 900 * np.exp(-t * 18) + 380
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.035)

def click():
    n = int(0.05 * SR)
    return lowpass(rng.standard_normal(n), 5000) * env(n, 0.0005, 0.008) * 1.5 + np.sin(2 * np.pi * 2200 * np.arange(n) / SR) * env(n, 0.0005, 0.006) * 0.5

def golpe():
    n = int(0.9 * SR); t = np.arange(n) / SR
    f = 120 * np.exp(-t * 9) + 45
    bombo = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.28)
    ruido = lowpass(rng.standard_normal(n), 1800) * env(n, 0.001, 0.06)
    return bombo * 1.0 + ruido * 0.6

def exito():
    n = int(0.9 * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for f0, t0 in [(880, 0.0), (1318.5, 0.11)]:
        k = t >= t0; tt = t[k] - t0
        y[k] += (np.sin(2 * np.pi * f0 * tt) + 0.3 * np.sin(2 * np.pi * 2 * f0 * tt)) * np.exp(-tt / 0.28) * np.minimum(1, tt / 0.004)
    return y * 0.6

EFECTOS = {"whoosh": (whoosh(), 0.30), "pop": (pop(), 0.10), "click": (click(), 0.12), "golpe": (golpe(), 0.55), "exito": (exito(), 0.16)}

def musica(n):
    """Colchón: acordes de 4 s con tríadas suaves (senos + quinta), paso bajo y respiración lenta."""
    t = np.arange(n) / SR; y = np.zeros(n); dur = n / SR
    acordes = [(220.0, 261.63, 329.63), (174.61, 220.0, 261.63), (130.81, 196.0, 261.63), (196.0, 246.94, 293.66)]
    largo = 4.0
    for i in range(int(dur / largo) + 1):
        notas = acordes[i % 4]; t0 = i * largo
        k = (t >= t0 - 0.5) & (t < t0 + largo + 1.0)
        tt = t[k] - t0
        w = np.clip((tt + 0.5) / 1.2, 0, 1) * np.clip((largo + 1.0 - tt) / 1.4, 0, 1)
        for f0 in notas:
            y[k] += w * (np.sin(2 * np.pi * f0 * t[k]) + 0.25 * np.sin(2 * np.pi * f0 * 2 * t[k] + 0.3)) / 3
        y[k] += w * 0.35 * np.sin(2 * np.pi * notas[0] / 2 * t[k])
    y *= 0.85 + 0.15 * np.sin(2 * np.pi * t / 9.0)
    fade = np.minimum(1, t / 2.0) * np.minimum(1, (dur - t) / 2.5)
    return y * fade

def rms_db(x):
    return 20 * np.log10(np.sqrt(np.mean(x ** 2)) + 1e-12)

def procesar(nn):
    d = PROD / "proyectos" / nn
    voz, sr = sf.read(d / "assets" / "voz.wav")
    if sr != SR:  # remuestreo lineal sencillo 24k → 48k
        x = np.arange(len(voz)) / sr; xn = np.arange(int(len(voz) * SR / sr)) / SR
        voz = np.interp(xn, x, voz)
    n = len(voz)
    ev = json.load(open(d / "eventos.json"))
    sfx = np.zeros(n)
    usados = {}
    for e in ev:
        # no apilar el mismo efecto dentro de 90 ms
        if e["tipo"] in usados and e["t"] - usados[e["tipo"]] < 0.09: continue
        usados[e["tipo"]] = e["t"]
        clip, g = EFECTOS[e["tipo"]]
        i0 = int(e["t"] * SR); i1 = min(n, i0 + len(clip))
        if i0 < n: sfx[i0:i1] += clip[: i1 - i0] * g
    mus = musica(n)
    # música 18 dB por debajo de la voz (RMS de los tramos con voz)
    activa = np.abs(voz) > 0.02
    v_db = rms_db(voz[activa]); m_db = rms_db(mus)
    mus *= 10 ** ((v_db - 18 - m_db) / 20)
    # efectos: que ninguno supere la voz; se atenúan bajo la voz (ducking suave)
    env_voz = np.convolve(np.abs(voz), np.ones(int(0.08 * SR)) / int(0.08 * SR), mode="same")
    duck = 1 / (1 + 6 * env_voz)
    mezcla = voz + mus + sfx * duck
    tmp = d / "assets" / "_mezcla_bruta.wav"
    sf.write(tmp, mezcla / max(1.0, np.max(np.abs(mezcla))) * 0.9, SR, subtype="PCM_24")
    lim = d / "assets" / "_mezcla_lim.wav"
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(tmp), "-af", "alimiter=limit=0.35:attack=1:release=80:level=false", "-c:a", "pcm_s24le", str(lim)], check=True)
    tmp.unlink(); tmp = lim
    # loudnorm en dos pasadas
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(tmp), "-af", "loudnorm=I=-14:TP=-1:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
    js = r.stderr[r.stderr.rfind("{"): r.stderr.rfind("}") + 1]; m = json.loads(js)
    filtro = (f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
              f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(tmp), "-af", filtro, "-ar", str(SR), "-c:a", "pcm_s24le", str(d / "assets" / "mezcla.wav")], check=True)
    tmp.unlink()
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(d / "assets" / "mezcla.wav"), "-af", "loudnorm=I=-14:TP=-1:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
    m2 = json.loads(r.stderr[r.stderr.rfind("{"): r.stderr.rfind("}") + 1])
    print(f"{nn}: voz {v_db:.1f} dBFS RMS, música −18 dB, {len(ev)} efectos → {m2['input_i']} LUFS, pico {m2['input_tp']} dBTP", flush=True)

if __name__ == "__main__":
    pedidos = sys.argv[1:] or sorted(p.name for p in (PROD / "proyectos").iterdir() if (p / "eventos.json").exists())
    for nn in pedidos:
        procesar(nn)
