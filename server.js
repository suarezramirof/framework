import router from "./src/routes/index.js";
import hbs from "./src/engines/handlebars.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import sessionMiddleware from "./src/auth/session.js";
import passport from "passport";
import { createServer } from "http";
import { Server } from "socket.io";
import * as socket from "./src/sockets/socket_io.js";
import initializePassport from "./src/auth/passport-config.js";
import config from "./src/config.js";
import cluster from "cluster";
import os from "os";
import pinoLogger from "./src/utils/logger.js";


// Config
const {PORT, MODE, NODE_ENV} = config;

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

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("./public"));
  if (NODE_ENV === "development") {
    app.use(cors());
  }

  //Engine

  app.engine("hbs", hbs.engine);
  app.set("views", "public/views");
  app.set("view engine", "hbs");

  // Session

  app.use(cookieParser());
  app.use(sessionMiddleware);

  // Passport

  app.use(passport.initialize());
  app.use(passport.session());
  initializePassport(passport);

  // Logs

  const logger = pinoLogger.buildConsoleLogger();
  
  app.use("/", (req, res, next) => {
    logger.info(`Solicitud con ruta < ${req.originalUrl} > y metodo ${req.method} recibida.`);
    next();
  });

  //Route

  app.use("/", router);

  // Server

  const httpServer = createServer(app);
  const server = httpServer.listen(PORT, () => {
    console.log(`Servidor listo en el puerto ${server.address().port}`);
  });
  server.on("error", (error) => {
    console.log(`Error en el servidor: ${error}`);
  });

  // Socket io

  const io = new Server(httpServer);
  socket.start(io);
}
