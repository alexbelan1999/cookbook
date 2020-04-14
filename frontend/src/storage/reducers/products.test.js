import reducer, { initialState } from './products';
import {
  removeProduct, addProduct, setProducts, changeProduct, setPageCount, setCurrentPage,
} from '../actions/products';

it('should correctly change state after removing product', () => {
  const state = {
    isReady: false,
    isLoaded: false,
    items: [{ id: 1 }, { id: 2 }, { id: 3 }],
    pageCount: 0,
    currentPage: 1,
  };
  const action = removeProduct(2);
  const expectedOutput = {
    isReady: false,
    isLoaded: false,
    items: [{ id: 1 }, { id: 3 }],
    pageCount: 0,
    currentPage: 1,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after adding product', () => {
  const state = {
    isReady: false,
    isLoaded: false,
    items: [{ id: 1 }, { id: 2 }, { id: 3 }],
    pageCount: 0,
    currentPage: 1,
  };
  const action = addProduct({ id: 4 });
  const expectedOutput = {
    isReady: false,
    isLoaded: false,
    items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    pageCount: 0,
    currentPage: 1,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after setting products', () => {
  const state = initialState;
  const action = setProducts([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  const expectedOutput = {
    isReady: true,
    isLoaded: true,
    items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    pageCount: 0,
    currentPage: 1,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after changing product', () => {
  const state = {
    isReady: true,
    isLoaded: true,
    items: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    pageCount: 0,
    currentPage: 1,
  };
  const action = changeProduct(3, { id: 10 });
  const expectedOutput = {
    isReady: true,
    isLoaded: true,
    items: [{ id: 1 }, { id: 2 }, { id: 10 }, { id: 4 }],
    pageCount: 0,
    currentPage: 1,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after setting page count', () => {
  const state = initialState;
  const action = setPageCount(10);
  const expectedOutput = {
    isReady: false,
    isLoaded: false,
    items: null,
    pageCount: 10,
    currentPage: 1,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after setting current page', () => {
  const state = initialState;
  const action = setCurrentPage(10);
  const expectedOutput = {
    isReady: false,
    isLoaded: false,
    items: null,
    pageCount: 0,
    currentPage: 10,
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should return the default state', () => {
  const state = undefined;
  const action = {};
  const expectedOutput = initialState;
  expect(reducer(state, action)).toEqual(expectedOutput);
});
