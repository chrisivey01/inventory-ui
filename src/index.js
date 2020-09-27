import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from "redux-thunk";
import App from './App';
import combineReducers from "./store/index";


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;
const store = createStore(combineReducers, applyMiddleware(thunk));
store.subscribe(() => {
  console.log('Update inventory: ', store.getState());
})

ReactDOM.render(
  <Provider store={store}>
        <App />
  </Provider>,
  document.getElementById('root')
);
