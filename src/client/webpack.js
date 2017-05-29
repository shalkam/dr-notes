var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var config = require('../../config.js');
var babelRule = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            'es2015',
            {
              loose: true,
              modules: false
            }
          ],
          'stage-0',
          'react'
        ],
        plugins: ['babel-plugin-transform-import-to-require', 'transform-class-properties']
      }
    }
  ]
};

// frontend
var frontendConfig = {
  devtool: 'source-map',
  entry: [path.join(__dirname, 'index.js')],
  output: {
    path: path.join(__dirname, '../../dist/assets/'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  target: 'electron',
  plugins: [new ExtractTextPlugin({ filename: 'styles.css', allChunks: true })],
  module: {
    rules: [
      { test: /\.png$/, use: { loader: 'url-loader', options: { limit: '100000' } } },
      { test: /\.jpg$/, use: { loader: 'file-loader' } },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      { test: /\.gif$/, use: { loader: 'url-loader', options: { mimetype: 'image/png' } } },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: {
          loader: 'file-loader?name=[name].[ext]&publicPath=/assets/'
        }
      },
      babelRule,
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: { loader: 'graphql-tag/loader' }
      }
    ]
  }
};
if (process.env.NODE_ENV === 'production') {
  delete frontendConfig.devtool;
  frontendConfig.plugins.push(
    new webpack.DefinePlugin({
      // <-- key to reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10,
      minRatio: 0.8
    })
  );
}
// if (process.env.NODE_ENV !== 'production') {
//   frontendConfig.output.path = '/';
//   frontendConfig.output.publicPath = '/dev/assets/';
//   frontendConfig.entry = [
//     'webpack-hot-middleware/client?path=' +
//       config.APP_URL +
//       ':' +
//       config.APP_PORT +
//       '/__webpack_hmr&timeout=20000',
//     path.join(__dirname, '../src/client/index.js')
//   ];
//   frontendConfig.plugins.push = new webpack.HotModuleReplacementPlugin();
// }
module.exports = webpack(frontendConfig);
