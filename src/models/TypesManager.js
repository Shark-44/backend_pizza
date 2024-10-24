const AbstractManager = require("./AbstractManager")

class TypesManager extends AbstractManager {
    constructor() {
        super({ table: "type" })
      }
}
module.exports = TypesManager