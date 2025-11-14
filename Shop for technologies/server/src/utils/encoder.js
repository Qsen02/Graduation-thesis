function encodeEmail(email) {
	return Buffer.from(email.join("\n"))
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

module.exports = {
    encodeEmail,
};
