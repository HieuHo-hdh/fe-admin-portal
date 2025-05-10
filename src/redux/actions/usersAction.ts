import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchSortParams } from '@/models/SearchSort.model';
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  CreateUserRequest,
  UpdateUserRequest,
} from '@/redux/apis/users.api';
import { createNotificationPayload } from '@/utils/notificationUtils';
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '@/constants/messages.constants';

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async (params: Partial<SearchSortParams>, { rejectWithValue }) => {
    try {
      const response = await fetchUsers(params);
      return response;
    } catch (error) {
      return rejectWithValue({
        error: (error as Error).message,
        ...createNotificationPayload('error', GET_USERS),
      });
    }
  },
);

export const addUserAsync = createAsyncThunk(
  'users/addUser',
  async (user: CreateUserRequest, { rejectWithValue }) => {
    try {
      const response = await addUser(user);
      return {
        ...response,
        ...createNotificationPayload('success', CREATE_USER),
      };
    } catch (error) {
      return rejectWithValue({
        error: (error as Error).message,
        ...createNotificationPayload('error', CREATE_USER),
      });
    }
  },
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (user: UpdateUserRequest, { rejectWithValue }) => {
    try {
      const response = await updateUser(user);
      return {
        ...response,
        ...createNotificationPayload('success', UPDATE_USER),
      };
    } catch (error) {
      return rejectWithValue({
        error: (error as Error).message,
        ...createNotificationPayload('error', UPDATE_USER),
      });
    }
  },
);

export const deleteUserAsync = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteUser(id);
      return {
        ...response,
        ...createNotificationPayload('success', DELETE_USER),
      };
    } catch (error) {
      return rejectWithValue({
        error: (error as Error).message,
        ...createNotificationPayload('error', DELETE_USER),
      });
    }
  },
);
