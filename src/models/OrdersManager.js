const AbstractManager = require("./AbstractManager");

class OrdersManager extends AbstractManager {
  constructor() {
    super({ table: "commande" });
  }

  insert(number) {
    return this.database.query(
      `INSERT INTO ${this.table} (numeroCommande, timestamp, statusCommande) VALUES (?, ?, ?)`,
      [number.numeroCommande, number.timestamp, number.statusCommande]
    );
  }

  async find(id, language) {
    try {
      const [rows] = await this.database.query(
        `SELECT
          c.id AS commande_id,
          c.numeroCommande,
          c.prixtotalCommande,
          c.timestamp,
          c.statusCommande,
          p.id AS produit_id,
          pt.nomProduit,  
          p.photoProduit, 
          pc.quantiteCommande,
          px.nouveauPrix AS prixUnitaire
        FROM commande c
        LEFT JOIN produit_commande pc ON c.id = pc.commande_id
        LEFT JOIN produit p ON pc.produit_id = p.id
        LEFT JOIN prix px ON p.prix_id = px.id
        LEFT JOIN product_translations pt ON p.id = pt.produit_id AND pt.language_code = ? 
        WHERE c.id = ?`,
        [language, id]
      );

      if (!rows || rows.length === 0) {
        return null;
      }

      const order = {
        numeroCommande: rows[0].numeroCommande,
        prixtotalCommande: parseFloat(rows[0].prixtotalCommande),
        timestamp: rows[0].timestamp,
        statusCommande: rows[0].statusCommande,
        produits: []
      };

      rows.forEach(row => {
        if (row.produit_id) {
          order.produits.push({
            produitId: row.produitId,
            nomProduit: row.nomProduit,
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

  update(order) {
    return this.database.query(
      `UPDATE ${this.table} SET prixtotalCommande = ?, statusCommande = ? WHERE id = ?`,
      [order.prixtotalCommande, order.statusCommande, order.id]
    );
  }

  async forhistory(language) {
    try {
      const [rows] = await this.database.query(
        `SELECT
          c.id,
          c.numeroCommande AS numero_commande,
          c.prixtotalCommande AS prix_total_commande,
          c.statusCommande AS status_commande,
          c.timestamp,
          pc.quantiteCommande AS quantite_commande,
          p.id AS produit_id,
          pt.nomproduit AS nom_produit,
          tt.nomtype AS nom_type
        FROM commande c
        LEFT JOIN produit_commande pc ON c.id = pc.commande_id
        LEFT JOIN produit p ON pc.produit_id = p.id
        LEFT JOIN product_translations pt ON p.id = pt.produit_id AND pt.language_code = ?
        LEFT JOIN type t ON t.id = p.type_id
        LEFT JOIN type_translations tt ON t.id = tt.type_id AND tt.language_code = ?
        ORDER BY c.timestamp DESC`, [language, language]
      );
  
      if (!rows || rows.length === 0) return [];
  
      const commandesParId = new Map();  // Utilisation de l'ID de commande comme clé principale
      const produitsARecuperer = [];
  
      // Étape 1: Organiser les commandes et produits tout en vérifiant les doublons
      for (const row of rows) {
        const commandeId = row.id;  // Utilisation de l'ID de commande pour éviter les doublons
  
        // Si la commande n'existe pas encore dans la Map, l'ajouter
        if (!commandesParId.has(commandeId)) {
          commandesParId.set(commandeId, {
            id: row.id,
            numeroCommande: row.numero_commande,
            prixtotalCommande: row.prix_total_commande,
            statusCommande: row.status_commande,
            timestamp: row.timestamp,
            products: [],
            count: 0  // Ajouter un compteur pour chaque commande
          });
        }
  
        // Incrémenter le compteur pour cette commande (si doublon, c'est une nouvelle entrée pour la même commande)
        const commande = commandesParId.get(commandeId);
        commande.count += 1;
  
        if (row.produit_id && row.quantite_commande > 0) {
          const produit = {
            produit_id: row.produit_id,
            quantiteCommande: parseInt(row.quantite_commande, 10),
            nomproduit: row.nom_produit,
            nomtype: row.nom_type
          };
  
          // Ajouter ce produit à la liste pour récupérer son prix plus tard
          produitsARecuperer.push({
            produit_id: row.produit_id,
            timestamp: row.timestamp,
            produit: produit
          });
  
          commande.products.push(produit);
        }
      }
  
      // Étape 2: Récupérer les prix pour chaque produit
      const prixPromises = produitsARecuperer.map(({ produit_id, timestamp, produit }) =>
        this.database.query(
          `SELECT nouveauPrix, produit_id, dateprix FROM prix WHERE produit_id = ? AND dateprix <= ? ORDER BY dateprix DESC LIMIT 1`,
          [produit_id, timestamp]
        ).then(([prixResult]) => {
          produit.nouveauPrix = prixResult.length > 0 && prixResult[0].nouveauPrix
            ? prixResult[0].nouveauPrix
            : "prix non disponible";
        })
      );
  
      // Attendre que tous les prix soient récupérés
      await Promise.all(prixPromises);
  
      // Étape 3: Formater les résultats avec les produits et leurs prix
      const resultat = Array.from(commandesParId.values()).map(commande => {
        // Définir le commandeKey comme étant le nombre d'ID distincts dans la commande
        const commandeKey = commande.count;  // Le nombre d'occurrences de l'ID de la commande dans les résultats
  
        return {
          
          id: commande.id,
          numeroCommande: commande.numeroCommande,
          prixtotalCommande: parseFloat(commande.prixtotalCommande || 0).toFixed(2),
          statusCommande: commande.statusCommande,
          timestamp: commande.timestamp,
          products: commande.products.map(product => ({
            produitId: product.produit_id,
            quantiteCommande: product.quantiteCommande,
            nouveauPrix: product.nouveauPrix,
            nomProduit: product.nomProduit,
            nomType: product.nomtype
          }))
        };
      });
  
      return resultat;
  
    } catch (error) {
      console.error('Erreur dans forhistory:', error);
      throw new Error("Erreur lors de la récupération de l'historique des commandes");
    }
  }
  
  

  
}

module.exports = OrdersManager;
