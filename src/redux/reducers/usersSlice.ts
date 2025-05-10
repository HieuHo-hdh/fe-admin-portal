import { createSlice } from '@reduxjs/toolkit';
import {
  addUserAsync,
  deleteUserAsync,
  fetchUsersAsync,
  updateUserAsync,
} from '@/redux/actions/usersAction';
import { User } from '@/redux/apis/users.api';

interface UsersState {
  users: User[];
  total: number;
  loading: boolean; // General loading state
  loadingCreate: boolean; // Loading for create user
  loadingUpdate: boolean; // Loading for update user
  loadingDelete: boolean; // Loading for delete user
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  loading: false,
  loadingCreate: false,
  loadingUpdate: false,
  loadingDelete: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.users = initialState.users;
        state.total = initialState.total;
        state.error = action.payload as string;
      })
      // Add user
      .addCase(addUserAsync.pending, (state) => {
        state.loadingCreate = true;
        state.error = null;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.users = [action.payload, ...state.users];
        state.total += 1;
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.loadingCreate = false;
        state.error = action.payload as string;
      })
      // Update user
      .addCase(updateUserAsync.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.payload as string;
      })
      // Delete user
      .addCase(deleteUserAsync.pending, (state) => {
        state.loadingDelete = true;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.users = state.users.filter((user) => user.id !== action.payload.id);
        state.total -= 1;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
