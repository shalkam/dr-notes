import React from 'react';
import Formsy, { HOC } from 'formsy-react';
import SelectList from 'react-widgets/lib/SelectList';

class BooleanComment extends React.Component {
  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(type, data) {
    let value = Object.assign({}, this.props.getValue());
    let newVal;
    if (type === 'boolean') newVal = data.value;
    else if (type === 'notChecked') newVal = data.target.checked;
    else newVal = data.target.value;
    value[type] = newVal;
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
        <div className="col-sm-9">
          <div class="checkbox">
            <label>
              <input
                type="checkbox"
                value="true"
                checked={this.props.getValue() ? this.props.getValue().notChecked : false}
                onChange={this.changeValue.bind(this, 'notChecked')}
              />
              {' '}
              لم يتم الفحص
            </label>
          </div>
          <SelectList
            value={this.props.getValue() ? this.props.getValue().boolean : null}
            onChange={this.changeValue.bind(this, 'boolean')}
            valueField="value"
            textField="label"
            isRtl={true}
            data={[{ value: true, label: 'يوجد' }, { value: false, label: 'ﻻ يوجد' }]}
          />
          <textarea
            className="form-control"
            onChange={this.changeValue.bind(this, 'comment')}
            placeholder="التعليق"
            value={this.props.getValue() ? this.props.getValue().comment : ''}
          />
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  }
}

export default HOC(BooleanComment);
