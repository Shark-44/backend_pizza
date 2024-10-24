const AbstractManager = require("./AbstractManager");

class BasketsManager extends AbstractManager {
  constructor() {
    super({ table: "produit_commande" });
  }


}

module.exports = BasketsManager;