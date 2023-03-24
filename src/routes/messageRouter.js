import express from "express";
import messagesController from "../controllers/messagesController.js";

const messageRouter = express.Router();
messageRouter.get("/mensajes", messagesController.getMessages);
messageRouter.post("/mensajes", messagesController.sendMessage);

export default messageRouter;