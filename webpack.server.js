var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var config = require('./config.js');
var nodeModules = ['mongoose'];
if (process.env.NODE_ENV !== 'production') {
  nodeModules = fs.readdirSync(path.join(__dirname, 'node_modules')).filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  });
}
var serverConfig = {
  context: __dirname + '/src',
  entry: ['./server/index.js'],
  target: 'node',
  output: { path: __dirname + '/dist', filename: 'server.js' },
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
  plugins: [],
  module: {
    rules: [
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
      // for queries used in the client
      {
        test: /\.(gql)$/,
        exclude: /node_modules/,
        use: [{ loader: 'graphql-tag/loader' }]
      },
      // for the server schema file
      {
        test: /\.(graphql)$/,
        // exclude: /node_modules/,
        use: [{ loader: 'raw-loader' }]
      }
    ]
  }
};
if (process.env.NODE_ENV !== 'production') {
  //defaultConfig.devtool = '#eval-source-map';
  serverConfig.devtool = 'source-map';
  serverConfig.plugins.push(
    new webpack.BannerPlugin({
      banner: "require('source-map-support').install();",
      raw: true,
      entryOnly: false
    })
  );
  // serverConfig.debug = true;
} else if (process.env.NODE_ENV === 'production') {
  serverConfig.plugins.push(new webpack.DefinePlugin({ 'global.GENTLY': false }));
}
module.exports = webpack(serverConfig);
