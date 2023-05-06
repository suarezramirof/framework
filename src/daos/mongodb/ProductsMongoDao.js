import MongoDao from "./mongoDao.js";
import ProductsSchema from "../../models/mongoose/productsSchema.js";

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
