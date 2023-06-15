import { createSlice } from '@reduxjs/toolkit';

// default state
const initialState = {
  user_id: '44',
  firstname: 'greg',
  lastname: 'mole',
  bio: 'toolkit demo bio',
  subject: 'toolkit demo sub',
  email: 'toolkit demo@gmail.com',
  skilllevel: '5',
  profileurl: 'https://iili.io/H6qbG2V.jpg'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // login and update are action creators 
    login: (state, action) => {
      // overwrite state with action payload 
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