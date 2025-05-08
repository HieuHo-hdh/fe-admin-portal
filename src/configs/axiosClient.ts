import { LOCAL_STORAGE_KEY } from '@/constants/localStorage.constants';
import { showNotification } from '@/redux/reducers/appSlice';
import { store } from '@/redux/store';
import axios from 'axios';

const DUMMY_JSON_API =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_MOCK_API_URL || 'https://dummyjson.com';

export const axiosClient = axios.create({
  baseURL: DUMMY_JSON_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(
        showNotification({
          type: 'error',
          message: 'API Error',
          description: error.response?.data?.message || error.message,
        }),
      );
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      window.location.href = '/login';
    } else if (error.message) {
      store.dispatch(
        showNotification({
          type: 'error',
          message: error?.code,
          description: error.message,
        }),
      );
    }
    return Promise.reject(error);
  },
);
