import { createAction } from 'redux-actions';
import axios from '../../axiosInstance';

export const setCurrentPage = createAction('SET_CURRENT_PAGE_CAL', (currentPage) => ({
  currentPage,
}));

export const setPageCount = createAction('SET_PAGE_COUNT_CAL', (pageCount) => ({
  pageCount,
}));

export const changeCalorie = createAction('CHANGE_CALORIE_CAL', (id, obj) => ({
  id,
  obj,
}));

export const getCalorie = createAction('GET_CALORIE_CAL', (id) => ({
  id,
}));

export const removeCalorie = createAction('REMOVE_CALORIE_CAL', (id) => ({
  id,
}));

export const addCalorie = createAction('ADD_CALORIE', (obj) => ({
  obj,
}));

export const setCalories = createAction('SET_CALORIE', (calories) => ({
  calories,
}));

export const loadData = () => (dispatch) => {
  axios.get('/calories.json').then(({ data }) => {
    dispatch(setCalories(data.ingredients));
  });
};
