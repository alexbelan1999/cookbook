import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import filter from './filter';
import users from './users';
import authorization from './authorization';
import rating from './rating';
import recipes from './recipes';
import calorie from './calorie';
import bank from './bank';

export default combineReducers({
  products,
  cart,
  filter,
  users,
  authorization,
  rating,
  recipes,
  calorie,
  bank,
});
