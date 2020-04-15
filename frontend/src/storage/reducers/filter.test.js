import reducer, { initialState } from './filter';
import { setFilter, setSearchQuery } from '../actions/filter';

it('should correctly change state after setting filter', () => {
  const state = initialState;
  const action = setFilter('test');
  const expectedOutput = {
    searchQuery: '',
    filterBy: 'test',
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after setting search query', () => {
  const state = initialState;
  const action = setSearchQuery('test');
  const expectedOutput = {
    searchQuery: 'test',
    filterBy: 'all',
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should return the default state', () => {
  const state = undefined;
  const action = {};
  const expectedOutput = initialState;
  expect(reducer(state, action)).toEqual(expectedOutput);
});
