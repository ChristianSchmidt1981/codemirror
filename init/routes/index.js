const express = require('express');
const asyncHandler = require('express-async-handler');
const knex = require('../knex-configuration');

const router = express.Router();

router.get('/', asyncHandler(async (request, response) => {
  // load text from the db
  const data = await knex.select().from('codemirror');
  response.send(JSON.stringify(data));
}));

router.delete('/', asyncHandler(async (request, response) => {
  // delete text from the db
  const data = await knex('codemirror').where('id', request.body.id).del();
  response.send(JSON.stringify(data));
}));

router.post('/', asyncHandler(async (request, response) => {
  // save new file
  const data = await knex('codemirror').insert({
    filename: request.body.filename,
    content: request.body.content,
  });
  response.send(JSON.stringify(data));
}));

router.put('/', asyncHandler(async (request, response) => {
  // replace
  const data = knex('books')
    .where('filename', '=', request.body.filename)
    .update({
      content: request.body.content,
    });
  response.send(JSON.stringify(data));
}));


module.exports = router;
