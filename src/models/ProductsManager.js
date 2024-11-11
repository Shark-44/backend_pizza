const AbstractManager = require("./AbstractManager");

class ProductsManager extends AbstractManager {
  constructor() {
    super({ table: "produit" });
  }

  findAll( language ) {
    return this.database.query(`
      SELECT 
        p.photoProduit, 
        p.carte, 
        p.type_id, 
        p.prix_id, 
        pt.nomproduit, 
        pt.descriptionProduit 
      FROM ${this.table} p
      LEFT JOIN product_translations pt
      ON p.id = pt.produit_id 
      AND pt.language_code = ?`,
      [language]
    );
  }

  findAllprice( language ) {
  
    return this.database.query(`
      SELECT 
        p.id,
        pt.nomproduit,
        pt.descriptionProduit,
        p.photoProduit,
        p.carte,
        p.type_id,
        px.nouveauPrix 
      FROM ${this.table} p
      LEFT JOIN prix px 
      ON p.prix_id = px.id
      LEFT JOIN product_translations pt
      ON p.id = pt.produit_id 
      AND pt.language_code = ?`,
      [language]
    );
  }

  bytype(id, language) {
    return this.database.query(`
      SELECT 
        p.id,
        pt.nomproduit,
        pt.descriptionProduit,
        p.photoProduit,
        p.carte,
        px.nouveauPrix 
      FROM ${this.table} p
      LEFT JOIN prix px 
      ON p.prix_id = px.id 
      LEFT JOIN product_translations pt
      ON p.id = pt.produit_id 
      WHERE p.type_id = ?
      AND pt.language_code = ?`,
      [id, language]
    );
  }
  findbyid(id, language) {
    return this.database.query(`
      SELECT
        p.id,
        pt.nomproduit,
        pt.descriptionProduit,
        p.photoProduit,
        p.carte,
        px.nouveauPrix
      FROM ${this.table} p
      LEFT JOIN product_translations pt
      ON p.id = pt.produit_id
      LEFT JOIN prix px 
      ON p.prix_id = px.id
      WHERE p.id = ?
      AND pt.language_code = ?`,
      [id, language]
    );
}
  insert(product) {
    return this.database.query(
      `insert into ${this.table} (photoProduit, carte, type_id, prix_id) values (?,?,?,?)`,
      [
        product.photoProduit,
        product.carte,
        product.type_id,
        product.prix_id
      ]
    )
  }
  updateprice_id(prix_id, produit_id) {
    return this.database.query(
      `UPDATE ${this.table} SET prix_id = ? WHERE id = ?`,
      [
        prix_id, produit_id
      ]
    )
  }
}

module.exports = ProductsManager;
