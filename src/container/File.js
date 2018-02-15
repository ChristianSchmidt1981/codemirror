import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import File from '../components/File.jsx';
import { deleteFile, storeFile, selectFile } from '../actions/index';

const mapStateToProps = state => ({
  files: state.files,
  selectedFile: state.selectedFile,
  isLastFile: state.files.length === 1,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { deleteFile, storeFile, selectFile },
  dispatch,
);

const VisibleFile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(File);

export default VisibleFile;
