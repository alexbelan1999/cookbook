import reducer, { initialState } from './cart';
import {
  addToCart, removeFromCart, clearCart, removeOneFromCart,
} from '../actions/cart';

it('should correctly change state after adding to cart', () => {
  const state = {
    items: [{ value: 'first item' }],
  };
  const action = addToCart({ value: 'addedItem' });
  const expectedOutput = {
    items: [{ value: 'first item' }, { value: 'addedItem' }],
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after removing from cart', () => {
  const state = {
    items: [{ id: 1, value: 'first item' }],
  };
  const action = removeFromCart(1);
  const expectedOutput = {
    items: [],
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after clearing cart', () => {
  const state = {
    items: [{ value: 'first item' }, { value: 'addedItem' }],
  };
  const action = clearCart();
  const expectedOutput = {
    items: [],
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after removing one from cart', () => {
  const state = {
    items: [{ id: 1, value: 'first item' }, { id: 1, value: 'second item' }],
  };
  const action = removeOneFromCart(1);
  const expectedOutput = {
    items: [{ id: 1, value: 'second item' }],
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should return the default state', () => {
  const state = undefined;
  const action = {};
  const expectedOutput = initialState;
  expect(reducer(state, action)).toEqual(expectedOutput);
});
