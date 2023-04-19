import ProductsRepo from "../repositories/productsRepo.js";

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
    if (!product.nombre || !product.precio || !product.foto) {
      throw new Error("All properties are required");
    }
    const newProduct = await this.productsRepo.add(product);
    return newProduct;
  }
}

export default ProductsService;