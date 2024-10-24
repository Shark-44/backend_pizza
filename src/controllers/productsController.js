const models = require("../models")

const browse = (req, res) => {

  models.products
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const allbytype = (req, res) => {
  const id = req.query.id
  models.products
    .bytype(id)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
module.exports = {
    browse, allbytype,
  }