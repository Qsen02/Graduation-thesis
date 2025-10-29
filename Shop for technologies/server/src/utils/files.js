const fs = require("fs/promises");
const path = require("path");

async function checkFileExists(filePath) {
	const file = path.join(__dirname, "../../", filePath);
	try {
		await fs.access(file);
		return true;
	} catch (err) {
		return false;
	}
}

module.exports = {
    checkFileExists,
};