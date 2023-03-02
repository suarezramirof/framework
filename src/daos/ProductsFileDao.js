import FileContainer from "../containers/FileContainer.js";

class ProductsFileDao extends FileContainer {
  constructor() {
    super("./DB/products.json");
  }
}

export default ProductsFileDao;