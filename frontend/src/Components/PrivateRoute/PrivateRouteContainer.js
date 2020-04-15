import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorizationActions from '../../storage/actions/authorization';
import PrivateRouteComponent from './PrivateRouteComponent';

const mapStateToProps = ({ authorization }) => ({
  role: authorization.role,
  isAuth: authorization.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(authorizationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRouteComponent);
