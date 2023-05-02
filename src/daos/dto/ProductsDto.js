export default class ProductsDto {
  constructor(id, product, timestamp) {
    this._id = id;
    this.nombre = product.nombre;
    this.precio = product.precio;
    this.foto = product.foto;
    this.timestamp = timestamp;
  }
}