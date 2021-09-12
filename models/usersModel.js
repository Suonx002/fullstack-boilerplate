const { v4: uuidv4 } = require('uuid');

const db = require('../database/db');
const tableNames = require('../database/constants/tableNames');

const bcryptMethods = require('../utils/bcryptMethods');

exports.get = async (id, email) => {
	const user = await db(tableNames.users)
		.select('*')
		.modify((query) => {
			id && query.where('id', id);
			email && query.orWhere('email', email);
		});

	return user;
};

exports.getAll = async () => {
	const allUsers = await db(tableNames.users).select(
		'id',
		'email',
		'firstName',
		'lastName',
		'role',
		'createdAt',
		'updatedAt'
	);

	return allUsers;
};

exports.create = async (userData) => {
	const id = uuidv4();

	const newUser = await db(tableNames.users)
		.insert({ id, ...userData })
		.returning('*');

	return newUser;
};

exports.delete = async (id) => {
	return await db(tableNames.users).where('id', id).delete();
};

exports.forgotPassword = async (
	email,
	forgotPasswordToken,
	forgotPasswordTokenExpires
) => {
	const user = await db(tableNames.users)
		.where({ email })
		.update({
			forgotPasswordToken,
			forgotPasswordTokenExpires,
		})
		.returning('*');

	return user;
};

exports.resetPassword = async (token, password) => {
	const currentDate = new Date().toISOString();

	const hashPassword = await bcryptMethods.hashPassword(password);

	const user = await db(tableNames.users)
		.where({
			forgotPasswordToken: token,
		})
		.andWhere('forgotPasswordTokenExpires', '>', currentDate)
		.update({
			password: hashPassword,
			passwordChangedAt: currentDate,
		})
		.returning('*');

	return user;
};
