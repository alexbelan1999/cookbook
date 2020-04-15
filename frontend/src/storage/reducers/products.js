import { handleActions } from 'redux-actions';
/* eslint-disable */
import {
  removeProduct, addProduct, setProducts, changeProduct, setPageCount, setCurrentPage,
} from '../actions/products';

export const initialState = {
  isReady: false,
  isLoaded: false,
  items: null,
  pageCount: 0,
  currentPage: 1,
};

export default handleActions({
  [setCurrentPage]: (state, action) => ({
    ...state,
    currentPage: action.payload.currentPage,
  }),
  [setPageCount]: (state, action) => ({
    ...state,
    pageCount: action.payload.pageCount,
  }),
  [changeProduct]: (state, action) => ({
    ...state,
    items: state.items.map((o) => {
      if (o.id === action.payload.id) {
        return {
          /* ...o,
          ...action.payload.obj,
          tags: [...o.tags,...action.payload.obj.tags], */
          ...action.payload.obj,
        };
      }
      return o;
    }),
  }),
  [removeProduct]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id !== action.payload.id),
  }),
  [addProduct]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      action.payload.obj,
    ],
  }),
  [setProducts]: (state, action) => ({
    ...state,
    items: action.payload.products,
    isReady: true,
    isLoaded: true,
  }),
}, initialState);
