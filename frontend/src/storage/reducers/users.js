import { handleActions } from 'redux-actions';
import {
  removeUser, addUser, setUsers, getUser, changeUser, setPageCountUsers, setCurrentPageUsers,
} from '../actions/users';

export const initialState = {
  isReady: false,
  isLoaded: false,
  items: null,
  pageCount: 0,
  currentPage: 1,
};

export default handleActions({
  [setCurrentPageUsers]: (state, action) => ({
    ...state,
    currentPage: action.payload.currentPage,
  }),
  [setPageCountUsers]: (state, action) => ({
    ...state,
    pageCount: action.payload.pageCount,
  }),
  [changeUser]: (state, action) => ({
    ...state,
    items: state.items.map((o) => {
      if (o.id === action.payload.id) {
        return action.payload.obj;
      }
      return o;
    }),
  }),
  [getUser]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id === action.payload.id),
  }),
  [removeUser]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id !== action.payload.id),
  }),
  [addUser]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      action.payload.obj,
    ],
  }),
  [setUsers]: (state, action) => ({
    ...state,
    items: action.payload.users,
    isReady: true,
    isLoaded: true,
  }),
}, initialState);
