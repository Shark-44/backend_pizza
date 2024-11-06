const models = require("../models")

const browse = (req, res) => {
  const { language } = req;
  models.types
    .findAll(language)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send({ error: 'Internal Server Error' });
    })
}
module.exports = {
    browse,
  }