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
_Vista de `/info`_

![Página info](https://github.com/suarezramirof/process/blob/master/img/info.png)

***

Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

_Fork_

![ejecución con nodemon en modo fork](https://github.com/suarezramirof/process/blob/master/img/nodemon_fork.png)

![procesos node activos](https://github.com/suarezramirof/process/blob/master/img/fork_node_process.png)

_Cluster_

![ejecución con nodemon en modo cluster](https://github.com/suarezramirof/process/blob/master/img/nodemon_cluster.png)

![procesos node activos](https://github.com/suarezramirof/process/blob/master/img/cluster_node_process.png)

***

Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

![ejecución con forever y listado por forever](https://github.com/suarezramirof/process/blob/master/img/forever.png)

![procesos node activos](https://github.com/suarezramirof/process/blob/master/img/forever_node_process.png)

***

Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.

Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
