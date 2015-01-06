var
  e400 = require('./400'),
  e500 = require('./500');

module.exports = errorHandler;

function errorHandler(app) {
  var
    errors = [e400, e500];

  errors.forEach(useErrors);

  function useErrors(errModule) {
    for (var errType in errModule) {
      app.use(errModule[errType]);
    }
  }
}