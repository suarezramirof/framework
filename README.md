# Loggers y Gzip

## Primera parte

Incorporar al proyecto de servidor de trabajo la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.

_miscRoutes.js_

```
...
import compression from "compression";
...
infoRouter.get("/", getInfo);
infoRouter.get("/gzip", compression(), getInfo);

const getInfo = (_req, res) => {
  const args = process.argv.slice(2);
  const os = process.platform;
  const node = process.version;
  const mem = process.memoryUsage().rss;
  const id = process.pid;
  const dir = process.cwd();
  const path = process.execPath;
  const numCpus = cpus().length;
  
  res.render("pages/info", { args, os, node, mem, path, id, dir, numCpus });
};
...
```
_Ruta sin compresión_

![Tamaño sin compresión](https://github.com/suarezramirof/process/blob/master/img/info_noncompressed.png)

_Ruta con compresión_

![Tamaño con compresión](https://github.com/suarezramirof/process/blob/master/img/info_compressed.png)

## Segunda parte

