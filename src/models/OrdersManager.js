const AbstractManager = require("./AbstractManager");

class OrdersManager extends AbstractManager {
  constructor() {
    super({ table: "commande" });
  }
  insert(number) {
    return this.database.query(
      `insert into ${this.table} (numeroCommande, timestamp, statusCommande) values (?,?,?)`,
      [
        number.numeroCommande,
        number.timestamp,
        number.statusCommande,
      ]
    )
  }
  async find(id) {
    try {
      const [rows] = await this.database.query(
        `SELECT
          c.id AS commande_id,
          c.numeroCommande,
          c.prixtotalCommande,
          c.timestamp,
          c.statusCommande,
          p.id AS produit_id,
          p.nomproduit,
          p.photoProduit,
          pc.quantiteCommande,
          px.nouveauPrix AS prixUnitaire
        FROM commande c
        LEFT JOIN produit_commande pc ON c.id = pc.commande_id
        LEFT JOIN produit p ON pc.produit_id = p.id
        LEFT JOIN prix px ON p.prix_id = px.id
        WHERE c.id = ?`,
        [id]
      );

      if (!rows || rows.length === 0) {
        return null;
      }

      // Créer l'objet de base de la commande
      const order = {
        numeroCommande: rows[0].numeroCommande,
        prixtotalCommande: parseFloat(rows[0].prixtotalCommande),
        timestamp: rows[0].timestamp,
        statusCommande: rows[0].statusCommande,
        produits: []
      };

      // Ajouter chaque produit au tableau
      rows.forEach(row => {
        if (row.produit_id) {
          order.produits.push({
            produit_id: row.produit_id,
            nomproduit: row.nomproduit,
            photoProduit: row.photoProduit,
            quantiteCommande: parseInt(row.quantiteCommande, 10),
            prixUnitaire: parseFloat(row.prixUnitaire)
          });
        }
      });

      return order;

    } catch (error) {
      console.error("Erreur dans OrderManager.find:", error);
      throw error;
    }
  }
}


module.exports = OrdersManager;