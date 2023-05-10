import ProductsService from "../services/productsService.js";
import MessagesService from "../services/messagesService.js";
const productsService = new ProductsService();
const messagesService = new MessagesService();
export default class GraphqlController {
  static getProducts = async () => {
    return await productsService.getProducts();
  };

  static getProduct = async ({ id }) => {
    return await productsService.getProductById(id);
  };

  static createProduct = async ({ input }) => {
    return await productsService.addProduct(input);
  };

  static updateProduct = async ({ id, input }) => {
    return await productsService.updateProduct(id, input);
  };

  static deleteProduct = async ({ id }) => {
    return await productsService.deleteProduct(id);
  };

  static getMessages = async () => {
    return await messagesService.getMessages();
  };

  static sendMessage = async ({ input }) => {
    return await messagesService.addMessage(input);
  };

  static deleteMessage = async ({ id }) => {
    return await messagesService.deleteMessage(id);
  };
}
