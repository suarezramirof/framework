import { ProductsDaoFactory } from "../daos/index.js";
import Product from "./classes/products.js";
export default class ProductsRepo {
  constructor() {
    this.dao = ProductsDaoFactory.getDao();
  }

  async getAll() {
    const products = await this.dao.getAll();
    return products.map((p) => new Product(p));
  }

  async get(id) {
    const product = await this.dao.get(id);
    return new Product(product);
  }

  async add(product) {
    const addedProduct = await this.dao.add(product);
    return new Product(addedProduct);
  }

  async update(id, product) {
    const props = product;
    props._id = id;
    const updatedProduct = await this.dao.update(props);
    return new Product(updatedProduct);
  }

  async delete(id) {
    const deletedProduct = await this.dao.deleteById(id);
    return new Product(deletedProduct);
  }
}
