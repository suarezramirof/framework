import express from "express";
import productsController from "../controllers/productsController.js";

const productsRouter = express.Router();
productsRouter.get("/productos", productsController.getProducts);
productsRouter.post("/productos", productsController.addProduct);
productsRouter.put("/productos/:id", productsController.updateProduct);
productsRouter.delete("/productos/:id", productsController.deleteProduct);

export default productsRouter;