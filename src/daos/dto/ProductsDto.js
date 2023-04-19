export default class ProductsDto {
  constructor(product) {
    this.id = product._id;
    this.nombre = product.nombre;
    this.precio = product.precio;
    this.foto = product.foto;
  }
}