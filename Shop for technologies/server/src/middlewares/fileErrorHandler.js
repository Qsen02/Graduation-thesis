const multer = require("multer");

function checkFileUpload(){
    return function (err, req, res, next) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message});
        }
        next();
    };
}
module.exports = {
    checkFileUpload,
};