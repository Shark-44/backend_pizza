const AbstractManager = require("./AbstractManager")

class TypesManager extends AbstractManager {
  constructor() {
      super({ table: "type" })
    }
  findAll( language ) {
    return this.database.query(`
    SELECT t.id, tt.nomtype
    FROM ${this.table} t
    LEFT JOIN type_translations tt
    ON t.id = tt.type_id
    WHERE tt.language_code = ?`,
    [language]
    );
  }
}
module.exports = TypesManager