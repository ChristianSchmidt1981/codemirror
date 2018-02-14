import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFile } from '../actions/index';
import App from '../components/App.jsx';

const mapStateToProps = state => ({
  file: state.files.filter(file => file.fileName === state.selectedFile)[0],
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { updateFile },
  dispatch,
);

const VisibleApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default VisibleApp;
