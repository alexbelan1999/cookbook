import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../../storage/actions/bank';
import * as authorizationActions from '../../storage/actions/authorization';
import AccountPageComponent from './AccountPageComponent';

const searchUser = (users, id) => users.find((obj) => obj.id === id);

const mapStateToProps = ({ bank, authorization }) => ({
  user: searchUser(bank.items, authorization.id),
  isReady: bank.isReady,
  isLoaded: bank.isLoaded,
  isAuth: authorization.isAuth,
  userSwitch: authorization.userSwitch,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(usersActions, dispatch),
  ...bindActionCreators(authorizationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageComponent);
