import config from "../config.js";
import ProductsMemoryDao from "./memory/productsMemoryDao.js";
import ProductsMongoDao from "./mongodb/productsMongoDao.js";
import MessagesMemoryDao from "./memory/messagesMemoryDao.js";
import MessagesMongoDao from "./mongodb/messagesMongoDao.js";
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
