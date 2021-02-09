import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App';
import ReactBreakpoints from 'react-breakpoints';
import breakpoints from './ui/breakpoints.js';
import { IntlProvider } from 'react-intl';
import { store } from './store/store'
import { setLanguage } from './store/reducers/languageReducer';
import { chooseLanguage } from './utils'

const language = chooseLanguage()
const messagesPath = `messages/${language}.json`;

store.dispatch(setLanguage(language))

fetch(messagesPath)
.then(response => response.json())
.then(response => {
  ReactDOM.render(
    <React.StrictMode>
      <IntlProvider messages={response} locale="pl" defaultLocale="pl">
        <ReactBreakpoints breakpoints={breakpoints}>
          <App />
        </ReactBreakpoints>
      </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
})
