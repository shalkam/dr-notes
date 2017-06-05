import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500, yellow600 } from 'material-ui/styles/colors';
import query from '../data/queries/find.gql';

class TemplatesList extends Component {
  componentWillMount() {
    this.setState({ open: {} });
    this.props.data.refetch();
  }
  formatDate(date) {
    date = new Date(new Number(date));
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }
  toggle(key) {
    const open = Object.assign({}, this.state.open);
    open[key] = !open[key];
    this.setState({ open });
  }
  render() {
    if (!this.props.data.loading) {
      const { template } = this.props.data;
      return (
        <List>
          {template.find.map((template, key) => {
            return (
              <ListItem
                key={key}
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                primaryText={`${template.title} Template`}
                initiallyOpen={false}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    key={'details-' + key}
                    onTouchTap={() =>
                      this.props.history.push(`/note/create?template=${template.id}`)}
                    primaryText="Use template"
                    leftIcon={<ActionAssignment />}
                  />,
                  <ListItem
                    key={'edit-' + key}
                    onTouchTap={() => this.props.history.push(`/template/${template.id}/edit`)}
                    primaryText="Edit"
                    leftIcon={<ActionAssignment />}
                  />,
                  <ListItem
                    key={'delete-' + key}
                    onTouchTap={() => this.props.history.push(`/template/${template.id}/delete`)}
                    primaryText="Delete"
                    leftIcon={<ActionAssignment />}
                  />
                ]}
              />
            );
          })}
        </List>
      );
    }
    return <div>Loading ...</div>;
  }
}
export default graphql(query, {
  options: { fetchPolicy: 'network-only' }
})(TemplatesList);
