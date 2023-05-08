import PinoLogger from "../../utils/logger.js";
import fs from "fs/promises";
const errorLogger = PinoLogger.buildErrorLogger();
const logger = PinoLogger.buildConsoleLogger();

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
      const ids = array[0] ? array.map((item) => parseInt(item._id)) : [0];
      return Math.max(...ids) + 1 + "";
    } catch (error) {
      errorLogger.error(error);
    }
  }

  getIndex(id, array) {
    try {
      return array.findIndex((obj) => obj._id == id);
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async update(item) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const json = JSON.parse(data);
      const index = this.getIndex(item._id, json);
      json[index] = { ...json[index], ...item };
      await fs.writeFile(this.path, JSON.stringify(json));
      return json[index];
    } catch (error) {
      errorLogger.error(error);
    }
  }

  async deleteById(_id) {
    try {
      if (_id) {
        const data = await fs.readFile(this.path, "utf-8");
        const json = JSON.parse(data);
        const index = this.getIndex(_id, json);
        if (index >= 0) {
          const [deleted] = json.splice(index, 1);
          await fs.writeFile(this.path, JSON.stringify(json));
          logger.info(`Item with ID ${_id} deleted`);
          return deleted;
        } else {
          throw new Error("Item not found");
        }
      } else {
        throw new Error("Must provide an ID");
      }
    } catch (error) {
      errorLogger.error("Error deleting item: ", error);
    }
  }
}
