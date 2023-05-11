import router from "./src/routes/index.js";
import Koa from "koa";
import { koaBody } from "koa-body";
import Router from "koa-router";
import config from "./src/config.js";
import cluster from "cluster";
import os from "os";

// Config
const { PORT, MODE, NODE_ENV } = config;

// Primary

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
  // Express

  const app = new Koa();
  app.use(koaBody());

  //Route

  const route = new Router();
  route.get("/", (ctx) => {
    ctx.body = "Hola Mundo";
  });
  app.use(router.routes());

  // Server

  const server = app.listen(PORT, () => {
    console.log(`Servidor listo en el puerto ${server.address().port}`);
  });

  server.on("error", (error) => {
    console.log(`Error en el servidor: ${error}`);
  });
}
