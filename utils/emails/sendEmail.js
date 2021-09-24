const nodemailer = require('nodemailer');
// const mg = require('nodemailer-mailgun-transport');
const sg = require('nodemailer-sendgrid-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
	auth: {
		api_key: process.env.SENDGRID_API_KEY,
	},
};

const nodemailerSendGrid = nodemailer.createTransport(sg(auth));

const sendEmail = async ({ from, to, subject, html }) => {
	let defaultFrom =
		from || `${process.env.COMPANY_NAME} <${process.env.COMPANY_EMAIL}>`;

	await nodemailerSendGrid.sendMail({
		from: defaultFrom,
		to,
		subject,
		html,
	});
};

module.exports = sendEmail;
