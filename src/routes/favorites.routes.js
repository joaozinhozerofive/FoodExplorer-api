const {Router} = require("express")
const favoritesRoutes = Router(); 


const FavoritesController = require("../Controllers/FavoritesController")
const favoritesController = new FavoritesController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")








favoritesRoutes.post("/:plate_id",ensureAuthenticated, favoritesController.create)
favoritesRoutes.get("/",ensureAuthenticated, favoritesController.index)
favoritesRoutes.delete("/:plate_id",ensureAuthenticated, favoritesController.delete)


module.exports = favoritesRoutes;