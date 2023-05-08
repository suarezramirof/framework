import {faker}  from '@faker-js/faker';

const get = () => ({
    author: {
        id: faker.internet.email(),
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: faker.datatype.number(),
        alias: faker.internet.userName(),
        avatar: faker.image.avatar(),
    },
    text: faker.lorem.paragraph(),
})

export default get;