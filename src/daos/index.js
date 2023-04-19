import ProductsMongoDao from "./ProductsMongoDao.js";
import MessagesMongoDao from "./MessagesMongoDao.js";
import { DATABASE } from "../config.js";

let productsInstance = null;
let messagesInstance = null;

export class ProductsDaoFactory {
  constructor(db) {
    if (db === "mongo") this.productsDao = ProductsMongoDao.getInstance();
    // No se usan otras bases de datos en esta instancia
    else throw new Error("No such database");
  }

  static getDao() {
    if (productsInstance === null) {
      productsInstance = new ProductsDaoFactory(DATABASE);
    }
    return productsInstance.productsDao;
  }
}

export class MessagesDaoFactory {
  constructor(db) {
    if (db === "mongo") this.messagesDao = new MessagesMongoDao();
    // No se usan otras bases de datos en esta instancia
    else throw new Error("No such database");
  }

  static getDao() {
    if (messagesInstance === null) {
      messagesInstance = new MessagesDaoFactory(DATABASE);
    }
    return messagesInstance.messagesDao;
  }
}
