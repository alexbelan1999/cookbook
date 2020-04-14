import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recipesActions from '../../../../storage/actions/recipes';
import ModalComponent from './ModalComponent';

const mapStateToProps = ({ recipes }) => ({
  isLoaded: recipes.isLoaded,
  currentPage: recipes.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(recipesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);