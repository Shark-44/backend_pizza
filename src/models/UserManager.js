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
  resetFailedAttempts(userId) {
    return this.database.query(
      `UPDATE ${this.table} SET failed_attempts = 0 WHERE iduser = ?`,
      [userId]
    );
  }
  incrementFailedAttempts(userId) {
    console.log("j'entre ici");
    return this.database.query(
      `UPDATE ${this.table} SET failed_attempts = failed_attempts + 1, last_failed_attempt = NOW() WHERE iduser = ?`,
      [userId]
    );
  }
  
}

module.exports = UserManager;