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
}
module.exports = PriceManager;