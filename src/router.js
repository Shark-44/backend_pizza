const express = require("express")

const router = express.Router()

const productsControllers = require('./controllers/productsControllers');



router.get("/products/", productsControllers.browse)

module.exports = router