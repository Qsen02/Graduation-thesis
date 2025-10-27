const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const { google }=require("googleapis");

const oauth2Client= new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
	refresh_token:process.env.GOOGLE_REFRESH_TOKEN
});

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.GMAIL_USER,
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
	},
	tls:{
		rejectUnauthorized:false
	}
});

function registrationEmail(username,email) {
	const mailOptions = {
		from: process.env.GMAIL_USER,
		to: email,
		subject: "Добре дошли! Вие направихте успешна регистрация в Shop for technologies",
		text: `Здравейте ${username},\n\nБлагодарим ви, че се регистрирахте в Shop for technologies! Радваме се, че сте с нас.\n\nС най-добри пожелания,\nЕкипът на Shop for technologies.`,
		html: `<p>Здравейте ${username},</p><p>Благодарим ви, че се регистрирахте в Shop for technologies! Радваме се, че сте с нас.</p><p>С най-добри пожелания,<br>Екипът на Shop for technologies.</p>`,
	};
	try {
		transporter.sendMail(mailOptions);
	} catch (err) {
        throw new Error("Email sending failed");
    }
}

function orderEmail(username,email,totalPrice){
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Успешна поръчка в Shop for technologies",
        text: `Здравейте ${username},\n\nБлагодарим ви, че направихте поръчка в Shop for technologies! Радваме се, че сте с нас.\n\nОбщата стойност на поръчката ви е: ${totalPrice}лв\n\nС най-добри пожелания,\nЕкипът на Shop for technologies.`,
        html: `<p>Здравейте ${username},</p><p>Благодарим ви, че направихте поръчка в Shop for technologies! Радваме се, че сте с нас.</p><p>Общата стойност на поръчката ви е: <strong>${totalPrice}лв</strong></p><p>С най-добри пожелания,<br>Екипът на Shop for technologies.</p>`,
    };
    try {
        transporter.sendMail(mailOptions);
    } catch (err) {
		console.log(err.message)
        throw new Error("Email sending failed");
    }
}

module.exports = {
    registrationEmail,
    orderEmail
}
