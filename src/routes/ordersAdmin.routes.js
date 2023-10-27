const {Router} = require("express")
const ordersAdminRoutes = Router(); 


const OrdersAdminController = require("../Controllers/OrdersController")
const ordersAdminController = new OrdersAdminController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")








ordersAdminRoutes.get("/",ensureAuthenticated, ordersAdminController.index)



module.exports = ordersAdminRoutes;