import { handleActions } from 'redux-actions';
import { setFilter, setSearchQuery } from '../actions/filter';

export const initialState = {
  searchQuery: '',
  filterBy: 'all',
};

export default handleActions({
  [setFilter]: (state, action) => ({
    ...state,
    filterBy: action.payload.filter,
  }),
  [setSearchQuery]: (state, action) => ({
    ...state,
    searchQuery: action.payload.value,
  }),
}, initialState);
