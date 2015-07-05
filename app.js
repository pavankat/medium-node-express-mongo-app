var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

// Pavan added this:
// Database Config to use mongodb and mongoose module
// telling where the db lives and which database to use
  var mongo = require('mongodb');
  var mongoose = require('mongoose');

  // MongoDB configuration
  var db = mongoose.connect('mongodb://localhost/friedchickenspots', function(err, res) {
    if(err) {
      console.log('error connecting to MongoDB Database. ' + err);
    } else {
      console.log('Connected to Database');
    }
  });

  app.listen(8989);
  console.log('Magic happens on port 8989');
  require("./models/ChickenSpots.js");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
var chickenSpots = require('./routes/chickenspots');

app.use('/', routes);
app.use('/chickenspots', chickenSpots);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to fried chicken spot
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
