const configurationFromKnex = require('../knexfile');

console.log('environment9999', process.env.DATABASE_URL, process.env.NODE_ENV);
const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const knex = require('knex')(configurationFromKnex[environment]);

module.exports = knex;
