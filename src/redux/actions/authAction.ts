import { createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, LoginRequest } from '@/redux/apis/auth.api';
import { LOCAL_STORAGE_KEY } from '@/constants/localStorage.constants';
import { AxiosError } from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, response.accessToken);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.message || 'An unexpected error occurred');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

export const authActions = {
  login,
};
