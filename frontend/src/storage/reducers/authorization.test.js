import reducer, { initialState } from './authorization';
import { login, logout, changeRole } from '../actions/authorization';

it('should correctly change state after login', () => {
  const state = initialState;
  const action = login(0, 'login', 'admin');
  const expectedOutput = {
    id: 0,
    login: 'login',
    role: 'admin',
    isAuth: true,
    userSwitch: false,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after logout', () => {
  const state = initialState;
  const action = logout();
  const expectedOutput = {
    id: null,
    login: null,
    role: null,
    isAuth: false,
    userSwitch: false,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change role to user', () => {
  const state = initialState;
  const action = changeRole(true);
  const expectedOutput = {
    isAuth: false,
    id: null,
    login: null,
    role: 'user',
    userSwitch: true,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change role to admin', () => {
  const state = initialState;
  const action = changeRole(false);
  const expectedOutput = {
    isAuth: false,
    id: null,
    login: null,
    role: 'admin',
    userSwitch: false,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should return the default state', () => {
  const state = undefined;
  const action = {};
  const expectedOutput = initialState;
  expect(reducer(state, action)).toEqual(expectedOutput);
});
