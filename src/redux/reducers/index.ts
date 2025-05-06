import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/redux/reducers/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;