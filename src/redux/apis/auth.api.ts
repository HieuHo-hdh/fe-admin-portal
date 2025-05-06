import { API_PATH } from '@/constants/api.constants';
import { axiosClient } from '@/configs/axiosClient';

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>(API_PATH.AUTH.LOGIN, credentials);
  return response.data;
}; 