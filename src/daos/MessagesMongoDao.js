import MongoDao from "./MongoDao.js";
import MessagesSchema from "../models/MessagesSchema.js";
import MessagesDto from "./dto/MessagesDto.js";

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

  async get(id) {
    return await super.get(id).then((message) => new MessagesDto(message))
  }

  async getAll() {
    return await super.getAll().then((messages) => messages.map((message) => new MessagesDto(message)))
  }

  async add(message) {
    const newMessage = new MessagesDto(message);
    return await super.add(newMessage);
  }
}
