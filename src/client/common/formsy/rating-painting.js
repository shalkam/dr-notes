import React from 'react';
import Formsy, { HOC } from 'formsy-react';
import Rating from 'react-rating';
import SelectList from 'react-widgets/lib/SelectList';

class RatingPainting extends React.Component {
  state = {
    disabled: false
  };
  changeValue(type, data) {
    let value = Object.assign({}, this.props.getValue());
    let newVal;
    if (type === 'rating')
      newVal = data;
    else if (type === 'notChecked') {
      this.setState({ disabled: data.target.checked });
      value = {};
      newVal = data.target.checked;
    } else
      newVal = data;
    value[type] = newVal;
    if (type === 'ratingDelete') {
      if (value['ratingDelete']) delete value['ratingDelete'];
      if (value['rating']) delete value['rating'];
    }
    this.props.setValue(value);
  }
  render() {
    // Set a specific className based on the validation
    // props of this component. showRequired() is true
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
          <div className="checkbox">
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
          <Rating
            style={{ marginTop: 5, marginBottom: 5, display: 'block', float: 'right' }}
            empty={[
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                1
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                2
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                3
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                4
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                5
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                6
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                7
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                8
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                9
              </a>,
              <a
                className="btn btn-default"
                disabled={this.state.disabled}
                style={{ marginRight: 10 }}>
                10
              </a>
            ]}
            full={[
              <a className="btn btn-info" style={{ marginRight: 10 }}>1</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>2</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>3</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>4</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>5</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>6</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>7</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>8</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>9</a>,
              <a className="btn btn-info" style={{ marginRight: 10 }}>10</a>
            ]}
            stop={10}
            initialRate={this.props.getValue() && this.props.getValue().rating}
            onClick={this.changeValue.bind(this, 'rating')}
            readonly={this.state.disabled}
          />
          <a
            className="btn btn-danger pull-right"
            style={{
              marginRight: 10,
              marginTop: 5
              // display: this.props.getValue() && this.props.getValue().rating ? '' : 'none'
            }}
            disabled={
              this.state.disabled || !(this.props.getValue() && this.props.getValue().rating)
            }
            onClick={this.changeValue.bind(this, 'ratingDelete')}>
            ازالة التقييم
          </a>
          <div className="clearfix" />
          <SelectList
            isRtl={true}
            data={['دهان المصنع. ', 'تم إعادة الدهان.']}
            onChange={this.changeValue.bind(this, 'painting')}
            readOnly={this.state.disabled}
          />
          <span>{errorMessage}</span>
        </div>
      </div>
    );
  }
}

export default HOC(RatingPainting);
