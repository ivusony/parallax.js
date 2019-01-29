var path = require('path');

module.exports = {
    entry : './src/init.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack.bundle.js'
      }
}