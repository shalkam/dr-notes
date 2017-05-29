const path = require('path');

const config = {
  // Local dir config
  PUBLIC_DIR: path.join(__dirname, 'dist/client/public/dist/'),
  PUBLIC_URL_DIR: 'dist',
  SRC_DIR: path.join(__dirname, 'client', 'src'),
  UPLOAD_PATH: path.join(__dirname, 'uploads'),
  // App server config
  APP_PORT: 3000,
  APP_URL: 'http://localhost',
  GQL_URL_DIR: 'graphql',
  // Database config
  DB_URL: 'mongodb://localhost:27017',
  DB_HOST: 'localhost',
  DB_PORT: 27017,
  DB_NAME: 'checkcar',
  DB_USERNAME: null,
  DB_PASSWORD: null
};
if (process.env.HEROKU === '1') {
  config.DB_URL = 'mongodb://heroku_bjsqz23g:d9s7v83l3gm5hf5jleno6vhoo3@ds161210.mlab.com:61210';
  config.DB_HOST = 'heroku_bjsqz23g:d9s7v83l3gm5hf5jleno6vhoo3@ds161210.mlab.com';
  config.DB_PORT = 61210;
  config.DB_NAME = 'heroku_bjsqz23g';
  config.DB_USERNAME = 'heroku_bjsqz23g';
  config.DB_PASSWORD = 'd9s7v83l3gm5hf5jleno6vhoo3';
  config.APP_PORT = process.env.PORT;
}
module.exports = config;
