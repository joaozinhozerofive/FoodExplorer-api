const {Router} = require("express")
const favoritesRoutes = Router(); 


const FavoritesController = require("../Controllers/FavoritesController")
const favoritesController = new FavoritesController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")








favoritesRoutes.post("/",ensureAuthenticated, favoritesController.create)


module.exports = favoritesRoutes;