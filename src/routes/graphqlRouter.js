import { Router } from "express";
const graphqlRouter = Router();
import { graphqlHTTP } from "express-graphql";
import schema from "../graphQL/graphql.js";
import GraphqlController from "../controllers/graphqlController.js";
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMessages,
  sendMessage,
  deleteMessage,
} = GraphqlController;

graphqlRouter.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProducts,
      getProduct,
      createProduct,
      updateProduct,
      deleteProduct,
      getMessages,
      sendMessage,
      deleteMessage
    },
    graphiql: true,
  })
);

export default graphqlRouter;
