import MongoDao from "./MongoDao.js";
import ProductsSchema from "../models/ProductsSchema.js";
import ProductsDto from "./dto/ProductsDto.js";

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

  async get(id) {
    return await super.get(id).then((product) => new ProductsDto(product));
  }

  async getAll() {
    return await super
      .getAll()
      .then((products) => products.map((product) => new ProductsDto(product)));
  }

  async add(product) {
    const item = new ProductsDto(product);
    return await super.add(item).then((product) => new ProductsDto(product));
  }
}
