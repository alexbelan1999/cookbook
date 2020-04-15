import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../../../storage/actions/cart';
import * as productsActions from '../../../../storage/actions/products';
import * as authorizationActions from '../../../../storage/actions/authorization';
import ProductCardComponent from './ProductCardComponent';

const mapStateToProps = ({ cart, authorization }, { id }) => ({
  addedCount: cart.items.reduce(
    (count, product) => count + (product.id === id ? 1 : 0),
    0,
  ),
  role: authorization.role,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(cartActions, dispatch),
  ...bindActionCreators(productsActions, dispatch),
  ...bindActionCreators(authorizationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardComponent);
