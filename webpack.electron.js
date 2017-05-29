var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var DeepMerge = require('deep-merge');
var config = require('./config.js');

var deepmerge = DeepMerge(function(target, source, key) {
  if (target instanceof Array) {
    return [].concat(target, source);
  }
  return source;
});

// generic
var defaultConfig = {};

if (process.env.NODE_ENV !== 'production') {
  //defaultConfig.devtool = '#eval-source-map';
  defaultConfig.devtool = 'source-map';
  // defaultConfig.debug = true;
}

function wpconfig(overrides) {
  return deepmerge(defaultConfig, overrides || {});
}

// backend
// var nodeModules = fs.readdirSync(path.join(__dirname, 'node_modules'))
// .filter(function(x) {
//   return ['.bin'].indexOf(x) === -1;
// });
let entry = path.join(__dirname, 'src', 'main.js');
nodeModules = [];
var backendConfig = wpconfig({
  entry: [entry],
  target: 'electron',
  output: { path: path.join(__dirname, 'dist'), filename: 'main.js' },
  node: { __dirname: false, __filename: false },
  externals: [
    function(context, request, callback) {
      var pathStart = request.split('/')[0];
      if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ],
  plugins: [new webpack.DefinePlugin({ 'global.GENTLY': false })],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0', 'react'],
              plugins: [
                ['transform-runtime', { polyfill: true, regenerator: true }],
                [
                  'babel-plugin-transform-require-ignore',
                  {
                    extensions: ['.css']
                  }
                ],
                'babel-plugin-transform-import-to-require',
                'transform-class-properties'
              ]
            }
          }
        ]
      },
      { test: /.json$/, loader: 'json-loader' },
      { test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: 'graphql-tag/loader' }
    ]
  }
});
module.exports = webpack(backendConfig);
