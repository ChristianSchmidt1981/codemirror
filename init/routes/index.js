const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  // load text from the db
  response.send('Hello World!');
});

router.delete('/', (request, response) => {
  // delete text from the db
  response.send('Hello World!');
});

router.post('/', (request, response) => {
  // save new file
  response.send('Hello World!');
});

router.put('/', (request, response) => {
  // replace
  response.send('Hello World!');
});


module.exports = router;
