import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import AccountPage from './AccountPageContainer';

import createStore from '../../storage/store';

const store = createStore();

test('First snapshot test', () => {
  const component = renderer.create(
    <Provider store={store}>
      <AccountPage />
    </Provider>,
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
