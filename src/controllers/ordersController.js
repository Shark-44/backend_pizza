const models = require("../models")

const browse = (req, res) => {
  const { language } = req;

  models.orders
    .findAll(language)
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
const fullorder = async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req;

    const orderData = await models.orders.find(id, language);

    if (!orderData) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.json(orderData);
  } catch (error) {
    console.error("Erreur dans fullorder:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const finalorder = (req, res) => {
  const order = req.body;

  models.orders.update(order)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
    browse, createnumber, fullorder, finalorder,
  }