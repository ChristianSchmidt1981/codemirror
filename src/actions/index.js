const updateFile = (text, cursorPosition) => ({
  type: 'UPDATE_FILE',
  text,
  cursorPosition,
});

const selectFile = fileName => ({
  type: 'SELECT_FILE',
  fileName,
});

const deleteFile = fileName => ({
  type: 'DELETE_FILE',
  fileName,
});

const storeFile = fileName => ({
  type: 'STORE_FILE',
  fileName,
});

module.exports = {
  updateFile,
  deleteFile,
  storeFile,
  selectFile,
};
