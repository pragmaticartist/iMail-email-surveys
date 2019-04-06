import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './components/App';
import reducer from './reducers';
import rootSaga from './sagas';

// Development only axios helpers
import axios from 'axios';
window.axios = axios;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
