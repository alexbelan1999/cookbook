import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../../../storage/actions/users';
import SubmitButtonComponent from './SubmitButtonComponent';

const mapStateToProps = ({ users }) => ({
  isReady: users.isReady,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButtonComponent);
