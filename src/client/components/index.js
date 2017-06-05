import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import * as routes from './routes.js';
import Layout from './layout/index.js';
import { Helmet } from 'react-helmet';
// import { ipcRenderer } from 'electron';

export default class admin extends React.Component {
  componentDidMount() {
    // ipcRenderer.on('server.loaded', (event, message) => {
    //   console.log('server has loaded'); // Prints 'whoooooooh!'
    // });
  }
  render() {
    return (
      <div>
        <Helmet titleTemplate="%s">
          <title>Dr. Notes</title>
        </Helmet>
        <Layout>
          <Switch>
            <Route path="/template" component={routes.template} />
            <Route path="/" component={routes.note} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
