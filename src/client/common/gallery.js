import React from 'react';
import Dropzone from 'react-dropzone';

export default class gallery extends React.Component {
  componentWillMount() {
    this.setState({ images: [] });
  }
  componentWillReceiveProps(newProps) {
    let newImages = newProps.images ? newProps.images : [];
    let oldImages = this.props.images ? this.props.images : [];
    console.log(newImages);
    if (oldImages.length !== newImages.length) this.setState({ images: newImages });
  }
  onOpenClick() {
    this.dropzone.open();
  }
  handleDrop(acceptedFiles) {
    let images = [].concat(this.state.images);
    images = images.concat(acceptedFiles);
    this.setState({
      images
    });
    this.props.onChange(images);
  }
  handleRemove(k) {
    let images = [].concat(this.state.images);
    images.splice(k, 1);
    this.setState({
      images
    });
    this.props.onChange(images);
  }
  render() {
    return (
      <div>
        <Dropzone
          ref={node => {
            this.dropzone = node;
          }}
          onDrop={this.handleDrop.bind(this)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <button type="button" onClick={this.onOpenClick.bind(this)}>
          Open Dropzone
        </button>
        {this.state.images && this.state.images.length > 0
          ? <div>
              <h2>الصور</h2>
              <div>
                {this.state.images.map((file, k) => {
                  const image = file instanceof window.File
                    ? <img key={k} style={{ width: '100%' }} src={file.preview} />
                    : <img
                        key={k}
                        style={{ width: '100%', maxHeight: 225 }}
                        src={`\\uploads\\gallery\\${this.props.id}\\${file.name}`}
                      />;
                  return (
                    <div
                      className="thumbnail"
                      style={{ maxWidth: 250, height: 280, margin: 10, float: 'right' }}>
                      {image}
                      <div className="caption">
                        <a className="btn btn-danger" onClick={this.handleRemove.bind(this, k)}>
                          حذف الصورة{' '}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="clearfix" />
            </div>
          : null}
      </div>
    );
  }
}
