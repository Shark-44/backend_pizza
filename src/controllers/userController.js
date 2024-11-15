const models = require("../models");

const login = (req, res, next) => {
    const { name, password } = req.body;
  
    models.user
      .login(name)
      .then(([user]) => {
        
        if (user[0] != null) {
          req.user = user[0];  
          next();               
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
  res .clearCookie("auth_token","userId").sendStatus(200);
};
const createuser = (req, res) => {
    const user = req.body
    user.password = req.body.hashedPassword
     
    models.user
      .insert(user)
      .then(([result]) => {
        res.json(result.insertId)
      })
      .catch((err) => {
        console.error("Error in createuser controller:", err);
        res.sendStatus(500)
      })
  }
module.exports = {
  login,
  logout,
  createuser,
};
