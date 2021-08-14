const { v4: uuidv4 } = require('uuid');

const db = require('../database/db');
const tableNames = require('../database/constants/tableNames');

exports.get = async (id, email) => {
	const user = await db(tableNames.users)
		.select('*')
		.modify((query) => {
			id && query.where('id', id);
			email && query.orWhere('email', email);
		});

	return user;
};

exports.create = async (userData) => {
	const id = uuidv4();

	const newUser = await db(tableNames.users)
		.insert({ id, ...userData })
		.returning('*');

	return newUser;
};
