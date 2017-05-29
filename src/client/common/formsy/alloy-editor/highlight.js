// Use the built-in version of React if your site does not use React
var React = AlloyEditor.React;

var ButtonHighlight = React.createClass({
  mixins: [
    AlloyEditor.ButtonStyle,
    AlloyEditor.ButtonStateClasses,
    AlloyEditor.ButtonActionStyle,
    AlloyEditor.ButtonCommand
  ],

  propTypes: {
    editor: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      style: {}
    };
  },
  handleClick: function() {
    var editor = this.props.editor.get('nativeEditor');
    var parentNode = document.getSelection().extentNode.parentNode;
    var background = window.getComputedStyle(parentNode, null).getPropertyValue('background-color');
    var vars = {};
    vars['backgroundColor'] = background === 'rgb(255, 255, 0)' ? 'none' : 'rgb(255, 255, 0)';
    CKEDITOR.config.highlight_style = {
      element: 'span',
      styles: { 'background-color': '#(backgroundColor)' }
    };
    var styles = new CKEDITOR.style(CKEDITOR.config.highlight_style, vars);
    editor.applyStyle(styles);
    editor.fire('change', this);
  },

  statics: {
    key: 'highlight'
  },

  render: function() {
    var cssClass = 'ae-button ' + this.getStateClasses();
    var parentNode = document.getSelection().extentNode.parentNode;
    var background = window.getComputedStyle(parentNode, null).getPropertyValue('background-color');
    if (background === 'rgb(255, 255, 0)') cssClass += ' ae-button-pressed';
    return (
      <button
        className={cssClass}
        aria-pressed={background === 'rgb(255, 255, 0)'}
        data-type="button-highlight"
        onClick={this.handleClick}
        tabIndex={this.props.tabIndex}>
        <span title="Highlight" className="ae-icon-separator" />
      </button>
    );
  }
});

AlloyEditor.Buttons[ButtonHighlight.key] = (AlloyEditor.ButtonHighlight = ButtonHighlight);
