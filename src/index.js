import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import './index.css';

import {App} from './App';
import registerServiceWorker from './registerServiceWorker';
import { reducer as burgerBuilderReducer } from "./store/reducers/burgerBuilder";
import { reducer as orderReducer } from "./store/reducers/order";
import { reducer as AuthReducer } from "./store/reducers/auth";

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: AuthReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>;

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
