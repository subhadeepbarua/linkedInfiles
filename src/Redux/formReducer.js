// formReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      Object.assign(state, action.payload); // Update state with new data
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
