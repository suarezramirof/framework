import { messages } from "../daos/index.js";
import { normalize, schema } from "normalizr";
import keys from "../sockets/ws_keys.js";
const user = new schema.Entity("author");
const schemaMessages = new schema.Entity("messages", { author: user });
class MessagesController {
  constructor(messages) {
    this.messages = messages;
  }

  normalizeData = (data) => {
    return normalize(data, [schemaMessages]);
  };

  addMessage = async (msj, io) => {
    try {
      msj.author.avatar = msj.author.avatar.startsWith("http")
        ? msj.author.avatar
        : "https://castillotrans.eu/wp-content/uploads/2019/06/77461806-icono-de-usuario-hombre-hombre-avatar-avatar-pictograma-pictograma-vector-ilustraci%C3%B3n-300x300.jpg";
      await this.messages.add(msj);
      const messages = await this.messages.getAll();
      const normalizedMessages = this.normalizeData(messages);
      io.sockets.emit(keys.nuevoMensaje, normalizedMessages);
    } catch (error) {
      throw error;
    }
  };

  viewMessages = async (socket) => {
    const messages = await this.messages.getAll();
    const normalizedMessages = this.normalizeData(messages);
    socket.emit(keys.nuevoMensaje, normalizedMessages);
  };
}

const messagesController = new MessagesController(messages);

export default messagesController;
