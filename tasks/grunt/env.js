module.exports = {
  dev: {
    NODE_ENV: 'localhost',
    REDIS_HOST: '127.0.0.1'
  },
  test: {
    NODE_ENV: 'test',
    REDIS_HOST: '127.0.0.1'
  },
  production: {
    NODE_ENV: 'production'
  }
};