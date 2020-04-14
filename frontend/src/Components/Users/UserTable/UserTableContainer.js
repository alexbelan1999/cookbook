import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersActions from '../../../storage/actions/users';
import UserTableComponent from './UserTableComponent';


const filterUsers = (users, searchQuery) => users.filter(
  (o) => o['first name'].toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
  || o['last name'].toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
  || o['e-mail'].toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0,
);

const searchProducts = (
  users, searchQuery,
) => filterUsers(users, searchQuery);

const mapStateToProps = ({ users, filter }) => ({
  users: users.items && searchProducts(users.items, filter.searchQuery),
  isReady: users.isReady,
  isLoaded: users.isLoaded,
  pageCount: users.pageCount,
  currentPage: users.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(usersActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserTableComponent);
