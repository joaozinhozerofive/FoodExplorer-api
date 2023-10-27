const {Router} = require("express")
const ordersRoutes = Router(); 


const OrdersController = require("../Controllers/OrdersController")
const ordersController = new OrdersController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")








ordersRoutes.post("/",ensureAuthenticated, ordersController.create)
ordersRoutes.get("/",ensureAuthenticated, ordersController.index)



module.exports = ordersRoutes;