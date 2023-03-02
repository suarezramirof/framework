import FileContainer from "../containers/FileContainer.js";

class MessagesFileDao extends FileContainer {
  constructor() {
    super("./DB/messages.json");
  }
}

export default MessagesFileDao;