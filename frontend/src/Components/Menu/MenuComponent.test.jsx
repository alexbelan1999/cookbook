import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Menu from './MenuContainer';

import createStore from '../../storage/store';

const store = createStore();

test('First snapshot test', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Menu />
    </Provider>,
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
