import { Router } from "express";
import loginRouter, { checkAuthenticated } from "./loginRouter.js";
import productsRouter from "./productsRouter.js";
import { infoRouter, randomNumberRouter } from "./miscRoutes.js";

const router = Router();
router.use("/api", checkAuthenticated, productsRouter);
router.use("/api", checkAuthenticated, randomNumberRouter);
router.use("/", loginRouter);
router.use("/info", checkAuthenticated, infoRouter);
export default router;
