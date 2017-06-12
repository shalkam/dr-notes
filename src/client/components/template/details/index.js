import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500, yellow600 } from 'material-ui/styles/colors';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Parser from 'html-react-parser';
import query from '../data/queries/find-one.gql';

class details extends Component {
  componentWillMount() {
    this.setState({ showModal: false });
    this.props.data.refetch();
  }
  modalToggle() {
    this.setState({ showModal: !this.state.showModal });
  }
  formatDate(date) {
    date = new Date(new Number(date));
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }
  render() {
    if (!this.props.data.loading) {
      const { template } = this.props.data;
      return (
        <Card style={{ margin: 20 }}>
          <Dialog
            actions={[
              <RaisedButton
                label="Cancel"
                primary={true}
                onTouchTap={this.modalToggle.bind(this)}
              />,
              <RaisedButton
                label="Delete"
                secondary={true}
                onTouchTap={() =>
                  this.props.history.push(`/template/${template.findOne.id}/delete`)}
              />
            ]}
            open={this.state.showModal}
            onRequestClose={this.modalToggle.bind(this)}>
            Are sure you want to delete this template?
          </Dialog>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={template.findOne.title} />
              <ToolbarTitle text={this.formatDate(template.findOne.meta.created)} />
              <ToolbarSeparator />
            </ToolbarGroup>
            <ToolbarGroup>
              <div className="noPrint">
                <IconMenu
                  onChange={(event, value) => {
                    if (value === 'delete') this.modalToggle.bind(this)();
                    else if (value === 'print') window.print();
                    else this.props.history.push(value);
                  }}
                  iconButtonElement={
                    <IconButton
                      touch={true}
                      tooltip="Manage this template"
                      tooltipPosition="bottom-left">
                      <ImageEdit />
                    </IconButton>
                  }
                  targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                  <MenuItem primaryText="Edit" value={`/template/${template.findOne.id}/edit`} />
                  <MenuItem primaryText="Print" value={'print'} />
                  <MenuItem primaryText="Delete" value={'delete'} />
                </IconMenu>
              </div>
            </ToolbarGroup>
          </Toolbar>
          <CardText>
            {Parser(template.findOne.content)}
          </CardText>
        </Card>
      );
    }
    return <div>Loading ...</div>;
  }
}
const component = graphql(query, {
  options: props => {
    let options = {};
    if (props.match.params.id) {
      options.variables = { id: props.match.params.id };
    } else {
      options.skip = true;
    }
    options.fetchPolicy = 'network-only';
    return options;
  }
})(details);
export default component;
