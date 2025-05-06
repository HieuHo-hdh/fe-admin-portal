import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchSortParams } from '@/models/SearchSort.model';
import { fetchUsers, addUser, updateUser, deleteUser, CreateUserRequest, UpdateUserRequest } from '@/redux/apis/users.api';

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers',
  async (params: Partial<SearchSortParams>, { rejectWithValue }) => {
    try {
      const response = await fetchUsers(params);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addUserAsync = createAsyncThunk(
  'users/addUser',
  async (user: CreateUserRequest, { rejectWithValue }) => {
    try {
      const response = await addUser(user);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (user: UpdateUserRequest, { rejectWithValue }) => {
    try {
      const response = await updateUser(user);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteUser(id);
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
); 