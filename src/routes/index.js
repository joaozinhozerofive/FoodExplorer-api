const {Router} =  require("express");

const userRoutes = require("./users.routes");
const sessionRoutes = require("./Sessions.routes");
const platesRoutes = require("./Plates.routes");
const tagsRoutes = require("./tags.routes");
const favoritesRoutes = require("./favorites.routes")

const routes = Router();



routes.use("/users",  userRoutes);
routes.use("/sessions",  sessionRoutes);
routes.use("/plates", platesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/favorites", favoritesRoutes)

module.exports = routes;
