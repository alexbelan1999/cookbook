import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as filterActions from '../../../storage/actions/filter';
import * as usersActions from '../../../storage/actions/users';
import FilterComponent from './FilterComponent';

const mapStateToProps = ({ filter, recipes }) => ({
  filterBy: filter.filterBy,
  currentPage: recipes.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(filterActions, dispatch),
  ...bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
