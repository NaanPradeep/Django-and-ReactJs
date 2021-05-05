import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as storage from 'redux-storage';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import createEngine from 'redux-storage-engine-localstorage';
import authReducer from './store/reducers/auth';
import assignmentReducer from './store/reducers/assignment';
import performanceReducer from './store/reducers/assignmentSubmission';

const reducer = storage.reducer(combineReducers({
  authReducer,
  assignmentReducer,
  performanceReducer,
}));
const engine = createEngine('my-save-key');
const middleware = storage.createMiddleware(engine);

const createStoreWithMiddleware = applyMiddleware(thunk, middleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
