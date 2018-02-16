const express = require('express');
const asyncHandler = require('express-async-handler');
const knex = require('../../knexfile');

const router = express.Router();

router.get('/', asyncHandler(async (request, response) => {
  // load text from the db
  const data = await knex.select().from('codemirror');
  response.send(JSON.stringify(data));
}));

router.delete('/', asyncHandler(async (request, response) => {
  // delete text from the db
  await knex('codemirror').where('filename', request.body.fileName).del();
  response.send(JSON.stringify({ state: 'success' }));
}));

router.post('/', asyncHandler(async (request, response) => {
  // save new file
  await knex('codemirror').insert({
    filename: request.body.fileName,
    content: request.body.content,
  });
  response.send(JSON.stringify({ state: 'success' }));
}));

router.put('/', asyncHandler(async (request, response) => {
  // replace
  await knex('codemirror')
    .where('filename', '=', request.body.filename)
    .update({
      content: request.body.content,
    });
  response.send(JSON.stringify({ state: 'success' }));
}));


module.exports = router;
