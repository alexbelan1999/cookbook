import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../../storage/actions/users';
import * as authorizationActions from '../../storage/actions/authorization';
import * as bankActions from '../../storage/actions/bank';
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
  ...bindActionCreators(bankActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationComponent);
