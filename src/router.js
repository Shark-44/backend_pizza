const express = require("express")

const router = express.Router()

const productsController = require('./controllers/productsController');
const typesController = require('./controllers/typesController');
const ordersController = require('./controllers/ordersController');
const basketController = require('./controllers/basketController');

router.get("/test", (req, res) => {
    res.json({ message: "Test route working" });
  });
router.get("/products/", productsController.browse)
router.get("/products/bytype/", productsController.allbytype)
router.get("/types/", typesController.browse)
router.get("/orders/", ordersController.browse)
router.get("/basket/", basketController.browse)
router.post("/basket/", basketController.add)
router.put("/basket/", basketController.edit)

module.exports = router