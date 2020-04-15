import { handleActions } from 'redux-actions';
import {
  removeCalorie, addCalorie, setCalories, getCalorie, changeCalorie, setPageCount, setCurrentPage,
} from '../actions/calorie';

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
  [changeCalorie]: (state, action) => ({
    ...state,
    items: state.items.map((o) => {
      if (o.id === action.payload.id) {
        return action.payload.obj;
      }
      return o;
    }),
  }),
  [getCalorie]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id === action.payload.id),
  }),
  [removeCalorie]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id !== action.payload.id),
  }),
  [addCalorie]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      action.payload.obj,
    ],
  }),
  [setCalories]: (state, action) => ({
    ...state,
    items: action.payload.calories,
    isReady: true,
    isLoaded: true,
  }),
}, initialState);
