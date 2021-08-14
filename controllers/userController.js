const db = require('../models/usersModel');

const AppError = require('../utils/AppError');

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

	const newUser = await db.create({
		email,

		firstName,
		lastName,
		password,
	});

	const { password: newPassword, updatedAt, ...rest } = newUser[0];

	return res.status(201).json({
		status: 'success',
		data: rest,
	});
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	const userData = await db.get(null, email);

	if (!userData?.length) {
		return next(new AppError(`This account is already existed.`, 400));
	}

	if (password !== userData[0].password) {
		return next(new AppError(`Invalid Credentials`, 401));
	}

	return res.status(200).json({
		status: 'success',
		data: userData[0],
	});
};
