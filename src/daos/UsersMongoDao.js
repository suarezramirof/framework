import MongoContainer from "../containers/MongoContainer.js";
import UsersSchema from "../models/UsersSchema.js";

class UsersMongoDao extends MongoContainer {
  constructor() {
    super("usuarios", UsersSchema);
  }
}

export default UsersMongoDao;
