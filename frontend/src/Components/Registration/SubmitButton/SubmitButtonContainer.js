import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorizationActions from '../../../storage/actions/authorization';
import * as usersActions from '../../../storage/actions/users';
import SubmitButtonComponent from './SubmitButtonComponent';

const mapStateToProps = ({ authorization }) => ({
  role: authorization.role,
  isAuth: authorization.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(authorizationActions, dispatch),
  ...bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButtonComponent);
