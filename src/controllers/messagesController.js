import MessagesService from "../services/messagesService.js";
import keys from "../sockets/ws_keys.js";
import PinoLogger from "../utils/logger.js";
const errorLogger = PinoLogger.buildErrorLogger();
const consoleLogger = PinoLogger.buildConsoleLogger();

const messagesService = new MessagesService();
const messagesController = {};

messagesController.viewMessages = async (socket) => {
  socket.emit(keys.nuevoMensaje);
};

messagesController.getMessages = async (_req, res) => {
  const messages = await messagesService.getMessages();
  res.json(messages);
};

messagesController.sendMessage = async (req, res) => {
  const { author, text, date } = req.body;
  const message = { author, text, date };
  messagesService
    .addMessage(message)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      errorLogger.error(error);
      consoleLogger.error(error);
      res.status(500).json({ error: error.message });
    });
};

messagesController.deleteMessage = async (req, res) => {
  const { id } = req.params;
  messagesService
    .deleteMessage(id)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      errorLogger.error(error);
      consoleLogger.error(error);
      res.status(500).json({ error: error.message });
    });
}

export default messagesController;
