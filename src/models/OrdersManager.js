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
}


module.exports = OrdersManager;