import { createAction } from 'redux-actions';
import axios from '../../axiosInstance';

export const setCurrentPageRec = createAction('SET_CURRENT_PAGE_REC', (currentPage) => ({
  currentPage,
}));

export const setPageCountRec = createAction('SET_PAGE_COUNT_REC', (pageCount) => ({
  pageCount,
}));

export const changeRecipe = createAction('CHANGE_RECIPE', (id, obj) => ({
  id,
  obj,
}));

export const getRecipe = createAction('GET_RECIPE', (id) => ({
  id,
}));

export const removeRecipe = createAction('REMOVE_RECIPE', (id) => ({
  id,
}));

export const addRecipe = createAction('ADD_RECIPE', (obj) => ({
  obj,
}));

export const setRecipes = createAction('SET_RECIPES', (recipes) => ({
  recipes,
}));

export const loadDataRecipes = () => (dispatch) => {
  axios.get('/recipes.json').then(({ data }) => {
    dispatch(setRecipes(data));
  });
};
