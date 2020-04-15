import { handleActions } from 'redux-actions';
import {
  addToCart, removeFromCart, clearCart, removeOneFromCart,
} from '../actions/cart';

export const initialState = {
  items: [],
};

export default handleActions({
  [clearCart]: (state) => ({
    ...state,
    items: [],
  }),
  [addToCart]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      action.payload.obj,
    ],
  }),
  [removeFromCart]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id !== action.payload.id),
  }),
  [removeOneFromCart]: (state, action) => ({
    ...state,
    items: state.items.slice(0, state.items.findIndex((o) => (o.id === action.payload.id)))
      .concat(state.items.slice(state.items.findIndex((o) => (o.id === action.payload.id)) + 1)),
  }),
}, initialState);
