import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import reportWebVitals from './App/reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './App/store.js'

import './App/index.css';
import "./App/App.scss"


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();