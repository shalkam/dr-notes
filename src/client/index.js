import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { createNetworkInterface } from 'apollo-upload-client';
import config from '../../config.js';
import App from './app.js';
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: window.location.origin + '/' + config.GQL_URL_DIR,
    opts: {
      credentials: 'same-origin'
    }
  }),
  addTypename: false
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App isServer={false} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('app')
);
