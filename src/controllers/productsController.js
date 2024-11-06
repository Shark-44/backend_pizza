const models = require("../models")

const browse = (req, res) => {
  const { language } = req;
  models.products
    .findAll( language )
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send({ error: 'Internal Server Error' });
    })
}

const withprice = (req, res) => {
  const { language } = req;

  models.products
    .findAllprice(language)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500).send({ error: 'Internal Server Error' });
    })
}


const allbytype = (req, res) => {
  const id = req.query.id
  const { language } = req;

  models.products
    .bytype(id, language)
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const read = (req, res) => {
  const id = req.params.id;  
  const { language } = req;

  models.products
    .findbyid(id, language)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);  
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
    browse, allbytype, read, withprice,
  }