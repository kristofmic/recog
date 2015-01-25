var
  path = require('path'),
  express = require('express'),
  nconf = require('nconf'),
  confPath = './config/' + process.env.NODE_ENV || 'localhost' + '.json',
  app = express(),

  controllers = require('./controllers'),

  errors = require('./lib/errors');

nconf.argv()
     .env()
     .file({file: confPath});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// static assets
app.use(express.static(path.join(__dirname, 'public')));

// routing
controllers(app);

// error handling
errors(app);

module.exports = app;
