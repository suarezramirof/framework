import { faker } from "@faker-js/faker";

const get = () => ({
  nombre: faker.commerce.productName(),
  precio: parseInt(faker.commerce.price()),
  foto: faker.image.imageUrl(null, null, null, true)
});

export default get;