import PinoLogger from "../../utils/logger.js";
const logger = PinoLogger.buildConsoleLogger();
const warnLogger = PinoLogger.buildWarnLogger();
const errorLogger = PinoLogger.buildErrorLogger();

export default class MemoryDao {
  constructor(items) {
    this.items = items;
  }

  getNext_Id(items) {
    const lg = items.length;
    return lg ? parseInt(items[lg - 1]) + 1 : 1;
  }

  getIndex(id, items) {
    return items.findIndex((item) => item._id === id);
  }

  get(_id) {
    try {
      if (_id) {
        const index = this.getIndex(_id, this.items);
        return index >= 0 ? this.items[index] : {};
      } else {
        throw new Error("Must provide an ID");
      }
    } catch (error) {
      errorLogger.error("Error getting item: ", error);
    }
  }

  getAll() {
    return this.items;
  }

  deleteById(_id) {
    try {
      if (_id) {
        const index = this.getIndex(_id, this.items);
        if (index >= 0) {
          const [deleted] = this.items.splice(index, 1);
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
