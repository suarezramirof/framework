import ProductsFileDao from "./ProductsFileDao.js";
import MessagesFileDao from "./MessagesFileDao.js";

export const products = new ProductsFileDao();
export const messages = new MessagesFileDao();