import { DATABASE } from "../config.js";

let productsInstance = null;
let messagesInstance = null;

export class ProductsDaoFactory {
  constructor(db) {
    if (db === "MONGODB") {
      import("./mongodb/ProductsMongoDao.js").then((module) => {
        this.productsDao = module.default.getInstance();
      });
    } else if (db === "FILESYSTEM") {
      import("./filesystem/ProductsFileSystemDao.js").then((module) => {
        this.productsDao = module.default.getInstance();
      });
    } else if (db === "MEMORY") {
      import("./memory/ProductsMemoryDao.js").then((module) => {
        this.productsDao = module.default.getInstance();
      });
    }
    else {
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
    if (db === "MONGODB") {
      import("./mongodb/MessagesMongoDao.js").then((module) => {
        this.messagesDao = module.default.getInstance();
      });
    } else if (db === "FILESYSTEM") {
      import("./filesystem/MessagesFileSystemDao.js").then((module) => {
        this.messagesDao = module.default.getInstance();
      });
    } else if (db === "MEMORY") {
      import("./memory/MessagesMemoryDao.js").then((module) => {
        this.messagesDao = module.default.getInstance();
      });
    }
    else throw new Error("No such database");
  }

  static getDao() {
    if (messagesInstance === null) {
      messagesInstance = new MessagesDaoFactory(DATABASE);
    }
    return messagesInstance.messagesDao;
  }
}
