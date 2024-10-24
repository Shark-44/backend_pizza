const AbstractManager = require("./AbstractManager");

class OrdersManager extends AbstractManager {
  constructor() {
    super({ table: "commande" });
  }
}


module.exports = OrdersManager;