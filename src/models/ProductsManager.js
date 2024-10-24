const AbstractManager = require("./AbstractManager");

class ProductsManager extends AbstractManager {
  constructor() {
    super({ table: "produit" });
  }

  bytype(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE produit.type_id = ?`,
      [id]
    );
  }
}

module.exports = ProductsManager;
