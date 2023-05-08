import MessagesRepo from "../repositories/messagesRepo.js";

class MessagesService {
  constructor() {
    this.messagesRepo = new MessagesRepo();
  }

  async getMessages() {
    return await this.messagesRepo.getAll();
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
    const newMessage = await this.messagesRepo.add(message);
    return newMessage;
  }

  async deleteMessage(id) {
    return await this.messagesRepo.delete(id);
  }
}
export default MessagesService;
