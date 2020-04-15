import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import './App/app.min.css';

import App from './App/App';

import createStore from './storage/store';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
