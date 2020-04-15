import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipesActions from '../../../storage/actions/recipes';
import * as productActions from '../../../storage/actions/products';
import * as cartActions from '../../../storage/actions/cart';
import RecipesTableComponent from './RecipesTableComponent';


const filterRecipes = (recipes, searchQuery) => recipes.filter(
  (o) => o.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
  || o.recipe.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0,
);

const searchProducts = (
  recipes, searchQuery,
) => filterRecipes(recipes, searchQuery);

const mapStateToProps = ({
  recipes, filter, authorization, products,
}) => ({
  recipes: recipes.items && searchProducts(recipes.items, filter.searchQuery),
  isReady: recipes.isReady,
  isLoaded: recipes.isLoaded,
  pageCount: recipes.pageCount,
  currentPage: recipes.currentPage,
  role: authorization.role,
  products: products.items,
  isReadyProducts: products.isReady,
  isLoadedProducts: products.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(recipesActions, dispatch),
  ...bindActionCreators(cartActions, dispatch),
  ...bindActionCreators(productActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesTableComponent);
