const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
	auth: {
		api_key: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN,
	},
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

const sendEmail = async ({ from, to, subject, html }) => {
	let defaultFrom =
		from || `${process.env.COMPANY_NAME} <${process.env.COMPANY_EMAIL}>`;

	await nodemailerMailgun.sendMail({
		from: defaultFrom,
		to,
		subject,
		html,
	});
};

module.exports = sendEmail;
