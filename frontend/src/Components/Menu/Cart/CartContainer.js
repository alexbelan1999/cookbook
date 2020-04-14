import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../../storage/actions/cart';
import Cart from './CartComponent';

const mapStateToProps = ({ cart }) => ({
  totalPrice:
    parseFloat((cart.items.reduce((total, product) => total + product.price, 0)).toFixed(3)),
  count: cart.items.length,
  items: cart.items,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(cartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
