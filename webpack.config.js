var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './client/js/main.es6',
  output: {
    path: './client/js',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/assets/'
  },
  module: {
    loaders: [
      {
        test: /.es6$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
