import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '@/redux/reducers/appSlice';
import authReducer from '@/redux/reducers/authSlice';
import usersReducer from '@/redux/reducers/usersSlice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;