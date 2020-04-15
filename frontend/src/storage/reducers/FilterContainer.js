import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as filterActions from '../../../storage/actions/filter';
import * as productsActions from '../../../storage/actions/products';
import FilterComponent from './FilterComponent';

const mapStateToProps = ({ filter }) => ({
  filterBy: filter.filterBy,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(filterActions, dispatch),
  ...bindActionCreators(productsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterComponent);
