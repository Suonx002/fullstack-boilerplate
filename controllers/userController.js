const db = require('../models/usersModel');

const AppError = require('../utils/AppError');
const permissions = require('../middlewares/permissions');
const bcryptMethods = require('../utils/bcryptMethods');

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
	const userData = await db.get(null, email);

	if (userData?.length) {
		return next(new AppError(`This account is already existed.`, 400));
	}

	const hashedPassword = await bcryptMethods.hashPassword(password);

	const newUser = await db.create({
		email,
		firstName,
		lastName,
		password: hashedPassword,
	});

	const { password: newPassword, ...rest } = newUser[0];

	const token = permissions.signJwtToken(email);

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

	console.log({ allUsers });

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
