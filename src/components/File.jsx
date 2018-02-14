import React, { Component } from 'react';

export default class File extends Component {
  constructor(props) {
    super(props);
    this.deleteFile = this.deleteFile.bind(this);
    this.storeFile = this.storeFile.bind(this);
  }

  deleteFile(event, fileName) {
    event.preventDefault();
    this.props.deleteFile(fileName);
  }

  storeFile(event) {
    event.preventDefault();
    const newFileName = document.getElementById('newFile').value;

    this.props.storeFile(newFileName);
  }

  selectFile(event, fileName) {
    event.preventDefault();
    this.props.selectFile(fileName);
  }

  render() {
    return (
      <div>
            <form onSubmit={event => this.storeFile(event)}>
              <input type="text" name="newFile" id="newFile" defaultValue="" />
              <input type="submit" value="save" />
            </form>
        <ul>
          {
            this.props.files.map((file, idx) => {
              return (
                <li key={idx}>
                  <span onClick={event => this.selectFile(event, file.fileName)}>{file.fileName}</span>
                  <span onClick={event => this.deleteFile(event, file.fileName)}>X</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
