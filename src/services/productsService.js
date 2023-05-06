import ProductsRepo from "../repositories/productsRepo.js";
import Products from "../models/products.js";

class ProductsService {
  constructor() {
    this.productsRepo = new ProductsRepo();
  }

  async getProducts() {
    return await this.productsRepo.getAll();
  }

  async getProductById(id) {
    return await this.productsRepo.get(id);
  }

  async addProduct(product) {
    ProductsService.isValidProduct(product, true);
    const newProduct = await this.productsRepo.add(product);
    return newProduct;
  }

  async deleteProduct(id) {
    return await this.productsRepo.delete(id);
  }

  static isValidProduct(product, required) {
    try {
      Products.validate(product, required);
    } catch (error) {
      const err = new Error(
        "Invalid product json format or missing fields: " +
          error.details[0].message
      );
      err.code = 400
      throw err;
    }
  }
}

export default ProductsService;
