import React from 'react';
import Formsy, { HOC } from 'formsy-react';
import { Button } from 'react-bootstrap';

class repeat extends React.Component {
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
  add(event) {
    this.props.setValue(event.currentTarget.value);
  }
  remove(event) {
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
    //checking if it's an array
    if (this.props.children.length) {
    } else {
      const children = Object.assign({}, this.props.children);
      console.log(`${this.props.name}[${children.props.name}]`);
      children.props.name = `${this.props.name}[${children.props.name}]`;
    }
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.props.getErrorMessage();
    return (
      <div className={className ? className + ' well' : 'well'}>
        <label className="control-label col-sm-3">
          {this.props.label}
        </label>
        <div className="well col-sm-9">
          {this.props.children}
        </div>
        <div>
          <Button onClick={this.add.bind(this)}> Add</Button>
          <Button onClick={this.remove.bind(this)}>Remove</Button>
        </div>
      </div>
    );
  }
}

export default HOC(repeat);
