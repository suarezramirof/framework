import MongoContainer from "../containers/MongoContainer.js";

class ProductsMongoDao extends MongoContainer {
    constructor() {
        super("products", ProductsSchema)
    }
}

export default ProductsMongoDao;