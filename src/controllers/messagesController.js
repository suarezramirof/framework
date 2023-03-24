import { messages } from "../daos/index.js";
import keys from "../sockets/ws_keys.js";

class MessagesController {
  constructor(messages) {
    this.messages = messages;
  };

  viewMessages = async (socket) => {
    socket.emit(keys.nuevoMensaje);
  };

  getMessages = async (_req, res) => {
    const messages = await this.messages.getAll();
    res.send(messages);
  };

  sendMessage = async (req, res) => {
    const { author, text, date } = req.body;
    const msj = { author, text, date };
    this.messages
      .add(msj)
      .then(() => res.json("Mensaje enviado con éxito"))
      .catch((error) => {
        console.log("Error:", error);
        res.sendStatus(500);
      });
  };
}

const messagesController = new MessagesController(messages);
export default messagesController;
