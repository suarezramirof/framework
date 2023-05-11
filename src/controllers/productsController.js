import ProductsService from "../services/productsService.js";
import PinoLogger from "../utils/logger.js";
const logger = PinoLogger.buildConsoleLogger();
const errorLogger = PinoLogger.buildErrorLogger();
const productsService = new ProductsService();
const productsController = {};

productsController.getProducts = async (ctx) => {
  try {
    ctx.body = await productsService.getProducts();
  } catch (error) {
    errorLogger.error(error);
    ctx.status = error.code ? error.code : 500;
    ctx.body = error.message;
  }
};

productsController.getProduct = async (ctx) => {
  try {
    ctx.body = await productsService.getProductById(ctx.params.id);
  } catch (error) {
    errorLogger.error(error);
    ctx.status = error.code ? error.code : 500;
    ctx.body = error.message;
  }
};

productsController.addProduct = async (ctx) => {
  try {
    ctx.body = await productsService.addProduct(ctx.request.body);
  } catch (error) {
    errorLogger.error(error);
    ctx.status = error.code ? error.code : 500;
    ctx.body = error.message;
  }
};

productsController.updateProduct = async (ctx) => {
  try {
    ctx.body = await productsService.updateProduct(ctx.params.id, ctx.request.body);
  } catch (error) {
    errorLogger.error(error);
    ctx.status = error.code ? error.code : 500;
    ctx.body = error.message;
  }
}

productsController.deleteProduct = async (ctx) => {
  try {
    ctx.body = await productsService.deleteProduct(ctx.params.id);
  } catch (error) {
    errorLogger.error(error);
    ctx.status = error.code ? error.code : 500;
    ctx.body = error.message;
  }
}

export default productsController;
