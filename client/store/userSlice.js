import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id: '2',
  firstname: 'greg',
  lastname: 'mole',
  bio: 'toolkit demo bio',
  subjects: 'toolkit demo sub',
  email: 'toolkit demo@gmail.com',
  skilllevel: '5'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, update } = userSlice.actions;

export default userSlice.reducer;