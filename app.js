var
  path = require('path'),
  express = require('express'),
  app = express(),

  controllers = require('./controllers'),

  errors = require('./lib/errors');

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
