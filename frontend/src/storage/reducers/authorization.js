import { handleActions } from 'redux-actions';
import { login, logout, changeRole } from '../actions/authorization';

export const initialState = {
  isAuth: false,
  id: null,
  login: null,
  role: null,
  userSwitch: false,
};

export default handleActions({
  [changeRole]: (state, action) => ({
    ...state,
    userSwitch: action.payload.flag,
    role: action.payload.flag ? 'user' : 'admin',
  }),
  [login]: (state, action) => ({
    ...state,
    id: action.payload.id,
    login: action.payload.log,
    role: action.payload.role,
    isAuth: true,
  }),
  [logout]: (state) => ({
    ...state,
    id: null,
    login: null,
    role: null,
    isAuth: false,
  }),
}, initialState);
