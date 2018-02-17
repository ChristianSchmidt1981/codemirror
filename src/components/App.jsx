import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import File from '../container/File';

import '../assets/css/main.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  async onChange(editor, data, text) {
    const line = data.to.line;
    const position = data.to.ch;

    // send to server
    await fetch(
      '/api/',
      {
        method: 'PUT',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify({ fileName: this.props.file.fileName, content: text }),
      },
    ).then(response => response.json());

    this.props.updateFile(this.props.file.fileName, text, { line, position });
  }

  render() {
    return (
      <div>
        <File />

        <CodeMirror
          value={this.props.file.text}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
          }}
          cursor={{
            line: this.props.file.cursorPosition.line,
            ch: this.props.file.cursorPosition.position,
          }}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
