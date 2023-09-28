const {Router} = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")
const platesRoutes = Router();

const PlatesController = require("../Controllers/PlatesController")
const PlatesImgController = require("../Controllers/PlatesImgController")

const upload = multer(uploadConfig.MULTER)


const platesController = new PlatesController(); 
const platesImgController = new PlatesImgController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

platesRoutes.use(ensureAuthenticated)

platesRoutes.post("/", upload.single("plateImg"), platesController.create);
platesRoutes.get("/:plate_id", platesController.show);
platesRoutes.get("/", platesController.index);
platesRoutes.delete("/:plate_id", platesController.delete);
platesRoutes.put("/:plate_id", platesController.update);
platesRoutes.patch("/imgPlates/:plate_id", upload.single("plateImg"),  platesImgController.update);


module.exports = platesRoutes;