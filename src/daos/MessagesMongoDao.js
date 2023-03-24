import MongoContainer from "../containers/MongoContainer.js";
import MessagesSchema from "../models/MessagesSchema.js";
class MessagesMongoDao extends MongoContainer {
    constructor() {
        super("messages", MessagesSchema)
    }
}

export default MessagesMongoDao;