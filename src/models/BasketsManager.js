const AbstractManager = require("./AbstractManager");

class BasketsManager extends AbstractManager {
  constructor() {
    super({ table: "produit_commande" });
  }
  insert(basket) {
    return this.database.query(
      `insert into ${this.table} (produit_id, commande_id, quantiteCommande) values (?,?,?)`,
      [
        basket.produit_id,
        basket.commande_id,
        basket.quantiteCommande,
      ]
    )
  }
  update(basket) {
    return this.database.query(
        `UPDATE ${this.table} SET quantiteCommande = ? WHERE produit_id = ? AND commande_id = ?`,
      [
        basket.produit_id,
        basket.commande_id,
        basket.quantiteCommande,
      ]
    )
  }

}

module.exports = BasketsManager;