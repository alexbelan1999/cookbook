import { createAction } from 'redux-actions';
import axios from '../../axiosInstance';

export const setCurrentPageBank = createAction('SET_CURRENT_PAGE_BANK', (currentPage) => ({
  currentPage,
}));

export const setPageCountBank = createAction('SET_PAGE_COUNT_BANK', (pageCount) => ({
  pageCount,
}));

export const changeBank = createAction('CHANGE_BANK', (id, obj) => ({
  id,
  obj,
}));

export const getBank = createAction('GET_USER', (id) => ({
  id,
}));

export const removeBank = createAction('REMOVE_BANK', (id) => ({
  id,
}));

export const addBank = createAction('ADD_BANK', (obj) => ({
  obj,
}));

export const addTransaction = createAction('ADD_TRANSACTION', (obj) => ({
  obj,
}));

export const setBank = createAction('SET_BANK', (bank) => ({
  bank,
}));

export const loadDataBank = () => (dispatch) => {
  axios.get('/bank.json').then(({ data }) => {
    dispatch(setBank(data.accounts));
  });
};
