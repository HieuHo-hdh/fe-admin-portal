import { createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, LoginRequest, LoginResponse } from '@/redux/apis/auth.api';
import { LOCAL_STORAGE_KEY } from '@/constants/localStorage.constants';
import { createNotificationPayload } from '@/utils/notificationUtils';
import { LOGIN } from '@/constants/messages.constants';
import { ShowNotificationPayload } from '@/models/Notification.model';

export const login = createAsyncThunk<
  LoginResponse, // Return type on success
  LoginRequest, // Argument type
  { rejectValue: ShowNotificationPayload } // Rejection type
>('auth/login', async (credentials: LoginRequest, { rejectWithValue }) => {
  try {
    const response = await loginApi({
      ...credentials,
      ...createNotificationPayload('success', LOGIN),
    });
    localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, response.accessToken);
    return response;
  } catch (error) {
    console.log('error:', error);
    return rejectWithValue({
      // error: (error as Error).message,
      ...createNotificationPayload('error', LOGIN),
    });
  }
});

export const authActions = {
  login,
};
