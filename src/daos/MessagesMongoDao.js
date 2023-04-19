import MongoDao from "./MongoDao.js";
import MessagesSchema from "../models/MessagesSchema.js";

let instance = null;
export default class MessagesMongoDao extends MongoDao {
  constructor() {
    super("messages", MessagesSchema);
  }
  static getInstance() {
    if (!instance) {
      instance = new MessagesMongoDao();
    }
    return instance;
  }
}
