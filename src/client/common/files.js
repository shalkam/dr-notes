import React from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import FileUpload from 'material-ui/svg-icons/file/file-upload';

export default class Files extends React.Component {
  componentWillMount() {
    this.setState({ files: [] });
  }
  componentWillReceiveProps(newProps) {
    let newFiles = newProps.files ? newProps.files : [];
    let oldFiles = this.props.files ? this.props.files : [];
    if (oldFiles.length !== newFiles.length) this.setState({ files: newFiles });
  }
  onOpenClick() {
    this.dropzone.open();
  }
  handleDrop(acceptedFiles) {
    let files = [].concat(this.state.files);
    files = files.concat(acceptedFiles);
    this.setState({
      files
    });
    this.props.onChange(files);
  }
  handleRemove(k) {
    let files = [].concat(this.state.files);
    files.splice(k, 1);
    this.setState({
      files
    });
    this.props.onChange(files);
  }
  render() {
    return (
      <div style={{ paddingBottom: 10 }}>
        <Dropzone
          ref={node => {
            this.dropzone = node;
          }}
          onDrop={this.handleDrop.bind(this)}
          style={{}}>
          <Paper
            style={{
              width: '100%',
              margin: '20px 0',
              padding: '50px 0',
              textAlign: 'center',
              display: 'inline-block'
            }}
            zDepth={2}>
            Drop files here, or click to select files to upload. <FileUpload />
          </Paper>
        </Dropzone>
        <RaisedButton
          label="Choose Files"
          labelPosition="before"
          icon={<FileUpload />}
          fullWidth={true}
          onTouchTap={this.onOpenClick.bind(this)}
          containerElement="label"
        />
        {this.state.files && this.state.files.length > 0
          ? <List>
              <Subheader>Attachments</Subheader>
              {this.state.files.map((file, k) => {
                return (
                  <div key={k}>
                    <ListItem
                      primaryText={file.name}
                      leftIcon={
                        <FloatingActionButton
                          mini={true}
                          onTouchTap={this.handleRemove.bind(this, k)}>
                          <ContentRemoveCircle />
                        </FloatingActionButton>
                      }
                    />
                    <Divider inset={true} />
                  </div>
                );
              })}
            </List>
          : null}
      </div>
    );
  }
}
