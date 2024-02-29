// store.js
import { createStore, combineReducers } from 'redux';
import { contactFormReducer, educationFormReducer } from './reducers';

const rootReducer = combineReducers({
  contactFormData: contactFormReducer,
  educationFormData: educationFormReducer,
});

const store = createStore(rootReducer);

export default store;
