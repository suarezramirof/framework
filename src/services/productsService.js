import { ProductsDao } from "../daos/index.js";
class ProductsService {
  constructor() {
    this.productsDao = new ProductsDao();
  }

  async getProducts() {
    return await this.productsDao.getAll();
  }

  async getProductById(id) {
    return await this.productsDao.get(id);
  }

  async addProduct(product) {
    if (!product.nombre || !product.precio || !product.foto) {
      throw new Error("All properties are required");
    }
    const newProduct = await this.productsDao.add(product);
    return newProduct;
  }
}

export default ProductsService;