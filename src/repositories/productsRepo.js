import { ProductsDaoFactory } from "../daos/index.js";
import Producto from "./classes/products.js";
import ProductsDto from "../daos/dto/ProductsDto.js";
export default class ProductsRepo {
  constructor() {
    this.dao = ProductsDaoFactory.getDao();
  }

  async getAll() {
    const products = await this.dao.getAll();
    return products.map((p) => new Producto(p));
  }

  async get(id) {
    const product = await this.dao.get(id);
    return new Producto(product);
  }

  async add(product) {
    const productDto = new ProductsDto(product);
    return await this.dao.add(productDto);
  }

  async delete(id) {
    return await this.dao.deleteById(id);
  }
}
