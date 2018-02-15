const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    database: 'codemirror',
  },
});

module.exports = knex;
