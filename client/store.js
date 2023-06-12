import { configureStore } from '@reduxjs/toolkit';
import userReducer from './store/userSlice';

// create Redux store
// userReducer state is referred to as user
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

