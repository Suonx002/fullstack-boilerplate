const knex = require('knex');

const tableNames = require('../constants/tableNames');
const defaultTableColumns = require('../methods/defaultTableColumns');

/**
 *
 * @param {knex} knex
 */

exports.up = async (knex) =>
	await knex.schema.createTable(tableNames.users, (table) => {
		table.uuid('id').unique().primary();
		table.string('email').unique().notNullable();

		// required fields
		['firstName', 'lastName', 'password'].forEach((name) => {
			table.string(name).notNullable();
		});
		// user roles
		table
			.enum('role', ['user', 'basic', 'pro', 'enterprise'])
			.defaultTo('user');

		// adding default createdAt & updatedAt
		defaultTableColumns(table);
	});

exports.down = async (knex) =>
	await knex.schema.dropTableIfExists(tableNames.users);
