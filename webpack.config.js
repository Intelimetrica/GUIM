const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './index.js',
    library: 'guim',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: ["node_modules", /.*\.spec\.js$/],
      use: ["babel-loader"]
    }]
  }
};
