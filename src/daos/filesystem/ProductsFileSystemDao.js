import FileSystemDao from "./FileSystemDao.js";
import ProductsDto from "../dto/ProductsDto.js";
import PinoLogger from "../../utils/logger.js";
import fs from "fs/promises";

const errorLogger = PinoLogger.buildErrorLogger();
const infoLogger = PinoLogger.buildConsoleLogger();

let instance = null;

export default class ProductsFileSystemDao extends FileSystemDao {
  constructor() {
    super("products.json");
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductsFileSystemDao();
    }
    return instance;
  }

  async add(item) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const json = data ? JSON.parse(data) : [];
      const id = this.getNext_Id(json);
      const date = Date.now();
      const itemDto = new ProductsDto(id, item, date);
      json.push(itemDto);
      infoLogger.info(`New product with id ${id} added`);
      await fs.writeFile(this.path, JSON.stringify(json));
      return itemDto;
    } catch (error) {
      errorLogger.error(error);
    }
  }
}
