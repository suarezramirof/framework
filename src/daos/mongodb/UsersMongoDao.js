import MongoDao from "./mongoDao.js";
import UsersSchema from "../../models/mongoose/usersSchema.js";

class UsersMongoDao extends MongoDao {
  constructor() {
    super("usuarios", UsersSchema);
  }
}

export default UsersMongoDao;
