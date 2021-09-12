const knex = require('knex');

const tableNames = require('../constants/tableNames');
const defaultTableColumns = require('../methods/defaultTableColumns');

/**
 *
 * @param {knex} knex
 */

exports.up = async (knex) =>
	await knex.schema.createTable(tableNames.users, (table) => {
		const currentDate = new Date().toDateString();

		table.uuid('id').unique().primary();
		table.string('email').unique().notNullable();

		// required fields
		['firstName', 'lastName', 'password'].forEach((name) => {
			table.string(name).notNullable();
		});

		table.timestamp('passwordChangedAt').defaultTo(currentDate);

		table.string('forgotPasswordToken').defaultTo('');
		table.timestamp('forgotPasswordTokenExpires').defaultTo(currentDate);

		// user roles
		table
			.enum('role', ['user', 'basic', 'pro', 'enterprise', 'admin'])
			.defaultTo('user');

		// adding default createdAt & updatedAt
		defaultTableColumns(table);
	});

exports.down = async (knex) =>
	await knex.schema.dropTableIfExists(tableNames.users);
