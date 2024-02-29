// actions.js
export const setContactFormData = (formData) => ({
  type: 'SET_CONTACT_FORM_DATA',
  payload: formData,
});

export const setEducationFormData = (formData) => ({
  type: 'SET_EDUCATION_FORM_DATA',
  payload: formData,
});

export const resetFormData = () => ({
  type: 'RESET_FORM_DATA',
});
