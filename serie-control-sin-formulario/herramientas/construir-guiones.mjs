#!/usr/bin/env node
// Construye guion.txt y guion.md de cada vídeo a partir de su escaleta.md.
// Uso: node herramientas/construir-guiones.mjs            (todos los vídeos)
//      node herramientas/construir-guiones.mjs 05-...     (uno solo)
//
// Formato de escaleta.md:
//   ---                         metadatos clave: valor
//   ## Nombre del bloque · #color
//   Frase dicha || Qué se ve || Movimiento de cámara || Medio
//   === NOTAS ===               todo lo que sigue se copia tal cual al final de guion.md
//
// La duración es una ESTIMACIÓN para planificar. La real la da voz.wav (Fase 2).

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const PALABRAS_POR_SEG = 2.8; // supuesto para Loquendo «Jorge» a velocidad ~58; se corrige con la voz real
const PAUSA_FRASE = 0.3;
const PAUSA_BLOQUE = 0.5;

function leerEscaleta(texto) {
  const [cuerpo, ...resto] = texto.split(/^=== NOTAS ===\s*$/m);
  const notas = resto.join("").trim();
  const meta = {};
  const bloques = [];
  let enMeta = false;
  for (const linea of cuerpo.split("\n")) {
    const l = linea.trim();
    if (l === "---") { enMeta = !enMeta; continue; }
    if (enMeta) {
      const i = l.indexOf(":");
      if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim();
      continue;
    }
    if (l.startsWith("## ")) {
      const [nombre, color] = l.slice(3).split("·").map((x) => x.trim());
      bloques.push({ nombre, color: color || "", filas: [] });
      continue;
    }
    if (l.includes("||")) {
      const [frase, ve, camara, medio] = l.split("||").map((x) => x.trim());
      if (!bloques.length) throw new Error("Frase fuera de bloque: " + l);
      bloques.at(-1).filas.push({ frase, ve, camara, medio });
    }
  }
  return { meta, bloques, notas };
}

const contar = (s) => s.split(/\s+/).filter(Boolean).length;
const mmss = (seg) => `${Math.floor(seg / 60)}:${String(Math.round(seg % 60)).padStart(2, "0")}`;
const celda = (s) => (s || "").replace(/\|/g, "\\|");

function construir(carpeta) {
  const ruta = join(RAIZ, carpeta, "escaleta.md");
  if (!existsSync(ruta)) return null;
  const { meta, bloques, notas } = leerEscaleta(readFileSync(ruta, "utf8"));
  const frases = bloques.flatMap((b) => b.filas.map((f) => f.frase));
  const palabras = frases.reduce((a, f) => a + contar(f), 0);
  const seg = palabras / PALABRAS_POR_SEG + frases.length * PAUSA_FRASE + bloques.length * (PAUSA_BLOQUE - PAUSA_FRASE);

  writeFileSync(join(RAIZ, carpeta, "guion.txt"), frases.join("\n") + "\n");

  let md = `# ${meta.titulo || carpeta}\n\n`;
  md += `> Fase 1 · guion y lista de medios. **Pendiente de tu OK.** Archivo generado desde \`escaleta.md\` con \`herramientas/construir-guiones.mjs\`; si cambias algo, cambia la escaleta y vuelve a generar.\n\n`;
  md += `| Campo | Valor |\n|---|---|\n`;
  for (const [k, v] of Object.entries(meta)) if (k !== "titulo") md += `| ${celda(k)} | ${celda(v)} |\n`;
  md += `| Frases | ${frases.length} |\n| Palabras | ${palabras} |\n`;
  md += `| Duración estimada | ~${mmss(seg)} (a ${PALABRAS_POR_SEG} palabras/s con pausas de ${PAUSA_FRASE} s y ${PAUSA_BLOQUE} s; la real la da voz.wav) |\n\n`;
  md += `Estilo común: fondo casi negro con rejilla suave, tarjetas blancas, verde = bien y rojo = mal, Inter en negrita a 46 px o más, iconos de Phosphor. Un solo mundo 2D: cada bloque es una estación unida por un camino que se dibuja mientras viaja la cámara. El perrito es la foto recortada \`assets/perrito-recorte.png\`; nunca tapa texto.\n\n`;

  let n = 0;
  for (const b of bloques) {
    md += `## ${b.nombre}${b.color ? ` · brillo ${b.color}` : ""}\n\n`;
    md += `| # | Frase (voz) | Qué se ve | Cámara | Medio |\n|---:|---|---|---|---|\n`;
    for (const f of b.filas) {
      n++;
      md += `| ${n} | ${celda(f.frase)} | ${celda(f.ve)} | ${celda(f.camara)} | ${celda(f.medio)} |\n`;
    }
    md += `\n`;
  }
  if (notas) md += notas + "\n";
  writeFileSync(join(RAIZ, carpeta, "guion.md"), md);
  return { carpeta, titulo: meta.titulo, frases: frases.length, palabras, seg };
}

const pedidas = process.argv.slice(2);
const carpetas = pedidas.length
  ? pedidas
  : readdirSync(RAIZ).filter((d) => /^\d\d-/.test(d)).sort();
const resumen = carpetas.map(construir).filter(Boolean);
let total = 0;
for (const r of resumen) {
  total += r.seg;
  console.log(`${r.carpeta.padEnd(34)} ${String(r.frases).padStart(3)} frases ${String(r.palabras).padStart(4)} palabras ~${mmss(r.seg)}`);
}
if (resumen.length > 1) console.log(`TOTAL ~${mmss(total)} (${resumen.length} vídeos)`);
