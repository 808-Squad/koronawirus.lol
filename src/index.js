import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactBreakpoints from 'react-breakpoints';
import breakpoints from './breakpoints.js';


ReactDOM.render(
  <React.StrictMode>
    <ReactBreakpoints breakpoints={breakpoints}>
      <App />
    </ReactBreakpoints>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
