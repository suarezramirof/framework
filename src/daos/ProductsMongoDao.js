import MongoContainer from "../containers/MongoContainer.js";
import ProductsSchema from "../models/ProductsSchema.js";
class ProductsMongoDao extends MongoContainer {
    constructor() {
        super("products", ProductsSchema)
    }
}

export default ProductsMongoDao;