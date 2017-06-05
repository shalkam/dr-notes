import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import Form from './form.js';

class FormIndex extends Component {
  componentWillMount() {
    this.setState({
      model: {}
    });
  }
  render() {
    return <Form id={this.props.match.params.id} />;
  }
}
export default FormIndex;
