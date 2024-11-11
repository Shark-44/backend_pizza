const models = require("../models")
const insert = (req, res) => {
    const translation = req.body
    models.productTranslation
        .insert(translation)
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
          });
}
module.exports = {
    insert,
  }