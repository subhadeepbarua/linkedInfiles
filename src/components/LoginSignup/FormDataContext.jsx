// FormDataContext.js
import { createContext, useContext, useReducer } from 'react';

const FormDataContext = createContext();

const initialState = {
  SignUpPage: {
    // initial data for page 1
    email: '',
    password: '',
    confirmPassword: ''
    // other fields
  },
  page2Data: {
    // initial data for page 2
    employmentStatus: '',
    // other fields
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'updatePage1Data':
      return { ...state, SignUpPage: { ...state.SignUpPage, ...action.payload } };
    case 'updatePage2Data':
      return { ...state, page2Data: { ...state.page2Data, ...action.payload } };
    default:
      return state;
  }
};

export const FormDataProvider = ({ children }) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormDataContext.Provider value={{ formData, dispatch }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};
