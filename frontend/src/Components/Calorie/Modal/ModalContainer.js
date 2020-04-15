import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as caloriesActions from '../../../storage/actions/calorie';
import ModalComponent from './ModalComponent';

const mapStateToProps = ({ recipes, products }) => ({
  products: products.items,
  isReady: recipes.isReady,
  isLoaded: recipes.isLoaded,
  isReadyProducts: products.isReady,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(caloriesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
