const { v4: uuidv4 } = require('uuid');

const bcryptMethods = require('../../utils/bcryptMethods');

const tableNames = require('../constants/tableNames');

const usersData = require('../mockup-data/users-data');

exports.seed = async (knex) => {
	try {
		// clear all data
		await knex(tableNames.users).del();

		let dbUserList = [];

		let index = 1;

		console.log('This function may takes a few minutes');
		for (const user of usersData) {
			const id = uuidv4();
			const { firstName, lastName, email, password } = user;

			// const newPassword = await bcryptMethods.hashPassword(password);

			// console.log(newPassword);

			dbUserList.push({
				firstName,
				lastName,
				email,
				password,
				role: 'user',
				id,
				passwordChangedAt: new Date().toISOString(),
				forgotPasswordToken: '',
				forgotPasswordTokenExpires: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});

			console.log(`Complete ${index} out of ${usersData.length}`);

			index++;
		}

		// insert new data
		await knex(tableNames.users).insert(dbUserList);

		console.log('Successfully inserted all users');
	} catch (err) {
		console.log('Something went wrong with seeding users');
	}
};
