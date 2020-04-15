import { handleActions } from 'redux-actions';
import { addMark, removeMark } from '../actions/rating';

export const initialState = {
  items: [],
};

export default handleActions({
  [addMark]: (state, action) => ({
    ...state,
    items: [
      ...state.items,
      action.payload.obj,
    ],
  }),
  [removeMark]: (state, action) => ({
    ...state,
    items: state.items.filter((o) => o.id !== action.payload.id),
  }),
}, initialState);
