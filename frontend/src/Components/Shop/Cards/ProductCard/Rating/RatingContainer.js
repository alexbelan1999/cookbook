import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ratingActions from '../../../../../storage/actions/rating';
import * as productsActions from '../../../../../storage/actions/products';
import * as usersActions from '../../../../../storage/actions/users';
import RatingComponent from './RatingComponent';

const mapStateToProps = ({ mark, authorization, users }) => ({
  productRating: mark,
  id: authorization.id,
  users: users.items,
  isReady: users.isReady,
  isLoaded: users.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(ratingActions, dispatch),
  ...bindActionCreators(productsActions, dispatch),
  ...bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingComponent);
