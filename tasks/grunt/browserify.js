module.exports = {
  bundle: {
    src: '<%= jsPath %>/app.js',
    dest: '<%= pubJsPath %>/app.bundle.js',
    options: {
      transform: ['reactify', 'babelify'],
      browserifyOptions: {
        extensions: ['.jsx']
      }
    }
  }
};