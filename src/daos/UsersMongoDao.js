import MongoDao from "./MongoDao.js";
import UsersSchema from "../models/UsersSchema.js";

class UsersMongoDao extends MongoDao {
  constructor() {
    super("usuarios", UsersSchema);
  }
}

export default UsersMongoDao;
