import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import File from '../container/File';

import '../assets/css/main.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(editor, data, text) {
    const line = data.to.line;
    const position = data.to.ch;

    this.props.updateFile(text, { line, position });
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

