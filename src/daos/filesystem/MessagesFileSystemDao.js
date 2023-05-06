import FileSystemDao from "./fileSystemDao.js";
import MessagesDto from "../dto/messagesDto.js";
import PinoLogger from "../../utils/logger.js";
import fs from "fs/promises";

const errorLogger = PinoLogger.buildErrorLogger();
const infoLogger = PinoLogger.buildConsoleLogger();

let instance = null;

export default class MessagesFileSystemDao extends FileSystemDao {
  constructor() {
    super("messages.json");
  }

  static getInstance() {
    if (!instance) {
      instance = new MessagesFileSystemDao();
    }
    return instance;
  }

  async add(message) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      console.log(data);
      const json = JSON.parse(data);
      const id = this.getNext_Id(json);
      const date = Date.now();
      const itemDto = new MessagesDto(id, message, date);
      json.push(itemDto);
      infoLogger.info(`Message from ${itemDto.author.id} sent`);
      await fs.writeFile(this.path, JSON.stringify(json));
      return itemDto;
    } catch (error) {
      errorLogger.error(error);
    }
  }
}
