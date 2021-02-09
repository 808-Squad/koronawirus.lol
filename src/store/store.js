import { createStore } from 'redux'
import { language } from './reducers/languageReducer'

export const store = createStore(language)