const models = require("../models")

const browse = (req, res) => {

  models.orders
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const createnumber = (req, res) => {
  const { numeroCommande, timestamp, statusCommande } = req.body;
  
  if (!numeroCommande || !timestamp || !statusCommande) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  models.orders
  .insert({ numeroCommande, timestamp, statusCommande })
  .then(([result]) => {
    res.json({ id: result.insertId, numeroCommande, timestamp, statusCommande });
  })
  .catch((err) => {
    console.error(err)
    res.sendStatus(500)
  })
}

module.exports = {
    browse, createnumber,
  }