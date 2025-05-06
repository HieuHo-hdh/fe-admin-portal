import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/redux/reducers/authSlice';
import usersReducer from '@/redux/reducers/usersSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;