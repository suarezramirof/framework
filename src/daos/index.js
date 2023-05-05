import config from "../config.js";
import ProductsMemoryDao from "./memory/ProductsMemoryDao.js";
import ProductsMongoDao from "./mongodb/ProductsMongoDao.js";
import MessagesMemoryDao from "./memory/MessagesMemoryDao.js";
import MessagesMongoDao from "./mongodb/MessagesMongoDao.js";
import ProductsFileSystemDao from "./filesystem/ProductsFileSystemDao.js";
import MessagesFileSystemDao from "./filesystem/MessagesFileSystemDao.js";
const DATABASE = config.DATABASE;

let productsInstance = null;
let messagesInstance = null;

export class ProductsDaoFactory {
  constructor(db) {
    if (db == "MONGODB") {
      this.productsDao = ProductsMongoDao.getInstance();
    } else if (db == "FILESYSTEM") {
      this.productsDao = ProductsFileSystemDao.getInstance();
    } else if (db == "MEMORY") {
      this.productsDao = ProductsMemoryDao.getInstance();
    } else {
      throw new Error("No such database");
    }
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
    if (db == "MONGODB") {
      this.messagesDao = MessagesMongoDao.getInstance();
    } else if (db == "FILESYSTEM") {
      this.messagesDao = MessagesFileSystemDao.getInstance();
    } else if (db == "MEMORY") {
      this.messagesDao = MessagesMemoryDao.getInstance();
    } else {
      throw new Error("No such database");
    }
  }

  static getDao() {
    if (messagesInstance === null) {
      messagesInstance = new MessagesDaoFactory(DATABASE);
    }
    return messagesInstance.messagesDao;
  }
}
