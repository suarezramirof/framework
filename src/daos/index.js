import ProductsFileDao from "./ProductsFileDao.js";
import MessagesFileDao from "./MessagesFileDao.js";
import ProductsMongoDao from "./ProductsMongoDao.js";

export const products = new ProductsMongoDao();
export const messages = new MessagesFileDao();