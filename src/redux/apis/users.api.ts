import { API_PATH } from '@/constants/api.constants';
import { axiosClient } from '@/configs/axiosClient';
import { SearchSortParams } from '@/models/SearchSort.model';
import { buildQueryString } from '@/utils/apiUtils';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  birthDate: string;
  company: {
    name: string;
    title: string;
  };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number;
}

export const fetchUsers = async (params: Partial<SearchSortParams>): Promise<UsersResponse> => {
  const response = await axiosClient.get<UsersResponse>(
    `${API_PATH.USERS.SEARCH}?${buildQueryString(params)}`
  );
  return response.data;
};

export const addUser = async (user: CreateUserRequest): Promise<User> => {
  const response = await axiosClient.post<User>(API_PATH.USERS.ADD, user);
  return response.data;
};

export const updateUser = async (user: UpdateUserRequest): Promise<User> => {
  const response = await axiosClient.put<User>(`${API_PATH.USERS.UPDATE}/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<User> => {
  const response = await axiosClient.delete<User>(`${API_PATH.USERS.DELETE}/${id}`);
  return response.data;
}; 