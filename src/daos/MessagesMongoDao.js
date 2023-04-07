import MongoDao from "./MongoDao.js";
import MessagesSchema from "../models/MessagesSchema.js";
class MessagesMongoDao extends MongoDao {
    constructor() {
        super("messages", MessagesSchema)
    }
}

export default MessagesMongoDao;