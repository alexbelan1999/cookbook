import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../../storage/actions/users';
import * as authorizationActions from '../../storage/actions/authorization';
import RegistrationComponent from './RegistrationComponent';

const mapStateToProps = ({ users, authorization }) => ({
  users: users.items,
  isReady: users.isReady,
  isLoaded: users.isLoaded,
  role: authorization.role,
  isAuth: authorization.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(usersActions, dispatch),
  ...bindActionCreators(authorizationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationComponent);
