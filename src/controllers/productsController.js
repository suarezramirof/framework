import ProductsService from "../services/productsService.js";
import PinoLogger from "../utils/logger.js";
const logger = PinoLogger.buildConsoleLogger();
const errorLogger = PinoLogger.buildErrorLogger();
const productsService = new ProductsService();
const productsController = {}

  productsController.getProducts = (_req, res) => {
    productsService
      .getProducts()
      .then((data) => {
        return res.json(data);
      })
      .catch((error) => res.json(error));
  };

  productsController.addProduct = (req, res) => {
    if (!req.body.nombre || !req.body.precio || !req.body.foto) {
      logger.error("Error al agregar producto");
      errorLogger.error("Error al agregar producto");
      return res.sendStatus(400);
    }
    productsService
      .addProduct(req.body)
      .then(() => res.json("Éxito"))
      .catch(() => res.send("Error"));
  };

  productsController.deleteProduct = (req, res) => {
    productsService
      .deleteProduct(req.params.id)
      .then(() => res.json("Éxito"))
      .catch(() => res.send("Error"));
  }

export default productsController;
