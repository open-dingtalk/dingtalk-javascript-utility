var webpack = require('webpack')

var config = {
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist/umd',
    filename: 'dingtalk-javascript-utility.js',
    library: 'DTUtility',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}

if (process.env.NODE_ENV === 'pro'){
  config.output.filename = 'dingtalk-javascript-utility-min.js'
  config.plugins = [(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )];
}

module.exports = config;