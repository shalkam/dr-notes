const fs = require('fs');
const path = require('path');
const mongoSeed = require('mongo-seed');
const config = require('../config.js');
module.exports = function seed() {
  mongoSeed.load(
    config.DB_HOST,
    config.DB_PORT,
    config.DB_NAME,
    path.resolve(__dirname, 'seed'),
    'dir',
    function(err) {
      console.log(err);
      console.log('done');
    }
  );
};
