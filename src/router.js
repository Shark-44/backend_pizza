const express = require("express")

const router = express.Router()

const productsController = require('./controllers/productsController');
const typesController = require('./controllers/typesController');

router.get("/test", (req, res) => {
    res.json({ message: "Test route working" });
  });
router.get("/products/", productsController.browse)
router.get("/types/", typesController.browse)

module.exports = router