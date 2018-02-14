import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './reducer';
import App from './container/App';

const store = createStore(Reducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
