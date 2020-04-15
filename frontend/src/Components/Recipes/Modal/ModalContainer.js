import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipesActions from '../../../storage/actions/recipes';
import * as productsActions from '../../../storage/actions/products';
import ModalComponent from './ModalComponent';

const mapStateToProps = ({ recipes, products }) => ({
  products: products.items,
  isReady: recipes.isReady,
  isLoaded: recipes.isLoaded,
  isReadyProducts: products.isReady,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(recipesActions, dispatch),
  ...bindActionCreators(productsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
