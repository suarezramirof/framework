# Servidor con balance de carga

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

_Se realizan los siguientes cambios en `config.js`_

```
const options = {
  alias: {
    p: "PORT",
    m: "MODE" // se agrega el parámetro MODE
  },
  default: {
    PORT: 8080,
    MODE: "FORK" // el modo default es "FORK"
  },
};

export const { PORT, MODE } = parseArgs(commandLineArgs, options);

```

_Y los siguientes cambios en `server.js`_

```
import { PORT, MODE } from "./src/config.js";
import cluster from "cluster";
import os from "os";

if (MODE === "CLUSTER" && cluster.isPrimary) {
  const numCpus = os.cpus().length;
  console.log("Primary cluster server");

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${process.pid} died`);
    cluster.fork();
  });
} else {
    const app = express();
    ...
}

```

---

Agregar en la vista info, el número de procesadores presentes en el servidor.

_Se agregan las siguientes líneas en `miscRoutes.js`_

```
import { cpus } from "os";
const numCpus = cpus().length; // se agrega en los parámetros que se pasan al render

```

![Página info](https://github.com/suarezramirof/process/blob/master/img/info.png)
