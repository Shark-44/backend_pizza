const express = require("express")
const multer = require("multer")

const router = express.Router()

const checkLanguage = require("./middlewares/languageMiddleware");
const { hashPassword, verifyPassword, checkToken } = require("./middlewares/auth")

const upload = multer({ dest: "./public/assets/images" })

const productsController = require('./controllers/productsController');
const typesController = require('./controllers/typesController');
const ordersController = require('./controllers/ordersController');
const basketController = require('./controllers/basketController');
const userController = require('./controllers/userController')
const priceController = require('./controllers/priceController')
const uploadController = require("./controllers/uploadController")

router.get("/test", (req, res) => {
    res.json({ message: "Test route working" });
  });
router.get("/products/", checkLanguage, productsController.browse)
router.get("/productswithprice/", checkLanguage, productsController.withprice)
router.get("/products/:id", checkLanguage, productsController.read)
router.get("/productsbytype/", checkLanguage, productsController.allbytype)
router.get("/types/", checkLanguage, typesController.browse)
router.get("/orders/", checkLanguage, ordersController.browse)
router.get("/ordersforhistory/",checkToken, checkLanguage, ordersController.browsehistory)
router.get("/orders/:id", checkLanguage, ordersController.fullorder)
router.put("/orders/:id", ordersController.finalorder)
router.post("/orders/", ordersController.createnumber)
router.get("/basket/", basketController.browse)
router.post("/basket/", basketController.add)
router.put("/basket/", basketController.upQuantite)
router.delete("/basket/", basketController.delbasket)
router.post("/connexion/", userController.login, verifyPassword)
router.get("/connexion/", userController.logout)
router.post("/admin-user/",checkToken,hashPassword, userController.createuser)
router.post("/createproduct/",checkToken, priceController.add)
router.post("/updateprice/",checkToken, priceController.updatebyproduct)
router.post("/upload/:dossier",upload.single("myfile"),uploadController.uploadavecdossier)

module.exports = router