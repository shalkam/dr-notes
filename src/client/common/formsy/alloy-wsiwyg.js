import React from 'react';
import Formsy, { HOC } from 'formsy-react';
import ReactHtmlParser from 'react-html-parser';
import Paper from 'material-ui/Paper';
import './alloy-editor/highlight.js';
import 'alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean-min.css';
class Editor extends React.Component {
  state = {
    value: null,
    loaded: false
  };
  componentWillReceiveProps(newProps) {
    this.setState((prevState, props) => {
      if (
        props.value === undefined || (prevState.value !== props.value && prevState.loaded === false)
      ) {
        this._editor.get('nativeEditor').setData(props.getValue());
        return { value: props.value, loaded: true };
      }
    });
  }
  componentWillUnmount() {
    this._editor.destroy();
  }
  componentDidMount() {
    this._editor = window.AlloyEditor.editable(this.refs.container, {
      toolbars: {
        add: {
          buttons: ['image', 'camera', 'hline', 'table'],
          tabIndex: 2
        },
        styles: {
          tabIndex: 1,
          selections: [
            {
              name: 'embed',
              buttons: ['embedRemove', 'embedEdit'],
              test: AlloyEditor.SelectionTest.test
            },
            { name: 'link', buttons: ['linkEdit'], test: AlloyEditor.SelectionTest.link },
            {
              name: 'image',
              buttons: ['imageLeft', 'imageCenter', 'imageRight'],
              test: AlloyEditor.SelectionTest.image
            },
            {
              name: 'text',
              buttons: [
                'styles',
                'bold',
                'italic',
                'underline',
                'ul',
                'ol',
                'paragraphJustify',
                'paragraphCenter',
                'paragraphLeft',
                'paragraphRight',
                'highlight',
                'link',
                'twitter'
              ],
              test: AlloyEditor.SelectionTest.text
            },
            {
              name: 'table',
              buttons: ['tableHeading', 'tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
              getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
              setPosition: AlloyEditor.SelectionSetPosition.table,
              test: AlloyEditor.SelectionTest.table
            }
          ]
        }
      }
    });
    this._editor.get('nativeEditor').on('change', () => {
      this.props.setValue(this._editor.get('nativeEditor').getData());
      this.props.onChange && this.props.onChange();
    });
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
      <div style={{ paddingLeft: 30 }}>
        {this.props.label}
        <div
          ref="container"
          style={{
            color: 'rgba(0, 0, 0, 0.87)',
            backgroundColor: 'rgb(255, 255, 255)',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            boxSizing: 'border-box',
            fontFamily: 'Roboto, sans-serif',
            webkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
            borderRadius: '2px',
            width: '100%',
            marginTop: 10,
            marginBottom: 15,
            padding: 10
          }}
          zDepth={2}
        />
        <span>{errorMessage}</span>
      </div>
    );
  }
}

export default HOC(Editor);
