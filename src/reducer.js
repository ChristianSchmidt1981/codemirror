const DefaultState = {
  files: [{
    fileName: 'test',
    text: '',
    cursorPosition: {
      line: 0,
      position: 1,
    },
  }],
  selectedFile: 'test',
};

function Reducer(state = DefaultState, action) {
  const getCopyOfState = _state => JSON.parse(JSON.stringify(_state));
  switch (action.type) {
    case 'SELECT_FILE': {
      const newState = getCopyOfState(state);
      newState.selectedFile = action.fileName;
      return newState;
    }

    case 'STORE_FILE': {
      const newState = getCopyOfState(state);
      newState.selectedFile = action.fileName,
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
      newState.selectedFile = newState.files[0].fileName;
      newState.files = newState.files
        .filter(fileFromIteration => fileFromIteration.fileName !== action.fileName);

      return newState;
    }

    case 'UPDATE_FILE': {
      const newState = getCopyOfState(state);
      const file = newState.files
        .filter(fileFromIteration => fileFromIteration.fileName === state.selectedFile)[0];
      console.log(file, action, 999);
      file.text = action.text;
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
