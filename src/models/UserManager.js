const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }
  login(name, password) {
    console.log("manager", name, password)
    return this.database.query(`SELECT * FROM ${this.table} WHERE name = ? AND password = ?` , [
      name, password,
    ])
  }
}

module.exports = UserManager;