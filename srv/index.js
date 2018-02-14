const express = require('express');

const app = express();


app.get('/', (request, response) => {
  // load text from the db
  response.send('Hello World!');
});

app.delete('/', (request, response) => {
  // delete text from the db
  response.send('Hello World!');
});

app.post('/', (request, response) => {
  // save new file
  response.send('Hello World!');
});

app.put('/', (request, response) => {
  // replace
  response.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
