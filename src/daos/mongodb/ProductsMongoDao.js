import MongoDao from "./mongoDao.js";
import ProductsSchema from "../../models/mongoose/productsSchema.js";
import ProductsDto from "../dto/productsDto.js";
import PinoLogger from "../../utils/logger.js";
const consoleLogger = PinoLogger.buildConsoleLogger();
const errorLogger = PinoLogger.buildErrorLogger();

let instance = null;
export default class ProductsMongoDao extends MongoDao {
  constructor() {
    super("products", ProductsSchema);
  }

  async add(product) {
    try {
      if (product) {
        const addTime = Date.now();
        const productDto = new ProductsDto(undefined, product, addTime);
        const { _id } = await this.items.create(productDto);
        productDto._id = _id;
        consoleLogger.info(
          `Product  ${productDto.nombre} added with id: ${productDto._id}`
        );
        return productDto;
      }
      throw new Error("Must provide a product");
    } catch (error) {
      errorLogger.error("Error adding product: " + error);
      throw error;
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductsMongoDao();
    }
    return instance;
  }
}
