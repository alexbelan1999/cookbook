import { createAction } from 'redux-actions';
import axios from '../../axiosInstance';

export const setCurrentPage = createAction('SET_CURRENT_PAGE', (currentPage) => ({
  currentPage,
}));

export const setPageCount = createAction('SET_PAGE_COUNT', (pageCount) => ({
  pageCount,
}));

export const changeProduct = createAction('CHANGE_PRODUCT', (id, obj) => ({
  id,
  obj,
}));

export const removeProduct = createAction('REMOVE_PRODUCT', (id) => ({
  id,
}));

export const getProduct = createAction('GET_PRODUCT', (id) => ({
  id,
}));

export const addProduct = createAction('ADD_PRODUCT', (obj) => ({
  obj,
}));

export const setProducts = createAction('SET_PRODUCTS', (products) => ({
  products,
}));

export const loadData = () => (dispatch) => {
  axios.get('/products.json').then(({ data }) => {
    dispatch(setProducts(data));
  });
};
