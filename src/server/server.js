import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { apolloUploadExpress } from 'apollo-upload-server';
import { Helmet } from 'react-helmet';
import schema from '../data/schema.js';
import config from '../../config.js';
import events from 'events';
import dbConnect from './db.js';

const app = express();
class Loader extends events.EventEmitter {
  constructor() {
    super();
  }
  async init() {
    const self = this;
    const db = await dbConnect();
    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(
      '/' + config.GQL_URL_DIR,
      apolloUploadExpress(),
      graphqlExpress((req, res) => {
        return { schema, context: { req, db } };
      })
    );
    app.use('/assets', express.static(path.join(__dirname, 'assets')));
    // app.use(
    //   ['*.js', '*.css', '*.eot', '*.svg', '*.ttf', '*.woff', '.*woff2'],
    //   express.static(path.join(__dirname, './assets'))
    // );
    // app.use('/uploads/', express.static(path.join(__dirname, './uploads')));
    app.use('/uploads/', (req, res) =>
      res.download(path.join(__dirname, '..', 'uploads', req.url)));
    app.get('*', function(req, res) {
      const helmet = Helmet.renderStatic();
      res.send(
        `
          <!DOCTYPE html>
          <html ${helmet.htmlAttributes.toString()}>
            <head>
              <meta charset="UTF-8">
              <script></script>
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              <link rel="stylesheet" href="/assets/styles.css" />
            </head>

            <body ${helmet.bodyAttributes.toString()}>
              <div id="app"></div>
              <script src="/assets/alloy-editor/alloy-editor-all-min.js" ></script>
              <script src="/assets/bundle.js" ></script>
            </body>
          </html>
        `
      );
    });
    const listen = () => {
      const server = app.listen(0, () => {
        self.emit('server.loaded', server.address().port);
        console.log(`server listening at port `, server.address().port);
      });
    };
    try {
      listen();
    } catch (e) {
      listen();
    }
  }
}
module.exports = new Loader();
