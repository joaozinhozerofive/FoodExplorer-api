const {Router} = require("express")
const ordersAdminRoutes = Router(); 


const OrdersAdminController = require("../Controllers/OrdersAdminController")
const ordersAdminController = new OrdersAdminController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")








ordersAdminRoutes.get("/",ensureAuthenticated, ordersAdminController.index)
ordersAdminRoutes.patch("/:order_id",ensureAuthenticated, ordersAdminController.update)



module.exports = ordersAdminRoutes;