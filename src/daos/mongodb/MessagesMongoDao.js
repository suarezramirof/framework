import MongoDao from "./mongoDao.js";
import MessagesSchema from "../../models/mongoose/messagesSchema.js";
import MessagesDto from "../dto/messagesDto.js";

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

  async add(message) {
    const msgTime = new Date();
    const newMessage = new MessagesDto(null, message, msgTime);
    await this.items.create(newMessage);
    return newMessage;
  }
}
