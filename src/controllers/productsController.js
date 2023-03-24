import { products } from "../daos/index.js";
import keys from "../sockets/ws_keys.js";
import pinoLogger from "../../logger.js";
const logger = pinoLogger.buildConsoleLogger();
const errorLogger = pinoLogger.buildErrorLogger();
class ProductsController {
  constructor(products) {
    this.products = products;
  }

  getProducts = (_req, res) => {
    this.products
      .getAll()
      .then((data) => {
        return res.json(data);
      })
      .catch((error) => res.json(error));
  };

  addProduct = (req, res) => {
    if (!req.body.nombre || !req.body.precio || !req.body.foto) {
      logger.error("Error al agregar producto");
      errorLogger.error("Error al agregar producto");
      return res.sendStatus(400);
    }
    this.products
      .add(req.body)
      .then(() => res.json("Éxito"))
      .catch(() => res.send("Error"));
  };

  addProductSocket = (prod, io) => {
    this.products
      .add(prod)
      .then(() => io.sockets.emit(keys.nuevoProducto))
      .catch(() => console.log(error));
  };
}

const productsController = new ProductsController(products);

export default productsController;
