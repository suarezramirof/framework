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
