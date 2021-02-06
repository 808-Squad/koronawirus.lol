import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App';
import reportWebVitals from './reportWebVitals';
import ReactBreakpoints from 'react-breakpoints';
import breakpoints from './ui/breakpoints.js';
import { IntlProvider } from 'react-intl';
import plMessages from './ui/messages/pl.json';

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider messages={plMessages} locale="pl" defaultLocale="pl">
      <ReactBreakpoints breakpoints={breakpoints}>
        <App />
      </ReactBreakpoints>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
