const models = require("../models");

const login = (req, res) => {
  const { name, password } = req.body; 

  
  models.user
    .login(name, password) 
    .then(([user]) => {
      if (user[0] != null) {
        req.user = user[0];
        res.status(200).json(user[0]);
      } else {
        res.status(404).send("Utilisateur non trouvé");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des données");
    });
};

const logout = (req, res) => {
  res.sendStatus(200);
};

module.exports = {
  login,
  logout,
};
