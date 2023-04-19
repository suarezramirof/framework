import { MessagesDaoFactory } from "../daos/index.js";

class MessagesService {
  constructor() {
    this.messagesDao = MessagesDaoFactory.getDao();
  }

  async getMessages() {
    return await this.messagesDao.getAll();
  }

  async addMessage(message) {
    if (
      !message.author.nombre ||
      !message.author.apellido ||
      !message.author.edad ||
      !message.author.alias ||
      !message.author.avatar ||
      !message.text
    ) {
      throw new Error("Missing message data");
    }
    const newMessage = await this.messagesDao.add(message);
    return newMessage;
  }
}

export default MessagesService;
