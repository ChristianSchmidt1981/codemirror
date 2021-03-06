const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
app.use(logger('dev'));

// 3. Parse request bodies as json
app.use(bodyParser.json({ type: 'application/json', limit: '50mb' }));

app.use('/api', index);
app.use(express.static(path.join(__dirname, '../public')));

// catch 404 and forward to error handler
app.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, request, response) => {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = app;
