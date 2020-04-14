import { createAction } from 'redux-actions';

export const login = createAction('LOGIN', (id, log, role, bankId) => ({
  id,
  log,
  role,
  bankId,
}));

export const logout = createAction('LOGOUT', () => ({
}));

export const changeRole = createAction('CHANGE_ROLE', (flag) => ({
  flag,
}));
