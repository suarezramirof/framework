import MessagesService from "../services/messagesService.js";
import keys from "../sockets/ws_keys.js";

const messagesService = new MessagesService();
const messagesController = {};

messagesController.viewMessages = async (socket) => {
  socket.emit(keys.nuevoMensaje);
};

messagesController.getMessages = async (_req, res) => {
  const messages = await messagesService.getMessages();
  res.send(messages);
};

messagesController.sendMessage = async (req, res) => {
  const { author, text, date } = req.body;
  const message = { author, text, date };
  messagesService
    .addMessage(message)
    .then(() => {
      res.json("Mensaje enviado con éxito");
    })
    .catch((error) => console.log(error));
};

export default messagesController;
