const models = require("../models")

const browse = (req, res) => {

  models.baskets
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const add = (req, res) => {
    const {produitId, commandeId, quantiteCommande} = req.body

    if (!produitId|| !commandeId || !quantiteCommande) {
      return res.status(400).json({ error: "Données manquantes" });
    }
   
    models.baskets
    .insert({produitId, commandeId, quantiteCommande})
    .then(([result]) => {
      res.json({ produitId, commandeId, quantiteCommande });
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const upQuantite = (req, res) => {
    const basket = req.body

    models.baskets
      .update(basket)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(400)
        } else {
          res.sendStatus(200)
        }
      })
      .catch((err) => {
        console.error(err)
        res.sendStatus(500)
      })
  }

  const delbasket = (req, res) => {
    const basket = req.body;
  
    models.baskets
    .destroy(basket)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
  }
module.exports = {
    browse, add, upQuantite, delbasket,

  }