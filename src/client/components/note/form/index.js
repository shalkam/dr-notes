import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import queryString from 'query-string';
import Form from './form.js';
import query from '../data/queries/find-one-form.gql';

class FormIndex extends Component {
  componentWillMount() {
    this.setState({
      model: {}
    });
  }
  render() {
    const searchObj = queryString.parse(this.props.history.location.search);
    console.log();
    return <Form id={this.props.match.params.id} templateId={searchObj.template} />;
  }
}
export default FormIndex;
