const configurationFromKnex = require('../knexfile');

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const knex = require('knex')(configurationFromKnex[environment]);

module.exports = knex;
