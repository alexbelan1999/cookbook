import index from './index';
import { initialState as initialAuthorizationState } from './authorization';
import { initialState as initialCartState } from './cart';
import { initialState as initialFilterState } from './filter';
import { initialState as initialProductsState } from './products';
import { initialState as initialRatingState } from './rating';
import { initialState as initialUsersState } from './users';

it('should return the default state for all', () => {
  const state = undefined;
  const action = {};
  const expectedOutput = {
    authorization: initialAuthorizationState,
    cart: initialCartState,
    filter: initialFilterState,
    products: initialProductsState,
    rating: initialRatingState,
    users: initialUsersState,
  };
  expect(index(state, action)).toEqual(expectedOutput);
});
