import { MessagesDaoFactory } from "../daos/index.js";
import Messages from "./classes/messages.js";

export default class MessagesRepo {
  constructor() {
    this.dao = MessagesDaoFactory.getDao();
  }

  async getAll() {
    const messages = await this.dao.getAll();
    return messages.map((message) => new Messages(message));
  }

  async get(id) {
    const message = await this.dao.getById(id);
    return new Messages(message);
  }

  async add(message) {
    const savedMessage = await this.dao.add(message);
    return new Messages(savedMessage);
  }

  async delete(id) {
    const deletedMessage = await this.dao.deleteById(id);
    return new Messages(deletedMessage);
  }
}
