import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
  author: {
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: {type: String, required: true},
    edad: {type: Number, required: false},
    alias: {type: String, required: false},
    avatar: {type: String, required: false},
  },
  text: {type: String, required: true},
  date: {type: String, required: true}
});

export default MessagesSchema;