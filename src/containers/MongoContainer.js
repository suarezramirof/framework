import mongoose from "mongoose";
import { MongoAtlasUri } from "../config.js";
mongoose.set("strictQuery", true);
try {
  mongoose.connect(
    MongoAtlasUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Mongoose is connected")
  );
} catch (error) {
  console.log("Could not connect. Error: " + error);
}

class MongoContainer {
  constructor(type, schema) {
    this.items = mongoose.model(type, schema);
  }

  async get(id) {
    const item = await this.items.findById(id);
    return item;
  }

  async getAll() {
    const items = await this.items.find({});
    return items;
  }

  async add(item) {
    this.items.create(item);
  }
}

export default MongoContainer;
