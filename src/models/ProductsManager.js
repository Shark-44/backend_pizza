const AbstractManager = require("./AbstractManager")

class ProductsManager extends AbstractManager {
    constructor() {
        super({ table: "produit" })
      }
}
module.exports = ProductsManager