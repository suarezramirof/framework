import ProductsService from "../services/productsService.js";
import PinoLogger from "../utils/logger.js";
const logger = PinoLogger.buildConsoleLogger();
const errorLogger = PinoLogger.buildErrorLogger();
const productsService = new ProductsService();
const productsController = {};

productsController.getProducts = (_req, res) => {
  productsService
    .getProducts()
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => res.json(error));
};

productsController.addProduct = (req, res) => {
  productsService
    .addProduct(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => {
      errorLogger.error(error);
      res.status(error.code ? error.code : 500).send(error.message);
    });
};

productsController.updateProduct = (req, res) => {
  productsService
    .updateProduct(req.params.id, req.body)
    .then((response) => res.json(response))
    .catch((error) => {
      errorLogger.error(error);
      res.status(error.code ? error.code : 500).send(error.message);
    });
};

productsController.deleteProduct = (req, res) => {
  productsService
    .deleteProduct(req.params.id)
    .then((response) => res.json(response))
    .catch((error) => {
      errorLogger.error(error);
      res.status(error.code ? error.code : 500).send(error.message);
    });
};

export default productsController;
