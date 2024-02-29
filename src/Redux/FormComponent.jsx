import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from './formSlice'; // Import the action
import store from './store'; // Import the store

function FormComponent() {
  const dispatch = useDispatch();
  const [formData, setFormDataLocal] = useState(store.getState().form); // Get initial state

  const handleChange = (e) => {
    setFormDataLocal({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFormData(formData)); // Dispatch action to update Redux state
    // Clear form or handle success here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <input type="email" name="email" value={formData.email} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
}

export default FormComponent;
