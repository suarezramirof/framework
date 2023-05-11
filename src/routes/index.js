import Router from "koa-router";
import productsController from "../controllers/productsController.js";
import messagesController from "../controllers/messagesController.js";
import pinoLogger from "../utils/logger.js";
const router = new Router();
router.get("/api/productos", productsController.getProducts);
router.get("/api/productos/:id", productsController.getProduct);
router.post("/api/productos", productsController.addProduct);
router.put("/api/productos/:id", productsController.updateProduct);
router.delete("/api/productos/:id", productsController.deleteProduct);
router.get("/api/mensajes", messagesController.getMessages);
router.post("/api/mensajes", messagesController.sendMessage);
router.delete("/api/mensajes/:id", messagesController.deleteMessage);

const warnLogger = pinoLogger.buildWarnLogger();

router.all(/.*/, async (ctx) => {
  warnLogger.warn(
    `Ruta < ${ctx.originalUrl} > con método ${ctx.method} no implementada`
  );
  ctx.status = 404;
  return (ctx.body = {
    error: -2,
    descripcion: `ruta ${ctx.originalUrl} con método ${ctx.method} no implementada`,
  });
});
export default router;
