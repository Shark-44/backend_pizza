const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }
  login(name) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE name = ?` , [
      name, 
    ])
  }
  insert(user) {
    return this.database.query(
        `insert into ${this.table} (name, password) values (?, ?)`,
      [
        user.name, user.password, 
      ]
    )    
  }
}

module.exports = UserManager;