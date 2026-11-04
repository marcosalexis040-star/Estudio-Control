import json,sys
# Momentos para snapshots: final de cada frase "interesante" (cada 2 frases) del vídeo
d=json.load(open(__import__("os").path.join(__import__("os").path.dirname(__file__),"..","proyectos",sys.argv[1],"tiempos.json")))
fr=d['frases']; paso=int(sys.argv[2]) if len(sys.argv)>2 else 3
ts=[round(f['fin']-0.1,2) for i,f in enumerate(fr) if i%paso==paso-1]
print(",".join(str(t) for t in ts))
