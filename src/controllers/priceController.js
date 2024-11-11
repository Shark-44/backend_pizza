const models = require("../models");

// Pour créer un produit avec le prix et les traductions
const add = (req, res) => {
    const { price, product, translations } = req.body;

    // 1. Insérer le prix
    models.price.insert(price)
        .then(([priceResult]) => {
            const prix_id = priceResult.insertId;

            // 2. Créer le produit avec prix_id
            return models.products.insert({ ...product, prix_id }).then(([productResult]) => {
                const produit_id = productResult.insertId;

                // 3. Mise à jour du produit_id dans la table prix
                return models.price.updateProduitId(prix_id, produit_id).then(() => produit_id);
            });
        })
        .then((produit_id) => {
            // 4. Ajouter les traductions pour le produit créé
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
// Mise a jour du prix d'un produit
const updatebyproduct = (req, res) => {
    const { dateprix, ancienPrix, nouveauPrix, produit_id } = req.body;
    models.price
    .insertforproduct({ dateprix, ancienPrix, nouveauPrix, produit_id })
    .then(([priceResult]) => {
        const prix_id = priceResult.insertId;
        return models.products.updateprice_id(prix_id, produit_id);
    })
    .then(() => {
        res.status(200).send({ message: "Mise a jour du prix pour un produit effectué" });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send({ error: "Erreur lors de la mise a jour du prix" });
    });
}
module.exports = { add, updatebyproduct };

