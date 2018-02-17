const FileTemplate = {
  fileName: 'test',
  text: '',
  cursorPosition: {
    line: 0,
    position: 1,
  },
};

const DefaultState = {
  files: [FileTemplate],
  selectedFile: 'test',
};

function Reducer(state = DefaultState, action) {
  const getCopyOfState = _state => JSON.parse(JSON.stringify(_state));
  switch (action.type) {
    case 'INIT': {
      const newState = getCopyOfState(state);
      if (action.files) {
        newState.files = action.files.map((file) => {
          let newFile = newState.files.filter(stateFile => file.fileName === stateFile.fileName)[0];
          if (!newFile) {
            newFile = JSON.parse(JSON.stringify(FileTemplate));
            newFile.fileName = file.fileName;
          }
          newFile.text = file.content;
          return newFile;
        });
        newState.selectedFile = action.files[0].fileName;
      }
      return newState;
    }

    case 'SELECT_FILE': {
      const newState = getCopyOfState(state);
      newState.selectedFile = action.fileName;
      return newState;
    }

    case 'STORE_FILE': {
      const newState = getCopyOfState(state);
      newState.selectedFile = action.fileName;
      newState.files.push({
        fileName: action.fileName,
        text: '',
        cursorPosition: {
          line: 0,
          position: 1,
        },
      });
      return newState;
    }

    case 'DELETE_FILE': {
      const newState = getCopyOfState(state);
      if (newState.selectedFile === action.fileName) {
        newState.selectedFile = newState.files[0].fileName;
      }
      newState.files = newState.files
        .filter(fileFromIteration => fileFromIteration.fileName !== action.fileName);

      return newState;
    }

    case 'UPDATE_FILE': {
      const newState = getCopyOfState(state);
      const file = newState.files
        .filter(fileFromIteration => fileFromIteration.fileName === state.selectedFile)[0];

      file.text = action.text;
      file.fileName = action.fileName;
      file.cursorPosition = {
        line: action.cursorPosition.line,
        position: action.cursorPosition.position,
      };

      return newState;
    }

    default:
      return state;
  }
}

module.exports = Reducer;
