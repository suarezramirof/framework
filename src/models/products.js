import Joi from "joi";

export default class Products {
  constructor(nombre, precio, foto) {
    this.nombre = nombre;
    this.precio = precio;
    this.foto = foto;
  }

  static validate(product, required) {
    const schema = Joi.object({
      nombre: required ? Joi.string().required() : Joi.string(),
      precio: required ? Joi.number().required() : Joi.number(),
      foto: required ? Joi.string().required() : Joi.string(),
    });

    const { error } = schema.validate(product);
    if (error) {
      throw error;
    }
  }
}
