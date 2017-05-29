import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import * as routes from './routes.js';
import PubSub from 'pubsub-js';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';
import Notify from './common/notify.js';
var Promise = require('bluebird');
Promise.onPossiblyUnhandledRejection(function(error) {
  throw error;
});
export default class App extends React.Component {
  componentWillMount() {
    numberLocalizer();
    this.setState({ loading: true });
    PubSub.subscribe('LOADING', this.handleLoading.bind(this));
  }
  handleLoading(msg, loading) {
    const { isServer } = this.props;
    if (isServer === false)
      setTimeout(
        () => {
          this.setState({ loading });
        },
        100
      );
  }
  getChildContext() {
    let { user, isServer } = this.props;
    if (!isServer) {
      if (window.document.cookie === '') window.localStorage.removeItem('token');
      user = JSON.parse(window.localStorage.getItem('token'));
    }
    return { user, isServer };
  }
  render() {
    return (
      <div>
        <Notify />
        <Switch>
          <Route path="/" component={routes.app} />
        </Switch>
      </div>
    );
  }
}

App.childContextTypes = {
  isServer: React.PropTypes.bool,
  user: React.PropTypes.object
};
