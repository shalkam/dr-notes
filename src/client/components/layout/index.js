import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PubSub from 'pubsub-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NotificationSystem from 'react-notification-system';
import Header from './header.js';

// import 'react-widgets/dist/css/react-widgets.css';
import './style/style.css';

export default class layout extends React.Component {
  componentWillMount() {
    injectTapEventPlugin();
    this.setState({ open: false });
  }
  handleDrawerChange() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NotificationSystem ref="notificationSystem" />
          <Header onDrawerChange={this.handleDrawerChange.bind(this)} openNav={this.state.open} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
