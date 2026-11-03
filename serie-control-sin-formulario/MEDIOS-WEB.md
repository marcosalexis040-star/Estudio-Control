# Lista de medios de la web propuestos (Fase 1)

**No se ha descargado nada.** Esperan tu aprobación.

Casi toda la serie es matemática: curvas, planos s, tablas y diagramas. Eso se dibuja y se anima mejor de lo que lo muestra una foto, así que la propuesta se queda en **tres medios opcionales**. El resto de los iconos es de Phosphor (licencia MIT).

**Límite de esta sesión.** La red del entorno bloquea `commons.wikimedia.org`, `en.wikipedia.org`, `pexels.com` y `ctms.engin.umich.edu`. Los datos de abajo salen de buscadores y espejos de Commons, no de la página original. Todo lo marcado [COMPROBAR] se revisa en la página original antes de descargar, ya sea en tu PC o cuando se permitan esos dominios.

| ID | Qué es | Vídeo y frase | Enlace | Autor | Licencia | Tamaño y resolución |
|---|---|---|---|---|---|---|
| M1 | Foto de un chip μA741 (Fairchild, 1969) en encapsulado DIP | 13 · frase 30 («cada integrador es un amplificador operacional…») | https://commons.wikimedia.org/wiki/File:Fairchild_uA741_opamp_6920.jpg (visto en el espejo c.enwp.org) | Analogdesigner [COMPROBAR] | CC BY-SA 4.0 [COMPROBAR] | [COMPROBAR] |
| M2 | Grabado antiguo de un regulador centrífugo, de un libro de 1904 | 12 · bloque «Qué hace cada parte del PID», como fondo de «lazo cerrado» (sin datos históricos en la voz) | https://commons.wikimedia.org/wiki/File:Loaded_centrifugal_governor_(New_Catechism_of_the_Steam_Engine,_1904).jpg (visto en espejo) | *New Catechism of the Steam Engine* (1904), escaneo [COMPROBAR] | Dominio público [COMPROBAR] | [COMPROBAR] |
| M3 | Foto real de un circuito RC en protoboard | 03 · frase 23 («El circuito RC es el primer orden de manual») | No encontré un archivo con licencia libre clara. Si no aparece en Commons, Pexels o Unsplash, se dibuja | — | — | — |

## Tratamiento previsto (cuando se aprueben)

- Cada medio irá en su propia carpeta: `assets/web/M1/`, `assets/web/M2/`, etc.
- Se recortará y escalará con ffmpeg al tamaño en que se ve; los recortes de fondo, con `npx hyperframes remove-background`.
- Color, desenfoque y grano, con `npx hyperframes media-treatment`, nunca con filtros CSS.
- Entra como pieza animada: aparece, se mueve y la cámara la recorre.
- Se anotará en `assets/CREDITOS.md` con archivo, enlace, autor, licencia y cambios hechos.
- Atribución CC BY-SA en pantalla y en la descripción, por ejemplo: «Foto: Analogdesigner, CC BY-SA 4.0, vía Wikimedia Commons».

## Lo que NO se usa

- Capturas de los PDFs de examen del Drive: los enunciados se redibujan.
- Capturas de Simulink o MATLAB: no hay kit de prensa que lo permita y no hace falta para el examen.
- Clips de YouTube de las listas de los artifacts: están prohibidos por las reglas de medios.
