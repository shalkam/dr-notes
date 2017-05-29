import React from 'react';
import Formsy, { HOC } from 'formsy-react';
import { CirclePicker } from 'react-color';

class Color extends React.Component {
  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(color, event) {
    this.props.setValue(color.hex);
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
        <div className="col-sm-9">
          <CirclePicker
            {...this.props}
            onChangeComplete={this.changeValue.bind(this)}
            colors={[
              '#daa520',
              '#660000',
              '#b3d1ff',
              '#000000',
              '#f2dca6',
              '#ff0000',
              '#4fe1e3',
              '#6E706E',
              '#b84dff',
              '#ff66cc',
              '#116d6e',
              '#e5e6e5',
              '#ffff00',
              '#492b03',
              '#0f3e0f',
              '#527a7a',
              '#ffffe6',
              '#905509',
              '#239023',
              '#000066',
              '#ffffff',
              '#ff8c1a',
              '#adebad',
              '#0000ff',
              '#2e004d'
            ]}
            width="600px"
            color={this.props.getValue()}
          />
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  }
}

export default HOC(Color);
