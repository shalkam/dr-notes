import React from 'react';
import Formsy, { HOC } from 'formsy-react';
import SelectList from 'react-widgets/lib/SelectList';

class Select extends React.Component {
  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(value) {
    this.props.setValue(value);
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
      <div className={className ? className + ' form-group row' : 'form-group row'}>
        <label className="control-label col-sm-3">
          {this.props.label}
        </label>
        <div
          className={
            'col-sm-9 ' + this.props.elementWrapperClassName
              ? this.props.elementWrapperClassName
              : ''
          }>
          <SelectList
            {...this.props}
            onChange={this.changeValue.bind(this)}
            value={this.props.getValue()}
          />
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  }
}

export default HOC(Select);
