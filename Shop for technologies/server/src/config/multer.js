const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "images/");
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		const name = path.basename(file.originalname, ext);
		const random = Math.floor(Math.random() * 1000000); // случайно число
		cb(null, `${name}-${random}${ext}`);
	},
});
const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		if (
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpg"
		) {
			cb(null, true);
		} else {
			cb(new Error("Невалиден тип на файла!"), false);
		}
	},
});
module.exports = upload;
