import messagesController from "../controllers/messagesController.js";
import productsController from "../controllers/productsController.js";
import keys from "./ws_keys.js";

export function start(io) {
  io.on("connection", (socket) => {
    console.log(`Nuevo cliente conectado en socket: ${socket.id}`);
    messagesController.viewMessages(socket);
    socket.emit(keys.nuevoProducto);
    socket.on(keys.cargarProducto, (prod) => {
      productsController.addProductSocket(prod, io);
    });
    socket.on(keys.enviarMensaje, () =>
      socket.emit(keys.nuevoMensaje)
    );
  });
}