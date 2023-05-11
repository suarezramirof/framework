import MessagesService from "../services/messagesService.js";
import PinoLogger from "../utils/logger.js";
const errorLogger = PinoLogger.buildErrorLogger();
const consoleLogger = PinoLogger.buildConsoleLogger();

const messagesService = new MessagesService();
const messagesController = {};

messagesController.getMessages = async (ctx) => {
  try {
    const messages = await messagesService.getMessages();
    ctx.body = messages;
  } catch (error) {
    errorLogger.error(error);
    consoleLogger.error(error);
    ctx.status = error.status || 500;
    ctx.body = {
      status: error.status || 500,
      error: error.message,
    };
  }
};

messagesController.sendMessage = async (ctx) => {
  try {
    const { author, text } = ctx.request.body;
    const message = { author, text };
    const response = await messagesService.addMessage(message);
    ctx.body = response;
  } catch (error) {
    errorLogger.error(error);
    consoleLogger.error(error);
    ctx.status = error.status || 500;
    ctx.body = {
      status: error.status || 500,
      error: error.message,
    };
  }
}

messagesController.deleteMessage = async (ctx) => {
  try {
    const { id } = ctx.params;
    const response = await messagesService.deleteMessage(id);
    ctx.body = response;
  } catch (error) {
    errorLogger.error(error);
    consoleLogger.error(error);
    ctx.status = error.status || 500;
    ctx.body = {
      status: error.status || 500,
      error: error.message,
    };
  }
}

export default messagesController;
