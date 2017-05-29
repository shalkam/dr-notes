import React from 'react';
import Formsy, { HOC } from 'formsy-react';

class Input extends React.Component {
  componentWillReceiveProps(newProps) {
    if (newProps.getValue()) this.setState({ value: newProps.getValue() });
  }
  componentWillMount() {
    this.setState({ value: null });
  }
  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = this.props.showRequired()
      ? 'required'
      : this.props.showError() ? 'error' : null;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.props.getErrorMessage();

    return (
      <div
        className={className ? className + ' form-group row' : 'form-group row'}
        style={{ display: this.props.type === 'hidden' && 'none' }}>
        <label className="control-label col-sm-3">
          {this.props.label}
        </label>
        <div className="col-sm-9">
          <input
            {...this.props}
            className="form-control"
            onChange={event => this.setState({ value: event.currentTarget.value })}
            onBlur={this.changeValue.bind(this)}
            value={this.state.value}
          />
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  }
}

export default HOC(Input);
