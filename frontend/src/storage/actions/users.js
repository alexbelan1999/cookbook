import { createAction } from 'redux-actions';
import axios from '../../axiosInstance';

export const setCurrentPageUsers = createAction('SET_CURRENT_PAGE_USER', (currentPage) => ({
  currentPage,
}));

export const setPageCountUsers = createAction('SET_PAGE_COUNT_USER', (pageCount) => ({
  pageCount,
}));

export const changeUser = createAction('CHANGE_USER', (id, obj) => ({
  id,
  obj,
}));

export const getUser = createAction('GET_USER', (id) => ({
  id,
}));

export const removeUser = createAction('REMOVE_USER', (id) => ({
  id,
}));

export const addUser = createAction('ADD_USER', (obj) => ({
  obj,
}));

export const setUsers = createAction('SET_USERS', (users) => ({
  users,
}));

export const loadData = () => (dispatch) => {
  axios.get('/users.json').then(({ data }) => {
    dispatch(setUsers(data.users));
  });
};
