const dotenv = require("dotenv");
dotenv.config();
const { google } = require("googleapis");
const { encodeEmail, encodeEmailSubject } = require("../utils/encoder");

const oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://mail.google.com/"]
});

oauth2Client.setCredentials({
	refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

async function registrationEmail(username, email) {
	const subject =
		"Добре дошли! Вие направихте успешна регистрация в Shop for technologies";
	const encodedSubject = encodeEmailSubject(subject);
	const mailOptions = [
		`From: ${process.env.GMAIL_USER}`,
		`To: ${email}`,
		encodedSubject,
		"",
		`Здравейте ${username},\n\nБлагодарим ви, че се регистрирахте в Shop for technologies! Радваме се, че сте с нас.\n\nС най-добри пожелания,\nЕкипът на Shop for technologies.`,
	];
	try {
		const mail = encodeEmail(mailOptions);
		await gmail.users.messages.send({
			userId: "me",
			requestBody: {
				raw: mail,
			},
		});
	} catch (err) {
		throw new Error("Email sending failed");
	}
}

async function orderEmail(username, email, totalPrice) {
	const subject =
		"Успешна поръчка в Shop for technologies!";
	const encodedSubject = encodeEmailSubject(subject);
	const mailOptions = [
		`From: ${process.env.GMAIL_USER}`,
		`To: ${email}`,
		encodedSubject,
		"",
		`Здравейте ${username},\n\nБлагодарим ви, че направихте поръчка в Shop for technologies! Радваме се, че сте с нас.\n\nОбщата стойност на поръчката ви е: ${totalPrice}лв\n\nС най-добри пожелания,\nЕкипът на Shop for technologies.`,
	];
	try {
		const mail = encodeEmail(mailOptions);
		await gmail.users.messages.send({
			userId: "me",
			requestBody: {
				raw: mail,
			},
		});
	} catch (err) {
		throw new Error(err.messages);
	}
}

module.exports = {
	registrationEmail,
	orderEmail,
};
