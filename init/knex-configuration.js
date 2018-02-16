const config = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const knex = require('knex');

// establish a connection to the DB
const connection = knex(environmentConfig);

module.exports = connection;
