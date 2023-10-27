const {Router} =  require("express");

const userRoutes = require("./users.routes");
const sessionRoutes = require("./Sessions.routes");
const platesRoutes = require("./Plates.routes");
const tagsRoutes = require("./tags.routes");
const favoritesRoutes = require("./favorites.routes")
const ordersRoutes = require("./orders.routes")
const ordersAdminRoutes = require("./ordersAdmin.routes")

const routes = Router();



routes.use("/users",  userRoutes);
routes.use("/sessions",  sessionRoutes);
routes.use("/plates", platesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/favorites", favoritesRoutes)
routes.use("/orders", ordersRoutes)
routes.use("/orders/admin", ordersRoutes)


module.exports = routes;
