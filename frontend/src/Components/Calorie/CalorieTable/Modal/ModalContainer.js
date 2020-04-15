import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as calorieActions from '../../../../storage/actions/calorie';
import ModalComponent from './ModalComponent';

const mapStateToProps = ({ recipes }) => ({
  isLoaded: recipes.isLoaded,
  currentPage: recipes.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(calorieActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
