const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const utilities = require("../utilities/");

// All routes require login
router.get("/", utilities.checkLogin, utilities.handleErrors(favoritesController.viewFavorites));
router.post("/add", utilities.checkLogin, utilities.handleErrors(favoritesController.addToFavorites));
router.get("/remove/:favorite_id", utilities.checkLogin, utilities.handleErrors(favoritesController.removeFromFavorites));
module.exports = router;