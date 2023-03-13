# Servidor con balance de carga

## Primera parte

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

---

Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

_Fork_

![ejecución con nodemon en modo fork](https://github.com/suarezramirof/process/blob/master/img/nodemon_fork.png)

![procesos node activos](https://github.com/suarezramirof/process/blob/master/img/fork_node_process.png)

_Cluster_

![ejecución con nodemon en modo cluster](https://github.com/suarezramirof/process/blob/master/img/nodemon_cluster.png)

![procesos node activos](https://github.com/suarezramirof/process/blob/master/img/cluster_node_process.png)

---

Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

![ejecución con forever y listado por forever](https://github.com/suarezramirof/process/blob/master/img/forever.png)

![procesos node activos](https://github.com/suarezramirof/process/blob/master/img/forever_node_process.png)

---

Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.

Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.

![ejecución con pm2 en modo fork y cluster](https://github.com/suarezramirof/process/blob/master/img/pm2.png)

Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

![finalización con pm2](https://github.com/suarezramirof/process/blob/master/img/pm2_stop.png)

***
***

## Segunda parte

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.

_Archivo nginx.conf_

```

events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server 127.0.0.1:8080;
    }

    upstream node_app2 {
        server 127.0.0.1:8081;
    }

    server {
        listen       80;
        server_name  nginx_node;

        location / {
            proxy_pass http://node_app;
        }

        location /api/randoms/ {
            proxy_pass http://node_app2;
        }
    }
}

```

Verificar que todo funcione correctamente.

_localhost/home_

![localhost/home](https://github.com/suarezramirof/process/blob/master/img/localhost_home.png)

_localhost/api/randoms_

![localhost/api/randoms](https://github.com/suarezramirof/process/blob/master/img/localhost_api_randoms.png)

Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

_Archivo nginx.conf_

```

events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server 127.0.0.1:8080;
    }

    upstream node_app2 {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
    }

    server {
        listen       80;
        server_name  nginx_node;

        location / {
            proxy_pass http://node_app;
        }

        location /api/randoms/ {
            proxy_pass http://node_app2;
        }
    }
}

```

_pm2 list_

![pm2_list](https://github.com/suarezramirof/process/blob/master/img/pm2_servercluster.png)