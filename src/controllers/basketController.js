const models = require("../models")

const browse = (req, res) => {

  models.basket
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
    const basket = req.body
   
    models.basket
    .insert(basket)
    .then(([result]) => {
      return models.basket.find(result.insertId);  
    })
    .then(([rows]) => {
      res.status(201).json(rows[0]); 
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const edit = (req, res) => {
    const basket = req.body
 
    models.basket
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
    browse, add, edit,

  }