import { createSlice } from '@reduxjs/toolkit';
import { login } from '@/redux/actions/authAction';
import { LoginResponse } from '@/redux/apis/auth.api';
import { ShowNotificationPayload } from '@/models/Notification.model';

interface AuthState {
  userProfile: LoginResponse | null;
  loading: boolean;
  error: ShowNotificationPayload | null;
}

const initialState: AuthState = {
  userProfile: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userProfile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.userProfile = null;
        state.error = action.payload as ShowNotificationPayload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
