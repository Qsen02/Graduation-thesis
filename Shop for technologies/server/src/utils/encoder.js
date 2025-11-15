function encodeEmail(email) {
	return Buffer.from(email.join("\n"))
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

function encodeEmailSubject(subject) {
	return "Subject: =?UTF-8?B?" + Buffer.from(subject).toString("base64") + "?=";
}

module.exports = {
    encodeEmail,
    encodeEmailSubject,
};
