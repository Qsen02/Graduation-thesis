const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		type: "OAuth2",
		user: process.env.GMAIL_USER,
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		refreshToken: process.env.GMAIL_REFRESH_TOKEN,
	},
});

function registrationEmail(username) {
	const mailOptions = {
		from: process.env.GMAIL_USER,
		to: "my+test1@gmail.com",
		subject: "Successful Registration at Shop for technologies",
		text: `Hello ${username},\n\nThank you for registering at Shop for technologies! We're excited to have you on board.\n\nBest regards,\nThe Shop for technologies Team.`,
		html: `<p>Hello ${username},</p><p>Thank you for registering at Shop for technologies! We're excited to have you on board.</p><p>Best regards,<br>The Shop for technologies Team.</p>`,
	};
	try {
		transporter.sendMail(mailOptions);
	} catch (err) {
        throw new Error("Email sending failed");
    }
}

function orderEmail(username,totalPrice){
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: "my+test1@gmail.com",
        subject: "Successful Order at Shop for technologies",
        text: `Hello ${username},\n\nThank you for your order at Shop for technologies! We're excited to have you on board.\n\nYour total price is: $${totalPrice}\n\nBest regards,\nThe Shop for technologies Team.`,
        html: `<p>Hello ${username},</p><p>Thank you for your order at Shop for technologies! We're excited to have you on board.</p><p>Your total price is: <strong>$${totalPrice}</strong></p><p>Best regards,<br>The Shop for technologies Team.</p>`,
    };
    try {
        transporter.sendMail(mailOptions);
    } catch (err) {
        throw new Error("Email sending failed");
    }
}

module.exports = {
    registrationEmail,
    orderEmail
}
