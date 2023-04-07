import MongoDao from "./MongoDao.js";
import ProductsSchema from "../models/ProductsSchema.js";
class ProductsMongoDao extends MongoDao {
    constructor() {
        super("products", ProductsSchema)
    }
}

export default ProductsMongoDao;