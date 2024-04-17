const multer = require("multer");
const storege = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req,file,cb) {
        cb(null, Date.now()+"-"+file.orginalname)
    }
});

const upload = multer({storege:storege});

module.exports = upload;