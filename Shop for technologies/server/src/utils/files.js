const cloudinary = require("cloudinary").v2;

async function checkFileExists(fileId) {
	try {
	    const file=await cloudinary.api.resource(fileId);
		return true;
	} catch (err) {
		return false;
	}
}

module.exports = {
    checkFileExists,
};