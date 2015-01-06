var
  env = process.env.NODE_ENV || 'production';

module.exports = {
  500: handle500
};

function handle500(err, req, res, next) {
  res.status(err.status || 500);

  res.render('error', {
    message: err.message,
    error: (env === 'development') ? err : {}
  });
}
