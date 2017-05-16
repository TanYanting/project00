var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs=require('fs');//文件系统

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var site=require('./routes/site');
var data=require('./routes/data');

var app = express();

// view engine setup
//设置view路径和模板
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use配置
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use静态文件路径
app.use('/public',express.static(path.join(__dirname, 'public')));
  //404错误
  var err = new Error('Not Found');
  err.status = 404;
  //路由模块的使用
  app.use('/', index);
  app.use('/users', users);
  app.use('/login', login);
  app.use('/site', site);
  app.use('/data',data);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(err);
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
