const {Router} = require("express")
const usersRoutes = Router(); 


const UsersContoller = require("../Controllers/UsersContoller")
const usersController = new UsersContoller();








usersRoutes.post("/", usersController.create)


module.exports = usersRoutes