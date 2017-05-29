import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import Form from './form.js';
import query from '../data/queries/find-one-form.gql';

class FormIndex extends Component {
  componentWillMount() {
    this.setState({
      model: {}
    });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.data && !newProps.data.loading) {
      this.setState({ model: newProps.data.config.findOne });
    }
  }
  render() {
    if (this.props.data && this.props.data.loading) {
      return <div>جاري التحميل</div>;
    }
    return <Form id={this.props.match.params.id} />;
  }
}
export default FormIndex;
