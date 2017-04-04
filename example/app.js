import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import tableMiddleware from '../src/middleware';
import Container from './Container.js';
import reducer from './reducer';

const middlewares = [
  tableMiddleware,
];

const enhancers = [
  applyMiddleware(...middlewares),
];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
  reducer,
  composeEnhancers(...enhancers)
);

ReactDOM.render(
  <Provider store={store}><Container /></Provider>,
  document.getElementById('main')
);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(require('./reducer').default);
  });
}