import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  foto: { type: String, required: true },
  precio: {type: Number, required: true}
});

export default ProductsSchema;