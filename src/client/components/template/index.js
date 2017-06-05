import React from 'react';
import { ButtonGroup, Button, Glyphicon, Navbar, Nav, NavItem } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import * as routes from './routes.js';
import { Helmet } from 'react-helmet';
export default class index extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Dr. Notes | Templates management</title>
        </Helmet>
        <Switch>
          <Route exact={true} path="/template/create" component={routes.form} />
          <Route exact={true} path="/template/:id/delete" component={routes.del} />
          <Route exact={true} path="/template/:id/edit" component={routes.form} />
          <Route exact={true} path="/template/:id" component={routes.details} />
          <Route exact={true} path="/template" component={routes.index} />
        </Switch>
      </div>
    );
  }
}
