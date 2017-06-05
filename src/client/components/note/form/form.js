import React, { Component, PropTypes } from 'react';
import Formsy from 'formsy-react';
import PubSub from 'pubsub-js';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { fromObj } from 'form-data-to-object';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import AlloyEditor from '../../../common/formsy/alloy-wsiwyg.js';
import Files from '../../../common/files.js';
import Input from '../../../common/formsy/input.js';
import RaisedButton from 'material-ui/RaisedButton';

import insert from '../data/mutations/insert.gql';
import update from '../data/mutations/update.gql';
import query from '../data/queries/find-one.gql';
import templateQuery from '../../template/data/queries/find-one.gql';

class Form extends Component {
  timer;
  componentWillMount() {
    this.setState({
      submitted: false,
      model: {},
      files: [],
      loading: this.props.id || this.props.templateId ? true : false
    });
    this.props.note && this.props.note.refetch();
  }
  componentWillReceiveProps(newProps) {
    let model = {};
    if (newProps.note && !newProps.note.loading) {
      model = newProps.note.note.findOne;
      this.setState({ model });
      model = fromObj(model);
      this.refs.form && this.refs.form.reset(model);
    } else if (newProps.location.pathname === '/note/create') {
      if (this.props.templateId !== undefined)
        model.content = newProps.template &&
          !newProps.template.loading &&
          newProps.template.template.findOne.content;
      this.setState({ model });
    } else {
      this.refs.form.reset();
    }
    this.setState({ loading: false });
  }
  handleSubmit(data) {
    this.setState({ submitted: true });
    this.refs.form.validateForm();
  }
  submit(autoSave) {
    const data = this.refs.form.getModel();
    let operation = typeof data.id === 'undefined' ? 'insert' : 'update';
    const self = this;
    this.props
      [operation]({
        variables: { data: { ...this.refs.form.getModel(), files: this.state.model.files } }
      })
      .then(({ data }) => {
        if (autoSave === true) {
          PubSub.publish('NOTIFY', {
            autoDismiss: 3,
            dismissible: true,
            level: 'success',
            message: 'Note was auto saved',
            position: 'br',
            title: 'Note Auto Saved'
          });
          //update form data if autoSave
          this.setState({ model: data.note[operation] });
        } else {
          PubSub.publish('NOTIFY', {
            autoDismiss: 3,
            dismissible: true,
            level: 'success',
            message: 'Note was saved',
            position: 'br',
            title: 'Note  Saved'
          });
          self.props.history.push('/note/' + data.note[operation].id);
        }
      })
      .catch(error => {
        if (data.title === '') {
          PubSub.publish('NOTIFY', {
            autoDismiss: 3,
            dismissible: true,
            level: 'error',
            message: 'Please enter a title for the note',
            position: 'br',
            title: 'There was an error'
          });
        }
        console.log('there was an error sending the query', error);
      });
  }
  handleValid() {
    if (this.state.submitted) {
      this.submit();
      this.setState({ submitted: false });
    }
  }
  handleInValid() {
    if (this.state.submitted)
      PubSub.publish('NOTIFY', {
        autoDismiss: 3,
        dismissible: true,
        level: 'error',
        message: 'Please enter correct data for this note',
        position: 'br',
        title: 'There was an error'
      });
  }
  autoSave() {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => {
        this.submit(true);
      },
      1000
    );
  }
  handleFiles(files) {
    let model = Object.assign({}, this.state.model);
    model.files = files;
    this.setState({ model }, this.autoSave.bind(this));
  }
  render() {
    if (
      (this.props.template && this.props.template.loading) ||
      (this.props.note && this.props.note.loading)
    ) {
      return <div>Loading</div>;
    }
    return (
      <div style={{ padding: 10 }}>
        <Formsy.Form
          ref="form"
          onSubmit={this.handleSubmit.bind(this)}
          onValid={this.handleValid.bind(this)}
          onInvalid={this.handleInValid.bind(this)}>
          <Input name="id" type="hidden" value={this.state.model.id && this.state.model.id} />
          <FormsyText
            value={this.state.model.title && this.state.model.title}
            name="title"
            label="Title"
            floatingLabelText="Title"
            floatingLabelFixed={true}
            fullWidth={true}
            hintText={'Note Title'}
            required
          />
          <AlloyEditor
            name="content"
            label="Content"
            value={this.state.model.content && this.state.model.content}
            onChange={this.autoSave.bind(this)}
          />
          <Files
            files={this.state.model.files && this.state.model.files}
            id={this.props.id}
            onChange={this.handleFiles.bind(this)}
          />
          <RaisedButton
            label="Save"
            primary={true}
            fullWidth={true}
            onTouchTap={() => this.refs.form.submit()}
          />
        </Formsy.Form>
      </div>
    );
  }
}
Form.propTypes = { insert: PropTypes.func.isRequired, update: PropTypes.func.isRequired };
export default compose(
  graphql(query, {
    name: 'note',
    options: props => {
      let options = {};
      if (props.id !== undefined) {
        options.variables = { id: props.id };
      } else {
        options.skip = true;
      }
      options.fetchPolicy = 'network-only';
      return options;
    }
  }),
  graphql(templateQuery, {
    name: 'template',
    options: props => {
      let options = {};
      if (props.templateId !== undefined) {
        options.variables = { id: props.templateId };
      } else {
        options.skip = true;
      }
      options.fetchPolicy = 'network-only';
      return options;
    }
  }),
  graphql(update, { name: 'update' }),
  graphql(insert, { name: 'insert' })
)(withRouter(Form));
