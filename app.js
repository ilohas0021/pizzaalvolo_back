const express = require('express');
const cors = require("cors");
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/**
 * Routers
 *
 */
const indexRouter = require('./routes/index');
const imageRouter = require('./routes/image');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({ origin: "http://localhost:3000" }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Set Router and Prefix
 */
app.use('/', indexRouter);
app.use('/image', imageRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
app.use('/review', reviewRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
