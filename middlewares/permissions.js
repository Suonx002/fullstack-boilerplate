const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const db = require('../models/usersModel');

const catchAsync = require('../utils/catchAsync');

exports.signJwtToken = (email) => {
	const payload = { email };

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_JWT_EXPIRES_IN || '7d',
	});

	return token;
};

exports.privateRoute = catchAsync(async (req, res, next) => {
	let token;

	// check if user provide bearer token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	// check if token exist

	if (!token) {
		return next(new AppError('Please login again to get access!', 400));
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const userData = await db.get(null, decoded.email);

	if (!userData?.length) {
		return next(
			new AppError(
				'There is no account with this info. Please create a new one.',
				404
			)
		);
	}

	const { password, ...rest } = userData[0];

	req.user = rest;

	next();
});

exports.permissionAccesByRoles = (roles) => {
	return (req, res, next) => {
		// roles ['user', 'basic', 'pro', 'enterprise']

		if (!roles.includes(req.user.role)) {
			return next(
				new AppError('You do not have permission to perform this action.', 403)
			);
		}

		next();
	};
};
