// reducers.js
const contactFormReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CONTACT_FORM_DATA':
      return action.payload;
    case 'RESET_FORM_DATA':
      return {};
    default:
      return state;
  }
};

const educationFormReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EDUCATION_FORM_DATA':
      return action.payload;
    case 'RESET_FORM_DATA':
      return {};
    default:
      return state;
  }
};

export { contactFormReducer, educationFormReducer };
