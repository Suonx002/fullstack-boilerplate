// Update with your config settings.
const dotenv = require('dotenv').config({ path: './configs.env' });

module.exports = {
	development: {
		client: process.env.LOCAL_DB_CLIENT,
		connection: {
			host: process.env.LOCAL_DB_HOST,
			port: process.env.LOCAL_DB_PORT,
			database: process.env.LOCAL_DB_NAME,
			user: process.env.LOCAL_DB_USERNAME,
			password: process.env.LOCAL_DB_PASSWORD,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: `${__dirname}/database/migrations`,
		},
		seeds: {
			directory: `${__dirname}/database/seeds`,
		},
	},
	staging: {
		client: process.env.STAGE_DB_CLIENT,
		connection: process.env.STAGE_DATABASE_URL,
		pool: {
			min: 2,
			max: 18,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: `${__dirname}/database/migrations`,
		},
		seeds: {
			directory: `${__dirname}/database/seeds`,
		},
	},
	production: {
		client: process.env.PROD_DB_CLIENT,
		connection: {
			connectionString: process.env.PROD_DATABASE_URL,
			ssl: { rejectUnauthorized: false },
		},
		pool: {
			min: 2,
			max: 18,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: `${__dirname}/database/migrations`,
		},
		seeds: {
			directory: `${__dirname}/database/seeds`,
		},
	},
};
