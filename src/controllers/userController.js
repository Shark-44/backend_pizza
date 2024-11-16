const models = require("../models");

const login = (req, res, next) => {
    const { name, password } = req.body;
  
    models.user
      .login(name)
      .then(([user]) => {
        
        if (user[0] != null) {
          const failedAttempts = user[0].failed_attempts;
          const lastFailedAttempt = new Date(user[0].last_failed_attempt);
          const now = new Date();
          // compteur de mauvaise connection a limite de 3 pendant 15 min
          if (failedAttempts >= 3 && (now - lastFailedAttempt) < 15 * 60 * 1000) {
            return res.status(403).send("Trop de tentatives échouées. Essayez plus tard.");
          }
  
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
  res.clearCookie("auth_token").clearCookie("userId").sendStatus(200);
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
