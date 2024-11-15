const AbstractManager = require("./AbstractManager");

class PriceManager extends AbstractManager {
  constructor() {
    super({ table: "prix" });
  }
  insert(price) {
    return this.database.query(
        `insert into ${this.table} (dateprix, ancienPrix, nouveauPrix) values (?,?,?)`,
        [
            price.dateprix,
            price.ancienPrix,
            price.nouveauPrix,
        ]
      )
  }
  insertforproduct(price) {
    return this.database.query(
        `insert into ${this.table} (dateprix, ancienPrix, nouveauPrix, produit_id) values (?,?,?,?)`,
        [
            price.dateprix,
            price.ancienPrix,
            price.nouveauPrix,
            price.produitId
        ]
      )
  }
  updateProduitId(prixId, produitId) {
    return this.database.query(
      `UPDATE ${this.table} SET produit_id = ? WHERE id = ?`,
      [produitId, prixId]  
    );
  }
}
module.exports = PriceManager;