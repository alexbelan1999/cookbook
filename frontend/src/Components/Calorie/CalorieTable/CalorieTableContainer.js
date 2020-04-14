import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipesActions from '../../../storage/actions/calorie';
import CalorieTableComponent from './CalorieTableComponent';


const filterCalories = (calories, searchQuery) => calories.filter(
  (o) => o.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0,
);

const searchProducts = (
  calories, searchQuery,
) => filterCalories(calories, searchQuery);

const mapStateToProps = ({ calorie, filter, authorization }) => ({
  calories: calorie.items && searchProducts(calorie.items, filter.searchQuery),
  isReady: calorie.isReady,
  isLoaded: calorie.isLoaded,
  pageCount: calorie.pageCount,
  currentPage: calorie.currentPage,
  role: authorization.role,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(recipesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieTableComponent);
