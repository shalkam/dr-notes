import mongoose from 'mongoose';
import acl from 'acl';
import config from '../config.js';

const mongoUri = config.DB_URL + '/' + config.DB_NAME;

// mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(mongoUri, {
  server: { auto_reconnect: true, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 }
});

export const connection = mongoose.connection;

connection.on('error', e => {
  if (e.message.code === 'ETIMEDOUT') {
    console.log(e);
    mongoose.connect(mongoUri, opts);
  }
  console.log(e);
});
connection.once('open', () => {
  console.log(`MongoDB successfully connected to ${mongoUri}`);
});
