const AbstractManager = require("./AbstractManager");

class ProductsManager extends AbstractManager {
  constructor() {
    super({ table: "produit" });
  }

  findAllprice() {
    return this.database.query(
      `SELECT 
      produit.id,
      produit.nomproduit,
      produit.descriptionProduit,
      produit.photoProduit,
      produit.carte,
      prix.nouveauPrix 
      FROM 
      ${this.table}
      LEFT JOIN 
          prix ON produit.prix_id = prix.id; `
    )
  }
  bytype(id) {
    return this.database.query(
      `SELECT 
      produit.id,
      produit.nomproduit,
      produit.descriptionProduit,
      produit.photoProduit,
      produit.carte,
      prix.nouveauPrix 
      FROM 
      ${this.table}
      LEFT JOIN 
          prix ON produit.prix_id = prix.id 
      WHERE produit.type_id = ?`,
      [id]
    );
  }
}

module.exports = ProductsManager;
