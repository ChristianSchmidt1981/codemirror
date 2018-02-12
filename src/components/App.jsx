import React, { Component}  from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(editor, data, value) {
        console.log(editor,data, value);
    }

    render() {
        return <CodeMirror
        value='<h1>I ♥ react-codemirror2</h1>'
        options={{
          mode: 'xml',
          theme: 'material',
          lineNumbers: true
        }}
        onChange={this.onChange}
      />;
    };
}

