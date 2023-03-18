# Loggers, Gzip y análisis de performance

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

---

Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:

- Ruta y método de todas las peticiones recibidas por el servidor (info)
- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
- Errores lanzados por las apis de mensajes y productos, únicamente (error)

Considerar el siguiente criterio:

- Loggear todos los niveles a consola (info, warning y error)
- Registrar sólo los logs de warning a un archivo llamada warn.log
- Enviar sólo los logs de error a un archivo llamada error.log

_Archivo `logger.js`_

```

import pino from "pino";

function buildConsoleLogger() {
    const consoleLogger = pino();
    consoleLogger.level = "info";
    return consoleLogger;
}

function buildWarnLogger() {
    const warnLogger = pino("warn.log");
    warnLogger.level = "warn";
    return warnLogger;
}

function buildErrorLogger() {
    const errorLogger = pino("error.log");
    errorLogger.level = "error";
    return errorLogger;
}

export default {buildConsoleLogger, buildWarnLogger, buildErrorLogger};

```

_Ruta y método de todas las peticiones recibidas por el servidor (info)_> _`server.js`_

```
...
import pinoLogger from "./logger.js";
...
  const logger = pinoLogger.buildConsoleLogger();

  app.use("/", (req, res, next) => {
    logger.info(`Solicitud con ruta < ${req.originalUrl} > y metodo ${req.method} recibida.`);
    next();
  });
...
```

![Log de rutas](https://github.com/suarezramirof/process/blob/master/img/log_routes_1.png)

_Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)_> _`index.js (routes)`_

```
...
import pinoLogger from "../../logger.js";
...
const warnLogger = pinoLogger.buildWarnLogger();
const logger = pinoLogger.buildConsoleLogger();
router.use("*", (req, res) => {
  logger.warn(
    `Ruta < ${req.originalUrl} > con metodo ${req.method} no implementada`
  );
  warnLogger.warn(
    `Ruta < ${req.originalUrl} > con método ${req.method} no implementada`
  );
  res.sendStatus(404);
});
...
```

![Log de rutas](https://github.com/suarezramirof/process/blob/master/img/log_routes_2.png)

_warn.log_
```

{"level":40,"time":1679089401353,"pid":13192,"hostname":"DESKTOP-KB12V27","msg":"Ruta < /rutafalsa > con método GET no implementada"}

```

_Errores lanzados por las apis de mensajes y productos, únicamente (error)_
- Se agrega validación de ejemplo en `productsController.js`

```
...
import pinoLogger from "../../logger.js";
const logger = pinoLogger.buildConsoleLogger();
const errorLogger = pinoLogger.buildErrorLogger();
...

  addProduct = (req, res) => {
    if (!req.body.nombre || req.body.precio || req.body.foto) {
      logger.error("Error al agregar producto");
      errorLogger.error("Error al agregar producto");
      return res.sendStatus(400);
    }
    this.products
      .add(req.body)
      .then(() => res.json("Éxito"))
      .catch(() => res.send("Error"));
  };

...

```

![Petición errónea desde Postman](https://github.com/suarezramirof/process/blob/master/img/postman_bad_request.png)

![Log de rutas y error](https://github.com/suarezramirof/process/blob/master/img/log_routes_error.png)

_error.log_

```

{"level":50,"time":1679089962456,"pid":13192,"hostname":"DESKTOP-KB12V27","msg":"Error al agregar producto"}

```

## Segunda parte

Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.
Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'
Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:
- El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process. 
- Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

_config.js_

```
...
const options = {
  alias: {
    p: "PORT",
    m: "MODE",
    c: "CONSOLE"
  },
  default: {
    PORT: 8080,
    MODE: "FORK",
    CONSOLE: false
  },
};
...
export const { PORT, MODE, CONSOLE } = parseArgs(commandLineArgs, options);

```
_miscRoutes.js_

```

import { CONSOLE } from "../config.js";

infoRouter.get("/", showInfo);
infoRouter.get("/gzip", compression(), showInfo);

function showInfo(_req, res) {
  const info = getInfo();
  if (CONSOLE) console.log(info);
  return res.render("pages/info", info);
}

function getInfo() {
  ...
  return { args, os, node, mem, path, id, dir, numCpus };
}

```

- Para las pruebas se elimina transitoriamente el middleware `checkAuthenticated` en la ruta `/info`

_Con info por consola_

![Inicio del servidor con info por consola](https://github.com/suarezramirof/process/blob/master/img/server_info_console.png)

![Artillery con consola](https://github.com/suarezramirof/process/blob/master/img/artillery_console.png)

_[result_console.txt](https://github.com/suarezramirof/process/blob/master/artillery/result_console.txt)_

```
...
--------------------------------
Summary report @ 20:18:25(-0300)
--------------------------------

http.codes.200: ................................................................ 1000
http.request_rate: ............................................................. 131/sec
http.requests: ................................................................. 1000
http.response_time:
  min: ......................................................................... 30
  max: ......................................................................... 529
  median: ...................................................................... 361.5
  p95: ......................................................................... 441.5
  p99: ......................................................................... 459.5

...
```

_Sin info por consola_

![Inicio del servidor sin info por consola](https://github.com/suarezramirof/process/blob/master/img/server_info_noconsole.png)

![Artillery sin consola](https://github.com/suarezramirof/process/blob/master/img/artillery_noconsole.png)

_[result_noconsole.txt](https://github.com/suarezramirof/process/blob/master/artillery/result_noconsole.txt)_

```
...
--------------------------------
Summary report @ 20:19:16(-0300)
--------------------------------

http.codes.200: ................................................................ 1000
http.request_rate: ............................................................. 286/sec
http.requests: ................................................................. 1000
http.response_time:
  min: ......................................................................... 10
  max: ......................................................................... 230
  median: ...................................................................... 141.2
  p95: ......................................................................... 202.4
  p99: ......................................................................... 206.5
...
```

Perfilamiento

_Sin info por consola_

```
node --prof server.js -p 8080

artillery quick --count 50 -n 20 "http://localhost:8080/info"

```

_Se renombra el archivo generado a `v8-noconsole.log`_
_Luego se procesa el archivo_

```
node --prof-process v8-noconsole.log > prof_noconsole.txt

```
_[prof_noconsole.txt](https://github.com/suarezramirof/process/blob/master/artillery/prof_noconsole.txt)_

```
[Summary]:
   ticks  total  nonlib   name
     34    1.1%  100.0%  JavaScript
      0    0.0%    0.0%  C++
     10    0.3%   29.4%  GC
   3160   98.9%          Shared libraries

```

_Con info por consola_

```
node --prof server.js -p 8080 -c

artillery quick --count 50 -n 20 "http://localhost:8080/info"

```

_Se renombra el archivo generado a `v8-console.log`_
_Luego se procesa el archivo_

```
node --prof-process v8-console.log > prof_console.txt

```
_[prof_console.txt](https://github.com/suarezramirof/process/blob/master/artillery/prof_console.txt)_

```
 [Summary]:
   ticks  total  nonlib   name
     54    3.2%   96.4%  JavaScript
      0    0.0%    0.0%  C++
     12    0.7%   21.4%  GC
   1626   96.7%          Shared libraries
      2    0.1%          Unaccounted

```