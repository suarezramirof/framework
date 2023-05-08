import MemoryDao from "./memoryDao.js";
import MessagesDto from "../dto/messagesDto.js";

import PinoLogger from "../../utils/logger.js";
const logger = PinoLogger.buildConsoleLogger();
const errorLogger = PinoLogger.buildErrorLogger();
let instance = null;

export default class MessagesMemoryDao extends MemoryDao {
  constructor(messages) {
    super(messages);
  }

  add(message) {
    try {
      if (message) {
        const id = this.getNext_Id(this.items);
        const msgTime = Date.now();
        const messageDto = new MessagesDto(id, message, msgTime);
        this.items.push(messageDto);
        logger.info(`Message from ${message.author.id} added`);
        return messageDto;
      } else {
        throw new Error("Must provide an message");
      }
    } catch (error) {
      errorLogger.error("Error adding message: ", error);
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new MessagesMemoryDao([]);
    }
    return instance;
  }
}
