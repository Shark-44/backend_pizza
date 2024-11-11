const AbstractManager = require("./AbstractManager");

class ProductTranslationManager extends AbstractManager {
  constructor() {
    super({ table: "product_translations" });
  }
  insert(translation) {
    return this.database.query(
      `insert into ${this.table} (produit_id, language_code, nomproduit, descriptionProduit) values (?,?,?,?)`,
      [
        translation.produit_id,
        translation.language_code,
        translation.nomproduit,
        translation.descriptionProduit,
      ]
    )
  }
}
module.exports = ProductTranslationManager;