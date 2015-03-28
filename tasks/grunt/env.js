module.exports = {
  dev: {
    NODE_ENV: 'development',
    REDIS_HOST: '127.0.0.1'
  },
  test: {
    NODE_ENV: 'test',
    REDIS_HOST: '127.0.0.1'
  },
  prod: {
    NODE_ENV: 'production'
  }
};