import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Product {
        id: ID!
        nombre: String
        precio: Int
        foto:  String
    }
    type Author {
        id: String
        nombre: String
        apellido: String
        edad: Int
        alias: String
        avatar: String
    }
    type Message {
        id: ID!
        author: Author
        text: String
    }
    input ProductInput {
        nombre: String
        precio: Int
        foto:  String
    }
    input AuthorInput {
        id: String
        nombre: String
        apellido: String
        edad: Int
        alias: String
        avatar: String
    }
    input MessageInput {
        author: AuthorInput
        text: String
    }
    type Query {
        getProduct(id: ID!): Product
        getProducts: [Product]
        getMessages: [Message]
        }
    type Mutation {
        createProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!): Product
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
        deleteMessage(id: ID!): Message
    }
`);

export default schema;
