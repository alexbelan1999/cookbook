import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../../storage/actions/users';
import * as bankActions from '../../storage/actions/bank';
import * as authorizationActions from '../../storage/actions/authorization';
import LoginComponent from './LoginComponent';

const mapStateToProps = ({ bank, users, authorization }) => ({
  users: users.items,
  bank: bank.items,
  isReady: users.isReady,
  isLoaded: users.isLoaded,
  isAuth: authorization.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(bankActions, dispatch),
  ...bindActionCreators(usersActions, dispatch),
  ...bindActionCreators(authorizationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
