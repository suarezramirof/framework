import PinoLogger from "../../utils/logger.js";
import fs from "fs/promises";
const errorLogger = PinoLogger.buildErrorLogger();

export default class FileSystemDao {
  constructor(path) {
    this.path = "src/daos/filesystem/" + path;
  }
  async get(id) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const json = JSON.parse(data);
      return json.find((item) => item._id === id);
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const json = JSON.parse(data);
      return json ? json : [];
    } catch (error) {
      errorLogger.error(error);
      return [];
    }
  }

  getNext_Id(array) {
    try {
      const ids = array[0] ? array.map((item) => item._id) : [0];
      return Math.max(...ids) + 1;
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async getIndex(item, array) {
    try {
      return array.findIndex((obj) => obj._id === item._id);
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async update(item) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const json = JSON.parse(data);
      const index = this.getIndex(item, json);
      json[index] = item;
      await fs.writeFile(this.path, JSON.stringify(json));
    } catch (error) {
      errorLogger.error(error);
    }
  }
}
