import React, { Component, PropTypes } from 'react';

import PubSub from 'pubsub-js';
import { graphql } from 'react-apollo';
import mutation from '../data/mutations/remove.gql';
class Delete extends React.Component {
  componentWillMount() {
    const self = this;
    this.props
      .mutate({ variables: { id: this.props.match.params.id } })
      .then(({ data }) => {
        PubSub.publish('NOTIFY', {
          autoDismiss: 3,
          dismissible: true,
          level: 'error',
          message: 'Note deleted',
          position: 'br',
          title: 'Deleted'
        });
        self.props.history.push('/');
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }
  render() {
    return null;
  }
}
Delete.propTypes = { mutate: PropTypes.func.isRequired };

export default graphql(mutation)(Delete);
