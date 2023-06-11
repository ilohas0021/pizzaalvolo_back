const express = require('express');
const cors = require("cors");
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

/**
 * Routers
 *
 */
const indexRouter = require('./routes/index');
const basketRouter = require('./routes/basket')
const imageRouter = require('./routes/image');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(session({
  ket: 'sid', // 세션의 키 값
  secret: 'keyboard cat', // 비밀키를 지정
  resave: false, // 세션이 변경되지 않았어도 저장할 지 여부(false를 권장)
  saveUninitialized: true, // 세션이 저장되기전에 uninitialize 상태로 만들어 저장
  cookie: { // 자동으로 생성되는 쿠키 기본 설정
    path: '/',
    _expires: null,
    originalMaxAge: null,
    httpOnly: true
  }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Set Router and Prefix
 */
app.use('/', indexRouter);
app.use('/basket', basketRouter);
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
