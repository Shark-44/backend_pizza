const AbstractManager = require("./AbstractManager");

class BasketsManager extends AbstractManager {
  constructor() {
    super({ table: "produit_commande" });
  }
  insert(basket) {
    return this.database.query(
      `insert into ${this.table} (produit_id, commande_id, quantiteCommande) values (?,?,?)`,
      [
        basket.produitId,
        basket.commandeId,
        basket.quantiteCommande,
      ]
    )
  }
  update(basket) {
    return this.database.query(
        `UPDATE ${this.table} SET quantiteCommande = ? WHERE produit_id = ? AND commande_id = ?`,
      [
        basket.quantiteCommande,  
        basket.produitId,        
        basket.commandeId,      
      ]
    );
  }
  destroy(basket) {
    return this.database.query(
      `DELETE FROM ${this.table}  WHERE produit_id = ? AND commande_id = ?`,
      [
        basket.produitId,        
        basket.commandeId,      
      ]
    )
  }
}

module.exports = BasketsManager;