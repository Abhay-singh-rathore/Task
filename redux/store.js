// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
     tasks: taskReducer,
  },
});

export default store;
