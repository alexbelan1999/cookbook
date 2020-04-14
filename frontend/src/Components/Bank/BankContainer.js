import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bankActions from '../../storage/actions/bank';
import * as cartActions from '../../storage/actions/cart';
import * as authorizationActions from '../../storage/actions/authorization';
import BankComponent from './BankComponent';

const searchBank = (bank, id) => bank.find((obj) => obj.id === id);

const mapStateToProps = ({ cart, bank, authorization }) => ({
  totalPrice:
    parseFloat((cart.items.reduce((total, product) => total + product.price, 0)).toFixed(3)),
  count: cart.items.length,
  items: cart.items,
  account: searchBank(bank.items, authorization.id),
  cash: searchBank(bank.items, 999),
  isReady: bank.isReady,
  isLoaded: bank.isLoaded,
  transactions: bank.transactions,
  isAuth: authorization.isAuth,
  userSwitch: authorization.userSwitch,
  role: authorization.role,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(cartActions, dispatch),
  ...bindActionCreators(bankActions, dispatch),
  ...bindActionCreators(authorizationActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankComponent);
