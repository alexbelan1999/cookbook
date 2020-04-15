import { createAction } from 'redux-actions';

export const setFilter = createAction('SET_FILTER', (filter) => ({
  filter,
}));

export const setSearchQuery = createAction('SET_QUERY', (value) => ({
  value,
}));
