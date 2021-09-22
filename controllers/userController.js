const db = require('../models/usersModel');
const crypto = require('crypto');

const AppError = require('../utils/AppError');
const permissions = require('../middlewares/permissions');
const bcryptMethods = require('../utils/bcryptMethods');
const sendEmail = require('../utils/emails/sendEmail');

const resetPasswordTemplate = require('../utils/emails/templates/resetPasswordTemplate');

exports.getMe = async (req, res, next) => {
	return res.status(200).json({
		status: 'success',
		data: req.user,
	});
};

exports.get = async (req, res, next) => {
	const { id } = req.params;

	const userData = await db.get(id);

	if (!userData?.length) {
		return next(new AppError(`There is no user with this ID`, 400));
	}

	// remove important data out
	const { password, updatedAt, ...rest } = userData[0];

	return res.status(200).json({
		status: 'success',
		data: rest,
	});
};

exports.create = async (req, res, next) => {
	const { email, firstName, lastName, password } = req.body;

	const emailLowerCase = email.toLowerCase();

	const userData = await db.get(null, emailLowerCase);

	if (userData?.length) {
		return next(new AppError(`This account is already existed.`, 400));
	}

	const hashedPassword = await bcryptMethods.hashPassword(password);

	const newUser = await db.create({
		email: emailLowerCase,
		firstName,
		lastName,
		password: hashedPassword,
	});

	const { password: newPassword, ...rest } = newUser[0];

	const token = permissions.signJwtToken(emailLowerCase);

	return res.status(201).json({
		status: 'success',
		token,
		data: rest,
	});
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	const userData = await db.get(null, email);

	if (!userData?.length) {
		return next(new AppError(`There is no account with this email.`, 400));
	}

	const comparedPassword = await bcryptMethods.verifyPassword(
		password,
		userData[0]?.password
	);

	if (!comparedPassword) {
		return next(new AppError(`Invalid Credentials`, 401));
	}

	const { password: hashedPassword, ...rest } = userData[0];

	const token = permissions.signJwtToken(email);

	return res.status(200).json({
		status: 'success',
		token,
		data: rest,
	});
};

exports.getAll = async (req, res, next) => {
	const allUsers = await db.getAll();

	return res.status(200).json({
		status: 'success',
		data: allUsers,
	});
};

exports.delete = async (req, res, next) => {
	const { id } = req.params;

	await db.delete(id);

	return res.status(200).json({
		status: 'success',
		message: `Successfully deleted user ${id}`,
	});
};

exports.forgotPassword = async (req, res, next) => {
	const { email } = req.body;

	const forgotPasswordToken = crypto.randomBytes(32).toString('hex');
	const forgotPasswordTokenEncrypted = crypto
		.createHash('sha256')
		.update(forgotPasswordToken)
		.digest('hex');

	// 10 minutes
	const forgotPasswordTokenExpires = new Date(
		Date.now() + 10 * 60 * 1000
	).toISOString();

	const user = await db.forgotPassword(
		email,
		forgotPasswordTokenEncrypted,
		forgotPasswordTokenExpires
	);

	if (!user?.length) {
		return next(new AppError(`There is no account with this email.`, 400));
	}

	await sendEmail({
		to: email,
		subject: 'Reset Your Password',
		html: resetPasswordTemplate({
			firstName: user[0]?.firstName,
			heading: 'Reset Your Password',
			description: `Please reset your password with the following link below.`,
			websiteLabel: `Reset Password`,
			websiteLink: `${process.env.CLIENT_URL}/resetPassword/${forgotPasswordToken}`,
		}),
	});

	return res.status(200).json({
		status: 'success',
		message: `Password reset has been sent to your email!`,
	});
};

exports.resetPassword = async (req, res, next) => {
	const { password } = req.body;
	const { token } = req.params;

	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

	const user = await db.resetPassword(hashedToken, password);

	if (!user?.length) {
		return next(
			new AppError(`Password reset expired. Please request a new one.`, 400)
		);
	}

	res.status(200).json({
		status: 'success',
		message: `Password has changed successfully!`,
	});
};
