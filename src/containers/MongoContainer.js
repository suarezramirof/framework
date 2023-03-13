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
}

export default MongoContainer;
