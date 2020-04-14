import reducer, { initialState } from './rating';
import { addMark, removeMark } from '../actions/rating';

it('should correctly change state after adding mark', () => {
  const state = {
    items: [{ id: 2 }, { id: 3 }],
  };
  const action = addMark({ id: 1 });
  const expectedOutput = {
    items: [{ id: 2 }, { id: 3 }, { id: 1 }],
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should correctly change state after removing mark', () => {
  const state = {
    items: [{ id: 2 }, { id: 3 }],
  };
  const action = removeMark(2);
  const expectedOutput = {
    items: [{ id: 3 }],
  };
  expect(reducer(state, action)).toEqual(expectedOutput);
});

it('should return the default state', () => {
  const state = undefined;
  const action = {};
  const expectedOutput = initialState;
  expect(reducer(state, action)).toEqual(expectedOutput);
});
