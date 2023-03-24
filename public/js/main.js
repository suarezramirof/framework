const socket = io.connect();
const keys = {
  productos: "productos",
  nuevoProducto: "nuevoProducto",
  cargarProducto: "cargarProducto",
  mensajes: "mensajes",
  nuevoMensaje: "nuevoMensaje",
  enviarMensaje: "enviarMensaje",
};

let ruta = "";
if (route == "LOCAL") {
  ruta = "http://localhost:8080/";
} else if (route == "RAILWAY") {
  ruta = "https://process-production.up.railway.app/";
}

// // Normalizr

// const schema = normalizr.schema;
// const user = new schema.Entity("author");
// const schemaMessages = new schema.Entity("messages", { author: user });

// // Funciones

// function denormalize(normalizedData) {
//   const data = normalizr.denormalize(
//     normalizedData.result,
//     [schemaMessages],
//     normalizedData.entities
//   );
//   const largoNormalizado = JSON.stringify(normalizedData).length;
//   const largoOriginal = JSON.stringify(data).length;
//   const compresion = Math.round((largoNormalizado / largoOriginal) * 100);
//   showCompresion(compresion);
//   console.log(data);
//   return data;
// }

// function showCompresion(compresion) {
//   document.getElementById(
//     "compresion"
//   ).innerText = `(Compresión: ${compresion}%)`;
// }

function enviarMensaje() {
  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();
  const mensaje = {
    author: {
      id: document.getElementById("mail").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("msj").value,
    date: fecha + " " + hora,
  };
  fetch(`${ruta}api/mensajes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mensaje),
  })
    .then((res) => res.json())
    .then((data) => {
      socket.emit(keys.enviarMensaje);
      console.log(data);
      return false;
    })
    .catch((error) => console.log(error));
  return false;
}

function updateProductos(datos) {
  fetch("views/partials/productos.hbs")
    .then((resp) => resp.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const filled = template(datos);
      document.getElementById("productos").innerHTML = filled;
    });
}

function cargarProducto(e) {
  const producto = {
    nombre: document.getElementById("title").value,
    precio: parseFloat(document.getElementById("price").value),
    foto: document.getElementById("thumbnail").value,
  };
  socket.emit(keys.cargarProducto, producto);
  document.getElementById("title").value = "";
  document.getElementById("price").value = "";
  document.getElementById("thumbnail").value = "";
  return false;
}

function updateMensajes(msjs) {
  fetch("views/partials/mensajes.hbs")
    .then((resp) => resp.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const filled = template(msjs);
      document.getElementById("mensajes").innerHTML = filled;
      let div = document.getElementById("mensajes");
      div.lastElementChild.scrollIntoView({ behavior: "smooth" });
    });
}

// WebSocket

socket.on(keys.nuevoProducto, () => {
  fetch(`${ruta}api/productos`)
    .then((res) => res.json())
    .then((data) => {
      updateProductos({ items: data });
    });
});

socket.on(keys.nuevoMensaje, () => {
  fetch(`${ruta}api/mensajes`)
    .then((res) => res.json())
    .then((data) => {
      // const messages = await denormalize(data);
      updateMensajes({ msjs: data });
    });
});

socket.on("error", ({ error, status }) => {
  alert(`Error: ${error}. Código: ${status}`);
});
