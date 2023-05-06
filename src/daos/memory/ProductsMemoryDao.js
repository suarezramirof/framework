import MemoryDao from "./memoryDao.js";
import ProductsDto from "../dto/productsDto.js";
import PinoLogger from "../../utils/logger.js";
const logger = PinoLogger.buildConsoleLogger();
const errorLogger = PinoLogger.buildErrorLogger();
let instance = null;
export default class ProductsMemoryDao extends MemoryDao {
  constructor(products) {
    super(products);
  }

  add(product) {
    try {
      if (product) {
        const id = this.getNext_Id(this.items);
        const addTime = Date.now();
        const productDto = new ProductsDto(id, product, addTime);
        this.items.push(productDto);
        logger.info(`Product ${product.nombre} added`);
        return productDto;
      } else {
        throw new Error("Must provide a product");
      }
    } catch (error) {
      errorLogger.error("Error adding product: ", error);
    }
  }

  update(item) {
    try {
      if (item) {
        const index = this.getIndex(item.id, this.items);
        if (index >= 0) {
          const updatedItem = new ProductsDto(item);
          this.items[index] = updatedItem;
          return updatedItem;
        } else {
          throw new Error("Product not found");
        }
      } else {
        throw new Error("Must provide a product");
      }
    } catch (error) {
      errorLogger.error("Error updating product: ", error);
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductsMemoryDao([]);
    }
    return instance;
  }
}
