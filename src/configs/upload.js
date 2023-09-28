const multer = require("multer");
const crypto = require("crypto");
const path = require("path");




const TMP_FOLDER = path.resolve(__dirname, "..", "..", "TMP"); 
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");


const MULTER = {
    storage : multer.diskStorage({
    
        destination: TMP_FOLDER, 
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }

    })
}



module.exports = {
    MULTER, 
    TMP_FOLDER, 
    UPLOADS_FOLDER
}


