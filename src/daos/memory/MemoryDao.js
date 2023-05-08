import PinoLogger from "../../utils/logger.js";
const logger = PinoLogger.buildConsoleLogger();
const warnLogger = PinoLogger.buildWarnLogger();
const errorLogger = PinoLogger.buildErrorLogger();

export default class MemoryDao {
  constructor(items) {
    this.items = items;
  }

  getNext_Id(array) {
    try {
      const ids = array[0] ? array.map((item) => parseInt(item._id)) : [0];
      return Math.max(...ids) + 1 + "";
    } catch (error) {
      errorLogger.error(error);
    }
  }

  getIndex(id, items) {
    return items.findIndex((item) => item._id == id);
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

  update(item) {
    try {
      if (item) {
        const index = this.getIndex(item._id, this.items);
        if (index >= 0) {
          this.items[index] = { ...this.items[index], ...item };
          logger.info(`Item with ID ${item._id} updated`);
          return this.items[index];
        } else {
          throw new Error("Item not found");
        }
      } else {
        throw new Error("Must provide an item");
      }
    } catch (error) {
      errorLogger.error("Error updating item: ", error);
    }
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
