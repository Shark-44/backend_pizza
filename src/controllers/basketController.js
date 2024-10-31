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
    const {produit_id, commande_id, quantiteCommande} = req.body

    if (!produit_id|| !commande_id || !quantiteCommande) {
      return res.status(400).json({ error: "Données manquantes" });
    }
   
    models.baskets
    .insert({produit_id, commande_id, quantiteCommande})
    .then(([result]) => {
      res.json({ produit_id, commande_id, quantiteCommande });
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const upQuantite = (req, res) => {
    const basket = req.body
 console.log(basket)
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
module.exports = {
    browse, add, upQuantite,

  }