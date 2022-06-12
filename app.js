const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const routes = require('./routes/index');
const app = express();
const cors = require("cors");
require('./db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message,
  })
});

module.exports = app;
