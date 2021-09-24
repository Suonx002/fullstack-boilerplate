const knex = require('knex');
const knexfile = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';

console.log({ environment });

module.exports = knex(knexfile[environment]);
