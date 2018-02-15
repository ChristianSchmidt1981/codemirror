
exports.up = knex => knex.schema.hasTable('codemirror')
  .then((exists) => {
    if (exists) {
      return null;
    }

    return knex.schema
      .createTable('codemirror', (table) => {
        table.increments();

        table
          .string('filename')
          .unique('filename')
          .notNullable();

        table
          .string('content')
          .notNullable();
      });
  });

exports.down = knex => knex.schema.dropTable('codemirror');
