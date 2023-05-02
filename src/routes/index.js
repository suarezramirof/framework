import { Router } from "express";
import loginRouter, { checkAuthenticated } from "./loginRouter.js";
import productsRouter from "./productsRouter.js";
import messageRouter from "./messageRouter.js";
import { infoRouter, randomNumberRouter } from "./miscRoutes.js";
import pinoLogger from "../utils/logger.js";
const router = Router();
router.use("/api", checkAuthenticated, productsRouter);
router.use("/api", checkAuthenticated, messageRouter);
router.use("/api", checkAuthenticated, randomNumberRouter);
router.use("/", loginRouter);
router.use("/info", checkAuthenticated, infoRouter);

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
export default router;
