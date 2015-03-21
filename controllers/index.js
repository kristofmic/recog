module.exports = function routeHandler(app) {
  app.use('/', require('./main'));
  app.use('/api', require('./api'));

  app.use('/', function defaultRoute(req, res) {
    res.render('app/index');
  });
};

