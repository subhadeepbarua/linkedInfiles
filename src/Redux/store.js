// store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formReducer'; // Import your reducer

const store = configureStore({
  reducer: {
    form: formReducer, // Register the reducer under the 'form' key
  },
});

export default store;
