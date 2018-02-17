import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class File extends Component {
  constructor(props) {
    super(props);
    this.deleteFile = this.deleteFile.bind(this);
    this.storeFile = this.storeFile.bind(this);
  }

  async componentWillMount() {
    const loadDataFromServer = async () => {
      const data = await fetch('/api/', {
        headers: new Headers({
          'content-type': 'application/json',
        }),
        method: 'GET',
      }).then(text => text.json());
      this.props.init(data.files);
    }

    loadDataFromServer();
    setInterval(() => {
      loadDataFromServer();
    }, 1000);
  }

  deleteFile(event, fileName) {
    event.preventDefault();

    if (this.props.isLastFile) {
      confirmAlert({
        title: 'delete this file?',
        message: 'you cannot delete the last file',
        cancelLabel: 'Cancel',
      });
    } else {
      confirmAlert({
        title: 'delete this file?',
        message: `did you want to delete ${fileName}`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        onConfirm: async function () {
          // send to server
          await fetch(
            '/api/',
            {
              headers: new Headers({
                'content-type': 'application/json',
              }),
              method: 'DELETE',
              body: JSON.stringify({ fileName })
            },
          ).then(response => response.json());

          this.props.deleteFile(fileName);
        }.bind(this),
      });
    }
  }

  async storeFile(event) {
    event.preventDefault();

    const newFileName = document.getElementById('newFile').value;

    // send to server
    await fetch(
      '/api/',
      {
        headers: new Headers({
          'content-type': 'application/json',
        }),
        method: 'POST',
        body: JSON.stringify({ fileName: newFileName, content: '' })
      },
    ).then(response => response.json());

    this.props.storeFile(newFileName);
  }

  selectFile(event, fileName) {
    event.preventDefault();

    // select-file visible
    const filesList = document.getElementById('files');
    Array.from(filesList.children).map(file => file.classList.remove('selected-file'));
    document.getElementById(`file-${fileName}`).classList.add('selected-file');

    // select file
    this.props.selectFile(fileName);
  }

  render() {
    return (
      <ul className="files" id="files">
        <li>
          <form onSubmit={event => this.storeFile(event)}>
            <input placeholder="please add your file" type="text" className="file-name" name="newFile" id="newFile" defaultValue="" />
            <input type="submit" className="submit" value="save" />
          </form>
        </li>
        {
          this.props.files.map((file, idx) => {
            const selectedFile = this.props.selectedFile === file.fileName ? 'selected-file' : '';
            return (
            <li className={`file ${selectedFile}`} id={`file-${file.fileName}`} key={idx}>
                <span title="selected this file" className="filename" onClick={event => this.selectFile(event, file.fileName)}>{file.fileName}</span>
                <span title="delete file" className="delete-file" onClick={event => this.deleteFile(event, file.fileName)}>X</span>
              </li>
            );
          })
        }
      </ul>
    );
  }
}
