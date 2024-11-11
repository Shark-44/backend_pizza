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
            price.produit_id
        ]
      )
  }
  updateProduitId(prix_id, produit_id) {
    return this.database.query(
      `UPDATE ${this.table} SET produit_id = ? WHERE id = ?`,
      [produit_id, prix_id]  
    );
  }
}
module.exports = PriceManager;