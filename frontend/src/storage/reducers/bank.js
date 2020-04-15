import { handleActions } from 'redux-actions';
import {
  removeBank, addBank, setBank, getBank, changeBank, setPageCountBank,
  setCurrentPageBank, addTransaction,
} from '../actions/bank';

export const initialState = {
  isReady: false,
  isLoaded: false,
  items: null,
  pageCount: 0,
  currentPage: 1,
  transactions: [],
};

export default handleActions({
  [setCurrentPageBank]: (state, action) => ({
    ...state,
    currentPage: action.payload.currentPage,
  }),
  [setPageCountBank]: (state, action) => ({
    ...state,
    pageCount: action.payload.pageCount,
  }),
  [changeBank]: (state, action) => ({
    ...state,
    items: state.items.map((o) => {
      if (o.id === action.payload.id) {
        return action.payload.obj;
      }
      return o;
    }),
  }),
  [getBank]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id === action.payload.id),
  }),
  [removeBank]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id !== action.payload.id),
  }),
  [addBank]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      action.payload.obj,
    ],
  }),
  [addTransaction]: (state, action) => ({
    ...state,
    transactions: [
      ...state.transactions,
      action.payload.obj,
    ],
  }),
  [setBank]: (state, action) => ({
    ...state,
    items: action.payload.bank,
    isReady: true,
    isLoaded: true,
  }),
}, initialState);
