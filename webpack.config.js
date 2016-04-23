var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './client/js/main.es6',
  output: {
    path: './client/js',
    filename: 'bundle.es5.js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [
      {
        test: /.es6.js$/,
        loaders: [
          "babel-loader",
          "eslint-loader"
        ],
        exclude: /node_modules/
      }
    ]
  }
};
