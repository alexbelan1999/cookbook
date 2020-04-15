import { createAction } from 'redux-actions';

export const addMark = createAction('ADD_MARK', (obj) => ({
  obj,
}));

export const removeMark = createAction('REMOVE_MARK', (id) => ({
  id,
}));
