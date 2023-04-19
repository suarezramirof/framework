import MongoDao from "./MongoDao.js";
import ProductsSchema from "../models/ProductsSchema.js";

let instance = null;
export default class ProductsMongoDao extends MongoDao {
  constructor() {
    super("products", ProductsSchema);
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductsMongoDao();
    }
    return instance;
  }
}