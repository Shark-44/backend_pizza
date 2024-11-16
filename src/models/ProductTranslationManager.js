const AbstractManager = require("./AbstractManager");

class ProductTranslationManager extends AbstractManager {
  constructor() {
    super({ table: "product_translations" });
  }
  insert(translation) {
    return this.database.query(
      `insert into ${this.table} (produit_id, language_code, nomProduit, descriptionProduit) values (?,?,?,?)`,
      [
        translation.produitId,
        translation.language_code,
        translation.nomProduit,
        translation.descriptionProduit,
      ]
    )
  }
}
module.exports = ProductTranslationManager;