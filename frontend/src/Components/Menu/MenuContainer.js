import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../storage/actions/cart';
import * as filterActions from '../../storage/actions/filter';
import Menu from './MenuComponent';

const mapStateToProps = ({ cart, authorization }) => ({
  totalPrice:
    parseFloat((cart.items.reduce((total, product) => total + product.price, 0)).toFixed(3)),
  count: cart.items.length,
  items: cart.items,
  log: authorization.login,
  role: authorization.role,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(cartActions, dispatch),
  ...bindActionCreators(filterActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
