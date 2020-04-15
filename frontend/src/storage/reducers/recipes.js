import { handleActions } from 'redux-actions';
import {
  removeRecipe, addRecipe, setRecipes, getRecipe, changeRecipe, setPageCountRec, setCurrentPageRec,
} from '../actions/recipes';

export const initialState = {
  isReady: false,
  isLoaded: false,
  items: null,
  pageCount: 0,
  currentPage: 1,
};

export default handleActions({
  [setCurrentPageRec]: (state, action) => ({
    ...state,
    currentPage: action.payload.currentPage,
  }),
  [setPageCountRec]: (state, action) => ({
    ...state,
    pageCount: action.payload.pageCount,
  }),
  [changeRecipe]: (state, action) => ({
    ...state,
    items: state.items.map((o) => {
      if (o.id === action.payload.id) {
        return action.payload.obj;
      }
      return o;
    }),
  }),
  [getRecipe]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id === action.payload.id),
  }),
  [removeRecipe]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id !== action.payload.id),
  }),
  [addRecipe]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      action.payload.obj,
    ],
  }),
  [setRecipes]: (state, action) => ({
    ...state,
    items: action.payload.recipes,
    isReady: true,
    isLoaded: true,
  }),
}, initialState);
