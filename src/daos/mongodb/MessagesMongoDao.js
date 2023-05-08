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
    try {
      if (message) {
        const msgTime = Date.now();
        const newMessage = new MessagesDto(undefined, message, msgTime);
        const {_id} = await this.items.create(newMessage);
        newMessage._id = _id;
        return newMessage;
      }
      throw new Error("Message is undefined");
    } catch(error) {
      throw error;
    }
  }
}
