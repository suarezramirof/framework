import keys from "./ws_keys.js";

export function start(io) {
  io.on("connection", (socket) => {
    console.log(`Nuevo cliente conectado en socket: ${socket.id}`);
    socket.on(keys.cargarProducto, () => socket.emit(keys.nuevoProducto));
    socket.on(keys.enviarMensaje, () => socket.emit(keys.nuevoMensaje));
  });
}