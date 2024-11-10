const models = require("../models");

// Pour creer un produit il faut commencer par le prix, ensuite le produit et ajouter la traduction
const add = (req, res) => {
    const { price, product, translations } = req.body;
   
    models.price.insert(price)
        .then(([priceResult]) => {
            const prix_id = priceResult.insertId;
            return models.products.insert({ ...product, prix_id });
        })
        .then(([productResult]) => {
            const produit_id = productResult.insertId;
            const translationPromises = translations.map((translation) =>
                models.productTranslation.insert({ ...translation, produit_id })
            );
            return Promise.all(translationPromises);
        })
        .then(() => {
            res.status(201).send({ message: "Produit et traductions créés avec succès" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({ error: "Erreur lors de la création du produit" });
        });
};

module.exports = { add };
